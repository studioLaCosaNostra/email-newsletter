import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NavbarModule } from '../navbar/navbar.module';
import { NavbarNewsletterModule } from '../navbar-newsletter/navbar-newsletter.module';
import { NewsletterDeliveryDetailsComponent } from './newsletter-delivery-details.component';
import { NewsletterDeliveryDetailsRoutingModule } from './newsletter-delivery-details-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NewsletterDeliveryDetailsComponent],
  imports: [
    CommonModule,
    NewsletterDeliveryDetailsRoutingModule,
    NavbarModule,
    NavbarNewsletterModule,
    SharedModule,
    MatCardModule
  ]
})
export class NewsletterDeliveryDetailsModule { }
