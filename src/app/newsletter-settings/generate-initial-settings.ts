import { NewsletterSettingsUpdate } from 'functions/src/interfaces/newsletter-settings';
import { generateInitialDocumentSnapshot } from '../content-editor/generate-initial-document-snapshot';
import { initialSubscribeText, transport } from './constants';

export async function generateInitalSettingsUpdate() {
  const initialSettings: NewsletterSettingsUpdate = {
    subscribe: {
      from: 'example@example.com',
      subject: 'Awesome newsletter',
      body: await generateInitialDocumentSnapshot(initialSubscribeText),
      confirmationUrlSignature: '{{confirmationUrl}}'
    },
    transport,
    dailyLimit: 50
  };
  return initialSettings;
}
