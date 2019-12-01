import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsletterSettingsComponent } from './newsletter-settings.component';
import { CanActivateAuth } from '../auth/can-activate-auth';

const routes: Routes = [{ path: '', component: NewsletterSettingsComponent, canActivate: [CanActivateAuth] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsletterSettingsRoutingModule { }
