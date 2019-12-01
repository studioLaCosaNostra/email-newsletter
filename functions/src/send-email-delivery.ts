import { NewsletterSettings } from './interfaces/newsletter-settings';
import { Delivery } from './interfaces/delivery';
import { NewsletterSubscriber } from './interfaces/newsletter-subscriber';
import { NewsletterSubscriberInternal } from './interfaces/newsletter-subscriber-internal';
import { sendMail } from './send-email';
import { injectUnsubscribeUrl } from './inject-unsubscribe-url';

export async function sendEmailDelivery(
  { transport, subscribe: { from } }: NewsletterSettings,
  { message: { subject, text, html }, newsletterId }: Delivery,
  { email }: NewsletterSubscriber,
  { unsubscribeToken }: NewsletterSubscriberInternal
) {
  const injectUnsubscribeUrlToMessage = injectUnsubscribeUrl(
    newsletterId,
    email,
    unsubscribeToken
  );
  await sendMail(transport ,{
    from,
    to: email,
    subject,
    text: injectUnsubscribeUrlToMessage(text),
    html: injectUnsubscribeUrlToMessage(html)
  });
}
