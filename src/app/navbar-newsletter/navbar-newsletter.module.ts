import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarNewsletterComponent } from './navbar-newsletter/navbar-newsletter.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [NavbarNewsletterComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [NavbarNewsletterComponent]
})
export class NavbarNewsletterModule { }
