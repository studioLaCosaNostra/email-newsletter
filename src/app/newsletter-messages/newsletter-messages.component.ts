import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, asyncScheduler } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { deleteNewsletterMessageAction, deliverMessageAction, watchNewsletterMessagesAction } from '../actions/newsletters.actions';
import { getNewsletterMessages, withId } from '../selectors/newsletters.selectors';
import { map, switchMap, tap, throttleTime } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { ApplicationState } from '../reducers';
import { Message } from 'functions/src/interfaces/message';
import { truthy } from '../operators';

@Component({
  selector: 'app-newsletter-messages',
  templateUrl: './newsletter-messages.component.html',
  styleUrls: ['./newsletter-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterMessagesComponent {

  id$: Observable<string> = this.route.params.pipe(
    map(({ id }) => id)
  );

  messages$ = this.id$.pipe(
    tap(id => this.store.dispatch(watchNewsletterMessagesAction({ id }))),
    switchMap(id => this.store.pipe(select(getNewsletterMessages(id)))),
    truthy(),
    // https://stackoverflow.com/questions/55130781/debouncetime-only-after-first-value
    throttleTime(500, asyncScheduler, { leading: true, trailing: true }) // onSnapshot return not full collection
  );

  constructor(
    private route: ActivatedRoute,
    private store: Store<ApplicationState>
  ) {
  }

  onDeliver(id: string, message: withId<Message>) {
    this.store.dispatch(deliverMessageAction({ id, message }));
  }

  onDelete(id: string, messageId: string) {
    this.store.dispatch(deleteNewsletterMessageAction({ id, messageId }));
  }

  trackByMessageId(_, item: withId<Message>) {
    return item.id;
  }

}
