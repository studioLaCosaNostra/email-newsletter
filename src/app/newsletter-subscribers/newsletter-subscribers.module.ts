import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsletterSubscribersRoutingModule } from './newsletter-subscribers-routing.module';
import { NewsletterSubscribersComponent } from './newsletter-subscribers.component';
import { NavbarModule } from '../navbar/navbar.module';
import { NavbarNewsletterModule } from '../navbar-newsletter/navbar-newsletter.module';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NewsletterSubscribersComponent],
  imports: [
    CommonModule,
    NewsletterSubscribersRoutingModule,
    NavbarModule,
    NavbarNewsletterModule,
    MatCardModule,
    SharedModule
  ]
})
export class NewsletterSubscribersModule { }
