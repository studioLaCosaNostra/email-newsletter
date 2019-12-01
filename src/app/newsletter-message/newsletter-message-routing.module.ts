import { RouterModule, Routes } from '@angular/router';

import { CanActivateAuth } from '../auth/can-activate-auth';
import { NewsletterMessageComponent } from './newsletter-message.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: NewsletterMessageComponent, canActivate: [CanActivateAuth] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsletterMessageRoutingModule { }
