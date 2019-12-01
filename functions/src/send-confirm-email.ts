import { NewsletterSettings } from './interfaces/newsletter-settings';
import { getNewsletterSettingsSnapshot } from './get-newsletter-settings-snapshot';
import { injectConfirmUrl } from './inject-confirmation-url';

import * as nodemailer from 'nodemailer';
import { validateSettings } from './validateTransport';

export async function sendConfirmEmail(db: FirebaseFirestore.Firestore, newsletterId: string, email: string, confirmationToken: string) {
  const newsletterSettings = (await getNewsletterSettingsSnapshot(db, newsletterId)).data() as NewsletterSettings;
  await validateSettings(db, newsletterId, newsletterSettings);
  const { from, subject, body: { text, html }, confirmationUrlSignature } = newsletterSettings.subscribe;
  const transporter = nodemailer.createTransport(newsletterSettings.transport);
  const injectConfirmUrlToMessage = injectConfirmUrl(newsletterId, email, confirmationUrlSignature, confirmationToken);
  await transporter.sendMail({
    from,
    to: email,
    subject,
    text: injectConfirmUrlToMessage(text),
    html: injectConfirmUrlToMessage(html)
  });
}
