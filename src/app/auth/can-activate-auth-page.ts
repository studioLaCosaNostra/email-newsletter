import { CanActivate, Router } from '@angular/router';

import { ApplicationState } from '../reducers';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { isLoggedIn } from './is-logged-in';
import { map } from 'rxjs/operators';

@Injectable()
export class CanActivateAuthPage implements CanActivate {
  constructor(private store: Store<ApplicationState>, private router: Router) {}

  canActivate() {
    return isLoggedIn(this.store).pipe(
      map(isLogged => {
        if (isLogged) {
          return this.router.parseUrl('/newsletters');
        } else {
          return true;
        }
      })
    );
  }
}