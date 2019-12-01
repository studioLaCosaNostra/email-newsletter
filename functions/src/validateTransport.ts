import { NewsletterSettings } from './interfaces/newsletter-settings';
import { addNewsletterErrorIfNotExist } from './add-newsletter-error-if-not-exist';

export async function validateSettings(db: FirebaseFirestore.Firestore, newsletterId: string, newsletterSettings: NewsletterSettings) {
  if (!newsletterSettings) {
    const message = `Missing settings for newsletter email transport (${newsletterId})`;
    await addNewsletterErrorIfNotExist(db, newsletterId, {
      code: 'missing-settings',
      message
    });
    throw new Error(message);
  }
}
