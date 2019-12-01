import { NewsletterSettings } from './interfaces/newsletter-settings';
import { NEWSLETTER_SETTINGS } from './constants';

export async function resetRemainingDailyLimits(db: FirebaseFirestore.Firestore) {
  const newsletterSettingsList = await db.collection(NEWSLETTER_SETTINGS).listDocuments();
  console.log(`reset `, newsletterSettingsList.length);
  await Promise.all(newsletterSettingsList.map((newsletterSettingsDocumentRef) => {
    return db.runTransaction(async (transaction) => {
      const { dailyLimit } = (await newsletterSettingsDocumentRef.get()).data() as NewsletterSettings;
      const remainingDailyLimit = dailyLimit || 0;
      console.log(`reset ${newsletterSettingsDocumentRef.id} to ${remainingDailyLimit}`);
      transaction.update(newsletterSettingsDocumentRef, { remainingDailyLimit });
      transaction;
    });
  }));
}
