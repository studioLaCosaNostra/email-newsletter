import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../reducers';
import {
  watchNewsletterSettingsAction,
  setNewsletterSettingsAction,
  watchUserRolesAction,
  deleteNewsletterAction,
  renameNewsletterAction,
  watchNewsletterAction
} from '../actions/newsletters.actions';
import { tap, switchMap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { getNewsletterSettings, getNewsletterUserRole, getNewsletter } from '../selectors/newsletters.selectors';
import { NewsletterSettings } from 'functions/src/interfaces/newsletter-settings';
import { Observable } from 'rxjs';
import { truthy } from '../operators';

@Component({
  selector: 'app-newsletter-settings',
  templateUrl: './newsletter-settings.component.html',
  styleUrls: ['./newsletter-settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterSettingsComponent {
  settingsForm: FormGroup = this.formBuilder.group({
    subscribe: this.formBuilder.group({
      from: '',
      subject: '',
      body: null,
      confirmationUrlSignature: ''
    }),
    transport: '',
    dailyLimit: 50
  });

  errors: string[] = [];

  id$: Observable<string> = this.route.params.pipe(
    map(({ id }) => id)
  );

  name$ = this.id$.pipe(
    truthy(),
    tap(id => this.store.dispatch(watchNewsletterAction({ id }))),
    switchMap(id => this.store.pipe(select(getNewsletter(id)))),
    truthy(),
    map(newsletter => newsletter.name)
  );

  newsletterSettings$ = this.id$.pipe(
    truthy(),
    tap(id => this.store.dispatch(watchNewsletterSettingsAction({ id }))),
    switchMap(id => this.store.pipe(select(getNewsletterSettings(id)))),
    map((settings) => settings as NewsletterSettings),
    truthy(),
    tap(
      ({ subscribe, transport, dailyLimit }) => this.settingsForm.setValue({
        subscribe,
        transport: transport && JSON.stringify(transport, null, 2),
        dailyLimit
      })
    )
  );

  isOwner$ = this.route.params.pipe(
    tap(() => this.store.dispatch(watchUserRolesAction())),
    switchMap(({ id }) => this.store.pipe(select(getNewsletterUserRole(id)))),
    truthy(),
    map(userRole => ['owner'].some(role => role === userRole.role))
  );

  canDeleteNewsletter$ = this.isOwner$;
  canSeeUsersPermissions$ = this.isOwner$;

  constructor(
    private route: ActivatedRoute,
    private store: Store<ApplicationState>,
    private formBuilder: FormBuilder
  ) {
  }

  onSubmit(id: string, settingsForm: any) {
    this.errors = [];
    try {
      const transport = settingsForm.transport && JSON.parse(settingsForm.transport);
      this.store.dispatch(setNewsletterSettingsAction({
        id,
        newsletterSettings: {
          ...settingsForm,
          transport,
          dailyLimit: Number(settingsForm.dailyLimit)
        }
      }));
    } catch (error) {
      console.log(error);
      this.errors.push(error);
    }
  }

  onDeleteNewsletter(id: string) {
    this.store.dispatch(deleteNewsletterAction({ id }));
  }

  onRenameNewsletter(id: string, name: string) {
    this.store.dispatch(renameNewsletterAction({ id, name }));
  }
}
