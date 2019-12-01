import { NewsletterError } from './interfaces/newsletter';
import { getNewsletterReference } from './get-newsletter-reference';

export async function addNewsletterErrorIfNotExist(
  db: FirebaseFirestore.Firestore,
  newsletterId: string,
  error: NewsletterError
) {
  const newsletterReference = getNewsletterReference(db, newsletterId);
  const currentError: NewsletterError = (await newsletterReference.get()).get('error');
  if (!currentError) {
    // TODO 1: send email to newsletter owner and admin if new Error
    await newsletterReference.update({ error });
  }
}
