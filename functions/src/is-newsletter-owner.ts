import { UserRole } from './interfaces/user-role';
import { NEWSLETTER_ROLES, USER_ROLE } from './constants';
import * as admin from 'firebase-admin';

export async function isNewsletterOwner(newsletterId: string, uid: string) {
  const firestore = admin.firestore();
  const userRole = (await firestore.collection(NEWSLETTER_ROLES).doc(`${newsletterId}/${USER_ROLE}/${uid}`).get()).data() as UserRole;
  return userRole.role === 'owner';
}
