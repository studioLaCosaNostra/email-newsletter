import { DELIVERY, NEWSLETTERS } from './constants';

import { DeliveryStatus } from './enums/delivery-status';
import { NewsletterSettings } from './interfaces/newsletter-settings';
import { deliverMessage } from "./deliver-message";

export async function deliverNewsletter(db: FirebaseFirestore.Firestore, newsletterSettingsQuerySnapshot: FirebaseFirestore.QueryDocumentSnapshot) {
  const newsletterSettings = newsletterSettingsQuerySnapshot.data() as NewsletterSettings;
  console.log('deliverNewsletter', newsletterSettingsQuerySnapshot.id);
  const newsletterReference = db.collection(NEWSLETTERS).doc(newsletterSettingsQuerySnapshot.id);
  const waitingList = await newsletterReference.collection(DELIVERY)
    .where('canceled', '==', false)
    .where('status', '==', DeliveryStatus.Waiting)
    .get();
  if (waitingList.docs.length === 0) {
    console.log('No messages to delivery');
    await newsletterSettingsQuerySnapshot.ref.update({
      messagesToDeliver: false
    });
    return true;
  }
  if (!newsletterSettings) {
    const error = `Missing settings in newsletter ${newsletterSettingsQuerySnapshot.id}`;
    console.log(error);
    await newsletterReference.update({ error });
    return false;
  }
  let { remainingDailyLimit } = newsletterSettings;
  if (remainingDailyLimit === 0) {
    console.log('Remaining daily limit is 0');
    return false;
  }
  let index = 0;
  while (remainingDailyLimit > 0 && index < waitingList.docs.length) {
    console.log('Deliver index: ', index);
    const deliverDoc = waitingList.docs[index];
    const messagesUsedLimit = await deliverMessage(deliverDoc, newsletterReference, newsletterSettings, remainingDailyLimit);
    remainingDailyLimit -= messagesUsedLimit;
    index += 1;
  }
  await newsletterSettingsQuerySnapshot.ref.update({
    remainingDailyLimit
  });
  console.log('End deliverNewsletter', newsletterSettingsQuerySnapshot.id);
  return true;
}
