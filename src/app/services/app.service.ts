import * as firebase from 'firebase/app';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Platform } from '@angular/cdk/platform';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { interval } from 'rxjs';
import { once } from '../firestore-helpers';

const loadFirebaseAnalytics = once(() => import('firebase/analytics'));

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
    private platform: Platform,
    private snackBar: MatSnackBar,
    private updates: SwUpdate
  ) {
    if (updates.isEnabled) {
      this.checkForUpdate();
      interval(5 * 60 * 1000)
        .subscribe(() => this.checkForUpdate());
    }
    this.watchUpdates();
    this.initFirebase();
  }

  checkForUpdate() {
    this.updates.checkForUpdate()
        .then(() => console.log('Checking for updates'))
  }

  async initFirebase() {
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebaseConfig);
      if (this.platform.isBrowser && environment.production) {
        await loadFirebaseAnalytics();
        firebase.analytics();
      }
    }
  }

  watchUpdates() {
    this.updates.available.subscribe(event => {
      console.log(event);
      const simpleSnackBar = this.snackBar.open('Update available', 'Reload', {
        duration: 5000
      });
      simpleSnackBar.onAction().subscribe(async () => {
        await this.updates.activateUpdate();
        document.location.reload();
      });
    });
  }
}
