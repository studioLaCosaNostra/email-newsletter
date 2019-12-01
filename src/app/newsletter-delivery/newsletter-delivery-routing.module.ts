import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsletterDeliveryComponent } from './newsletter-delivery.component';

const routes: Routes = [{ path: '', component: NewsletterDeliveryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsletterDeliveryRoutingModule { }
