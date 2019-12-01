import { NEWSLETTER_ROLES, USER_ROLE } from './constants';
import { UserRole } from './interfaces/user-role';

export function renameNewsletterInUserRole(
  db: FirebaseFirestore.Firestore,
  transaction: FirebaseFirestore.Transaction,
  name: string,
  newsletterId: string
) {
  return (userRoleQueryDocumentSnapshot: FirebaseFirestore.QueryDocumentSnapshot) => {
    const { uid } = userRoleQueryDocumentSnapshot.data() as UserRole;
    const userRole = db
      .collection(NEWSLETTER_ROLES)
      .doc(`${newsletterId}/${USER_ROLE}/${uid}`);
    return transaction.update(userRole, { newsletter: name });
  };
}
