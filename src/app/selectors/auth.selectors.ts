import { ApplicationState } from '../reducers';

export const selectUser = (state: ApplicationState) => state.auth.user;
export const getUserDisplayName = (state: ApplicationState) => selectUser(state) && selectUser(state).displayName;
export const isLoggedIn = (state: ApplicationState) => Boolean(state.auth.user);
export const isNotLoggedIn = (state: ApplicationState) => !isLoggedIn(state);
export const selectAuthError = (state: ApplicationState) => state.auth.error;
export const isLoading = (state: ApplicationState) => state.auth.loading;
