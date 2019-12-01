import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { changeOwnerRoleError, invalidOwnerRoleWhenInvitingError, invalidRoleError, mustBeLoggedError, mustBeOwnerError } from './errors';

import { Newsletter } from './interfaces/newsletter';
import { SetUserRoleData } from './set-user-role-data';
import { changeOwner } from './change-owner';
import { getNewsletterReference } from './get-newsletter-reference';
import { inviteUser } from './invite-user';
import { isEmailIsOwnerEmail } from './is-email-is-owner-email';
import { isNewsletterOwner } from './is-newsletter-owner';
import { isValidRole } from './is-valid-role';
import { setUserRole } from './interfaces/set-user-role';

export const setUserRoleFunction = functions.https.onCall(async (data: SetUserRoleData, context) => {
  const { newsletterId, email, role } = data;

  if (!context.auth) {
    throw mustBeLoggedError;
  }

  const { uid: ownerUID } = context.auth;

  if (!await isNewsletterOwner(newsletterId, ownerUID)) {
    throw mustBeOwnerError;
  }

  if (await isEmailIsOwnerEmail(ownerUID, email)) {
    throw changeOwnerRoleError;
  }

  if (!isValidRole(role)) {
    throw invalidRoleError;
  }

  console.log(
    `User ${ownerUID} has requested to change user role ${email} => ${role} in ${newsletterId}`
  );

  const db = admin.firestore();
  const newsletterSnapshot = await getNewsletterReference(db, newsletterId).get();
  const { name } = newsletterSnapshot.data() as Newsletter;

  try {
    const { uid: userUID } = await admin.auth().getUserByEmail(email);
    if (role === 'owner') {
      await changeOwner(db, newsletterId, name, ownerUID, userUID, email);
    } else {
      await setUserRole(db, email, userUID, newsletterId, name, role);
    }
    return `Success`;
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      if (role === 'owner') {
        throw invalidOwnerRoleWhenInvitingError;
      }
      await inviteUser(db, ownerUID, name, email, newsletterId, role);
      return `An invitation was sent to ${email}`;
    } else {
      throw error;
    }
  }
});

