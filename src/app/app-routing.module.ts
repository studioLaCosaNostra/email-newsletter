// tslint:disable: max-line-length

import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'newsletters', loadChildren: () => import('./newsletters/newsletters.module').then(m => m.NewslettersModule) },
  { path: 'newsletters/new', loadChildren: () => import('./new-newsletter/new-newsletter.module').then(m => m.NewNewsletterModule) },
  { path: 'newsletters/:id', loadChildren: () => import('./newsletter/newsletter.module').then(m => m.NewsletterModule) },
  { path: 'newsletters/:id/settings', loadChildren: () => import('./newsletter-settings/newsletter-settings.module').then(m => m.NewsletterSettingsModule) },
  { path: 'newsletters/:id/subscribers', loadChildren: () => import('./newsletter-subscribers/newsletter-subscribers.module').then(m => m.NewsletterSubscribersModule) },
  { path: 'newsletters/:id/messages', loadChildren: () => import('./newsletter-messages/newsletter-messages.module').then(m => m.NewsletterMessagesModule) },
  { path: 'newsletters/:id/messages/new', loadChildren: () => import('./newsletter-message/newsletter-message.module').then(m => m.NewsletterMessageModule) },
  { path: 'newsletters/:id/messages/:messageId', loadChildren: () => import('./newsletter-message/newsletter-message.module').then(m => m.NewsletterMessageModule) },
  { path: 'newsletters/:id/delivery', loadChildren: () => import('./newsletter-delivery/newsletter-delivery.module').then(m => m.NewsletterDeliveryModule) },
  { path: 'newsletters/:id/delivery/:deliveryId', loadChildren: () => import('./newsletter-delivery-details/newsletter-delivery-details.module').then(m => m.NewsletterDeliveryDetailsModule) },
  { path: 'privacy-policy', loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled' // angular universal prerender flickering fix
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
