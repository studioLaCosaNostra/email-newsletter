import { NEWSLETTER_SETTINGS } from './constants';
import { addNewsletterErrorIfNotExist } from './add-newsletter-error-if-not-exist';
import { allSettled } from './all-settled';
import { deliverNewsletter } from "./deliver-newsletter";

export async function deliverNewsletters(db: FirebaseFirestore.Firestore) {
  const newsletterSettingsList = await db.collection(NEWSLETTER_SETTINGS)
    .where('messagesToDeliver', '==', true)
    .where('remainingDailyLimit', '>', 0)
    .get();
  console.log(`Deliver ${newsletterSettingsList.size} newsletters.`);
  return allSettled(
    newsletterSettingsList.docs
      .map(newsletterSettingsQuerySnapshot =>
        deliverNewsletter(db, newsletterSettingsQuerySnapshot)
          .catch(async (reason) => {
            await addNewsletterErrorIfNotExist(db, newsletterSettingsQuerySnapshot.id, {
              code: 'delivery-error',
              message: reason.toString()
            });
            throw reason;
          })
      )
  );
}
