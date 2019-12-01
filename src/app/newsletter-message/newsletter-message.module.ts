import { CommonModule } from '@angular/common';
import { ContentEditorModule } from '../content-editor/content-editor.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavbarModule } from '../navbar/navbar.module';
import { NavbarNewsletterModule } from '../navbar-newsletter/navbar-newsletter.module';
import { NewsletterMessageComponent } from './newsletter-message.component';
import { NewsletterMessageRoutingModule } from './newsletter-message-routing.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewsletterMessageComponent],
  imports: [
    CommonModule,
    NewsletterMessageRoutingModule,
    ReactiveFormsModule,
    NavbarModule,
    NavbarNewsletterModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ContentEditorModule,
    MatButtonModule
  ]
})
export class NewsletterMessageModule { }
