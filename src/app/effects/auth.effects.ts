import * as firebase from 'firebase/app';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, from } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  signInLoadedAction,
  signInSuccessAction,
  signOutAction,
  signOutSuccessAction
} from '../actions/auth.actions';

import { ApplicationState } from '../reducers';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { User } from '../reducers/auth.reducer';

@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false })
  signInSuccess$ = this.actions$.pipe(
    ofType(signInSuccessAction),
    map(({ redirect }) => ({
      params: this.route.snapshot.queryParams,
      redirect
    })),
    tap(({ params, redirect }) => {
      this.ngZone.run(()  => {
        if (params.return) {
          this.router.navigateByUrl(params.return);
        } else if (redirect) {
          this.router.navigate(['/newsletters']);
        }
      });
    })
  );

  @Effect()
  signOut$ = this.actions$.pipe(
    ofType(signOutAction),
    mergeMap(() => from(this.authService.signOut()).pipe(
      map(() => signOutSuccessAction()),
      tap(() => this.router.navigate(['/auth'])),
      catchError(() => EMPTY)
    ))
  );
  
  async onAuthStateChanged() {
    await import('firebase/auth');
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        this.store.dispatch(signInSuccessAction({ user: user.toJSON() as User, redirect: false }));
      }
      this.store.dispatch(signInLoadedAction());
    });
  }

  constructor(
    private store: Store<ApplicationState>,
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {
    this.onAuthStateChanged();
  }
}
