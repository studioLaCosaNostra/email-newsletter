import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsletterComponent } from './newsletter.component';
import { CanActivateAuth } from '../auth/can-activate-auth';

const routes: Routes = [{ path: '', component: NewsletterComponent, canActivate: [CanActivateAuth] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsletterRoutingModule { }
