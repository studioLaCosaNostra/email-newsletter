import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewNewsletterRoutingModule } from './new-newsletter-routing.module';
import { NewNewsletterComponent } from './new-newsletter.component';
import { NavbarModule } from '../navbar/navbar.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [NewNewsletterComponent],
  imports: [
    CommonModule,
    NewNewsletterRoutingModule,
    NavbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule
  ]
})
export class NewNewsletterModule { }
