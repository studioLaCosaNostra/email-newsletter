import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewNewsletterComponent } from './new-newsletter.component';
import { CanActivateAuth } from '../auth/can-activate-auth';


const routes: Routes = [{ path: '', component: NewNewsletterComponent, canActivate: [CanActivateAuth] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewNewsletterRoutingModule { }
