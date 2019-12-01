import { nodes, marks } from 'prosemirror-schema-basic';
import { Schema } from 'prosemirror-model';

(marks as any).unsubscribe = {
  parseDOM: [{ tag: 'unsubscribe' }],
  toDOM: function toDOM() {
    return ['span', { style: 'font-size: 10px;' }];
  }
};

export const editorSchema = new Schema({
  nodes,
  marks
});
