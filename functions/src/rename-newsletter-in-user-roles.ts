import { USER_ROLE } from './constants';
import { renameNewsletterInUserRole } from './rename-newsletter-in-user-role';

export async function renameNewsletterInUserRoles(
  db: FirebaseFirestore.Firestore,
  transaction: FirebaseFirestore.Transaction,
  newsletterId: string,
  name: string
) {
  const userRolesQuery = db.collectionGroup(USER_ROLE).where('newsletterId', '==', newsletterId);
  const userRoles = await transaction.get(userRolesQuery);
  const renameInUserRole = renameNewsletterInUserRole(db, transaction, name, newsletterId);
  return Promise.all(userRoles.docs.map(renameInUserRole));
}
