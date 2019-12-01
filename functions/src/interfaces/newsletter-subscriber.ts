export interface NewsletterSubscriber {
  readonly email: string;
  readonly confirmed: boolean;
  readonly createdAt: number;
  readonly delivery: {
    readonly [key: string]: boolean;
  }
}