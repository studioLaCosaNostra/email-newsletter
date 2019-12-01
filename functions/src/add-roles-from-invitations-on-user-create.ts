import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { NEWSLETTER_INVITATIONS } from './constants';
import { Newsletter } from './interfaces/newsletter';
import { UserInvitation } from './interfaces/user-invitation';
import { getNewsletterReference } from './get-newsletter-reference';
import { setUserRole } from './interfaces/set-user-role';

export const addRolesFromInvitationsOnUserCreate = functions.auth.user().onCreate(async (user) => {
  const { email, uid } = user;
  if (!email) {
    throw new Error(`CRITICAL: Missing email for uid: ${uid}`);
  }
  const db = admin.firestore();
  const userInvitationsQuery = db.collection(NEWSLETTER_INVITATIONS)
    .where('email', '==', email);
  const userInvitationsQuerySnapshot = await userInvitationsQuery.get();
  const { docs, size } = userInvitationsQuerySnapshot;
  for (let index = 0; index < size; index++) {
    const userInvitationDocumentSnapshot = docs[index];
    const userInvitation = userInvitationDocumentSnapshot.data() as UserInvitation;
    const { newsletterId, role } = userInvitation;
    const newsletterSnapshot = await getNewsletterReference(db, newsletterId).get();
    const { name } = newsletterSnapshot.data() as Newsletter;
    console.log(`setup user ${email} invitation to newsletter "${name}" as ${role}`);
    await setUserRole(db, email, uid, newsletterId, name, role);
    await userInvitationDocumentSnapshot.ref.delete();
  }
});