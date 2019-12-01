import { NEWSLETTER_INVITATIONS } from './constants';
import { invitationAlreadyExistsError } from './errors';
import { sendInvitationEmail } from './send-invitation-email';
import { Role } from './interfaces/user-role';
import * as admin from 'firebase-admin';

export async function inviteUser(db: FirebaseFirestore.Firestore, ownerUID: string, newsletterName: string, email: string, newsletterId: string, role: Exclude<Role, 'owner'>) {
  const newsletterEmailInvitationsQuery = db.collection(NEWSLETTER_INVITATIONS)
    .where('newsletterId', '==', newsletterId)
    .where('email', '==', email);
  const invitations = await newsletterEmailInvitationsQuery.get();
  if (invitations.size > 0) {
    throw invitationAlreadyExistsError;
  }
  await db.collection(NEWSLETTER_INVITATIONS)
    .doc()
    .set({
      email,
      newsletterId,
      role
    });
  const ownerUser = await admin.auth().getUser(ownerUID);
  if (!ownerUser.email) {
    throw new Error(`CRITICAL: Missing owner email uid: ${ownerUID}`);
  }
  await sendInvitationEmail(ownerUser.email, email, newsletterName, role);
}
