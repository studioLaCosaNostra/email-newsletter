import * as admin from 'firebase-admin';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as functions from 'firebase-functions';

import { apiV1 } from './api-v1';
import { deliverNewsletters } from './deliver-newsletters';
import { resetRemainingDailyLimits } from './reset-remaining-daily-limits';

admin.initializeApp(functions.config().firebase);
const main = express();

main.use('/api/v1', apiV1);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

export const webApi = functions.https.onRequest(main);

const scheduleRemainingDailyLimitReset = 'every day 10:00';
export const scheduledRemainingDailyLimitResetFunction = functions.pubsub.schedule(scheduleRemainingDailyLimitReset).onRun(() => {
  console.log(`Reset remaining daily limits! (${scheduleRemainingDailyLimitReset})`);
  const firestore = admin.firestore();
  return resetRemainingDailyLimits(firestore);
});

const scheduleNewslettersDelivery = 'every 1 hours';
export const scheduledNewslettersDeliveryFunction = functions.pubsub.schedule(scheduleNewslettersDelivery).onRun(() => {
  console.log(`Newsletters delivery! (${scheduleNewslettersDelivery})`);
  const firestore = admin.firestore();
  return deliverNewsletters(firestore);
});

export { deleteNewsletterFunction } from './delete-newsletter-function';
export { renameNewsletterFunction } from './rename-newsletter-function';
export { newsletterDeliveryOnCreate } from './newsletter-delivery-on-create';
export { newsletterSettingsOnWrite } from './newsletter-settings-on-write';
export { addRolesFromInvitationsOnUserCreate } from './add-roles-from-invitations-on-user-create';
export { setUserRoleFunction } from './set-user-role-function';