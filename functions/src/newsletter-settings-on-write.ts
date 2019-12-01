import * as functions from 'firebase-functions';

import { NEWSLETTER_SETTINGS } from "./constants";
import { NewsletterSettings } from "./interfaces/newsletter-settings";

export const newsletterSettingsOnWrite = functions.firestore
  .document(`${NEWSLETTER_SETTINGS}/{newsletterId}`)
  .onWrite((change) => {
    const after = change.after.exists ? change.after.data() as NewsletterSettings : null;
    if (!after) { // Document is deleted
      return null;
    }
    const before = change.before.exists ? change.before.data() as NewsletterSettings : null;
    if (!before) { // Document is created
      return change.after.ref.update({
        usedDailyLimit: 0,
        remainingDailyLimit: after.dailyLimit
      });
    }
    // Document is deleted
    if (before.dailyLimit === after.dailyLimit) {
      return null;
    }
    const usedDailyLimit = (before.usedDailyLimit || 0);
    const remainingDailyLimit = after.dailyLimit - usedDailyLimit;
    return change.after.ref.update({
      usedDailyLimit,
      remainingDailyLimit: remainingDailyLimit < 0 ? 0 : remainingDailyLimit
    });
  });
