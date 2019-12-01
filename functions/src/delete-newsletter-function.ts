import * as functions from 'firebase-functions';

import { NEWSLETTERS, NEWSLETTER_ROLES, NEWSLETTER_SETTINGS } from './constants';
import { mustBeLoggedError, mustBeOwnerError } from './errors';

import { deleteRecursive } from './delete-recursive';
import { isNewsletterOwner } from './is-newsletter-owner';

export const deleteNewsletterFunction = functions.https.onCall(async (data, context) => {
  const newsletterId = data.id;

  if (!context.auth) {
    throw mustBeLoggedError;
  }

  if (!(await isNewsletterOwner(newsletterId, context.auth.uid))) {
    throw mustBeOwnerError;
  }

  console.log(
    `User ${context.auth.uid} has requested to delete newsletter ${newsletterId}`
  );

  // Run a recursive delete on the given document or collection path.
  // The 'token' must be set in the functions config, and can be generated
  // at the command line by running 'firebase login:ci'.
  // $ firebase functions:config:set fb.token="1//0cQ..."
  return Promise.all([
    deleteRecursive(`${NEWSLETTERS}/${newsletterId}`),
    deleteRecursive(`${NEWSLETTER_SETTINGS}/${newsletterId}`)
  ])
  .then(() => deleteRecursive(`${NEWSLETTER_ROLES}/${newsletterId}`))
  .then(() => 'Success');
});

