import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsletterSubscribersComponent } from './newsletter-subscribers.component';
import { CanActivateAuth } from '../auth/can-activate-auth';

const routes: Routes = [{ path: '', component: NewsletterSubscribersComponent, canActivate: [CanActivateAuth] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsletterSubscribersRoutingModule { }
