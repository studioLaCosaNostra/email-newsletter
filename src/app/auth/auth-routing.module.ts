import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { CanActivateAuthPage } from './can-activate-auth-page';

const routes: Routes = [{ path: '', component: AuthComponent, canActivate: [CanActivateAuthPage] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanActivateAuthPage]
})
export class AuthRoutingModule { }
