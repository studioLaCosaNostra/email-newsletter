import { createAction, props } from '@ngrx/store';

import { User } from '../reducers/auth.reducer';

export const signInSuccessAction = createAction(
  '[Auth Page] SignIn user success',
  props<{
    user: User;
    redirect: boolean;
  }>()
);

export const signInErrorAction = createAction(
  '[Auth Page] SignIn user error',
  props<{
    error: any
  }>()
);

export const signInLoadedAction = createAction('[Auth Page] SignIn user loaded');

export const signOutAction = createAction('[Auth Page] SignOut user');
export const signOutSuccessAction = createAction('[Auth Page] SignOut user success');
