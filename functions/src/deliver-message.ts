import { DELIVERY, SUBSCRIBERS_INTERNAL } from './constants';

import { DeliveryStatus } from './enums/delivery-status';
import { NewsletterSettings } from './interfaces/newsletter-settings';
import { deliverEmail } from './deliver-email';
import { getConfirmedSubscribersCollection } from './get-confirmed-subscribers-collection';
import { updateSentEmails } from './update-sent-emails';

export async function deliverMessage(deliveryDocumentSnapshot: FirebaseFirestore.QueryDocumentSnapshot, newsletterRef: FirebaseFirestore.DocumentReference, newsletterSettings: NewsletterSettings, limit: number): Promise<number> {
  console.log('delivery', deliveryDocumentSnapshot.id);
  const subscribers = await getConfirmedSubscribersCollection(newsletterRef)
    .where(`${DELIVERY}.${deliveryDocumentSnapshot.id}`, '==', false)
    .limit(limit)
    .get();
  for (let index = 0; index < subscribers.size; index++) {
    const subscriberDocumentSnapshot = subscribers.docs[index];
    const subscriberInternalDocumentSnapshot = await newsletterRef.collection(SUBSCRIBERS_INTERNAL).doc(subscriberDocumentSnapshot.id).get();
    await deliverEmail(newsletterSettings, deliveryDocumentSnapshot, subscriberDocumentSnapshot, subscriberInternalDocumentSnapshot);
  }
  if (subscribers.size === 0) {
    console.log(`delivered ${deliveryDocumentSnapshot.id}`);
    await deliveryDocumentSnapshot.ref.update({
      status: DeliveryStatus.Delivered
    });
  }
  else {
    await updateSentEmails(newsletterRef, subscribers.size);
  }
  return subscribers.size;
}
