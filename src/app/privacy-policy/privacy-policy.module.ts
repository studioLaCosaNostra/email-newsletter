import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { MatCardModule } from '@angular/material/card';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [
    CommonModule,
    PrivacyPolicyRoutingModule,
    MatCardModule,
    NavbarModule
  ]
})
export class PrivacyPolicyModule { }
