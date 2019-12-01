import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { identicalNameError, mustBeLoggedError, mustBeOwnerError } from './errors';

import { NEWSLETTERS } from './constants';
import { Newsletter } from './interfaces/newsletter';
import { RenameNewsletterData } from './interfaces/rename-newsletter-data';
import { isNewsletterOwner } from './is-newsletter-owner';
import { renameNewsletterInUserRoles } from './rename-newsletter-in-user-roles';

export const renameNewsletterFunction = functions.https.onCall(async (data: RenameNewsletterData, context) => {
  const { newsletterId, name } = data;

  if (!context.auth) {
    throw mustBeLoggedError;
  }

  if (!await isNewsletterOwner(newsletterId, context.auth.uid)) {
    throw mustBeOwnerError;
  }

  console.log(
    `User ${context.auth.uid} has requested to rename newsletter ${newsletterId}`
  );

  const db = admin.firestore();
  
  const newsletterRef = db.collection(NEWSLETTERS).doc(newsletterId);
  const newsletter = (await newsletterRef.get()).data() as Newsletter;
  
  if (newsletter.name === name) {
    throw identicalNameError;
  }
  
  return db.runTransaction(async (transaction) => {
    await renameNewsletterInUserRoles(db, transaction, newsletterId, name)
    transaction.update(newsletterRef, { name });
  });
});
