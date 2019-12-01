import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavbarModule } from '../navbar/navbar.module';
import { NavbarNewsletterModule } from '../navbar-newsletter/navbar-newsletter.module';
import { NewsletterMessagesComponent } from './newsletter-messages.component';
import { NewsletterMessagesRoutingModule } from './newsletter-messages-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NewsletterMessagesComponent],
  imports: [
    CommonModule,
    NewsletterMessagesRoutingModule,
    NavbarModule,
    NavbarNewsletterModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    SharedModule
  ]
})
export class NewsletterMessagesModule { }
