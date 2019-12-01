import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsletterDeliveryDetailsComponent } from './newsletter-delivery-details.component';
import { CanActivateAuth } from '../auth/can-activate-auth';

const routes: Routes = [{ path: '', component: NewsletterDeliveryDetailsComponent, canActivate: [CanActivateAuth] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsletterDeliveryDetailsRoutingModule { }
