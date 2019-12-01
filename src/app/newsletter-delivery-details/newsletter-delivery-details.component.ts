import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../reducers';
import { map, filter, tap, switchMap } from 'rxjs/operators';
import { watchNewsletterDeliveryAction } from '../actions/newsletters.actions';
import { getNewsletterDeliveryDetails } from '../selectors/newsletters.selectors';
import { truthy } from '../operators';

@Component({
  selector: 'app-newsletter-delivery-details',
  templateUrl: './newsletter-delivery-details.component.html',
  styleUrls: ['./newsletter-delivery-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NewsletterDeliveryDetailsComponent {

  deliveryId$: Observable<string> = this.route.params.pipe(
    map(({ deliveryId }) => deliveryId)
  );

  deliveryDetails$ = this.route.params.pipe(
    filter(({ id, deliveryId }) => Boolean(id) && Boolean(deliveryId)),
    tap(({ id }) => this.store.dispatch(watchNewsletterDeliveryAction({ id }))),
    switchMap(({ id, deliveryId }) => this.store.pipe(select(getNewsletterDeliveryDetails(id, deliveryId)))),
    truthy(),
  );

  constructor(
    private route: ActivatedRoute,
    private store: Store<ApplicationState>
  ) { }


}
