import * as firebase from 'firebase/app';

import { Observable, from } from 'rxjs';

import { map } from 'rxjs/operators';

export type CollectionReference = firebase.firestore.CollectionReference;
export type QuerySnapshot = firebase.firestore.QuerySnapshot;
export type Query = firebase.firestore.Query;
export type DocumentReference = firebase.firestore.DocumentReference;
export type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export type SnapshotType<T> =
  T extends Query ? QuerySnapshot :
  T extends DocumentReference ? DocumentSnapshot :
  T extends CollectionReference ? QuerySnapshot :
  never;

export function onSnapshot<T extends any>(document: T): Observable<SnapshotType<T>> {
  return new Observable(document.onSnapshot.bind(document));
}

export function once<T>(fn: (...args: any[]) => T, context?: any) {
  let result: T;
  return function(...args: any[]) {
    if (fn) {
      result = fn.apply(context || this, args);
      fn = null;
    }
    return result;
  };
}

export const loadFirestore = once(() => {
  return from(import('firebase/firestore')).pipe(
    map(() => firebase.firestore())
  );
});


