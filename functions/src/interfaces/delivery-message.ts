export interface DeliveryMessage {
  readonly name: string;
  readonly subject: string;
  readonly html: string;
  readonly text: string;
  readonly author: string;
}