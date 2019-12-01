import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { createCustomElement } from '@angular/elements';
import {
  NewsletterSubscribeFormComponent,
  NewsletterSubscribeFormModule
} from 'projects/email-newsletter/newsletter-subscribe-form/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NewsletterSubscribeFormModule
  ],
  entryComponents: [NewsletterSubscribeFormComponent]
})
export class AppModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const ngElement = createCustomElement(NewsletterSubscribeFormComponent, {
      injector: this.injector
    });
    customElements.define('newsletter-subscribe-form', ngElement);
  }
}
