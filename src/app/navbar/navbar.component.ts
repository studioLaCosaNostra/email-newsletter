import { Component, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { isLoggedIn, isNotLoggedIn } from '../selectors/auth.selectors';
import { AppService } from '../services/app.service';
import { ApplicationState } from '../reducers';
import { signOutAction } from '../actions/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  isLoggedIn$ = this.store.pipe(select(isLoggedIn));
  isNotLoggedIn$ = this.store.pipe(select(isNotLoggedIn));

  constructor(private appService: AppService, private store: Store<ApplicationState>) {
  }

  signOut() {
    this.store.dispatch(signOutAction());
  }
}
