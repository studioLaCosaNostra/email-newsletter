import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { reducer as authReducer, AuthState } from './auth.reducer';
import { reducer as newslettersReducer, NewslettersState } from './newsletters.reducer';

export interface ApplicationState {
  auth: AuthState;
  newsletters: NewslettersState;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  auth: authReducer,
  newsletters: newslettersReducer
};


export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production ? [] : [];
