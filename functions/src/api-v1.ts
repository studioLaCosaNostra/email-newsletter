import * as admin from 'firebase-admin';
import * as cors from 'cors';
import * as express from 'express';
import * as uuid from 'uuid/v4';

import { NEWSLETTERS, SUBSCRIBERS, SUBSCRIBERS_INTERNAL } from './constants';

import { NewsletterSubscriber } from './interfaces/newsletter-subscriber';
import { addNewsletterErrorIfNotExist } from './add-newsletter-error-if-not-exist';
import { decrementSubscribers } from './decrement-subscribers';
import { getNewsletterReference } from './get-newsletter-reference';
import { incrementSubscribers } from './increment-subscribers';
import { sendConfirmEmail } from './send-confirm-email';

export const apiV1 = express();

const allowAllOrigin = cors({ origin: true });

apiV1.get('/subscribe', allowAllOrigin, async (request, response) => {
  try {
    const { newsletter, email }: { 
      newsletter: string,
      email: string
    } = request.query;
    if (!newsletter) {
      return response.status(400).send(`The request must have the id of the newsletter.`)
    }
    if (!email) {
      return response.status(400).send(`The request must have an email address.`)
    }
    const db = admin.firestore();
    const newsletterReference = getNewsletterReference(db, newsletter);
    const newsletterData = (await newsletterReference.get()).data();
    if (!newsletterData) {
      return response.status(404)
        .send(`We do not have such a newsletter (${newsletter}) in the database.`);
    }
    const subscriberReference = newsletterReference
      .collection(SUBSCRIBERS)
      .doc(email);
    const subscriberInternalReference = newsletterReference
      .collection(SUBSCRIBERS_INTERNAL)
      .doc(email);
    const subscriber = (await subscriberReference.get()).data();
    if (subscriber) {
      return response.status(200).send(`A ${email} is on list and ${subscriber.confirmed ? 'activated' : 'waiting for activation'}.`);
    }
    const newSubscriber = {
      email,
      confirmed: false,
      createdAt: Date.now()
    };
    const newSubscriberInternal = {
      confirmationToken: uuid(),
      unsubscribeToken: uuid()
    }
    try {
      await sendConfirmEmail(db, newsletter, email, newSubscriberInternal.confirmationToken);
    } catch (error) {
      console.error(error);
      await addNewsletterErrorIfNotExist(db, newsletter, {
        code: 'delivery-error',
        message: error.toString()
      });
      return response.status(500).send(error.message);
    }
    await subscriberInternalReference.set(newSubscriberInternal)
    await subscriberReference.set(newSubscriber);
    return response.status(200).send(`Thank you for subscribing, we've just sent an email to ${email} for verification purposes.`);
  } catch (error) {
    console.error(error);
    return response.status(500).send(`Something wrong.`);
  }        
});

apiV1.get('/confirm', allowAllOrigin, async (request, response) => {
  try {
    const { newsletter, email, token } = request.query;

    const db = admin.firestore();
    const newsletterReference = getNewsletterReference(db, newsletter);
    const subscriberReference = newsletterReference
      .collection(SUBSCRIBERS)
      .doc(email);
    const subscriberInternalReference = newsletterReference
      .collection(SUBSCRIBERS_INTERNAL)
      .doc(email);
    const subscriberInternal = (await subscriberInternalReference.get()).data();
    if (!subscriberInternal) {
      return response.status(404).send('We do not have such an email address on the list.');
    }
    if (subscriberInternal.confirmationToken !== token) {
      return response.status(400).send('Mismatched token.');
    }
    const subscriber = (await subscriberReference.get()).data() as NewsletterSubscriber;
    const confirmedMessage = 'The email address has been confirmed thank you.';
    if (subscriber.confirmed) {
      return response.status(200).send(confirmedMessage)
    }
    const batch = db.batch();
    batch.update(subscriberReference, {
      confirmed: true
    });
    incrementSubscribers(batch, newsletterReference);
    await batch.commit();
    return response.status(200).send(confirmedMessage)
  } catch (error) {
    console.error(error);
    return response.status(500).send(`Something wrong.`);
  }
});

apiV1.get('/unsubscribe', allowAllOrigin, async (request, response) => {
  try {
    const { email, newsletter, token } = request.query;
    const firestore = admin.firestore();
    const newsletterReference = admin.firestore()
      .collection(NEWSLETTERS)
      .doc(newsletter);
    const subscriberReference = newsletterReference
      .collection(SUBSCRIBERS)
      .doc(email);
    const subscriberInternalReference = newsletterReference
      .collection(SUBSCRIBERS_INTERNAL)
      .doc(email);
    const subscriberInternalSnapshot = await subscriberInternalReference.get();
    const subscriberInternal = subscriberInternalSnapshot.data();
    if (!subscriberInternal) {
      return response.status(404).send('We do not have such an email address on the list.');
    }
    if (subscriberInternal.unsubscribeToken !== token) {
      return response.status(400).send('Mismatched token.');
    }
    const batch = firestore.batch();
    batch.delete(subscriberReference);
    batch.delete(subscriberInternalReference)
    decrementSubscribers(batch, newsletterReference);
    await batch.commit();
    return response.status(200).send('The email address has been removed from the subscription.')
  } catch (error) {
    console.error(error);
    return response.status(500).send(`Something wrong.`);
  }
});
