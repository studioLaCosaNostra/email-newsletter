
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApplicationState } from '../reducers';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { isLoggedIn } from './is-logged-in';

@Injectable({
  providedIn: 'root'
})
export class CanActivateAuth implements CanActivate {
  constructor(private store: Store<ApplicationState>, private router: Router) {}

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return isLoggedIn(this.store).pipe(
      map(isLogged => {
        if (isLogged) {
          return true;
        } else {
          this.router.navigate(['/auth'], {
            queryParams: {
              return: state.url
            }
          });
          return false;
        }
      })
    );
  }
}