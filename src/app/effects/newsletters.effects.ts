import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, merge } from 'rxjs';
import {
  addNewsletterAction,
  addNewsletterDeliveryAction,
  addNewsletterSettingsAction,
  addNewsletterUsersRolesAction,
  addUserRolesAction,
  createNewsletterAction,
  deleteNewsletterAction,
  deleteNewsletterMessageAction,
  deleteUserRoleAction,
  deliverMessageAction,
  renameNewsletterAction,
  setNewsletterMessageAction,
  setNewsletterSettingsAction,
  setUserRoleAction,
  updateNewsletterInvitedUsersAction,
  updateNewsletterMessagesAction,
  watchNewsletterAction,
  watchNewsletterDeliveryAction,
  watchNewsletterInvitedUsersAction,
  watchNewsletterMessageAction,
  watchNewsletterMessagesAction,
  watchNewsletterSettingsAction,
  watchNewsletterUsersRolesAction,
  watchUserRolesAction
} from '../actions/newsletters.actions';
import { addNewsletterSubscribersAction, watchNewsletterSubscribersAction } from '../actions/subscribers.actions';
import {
  catchError,
  filter,
  map,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

import { Delivery } from 'functions/src/interfaces/delivery';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from 'functions/src/interfaces/message';
import { Newsletter } from 'functions/src/interfaces/newsletter';
import { NewsletterSettings } from 'functions/src/interfaces/newsletter-settings';
import { NewsletterSubscriber } from 'functions/src/interfaces/newsletter-subscriber';
import { NewslettersService } from '../services/newsletters.service';
import { Router } from '@angular/router';
import { UserInvitation } from 'functions/src/interfaces/user-invitation';
import { UserRole } from 'functions/src/interfaces/user-role';
import { signOutAction } from '../actions/auth.actions';
import { snapshotChange } from '../operators';

type HttpsCallableResult = firebase.functions.HttpsCallableResult;

function reduceToIdMap<T>(querySnapshot: firebase.firestore.QuerySnapshot): { [key: string]: T } {
  return querySnapshot.docs
    .map(snapshot => {
      const data = snapshot.data() as T;
      return {
        [snapshot.id]: data
      };
    })
    .reduce((previous, current) => ({
      ...previous,
      ...current
    }), {});
}

@Injectable()
export class NewslettersEffects {

  errorHandler = catchError(error => {
    console.error(error);
    this.snackBar.open(error.message, 'close', {
      duration: 5000,
    });
    return EMPTY;
  });

  @Effect()
  watchUserRoles$ = this.actions$.pipe(
    ofType(watchUserRolesAction),
    switchMap(() =>
      this.newslettersService.getUserRoles().pipe(
        snapshotChange('watchUserRoles'),
        map((querySnapshot) => {
          const userRoles: UserRole[] = querySnapshot.docs
            .map(snapshot => snapshot.data() as UserRole);
          return addUserRolesAction({ userRoles });
        }),
        takeUntil(
          this.actions$.pipe(
            ofType(signOutAction)
          )
        )
      )
    )
  );

  @Effect({ dispatch: false })
  createNewsletter$ = this.actions$.pipe(
    ofType(createNewsletterAction),
    switchMap(({ name, settings }) => this.newslettersService.createNewsletter({ name, settings }).pipe(
        this.notifyTap('createNewsletter'),
        tap((id) => this.router.navigate(['/newsletters', id, 'settings'])),
        this.errorHandler
      )
    )
  );

  @Effect()
  watchNewsletter$ = this.actions$.pipe(
    ofType(watchNewsletterAction),
    tap(({ id }) => console.log('watch newsletter', id)),
    switchMap(({ id }) =>
      this.newslettersService.getNewsletter(id).pipe(
        snapshotChange('watchNewsletter'),
        map(snapshot => snapshot.data() as Newsletter),
        map(newsletter => addNewsletterAction({ id, newsletter })),
        this.errorHandler,
        takeUntil(
          this.actions$.pipe(
            ofType(deleteNewsletterAction, signOutAction)
          )
        )
      )
    )
  );

  @Effect()
  watchNewsletterSettings$ = this.actions$.pipe(
    ofType(watchNewsletterSettingsAction),
    tap(({ id }) => console.log('watch newsletter settings', id)),
    switchMap(({ id }) =>
      this.newslettersService.getNewsletterSettings(id).pipe(
        snapshotChange('watchNewsletterSettings'),
        map(snapshot => snapshot.data() as NewsletterSettings),
        map(newsletterSettings => addNewsletterSettingsAction({ id, newsletterSettings })),
        this.errorHandler,
        takeUntil(
          this.actions$.pipe(
            ofType(deleteNewsletterAction, signOutAction)
          )
        )
      )
    )
  );

  @Effect({ dispatch: false })
  setNewsletterSettings$ = this.actions$.pipe(
    ofType(setNewsletterSettingsAction),
    switchMap(({ id, newsletterSettings }) =>
      this.newslettersService.setNewsletterSettings(id, newsletterSettings).pipe(
        this.notifyTap('setNewsletterSettings'),
        this.errorHandler
      )
    )
  );

  @Effect({ dispatch: false })
  deleteNewsletter$ = this.actions$.pipe(
    ofType(deleteNewsletterAction),
    switchMap(({ id }) =>
      this.newslettersService.deleteNewsletter(id).pipe(
        this.notifyTap('deleteNewsletter'),
        tap(() => this.router.navigate(['/newsletters'])),
        this.errorHandler
      )
    )
  );

  @Effect({ dispatch: false })
  renameNewsletter$ = this.actions$.pipe(
    ofType(renameNewsletterAction),
    switchMap(({ id, name }) =>
      this.newslettersService.renameNewsletter(id, name).pipe(
        this.notifyTap('renameNewsletter'),
        this.errorHandler
      )
    )
  );

  @Effect()
  watchNewsletterSubscribers$ = this.actions$.pipe(
    ofType(watchNewsletterSubscribersAction),
    tap(({ id }) => console.log('watch newsletter subscribers', id)),
    switchMap(({ id }) =>
      this.newslettersService.getNewsletterSubscribers(id).pipe(
        snapshotChange('watchNewsletterSubscribers'),
        map(querySnapshot => {
          const newsletterSubscribers: NewsletterSubscriber[] = querySnapshot.docs
            .map(snapshot => snapshot.data() as NewsletterSubscriber);
          return addNewsletterSubscribersAction({ id, newsletterSubscribers });
        }),
        takeUntil(
          this.actions$.pipe(
            ofType(deleteNewsletterAction, signOutAction)
          )
        )
      )
    )
  );

  @Effect()
  watchNewsletterMessages$ = this.actions$.pipe(
    ofType(watchNewsletterMessagesAction),
    tap(({ id }) => console.log('watch newsletter messages ', id)),
    switchMap(({ id }) =>
      this.newslettersService.getNewsletterMessages(id).pipe(
        snapshotChange('watchNewsletterMessages'),
        map(querySnapshot => {
          const messages = reduceToIdMap<Message>(querySnapshot);
          return updateNewsletterMessagesAction({ id, messages, snapshot: true });
        }),
        takeUntil(
          this.actions$.pipe(
            ofType(deleteNewsletterAction, signOutAction)
          )
        )
      )
    )
  );

  @Effect()
  watchNewsletterMessage$ = this.actions$.pipe(
    ofType(watchNewsletterMessageAction),
    switchMap(({ id, messageId }) =>
      this.newslettersService.getNewsletterMessage(id, messageId).pipe(
        snapshotChange('watchNewsletterMessage'),
        map(snapshot => snapshot.data() as Message),
        map(message => updateNewsletterMessagesAction({ id, messages: { [messageId]: message }, snapshot: false })),
        takeUntil(
          this.actions$.pipe(ofType(
            deleteNewsletterAction,
            deleteNewsletterMessageAction,
            signOutAction
          ))
        )
      )
    )
  );

  @Effect({ dispatch: false })
  setNewsletterMessage$ = this.actions$.pipe(
    ofType(setNewsletterMessageAction),
    switchMap(({ id, messageId, messageUpdate }) =>
      this.newslettersService.setNewsletterMessage(id, messageId, messageUpdate).pipe(
        tap(() => {
          if (!messageId) {
            this.router.navigate(['/newsletters', id, 'messages']);
          }
        }),
        this.errorHandler
      )
    )
  );

  @Effect()
  watchNewsletterDelivery$ = this.actions$.pipe(
    ofType(watchNewsletterDeliveryAction),
    tap(({ id }) => console.log('watch newsletter delivery ', id)),
    switchMap(({ id }) =>
      this.newslettersService.getNewsletterDelivery(id).pipe(
        snapshotChange('watchNewsletterDelivery'),
        map(querySnapshot => {
          const delivery = reduceToIdMap<Delivery>(querySnapshot);
          return addNewsletterDeliveryAction({ id, delivery });
        }),
        takeUntil(
          this.actions$.pipe(
            ofType(deleteNewsletterAction, signOutAction)
          )
        )
      )
    )
  );

  @Effect({ dispatch: false })
  deliverMessage = this.actions$.pipe(
    ofType(deliverMessageAction),
    switchMap(({ id, message }) =>
      this.newslettersService.deliverMessage(id, message).pipe(
        this.notifyTap('deliveryMessage'),
        tap(() => {
          this.router.navigate(['/newsletters', id, 'delivery']);
        }),
        this.errorHandler
      )
    )
  );

  @Effect({ dispatch: false })
  deleteNewsletterMessage$ = this.actions$.pipe(
    ofType(deleteNewsletterMessageAction),
    switchMap(({ id, messageId }) =>
      this.newslettersService.deleteNewsletterMessage(id, messageId).pipe(
        tap(() => this.router.navigate(['/newsletters', id, 'messages'])),
        this.errorHandler
      )
    )
  );

  youAreOwner$ = merge(
    this.actions$.pipe(
      ofType(deleteNewsletterAction, signOutAction)
    ),
    this.actions$.pipe(
      ofType(setUserRoleAction),
      filter(setUserRole => setUserRole.role === 'owner')
    )
  );

  @Effect()
  watchNewsletterUsersRoles$ = this.actions$.pipe(
    ofType(watchNewsletterUsersRolesAction),
    switchMap(({ id }) =>
      this.newslettersService.getNewsletterUsersRoles(id).pipe(
        snapshotChange('watchNewsletterUsersRoles'),
        map((querySnapshot) => {
          const usersRoles = reduceToIdMap<UserRole>(querySnapshot);
          return addNewsletterUsersRolesAction({ id, usersRoles });
        }),
        takeUntil(this.youAreOwner$)
      )
    )
  );

  @Effect({ dispatch: false })
  setUserRoleAction$ = this.actions$.pipe(
    ofType(setUserRoleAction),
    switchMap(({ id, email, role }) =>
      this.newslettersService.setUserRole({
        newsletterId: id,
        email,
        role
      }).pipe(
        tap((result: HttpsCallableResult) => this.notify(result.data)),
        this.errorHandler
      )
    )
  );

  @Effect()
  watchNewsletterInvitedUsers$ = this.actions$.pipe(
    ofType(watchNewsletterInvitedUsersAction),
    switchMap(({ id }) =>
      this.newslettersService.getNewsletterInvitedUsers(id).pipe(
        snapshotChange('watchNewsletterInvitedUsers'),
        map((querySnapshot) => {
          const invitedUsers = reduceToIdMap<UserInvitation>(querySnapshot);
          return updateNewsletterInvitedUsersAction({ id, invitedUsers });
        }),
        takeUntil(this.youAreOwner$)
      )
    )
  );

  @Effect({ dispatch: false })
  deleteUserRoleAction$ = this.actions$.pipe(
    ofType(deleteUserRoleAction),
    switchMap(({ id, email }) =>
      this.newslettersService.deleteUserRole({
        newsletterId: id,
        email
      }).pipe(
        this.notifyTap('deleteUserRole'),
        this.errorHandler
      )
    )
  );

  notify = (message = 'Success') => {
    this.snackBar.open(message, 'close', {
      duration: 3000,
    });
  }

  notifyTap = (log: string) => {
    return tap(() => {
      console.log(log);
      this.notify();
    });
  }

  constructor(
    private actions$: Actions,
    private newslettersService: NewslettersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
}
