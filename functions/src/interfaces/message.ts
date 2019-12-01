import { Document } from './document';

export interface Message {
  readonly name: string;
  readonly subject: string;
  readonly body: Document;
  readonly author: string;
}