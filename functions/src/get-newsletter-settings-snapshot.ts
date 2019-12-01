import { NEWSLETTER_SETTINGS } from './constants';

export function getNewsletterSettingsSnapshot(db: FirebaseFirestore.Firestore, newsletter: string) {
  return db
    .collection(NEWSLETTER_SETTINGS)
    .doc(newsletter)
    .get();
}
