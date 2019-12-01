import * as firebase from 'firebase/app';

import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { signInErrorAction, signInSuccessAction } from '../actions/auth.actions';

import { ApplicationState } from '../reducers';
import { AuthService } from '../services/auth.service';
import { Platform } from '@angular/cdk/platform';
import { map } from 'rxjs/operators';
import { selectAuthError } from '../selectors/auth.selectors';
import { truthy } from '../operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {

  error$ = this.store.pipe(
    select(selectAuthError),
    truthy(),
    map(error => error.message)
  );

  @ViewChild('firebaseuiAuthContainer', { static: true }) uiAuthContainer: ElementRef;

  constructor(
    private store: Store<ApplicationState>,
    private title: Title,
    private meta: Meta,
    private auth: AuthService,
    private platform: Platform
  ) {}

  async ngOnInit() {
    this.title.setTitle('Sign in or Create your Account Today | Email newsletter');
    this.meta.updateTag({
      name: 'description',
      content: 'Sign in with your Google account or create new account and start journey with email marketing today'
    });

    if (!this.platform.isBrowser) {
      return;
    }
    
    await import('firebase/auth');
    const uiConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      privacyPolicyUrl: () => window.location.assign('/privacy-policy'),
      callbacks: {
        signInSuccessWithAuthResult: ({ user }) => {
          this.store.dispatch(signInSuccessAction({ user: user.toJSON(), redirect: true }));
          return false;
        },
        signInFailure: (error: any) => {
          this.store.dispatch(signInErrorAction({ error }));
          return Promise.resolve();
        }
      }
    };

    const ui = await this.auth.ui();
    ui.start(this.uiAuthContainer.nativeElement, uiConfig);
  }

}
