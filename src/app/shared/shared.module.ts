import { CookieConsentComponent } from './cookie-consent/cookie-consent.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { NgxCookieConsentModule } from '@lacosanostra/ngx-cookie-consent';
import { ProgressIndicatorComponent } from './progress-indicator/progress-indicator.component';
import { RouterModule } from '@angular/router';
import { SafePipe } from './safe.pipe';
import { WithLoadingPipe } from './with-loading.pipe';

@NgModule({
  declarations: [
    WithLoadingPipe,
    ProgressIndicatorComponent,
    SafePipe,
    CookieConsentComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    FlexLayoutModule,
    NgxCookieConsentModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    WithLoadingPipe,
    ProgressIndicatorComponent,
    SafePipe,
    CookieConsentComponent
  ]
})
export class SharedModule { }
