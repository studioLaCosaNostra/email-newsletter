import { MonoTypeOperatorFunction, OperatorFunction, throwError } from "rxjs";
import { filter, switchMap, catchError } from 'rxjs/operators';
import { onSnapshot, SnapshotType } from './firestore-helpers';

export function truthy<T>(): MonoTypeOperatorFunction<T> {
  return input$ => input$.pipe(filter(value => Boolean(value)));
}

export function snapshotChange<T>(debug?: string): OperatorFunction<T, SnapshotType<T>>  {
  return input$ => input$.pipe(
    switchMap((query: T) => onSnapshot(query)),
    catchError(error => {
      if (debug) {
        console.error(debug);
      }
      return throwError(error);
    }),
  );
}
