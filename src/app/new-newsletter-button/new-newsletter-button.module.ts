import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewNewsletterButtonComponent } from './new-newsletter-button.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NewNewsletterButtonComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [NewNewsletterButtonComponent]
})
export class NewNewsletterButtonModule { }
