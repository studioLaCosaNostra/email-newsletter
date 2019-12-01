import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsletterSettingsRoutingModule } from './newsletter-settings-routing.module';
import { NewsletterSettingsComponent } from './newsletter-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from '../navbar/navbar.module';
import { NavbarNewsletterModule } from '../navbar-newsletter/navbar-newsletter.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { ContentEditorModule } from '../content-editor/content-editor.module';
import { UsersPermissionsManageListComponent } from './users-permissions-manage-list/users-permissions-manage-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    NewsletterSettingsComponent,
    UsersPermissionsManageListComponent
  ],
  imports: [
    CommonModule,
    NewsletterSettingsRoutingModule,
    ReactiveFormsModule,
    NavbarModule,
    NavbarNewsletterModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    ContentEditorModule,
    MatSelectModule,
    MatExpansionModule,
    MatDividerModule
  ]
})
export class NewsletterSettingsModule { }
