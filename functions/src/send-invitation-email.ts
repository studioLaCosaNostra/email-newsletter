import * as functions from 'firebase-functions';

import { Role } from './interfaces/user-role';
import { sendMail } from './send-email';
import { NewsletterInvitationsConfig } from './interfaces/newsletter-invitations-config';

export async function sendInvitationEmail(
  ownerEmail: string,
  email: string,
  newsletterName: string,
  role: Exclude<Role, 'owner'>
) {
  const { transport, from }: NewsletterInvitationsConfig = functions.config()['newsletter-invitations'];
  await sendMail(transport, {
    from,
    to: email,
    text: `Welcome ${email},
${ownerEmail} has invited you to collaborate as a ${role} of the newsletter: ${newsletterName}.
Please go to https://email-newsletter.web.app/auth and log in as ${email} in the system.
Thank you and have a nice day.`,
    subject: `Invitation to collaborate on the "${newsletterName}" newsletter.`
  });
}
