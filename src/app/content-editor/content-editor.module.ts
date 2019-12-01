import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentEditorDirective } from './content-editor.directive';

@NgModule({
  declarations: [ContentEditorDirective],
  imports: [
    CommonModule
  ],
  exports: [ContentEditorDirective]
})
export class ContentEditorModule { }
