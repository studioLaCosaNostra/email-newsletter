import * as nodemailer from 'nodemailer';

import { Document } from './document';

export interface SubscribeSettings {
  readonly from: string;
  readonly subject: string;
  readonly body: Document;
  readonly confirmationUrlSignature: string;
}

export interface NewsletterSettings {
  readonly subscribe: SubscribeSettings;
  readonly transport: nodemailer.TransportOptions;
  readonly dailyLimit: number;
  readonly usedDailyLimit: number;
  readonly remainingDailyLimit: number;
  readonly messagesToDeliver: boolean;
}

export interface NewsletterSettingsUpdate {
  readonly subscribe: SubscribeSettings;
  readonly transport: any;
  readonly dailyLimit: number;
}