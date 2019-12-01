import { NEWSLETTERS } from './constants';

export function getNewsletterReference(db: FirebaseFirestore.Firestore, newsletterId: string) {
  return db
    .collection(NEWSLETTERS)
    .doc(newsletterId);
}
