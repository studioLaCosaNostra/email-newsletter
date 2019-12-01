export type ErrorCodes = 
  | 'missing-settings'
  | 'delivery-error';

export interface NewsletterError {
  code: ErrorCodes;
  message: string;
}

export interface Newsletter {
  readonly name: string;
  readonly domain: string;
  readonly from: string;
  readonly error: NewsletterError;
  readonly subscribers: number;
  readonly sentEmails: number;
}