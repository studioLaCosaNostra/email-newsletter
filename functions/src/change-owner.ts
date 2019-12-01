import { NEWSLETTER_ROLES, USER_ROLE } from './constants';
import { setUserRole } from './interfaces/set-user-role';

export async function changeOwner(
  db: FirebaseFirestore.Firestore,
  newsletterId: string,
  newsletter: string,
  ownerUID: string,
  userUID: string,
  email: string
) {
  const batch = db.batch();
  const ownerUserRoleDocument = db.collection(NEWSLETTER_ROLES)
    .doc(`${newsletterId}/${USER_ROLE}/${ownerUID}`);
  batch.update(ownerUserRoleDocument, { role: 'admin' });
  await setUserRole(db, email, userUID, newsletterId, newsletter, 'owner', batch);
  await batch.commit();
}
