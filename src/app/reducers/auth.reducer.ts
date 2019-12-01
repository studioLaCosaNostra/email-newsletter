import { createReducer, on, Action } from '@ngrx/store';
import { signInSuccessAction, signOutSuccessAction, signInErrorAction, signInLoadedAction } from '../actions/auth.actions';

export interface User {
  uid: string;
  displayName: string;
  email: string;
}

export interface AuthState {
  user: User;
  error: any;
  loading: boolean;
}

const initalState: AuthState = {
  user: null,
  error: null,
  loading: true
};

const authReducer = createReducer(
  initalState,
  on(signInSuccessAction, (state, { user }) => ({ ...state, user, error: null, loading: false })),
  on(signInErrorAction, (state, { error }) => ({ ...state, error, loading: false })),
  on(signOutSuccessAction, state => ({ ...state, user: null, error: null, loading: false })),
  on(signInLoadedAction, state => ({ ...state, loading: false }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
