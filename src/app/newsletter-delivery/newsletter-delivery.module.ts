import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsletterDeliveryRoutingModule } from './newsletter-delivery-routing.module';
import { NewsletterDeliveryComponent } from './newsletter-delivery.component';
import { NavbarModule } from '../navbar/navbar.module';
import { NavbarNewsletterModule } from '../navbar-newsletter/navbar-newsletter.module';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [NewsletterDeliveryComponent],
  imports: [
    CommonModule,
    NewsletterDeliveryRoutingModule,
    NavbarModule,
    NavbarNewsletterModule,
    MatCardModule,
    SharedModule,
    MatButtonModule
  ]
})
export class NewsletterDeliveryModule { }
