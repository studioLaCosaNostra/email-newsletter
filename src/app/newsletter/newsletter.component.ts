import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../reducers';
import { watchNewsletterAction } from '../actions/newsletters.actions';
import { tap, switchMap, map } from 'rxjs/operators';
import { getNewsletter, withId } from '../selectors/newsletters.selectors';
import { Observable } from 'rxjs';
import { Newsletter } from 'functions/src/interfaces/newsletter';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterComponent {
  id$: Observable<string> = this.route.params.pipe(
    map(({ id }) => id)
  );

  newsletter$: Observable<withId<Newsletter>> = this.id$.pipe(
    tap(id => this.store.dispatch(watchNewsletterAction({ id }))),
    switchMap(id => this.store.pipe(
      select(getNewsletter(id)),
      map(newsletter => ({...newsletter, id}))
    ))
  );

  constructor(private route: ActivatedRoute, private store: Store<ApplicationState>) {}

}
