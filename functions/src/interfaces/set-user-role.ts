import { NEWSLETTER_ROLES, USER_ROLE } from '../constants';
import { Role } from './user-role';

export async function setUserRole(
  db: FirebaseFirestore.Firestore,
  email: string,
  userUID: string,
  newsletterId: string,
  newsletter: string,
  role: Role,
  batch?: FirebaseFirestore.WriteBatch
) {
  const userRoleDocument = db.collection(NEWSLETTER_ROLES)
    .doc(`${newsletterId}/${USER_ROLE}/${userUID}`);
  const data = {
    uid: userUID,
    email,
    newsletterId,
    newsletter,
    role
  };
  if (batch) {
    return batch.set(userRoleDocument, data);
  } else {
    return await userRoleDocument.set(data);
  }
}
