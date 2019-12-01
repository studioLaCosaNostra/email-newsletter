import { ContentEditorDirective } from './content-editor.directive';
import { ElementRef } from '@angular/core';

export class MockElementRef extends ElementRef {}

describe('ContentEditorDirective', () => {
 
  it('should create an instance', () => {
    const directive = new ContentEditorDirective(new MockElementRef(document.createElement('div')));
    expect(directive).toBeTruthy();
  });
});
