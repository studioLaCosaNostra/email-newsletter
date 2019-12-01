import * as admin from 'firebase-admin';

export function decrementSubscribers(batch: FirebaseFirestore.WriteBatch, newsletterReference: FirebaseFirestore.DocumentReference) {
  const decrement = admin.firestore.FieldValue.increment(-1);
  batch.update(newsletterReference, { subscribers: decrement });
}
