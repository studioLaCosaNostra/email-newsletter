import { ApplicationState } from '../reducers';
import { Message } from 'functions/src/interfaces/message';
import { NewsletterSettings } from 'functions/src/interfaces/newsletter-settings';
import { NewsletterSubscriber } from 'functions/src/interfaces/newsletter-subscriber';
import { UserRole } from 'functions/src/interfaces/user-role';

export const getUserRoles = (state: ApplicationState) => state.newsletters.userRoles;

export const getNewsletter = (id: string) => (state: ApplicationState) => state.newsletters.newsletters[id];

export const getNewsletterUserRole = (newsletterId: string) => (state: ApplicationState): UserRole =>
  state.newsletters.userRoles &&
  state.newsletters.userRoles.find(userRole => userRole.newsletterId === newsletterId);

export const getNewsletterSettings = (id: string) => (state: ApplicationState): NewsletterSettings =>
  state.newsletters.newsletterSettings[id];

export const getNewsletterSubscribers = (id: string) => (state: ApplicationState): NewsletterSubscriber[] =>
  state.newsletters.newsletterSubscribers[id];

export const getNewsletterMessage = (id: string, messageId: string) => (state: ApplicationState): Message => {
  const newsletter = state.newsletters.newsletterMessages[id];
  if (newsletter) {
    return newsletter[messageId];
  }
};

const getArrayOfPropertyValues = <T>(getNewsletterProperty: (state: ApplicationState) => { [key: string]: { [key: string]: T } }) =>
  (id: string) =>
  (state: ApplicationState): withId<T>[] => {
    const newsletter = getNewsletterProperty(state)[id];
    if (newsletter) {
      return Object.keys(newsletter).map(key => ({
        ...newsletter[key],
        id: key
      }));
    }
  };

export type withId<T> = (T & { id: string });

export const getNewsletterMessages = getArrayOfPropertyValues((state: ApplicationState) => state.newsletters.newsletterMessages);

export const getNewsletterDelivery = getArrayOfPropertyValues((state: ApplicationState) => state.newsletters.newsletterDelivery);

export const getNewsletterDeliveryDetails = (id: string, deliveryId: string) => (state: ApplicationState) => {
  const delivery = state.newsletters.newsletterDelivery[id];
  if (delivery) {
    return delivery[deliveryId];
  }
};

export const getNewsletterUsersRoles = getArrayOfPropertyValues((state: ApplicationState) => state.newsletters.newsletterUsersRoles);

export const getNewsletterInvitedUsers = getArrayOfPropertyValues((state: ApplicationState) => state.newsletters.newsletterInvitedUsers);
