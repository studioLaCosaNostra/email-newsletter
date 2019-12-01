import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewslettersComponent } from './newsletters.component';
import { CanActivateAuth } from '../auth/can-activate-auth';

const routes: Routes = [{ path: '', component: NewslettersComponent, canActivate: [CanActivateAuth] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewslettersRoutingModule { }
