import { Schema } from 'prosemirror-model';
import { Step } from 'prosemirror-transform';

export interface Version<T extends Schema> {
  steps: Step<T>[];
  clientIDs: (string | number)[];
}
