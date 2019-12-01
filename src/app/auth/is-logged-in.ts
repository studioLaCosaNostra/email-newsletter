import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { isLoading, selectUser } from '../selectors/auth.selectors';
import { skipWhile, switchMap } from 'rxjs/operators';
import { ApplicationState } from '../reducers';

export function isLoggedIn(store: Store<ApplicationState>) {
  return store.pipe(
    select(isLoading),
    skipWhile(loading => loading),
    switchMap(() => store),
    select(selectUser),
    switchMap((user) => of(Boolean(user)))
  );
}
