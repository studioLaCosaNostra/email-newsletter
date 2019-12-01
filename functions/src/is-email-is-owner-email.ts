import * as admin from 'firebase-admin';

export async function isEmailIsOwnerEmail(uid: string, email: string) {
  const ownerUser = await admin.auth().getUser(uid);
  const ownerEmail = ownerUser.email;
  return email === ownerEmail;
}
