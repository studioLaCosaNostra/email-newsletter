import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map, tap, switchMap } from 'rxjs/operators';
import { watchNewsletterSubscribersAction } from '../actions/subscribers.actions';
import { Observable } from 'rxjs';
import { getNewsletterSubscribers } from '../selectors/newsletters.selectors';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ApplicationState } from '../reducers';
import { truthy } from '../operators';

@Component({
  selector: 'app-newsletter-subscribers',
  templateUrl: './newsletter-subscribers.component.html',
  styleUrls: ['./newsletter-subscribers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterSubscribersComponent {
  displayedColumns = ['email'];

  id$: Observable<string> = this.route.params.pipe(
    map(({ id }) => id)
  );

  subscribers$ = this.id$.pipe(
    tap(id => this.store.dispatch(watchNewsletterSubscribersAction({ id }))),
    switchMap(id => this.store.pipe(select(getNewsletterSubscribers(id)))),
    truthy()
  );

  constructor(private route: ActivatedRoute, private store: Store<ApplicationState>) { }


}
