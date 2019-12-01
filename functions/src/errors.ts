import * as functions from 'firebase-functions';

export const mustBeLoggedError = new functions.https.HttpsError(
  'permission-denied',
  'You must be logged in to perform this action.'
);

export const mustBeOwnerError = new functions.https.HttpsError(
  'permission-denied',
  'You must be the owner of the newsletter to perform this action.'
);

export const invalidRoleError = new functions.https.HttpsError(
  'invalid-argument',
  'The role must have the correct value.'
)

export const changeOwnerRoleError = new functions.https.HttpsError(
  'permission-denied',
  'The owner can only give the role to another user, there must always be the owner.'
);

export const invalidOwnerRoleWhenInvitingError = new functions.https.HttpsError(
  'permission-denied',
  'The role of the owner cannot be assigned when inviting the user to email the newsletter.'
);

export const invitationAlreadyExistsError = new functions.https.HttpsError(
  'already-exists',
  'The invitation already appears in the system.'
)

export const identicalNameError = new functions.https.HttpsError(
  'invalid-argument',
  'The name must be different from the current one.'
)