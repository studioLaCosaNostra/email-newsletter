import { RouterModule, Routes } from '@angular/router';

import { CanActivateAuth } from '../auth/can-activate-auth';
import { NewsletterMessagesComponent } from './newsletter-messages.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: NewsletterMessagesComponent, canActivate: [CanActivateAuth] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsletterMessagesRoutingModule { }
