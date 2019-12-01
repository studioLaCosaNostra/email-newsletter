import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, of, Observable } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';

@Pipe({
  name: 'withLoading',
})
export class WithLoadingPipe implements PipeTransform {
  transform(value: any) {
    return isObservable(value)
    ? value.pipe(
      map((value: any) => ({ loading: false, value })),
      startWith({ loading: true }),
      catchError(error => of({ loading: false, error }))
    )
    : value;
  }
}
