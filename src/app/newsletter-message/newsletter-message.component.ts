import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { setNewsletterMessageAction, watchNewsletterMessageAction } from '../actions/newsletters.actions';

import { ActivatedRoute } from '@angular/router';
import { ApplicationState } from '../reducers';
import { MessageUpdate } from '../interfaces/message-update';
import { generateInitialDocumentSnapshot } from '../content-editor/generate-initial-document-snapshot';
import { getNewsletterMessage } from '../selectors/newsletters.selectors';
import { initialMessageHTML } from './constants';
import { truthy } from '../operators';

@Component({
  selector: 'app-newsletter-message',
  templateUrl: './newsletter-message.component.html',
  styleUrls: ['./newsletter-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterMessageComponent implements OnInit, OnDestroy {
  messageForm: FormGroup = this.formBuilder.group({
    name: '',
    subject: '',
    body: null
  });

  id$: Observable<string> = this.route.params.pipe(
    map(({ id }) => id)
  );

  messageId$: Observable<string> = this.route.params.pipe(
    map(({ messageId }) => messageId)
  );

  message$ = this.route.params.pipe(
    tap(async ({ messageId }) => {
      if (!messageId) {
        const body = await generateInitialDocumentSnapshot(initialMessageHTML, 'html');
        this.messageForm.setValue({
          name: 'Example name',
          subject: 'Example subject',
          body
        }, { emitEvent: false });
      }
    }),
    filter(({ id, messageId }) => Boolean(id) && Boolean(messageId)),
    tap(({ id, messageId }) => this.store.dispatch(watchNewsletterMessageAction({ id, messageId }))),
    switchMap(({ id, messageId }) => this.store.pipe(select(getNewsletterMessage(id, messageId)))),
    truthy(),
    tap(
      ({ name, subject, body }) => {
        this.messageForm.setValue({
          name,
          subject,
          body
        }, { emitEvent: false });
    })
  );

  messageFormChangeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<ApplicationState>,
    private formBuilder: FormBuilder
  ) { }

  onSubmit(messageInfo, { name, subject, body }) {
    const { id, messageId } = messageInfo;
    const messageUpdate: MessageUpdate  = {
      name,
      subject,
      body,
      updatedAt: Date.now()
    };
    this.store.dispatch(setNewsletterMessageAction({
      id,
      messageId,
      messageUpdate
    }));
  }

  ngOnInit() {
    this.messageFormChangeSubscription = combineLatest([
      this.id$,
      this.messageId$,
      this.messageForm.valueChanges,
    ])
    .pipe(
      debounceTime(1000),
    )
    .subscribe(([id, messageId, form]) => {
      if (messageId) {
        this.onSubmit({ id, messageId }, form);
      }
    });
  }

  ngOnDestroy() {
    this.messageFormChangeSubscription.unsubscribe();
  }
}
