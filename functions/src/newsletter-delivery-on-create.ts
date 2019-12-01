import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { DELIVERY, NEWSLETTERS } from './constants';

import { DeliveryStatus } from './enums/delivery-status';
import { getConfirmedSubscribersCollection } from './get-confirmed-subscribers-collection';
import { getNewsletterReference } from './get-newsletter-reference';
import { updateSubscribersDeliveryStatus } from './update-subbscribers-delivery-status';

export const newsletterDeliveryOnCreate = functions.firestore
  .document(`${NEWSLETTERS}/{newsletterId}/${DELIVERY}/{deliveryId}`)
  .onCreate(async (deliverySnapshot, context) => {
    const db = admin.firestore();
    const { newsletterId, deliveryId } = context.params;
    const newsletterReference = getNewsletterReference(db, newsletterId);
    const subscribers = await getConfirmedSubscribersCollection(newsletterReference).get();
    await updateSubscribersDeliveryStatus(subscribers, deliveryId, false);
    return deliverySnapshot.ref.update({
      status: DeliveryStatus.Waiting
    });
  });
