import { Action, createReducer, on } from '@ngrx/store';
import {
  addNewsletterAction,
  addNewsletterDeliveryAction,
  addNewsletterSettingsAction,
  addNewsletterUsersRolesAction,
  addUserRolesAction,
  updateNewsletterInvitedUsersAction,
  updateNewsletterMessagesAction
} from '../actions/newsletters.actions';

import { Delivery } from 'functions/src/interfaces/delivery';
import { Message } from 'functions/src/interfaces/message';
import { Newsletter } from 'functions/src/interfaces/newsletter';
import { NewsletterSettings } from 'functions/src/interfaces/newsletter-settings';
import { NewsletterSubscriber } from 'functions/src/interfaces/newsletter-subscriber';
import { UserInvitation } from 'functions/src/interfaces/user-invitation';
import { UserRole } from 'functions/src/interfaces/user-role';
import { addNewsletterSubscribersAction } from '../actions/subscribers.actions';
import { signOutSuccessAction } from '../actions/auth.actions';

interface NewsletterIdMap<T> {
  [key: string]: {
    [key: string]: T
  };
}

export interface NewslettersState {
  userRoles: UserRole[];
  error: any;
  newsletters: { [key: string]: Newsletter };
  newsletterSettings: { [key: string]: NewsletterSettings };
  newsletterSubscribers: { [key: string]: NewsletterSubscriber[] };
  newsletterMessages: NewsletterIdMap<Message>;
  newsletterDelivery: NewsletterIdMap<Delivery>;
  newsletterUsersRoles: NewsletterIdMap<UserRole>;
  newsletterInvitedUsers: NewsletterIdMap<UserInvitation>;
}

const initalState: NewslettersState = {
  userRoles: null,
  error: null,
  newsletters: {},
  newsletterSettings: {},
  newsletterSubscribers: {},
  newsletterMessages: {},
  newsletterDelivery: {},
  newsletterUsersRoles: {},
  newsletterInvitedUsers: {}
};

const newslettersReducer = createReducer(
  initalState,
  on(addUserRolesAction, (state, { userRoles }): NewslettersState => ({...state, userRoles })),
  on(signOutSuccessAction, (state): NewslettersState => ({ ...state, newsletters: {} })),
  on(addNewsletterAction, (state, { id, newsletter }): NewslettersState => ({
    ...state,
    newsletters: {
      ...state.newsletters,
      [id]: newsletter
    }
  })),
  on(addNewsletterSettingsAction, (state, { id, newsletterSettings }): NewslettersState => ({
    ...state,
    newsletterSettings: { ...state.newsletterSettings, [id]: newsletterSettings }
  })),
  on(addNewsletterSubscribersAction, (state, { id, newsletterSubscribers }): NewslettersState => ({
    ...state,
    newsletterSubscribers: {
      ...state.newsletterSubscribers,
      [id]: newsletterSubscribers
    }
  })),
  on(updateNewsletterMessagesAction, (state, { id, messages, snapshot }) => (snapshot ? {
    ...state,
    newsletterMessages: {
      ...state.newsletterMessages,
      [id]: messages
    }
  } : {
    ...state,
    newsletterMessages: {
      ...state.newsletterMessages,
      [id]: {
        ...state.newsletterMessages[id],
        ...messages
      }
    }
  })),
  on(addNewsletterDeliveryAction, (state, { id, delivery }) => ({
    ...state,
    newsletterDelivery: {
      ...state.newsletterDelivery,
      [id]: {
        ...state.newsletterDelivery[id],
        ...delivery
      }
    }
  })),
  on(addNewsletterUsersRolesAction, (state, { id, usersRoles }) => ({
    ...state,
    newsletterUsersRoles: {
      ...state.newsletterUsersRoles,
      [id]: {
        ...usersRoles
      }
    }
  })),
  on(updateNewsletterInvitedUsersAction,  (state, { id, invitedUsers }) => ({
    ...state,
    newsletterInvitedUsers: {
      ...state.newsletterInvitedUsers,
      [id]: {
        ...invitedUsers
      }
    }
  }))
);

export function reducer(state: NewslettersState | undefined, action: Action) {
  return newslettersReducer(state, action);
}
