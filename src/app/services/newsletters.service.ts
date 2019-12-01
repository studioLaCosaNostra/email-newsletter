import 'firebase/functions';

import * as firebase from 'firebase/app';
import * as uuid from 'uuid/v4';

import { CollectionReference, DocumentReference, Query, loadFirestore } from '../firestore-helpers';
import {
  DELIVERY,
  MESSAGES,
  NEWSLETTERS,
  NEWSLETTER_INVITATIONS,
  NEWSLETTER_ROLES,
  NEWSLETTER_SETTINGS,
  SUBSCRIBERS,
  USER_ROLE
} from 'functions/src/constants';
import { Observable, combineLatest, forkJoin, from, pipe } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { AppService } from './app.service';
import { ApplicationState } from '../reducers';
import { Delivery } from 'functions/src/interfaces/delivery';
import { DeliveryStatus } from 'functions/src/enums/delivery-status';
import { Injectable } from '@angular/core';
import { Message } from 'functions/src/interfaces/message';
import { MessageUpdate } from '../interfaces/message-update';
import { NewsletterSettings } from 'functions/src/interfaces/newsletter-settings';
import { selectUser } from '../selectors/auth.selectors';
import { truthy } from '../operators';
import { withId } from '../selectors/newsletters.selectors';

const getNewsletterDocumentReference = (id: string) => {
  return loadFirestore().pipe(
    map(db => db.collection(NEWSLETTERS).doc(id))
  );
};

const getMessagesCollection = (id: string) => {
  return getNewsletterDocumentReference(id).pipe(
    map(newsletterReference => newsletterReference.collection(MESSAGES))
  );
};

const getDeliveryCollection = (id: string) => {
  return getNewsletterDocumentReference(id).pipe(
    map(newsletterReference => newsletterReference.collection(DELIVERY))
  );
};

const getNewsletterSettingsDoc = (id: string) => {
  return loadFirestore().pipe(
    map(db => db.collection(NEWSLETTER_SETTINGS).doc(id))
  );
};

function getUserRolesByUID(uid: string) {
  return loadFirestore().pipe(
    map(db => db.collectionGroup(USER_ROLE).where('uid', '==', uid))
  );
}

function getUsersRolesByNewsletterID(newsletterId: string) {
  return loadFirestore().pipe(
    map(db => db.collectionGroup(USER_ROLE)
      .where('newsletterId', '==', newsletterId))
  );
}

function setUserRole({ newsletterId, uid, email, newsletter, role }): Observable<void> {
  return loadFirestore().pipe(
    switchMap(db => db.collection(NEWSLETTER_ROLES)
      .doc(`${newsletterId}/${USER_ROLE}/${uid}`)
      .set({
        uid,
        email,
        newsletterId,
        newsletter,
        role
      })
    )
  );
}

function getNewsletterInvitedUsers(newsletterId: string) {
  return loadFirestore().pipe(
    map(db => db.collection(NEWSLETTER_INVITATIONS)
      .where('newsletterId', '==', newsletterId))
  );
}

function deleteDocumentWithEmail(email: string) {
  return pipe(
    map((query: firebase.firestore.Query) => query.where('email', '==', email)),
    switchMap(query => query.get()),
    switchMap(async querySnapshot => {
      for (const userRoleSnapshot of querySnapshot.docs) {
        await userRoleSnapshot.ref.delete();
      }
    })
  );
}

@Injectable({
  providedIn: 'root'
})
export class NewslettersService {
  constructor(private appService: AppService, private store: Store<ApplicationState>) {
  }

  getUserRoles(): Observable<Query> {
    return this.store.pipe(
      select(selectUser),
      truthy(),
      map(user => user.uid),
      switchMap(uid => getUserRolesByUID(uid))
    );
  }

  setUserRole({ email, newsletterId, role }): Observable<firebase.functions.HttpsCallableResult> {
    const setUserRoleFn = firebase.functions().httpsCallable('setUserRoleFunction');
    return from(setUserRoleFn({ email, newsletterId, role }));
  }

  deleteUserRole({ newsletterId, email }) {
    const deleteByEmail = deleteDocumentWithEmail(email);
    return forkJoin([
      getUsersRolesByNewsletterID(newsletterId).pipe(deleteByEmail),
      getNewsletterInvitedUsers(newsletterId).pipe(deleteByEmail)
    ]);
  }

  createNewsletter({ name, settings }) {
    const newsletterId = uuid();
    const db$ = loadFirestore();
    const user$ = this.store.pipe(
      select(selectUser),
      map(({ uid, email }) => ({ uid, email }))
    );
    return user$.pipe(
      switchMap(({ uid, email }) => setUserRole({
        newsletterId,
        newsletter: name,
        uid,
        email,
        role: 'owner'
      })),
      switchMap(() => combineLatest([db$, getNewsletterDocumentReference(newsletterId), getNewsletterSettingsDoc(newsletterId)])),
      switchMap(async ([db, newsletterDocumentReference, settingsDocumentReference]) => {
        const batch = db.batch();
        batch.set(newsletterDocumentReference, { name });
        batch.set(settingsDocumentReference, settings);
        return batch.commit();
      }),
      map(() => newsletterId)
    );
  }

  deleteNewsletter(id: string): Observable<firebase.functions.HttpsCallableResult> {
    const deleteNewsletterFn = firebase.functions().httpsCallable('deleteNewsletterFunction');
    return from(deleteNewsletterFn({ id }));
  }

  renameNewsletter(newsletterId: string, name: string): Observable<firebase.functions.HttpsCallableResult> {
    const renameNewsletterFn = firebase.functions().httpsCallable('renameNewsletterFunction');
    return from(renameNewsletterFn({ newsletterId, name }));
  }

  getNewsletter(id: string): Observable<DocumentReference> {
    return getNewsletterDocumentReference(id);
  }

  getNewsletterSubscribers(id: string): Observable<CollectionReference> {
    return getNewsletterDocumentReference(id).pipe(
      map(reference => reference.collection(SUBSCRIBERS))
    );
  }

  getNewsletterSettings(id: string): Observable<DocumentReference> {
    return loadFirestore().pipe(
      map(db => db.collection(NEWSLETTER_SETTINGS).doc(id))
    );
  }

  setNewsletterSettings(id: string, newsletterSettings: NewsletterSettings): Observable<void> {
    return this.getNewsletterSettings(id).pipe(
      switchMap((docRef) => docRef.set(newsletterSettings, { merge: true }))
    );
  }

  getNewsletterMessages(id: string): Observable<Query> {
    return getMessagesCollection(id).pipe(
      map(messagesCollectionReference => messagesCollectionReference
        .where('deleted', '==', false))
    );
  }

  getNewsletterMessage(id: string, messageId: string = uuid()) {
    return getMessagesCollection(id).pipe(
      map(collectionRef => collectionRef.doc(messageId))
    );
  }

  getNewsletterDelivery(id: string): Observable<CollectionReference> {
    return getDeliveryCollection(id);
  }

  setNewsletterMessage(id: string, messageId: string, messageUpdate: MessageUpdate): Observable<string> {
    return this.store.pipe(
      select(selectUser),
      map(user => user.uid),
      switchMap(uid => this.getNewsletterMessage(id, messageId).pipe(
        switchMap(async (docRef) => {
          if (!messageId) {
              await docRef.set({
              ...messageUpdate,
              deleted: false,
              author: uid
            });
          } else {
            await docRef.update(messageUpdate);
          }
          return docRef.id;
        })
      ))
    );
  }

  deleteNewsletterMessage(id: string, messageId: string): Observable<void> {
    return getMessagesCollection(id).pipe(
      switchMap(messagesCollectionReference => messagesCollectionReference
        .doc(messageId).update({ deleted: true }))
    );
  }

  deliverMessage(newsletterId: string, { name, subject, body: { html, text }, author }: withId<Message>) {
    const delivery: Delivery = {
      newsletterId,
      message: {
        name,
        subject,
        html,
        text,
        author
      },
      status: DeliveryStatus.Processing,
      canceled: false,
      createdAt: Date.now()
    };
    const db$ = loadFirestore();
    const newsletterReference$ = getNewsletterDocumentReference(newsletterId);
    return combineLatest([db$, newsletterReference$]).pipe(
      switchMap(([db, newsletterReference]) => {
        const batch = db.batch();
        batch.set(newsletterReference.collection(DELIVERY).doc(uuid()), delivery);
        batch.update(db.collection(NEWSLETTER_SETTINGS).doc(newsletterId), { messagesToDeliver: true });
        return batch.commit();
      })
    );
  }

  getNewsletterUsersRoles(newsletterId: string): Observable<Query> {
    return getUsersRolesByNewsletterID(newsletterId);
  }

  getNewsletterInvitedUsers(newsletterId: string): Observable<Query> {
    return getNewsletterInvitedUsers(newsletterId);
  }
}
