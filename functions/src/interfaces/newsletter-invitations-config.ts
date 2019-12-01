import * as nodemailer from 'nodemailer';

export interface NewsletterInvitationsConfig {
  transport: nodemailer.TransportOptions;
  from: string;
}