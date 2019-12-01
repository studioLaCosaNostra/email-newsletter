import { NewsletterSettings } from './interfaces/newsletter-settings';
import { DELIVERY } from './constants';
import { Delivery } from './interfaces/delivery';
import { NewsletterSubscriber } from './interfaces/newsletter-subscriber';
import { NewsletterSubscriberInternal } from './interfaces/newsletter-subscriber-internal';
import { sendEmailDelivery } from './send-email-delivery';

export async function deliverEmail(
  settings: NewsletterSettings,
  deliveryDocumentSnapshot: FirebaseFirestore.QueryDocumentSnapshot,
  subscriberDocumentSnapshot: FirebaseFirestore.QueryDocumentSnapshot,
  subscriberInternalDocumentSnapshot: FirebaseFirestore.DocumentSnapshot
) {
  const subscriber = subscriberDocumentSnapshot.data() as NewsletterSubscriber;
  const delivery = deliveryDocumentSnapshot.data() as Delivery;
  const subscriberInternal = subscriberInternalDocumentSnapshot.data() as NewsletterSubscriberInternal;
  console.log('deliverEmail', subscriber.email);
  await sendEmailDelivery(settings, delivery, subscriber, subscriberInternal);
  await subscriberDocumentSnapshot.ref.update({
    [`${DELIVERY}.${deliveryDocumentSnapshot.id}`]: true
  });
}
