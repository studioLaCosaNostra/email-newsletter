import { NgModule } from '@angular/core';
import { NewsletterSubscribeFormComponent } from './newsletter-subscribe-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { SubscribeService } from './subscribe.service';

@NgModule({
  declarations: [NewsletterSubscribeFormComponent],
  providers: [
    SubscribeService
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatCardModule,
  ],
  exports: [NewsletterSubscribeFormComponent]
})
export class NewsletterSubscribeFormModule { }
