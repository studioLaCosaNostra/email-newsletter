import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomepageComponent } from './homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NavbarModule } from '../navbar/navbar.module';
import { NewNewsletterButtonModule } from '../new-newsletter-button/new-newsletter-button.module';
import { NewsletterSubscribeFormModule } from 'projects/email-newsletter/newsletter-subscribe-form/src/public-api';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    NavbarModule,
    NewsletterSubscribeFormModule,
    MatCardModule,
    MatIconModule,
    NewNewsletterButtonModule,
    FlexLayoutModule,
    MatButtonModule,
    SharedModule
  ]
})
export class HomepageModule { }
