import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map, tap, switchMap } from 'rxjs/operators';
import { watchUserRolesAction } from 'src/app/actions/newsletters.actions';
import { select, Store } from '@ngrx/store';
import { getNewsletterUserRole } from 'src/app/selectors/newsletters.selectors';
import { ActivatedRoute } from '@angular/router';
import { ApplicationState } from 'src/app/reducers';
import { truthy } from 'src/app/operators';

@Component({
  selector: 'app-navbar-newsletter',
  templateUrl: './navbar-newsletter.component.html',
  styleUrls: ['./navbar-newsletter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarNewsletterComponent {

  id$ = this.route.params.pipe(
    map(({ id }) => id)
  );

  isOwnerOrAdmin$ = this.id$.pipe(
    tap(() => this.store.dispatch(watchUserRolesAction())),
    switchMap(id => this.store.pipe(select(getNewsletterUserRole(id)))),
    truthy(),
    map(userRole => ['owner', 'admin'].some(role => role === userRole.role))
  );

  canGoToSettings$ = this.isOwnerOrAdmin$;

  canGoToSubscribers$ = this.isOwnerOrAdmin$;

  constructor(private route: ActivatedRoute, private store: Store<ApplicationState>) {}

}
