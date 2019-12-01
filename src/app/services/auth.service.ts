import * as firebase from 'firebase/app';

import { AppService } from './app.service';
import { Injectable } from '@angular/core';
import { once } from '../firestore-helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuthUI = once(async (auth: firebase.auth.Auth) => {
    const firebaseui = await import('firebaseui');
    return new firebaseui.auth.AuthUI(auth);
  });

  async ui() {
    await import('firebase/auth');
    return this.firebaseAuthUI(firebase.auth());
  }

  async signOut(): Promise<void> {
    await import('firebase/auth');
    return firebase.auth().signOut();
  }

  constructor(private appService: AppService) {}
}
