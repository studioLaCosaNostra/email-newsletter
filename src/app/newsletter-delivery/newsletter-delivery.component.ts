import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../reducers';
import { Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { watchNewsletterDeliveryAction } from '../actions/newsletters.actions';
import { getNewsletterDelivery } from '../selectors/newsletters.selectors';
import { truthy } from '../operators';

@Component({
  selector: 'app-newsletter-delivery',
  templateUrl: './newsletter-delivery.component.html',
  styleUrls: ['./newsletter-delivery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterDeliveryComponent {

  id$: Observable<string> = this.route.params.pipe(
    map(({ id }) => id)
  );

  delivery$ = this.id$.pipe(
    tap(id => this.store.dispatch(watchNewsletterDeliveryAction({ id }))),
    switchMap(id => this.store.pipe(select(getNewsletterDelivery(id)))),
    truthy(),
    map(delivery => delivery.sort((a, b) => b.createdAt - a.createdAt).map(deliveryDetails => ({
      ...deliveryDetails,
      createdAt: new Date(deliveryDetails.createdAt).toLocaleString()
    })))
  );

  constructor(
    private route: ActivatedRoute,
    private store: Store<ApplicationState>
  ) {}

}
