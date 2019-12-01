import { props, createAction } from '@ngrx/store';
import { NewsletterSubscriber } from 'functions/src/interfaces/newsletter-subscriber';

export const watchNewsletterSubscribersAction = createAction('Watch newsletter subscribers',
  props<{
    id: string;
  }>()
);

export const addNewsletterSubscribersAction = createAction('Add newsletter subscribers',
  props<{
    id: string;
    newsletterSubscribers: NewsletterSubscriber[]
  }>()
);
