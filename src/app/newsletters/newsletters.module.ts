import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewslettersRoutingModule } from './newsletters-routing.module';
import { NewslettersComponent } from './newsletters.component';
import { NavbarModule } from '../navbar/navbar.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewNewsletterButtonModule } from '../new-newsletter-button/new-newsletter-button.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [NewslettersComponent],
  imports: [
    CommonModule,
    NewslettersRoutingModule,
    NavbarModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    NewNewsletterButtonModule,
    SharedModule
  ]
})
export class NewslettersModule { }
