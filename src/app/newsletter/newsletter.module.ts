import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsletterRoutingModule } from './newsletter-routing.module';
import { NewsletterComponent } from './newsletter.component';
import { NavbarModule } from '../navbar/navbar.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarNewsletterModule } from '../navbar-newsletter/navbar-newsletter.module';

@NgModule({
  declarations: [NewsletterComponent],
  imports: [
    CommonModule,
    NewsletterRoutingModule,
    NavbarModule,
    MatButtonModule,
    MatCardModule,
    NavbarNewsletterModule
  ]
})
export class NewsletterModule { }
