import { NewsletterSettings, NewsletterSettingsUpdate } from 'functions/src/interfaces/newsletter-settings';
import { Role, UserRole } from 'functions/src/interfaces/user-role';
import { createAction, props } from '@ngrx/store';

import { Delivery } from 'functions/src/interfaces/delivery';
import { Message } from 'functions/src/interfaces/message';
import { MessageUpdate } from '../interfaces/message-update';
import { Newsletter } from 'functions/src/interfaces/newsletter';
import { UserInvitation } from 'functions/src/interfaces/user-invitation';
import { withId } from '../selectors/newsletters.selectors';

export const watchUserRolesAction = createAction('Watch user roles');

export const addUserRolesAction = createAction('Add user roles',
  props<{
    userRoles: UserRole[];
  }>()
);

export const watchNewsletterAction = createAction('Watch newsletter',
  props<{
    id: string;
  }>()
);

export const addNewsletterAction = createAction('Add newsletter',
  props<{
    id: string;
    newsletter: Newsletter;
  }>()
);

export const createNewsletterAction = createAction('Create newsletter',
  props<{
    name: string;
    settings: NewsletterSettingsUpdate
  }>()
);

export const renameNewsletterAction = createAction('Rename newsletter',
  props<{
    id: string;
    name: string;
  }>()
);

export const deleteNewsletterAction = createAction('Delete newsletter',
  props<{
    id: string;
  }>()
);

export const watchNewsletterSettingsAction = createAction('Watch newsletter settings',
  props<{
    id: string;
  }>()
);

export const addNewsletterSettingsAction = createAction('Add newsletter settings',
  props<{
    id: string;
    newsletterSettings: NewsletterSettings
  }>()
);

export const setNewsletterSettingsAction = createAction('Update newsletter settings',
  props<{
    id: string;
    newsletterSettings: NewsletterSettings
  }>()
);


export const watchNewsletterMessagesAction = createAction('Watch newsletter messages',
  props<{
    id: string;
  }>()
);

export const watchNewsletterMessageAction = createAction('Watch newsletter message',
  props<{
    id: string;
    messageId: string;
  }>()
);

export const updateNewsletterMessagesAction = createAction('Add newsletter messages',
  props<{
    id: string;
    messages: {
      [key: string]: Message;
    },
    snapshot: boolean;
  }>()
);

export const setNewsletterMessageAction = createAction('Update newsletter message',
  props<{
    id: string;
    messageId: string;
    messageUpdate: MessageUpdate
  }>()
);

export const deleteNewsletterMessageAction = createAction('Delete newsletter message',
  props<{
    id: string;
    messageId: string;
  }>()
);

export const watchNewsletterDeliveryAction = createAction('Watch newsletter delivery',
  props<{
    id: string;
  }>()
);

export const addNewsletterDeliveryAction = createAction('Add newsletter delivery',
  props<{
    id: string;
    delivery: {
      [key: string]: Delivery;
    }
  }>()
);

export const deliverMessageAction = createAction('Deliver message',
  props<{
    id: string;
    message: withId<Message>;
  }>()
);

export const watchNewsletterUsersRolesAction = createAction('Watch newsletter users roles',
  props<{
    id: string;
  }>()
);

export const addNewsletterUsersRolesAction = createAction('Add newsletter users roles',
  props<{
    id: string;
    usersRoles: {
      [key: string]: UserRole;
    }
  }>()
);

export const setUserRoleAction = createAction('Set user role',
  props<{
    id: string;
    email: string;
    role: Role | undefined;
  }>()
);

export const deleteUserRoleAction = createAction('Delete user role',
  props<{
    id: string;
    email: string;
  }>()
);

export const watchNewsletterInvitedUsersAction = createAction('Watch newsletter invited users',
  props<{
    id: string;
  }>()
);

export const updateNewsletterInvitedUsersAction = createAction('Update newsletter invited users',
  props<{
    id: string;
    invitedUsers: {
      [key: string]: UserInvitation;
    }
  }>()
);
