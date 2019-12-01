import { firestore } from 'firebase-admin';

export async function updateSentEmails(newsletterReference: FirebaseFirestore.DocumentReference, value: number) {
  const incrementSentEmails = firestore.FieldValue.increment(value);
  await newsletterReference.update({
    sentEmails: incrementSentEmails
  });
}