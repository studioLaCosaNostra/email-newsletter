import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../reducers';
import { getUserRoles } from '../selectors/newsletters.selectors';
import { watchUserRolesAction } from '../actions/newsletters.actions';
import { truthy } from '../operators';

@Component({
  selector: 'app-newsletters',
  templateUrl: './newsletters.component.html',
  styleUrls: ['./newsletters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewslettersComponent {
  userRoles$ = this.store.pipe(
    select(getUserRoles),
    truthy()
  );

  constructor(private store: Store<ApplicationState>) {
    this.store.dispatch(watchUserRolesAction());
  }
}
