import * as admin from 'firebase-admin';

export function incrementSubscribers(batch: FirebaseFirestore.WriteBatch, newsletterReference: FirebaseFirestore.DocumentReference) {
  const increment = admin.firestore.FieldValue.increment(1);
  batch.update(newsletterReference, { subscribers: increment });
}
