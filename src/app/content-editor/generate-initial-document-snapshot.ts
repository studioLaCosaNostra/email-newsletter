import { DOMParser } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { exampleSetup } from 'prosemirror-example-setup';
import { collab, sendableSteps } from 'prosemirror-collab';
import { EditorView } from 'prosemirror-view';
import { Document } from 'functions/src/interfaces/document';
import { editorSchema } from './schema';
import { defaultMarkdownSerializer } from './to-markdown';

export async function generateInitialDocumentSnapshot(contentToGenerate: string, contentType = 'text') {
  return await new Promise<Document>((resolve) => {
    const doc = DOMParser.fromSchema(editorSchema).parse(document.createElement('div'));
    const state = EditorState.create({
      doc,
      plugins: exampleSetup({ schema: editorSchema, history: false }).concat([
        collab({ version: 0 })
      ])
    });
    const view = new EditorView(document.createElement('div'), {
      state,
      dispatchTransaction: transaction => {
        const newState = view.state.apply(transaction);
        view.updateState(newState);
        const sendable = sendableSteps(newState);
        if (sendable) {
          const steps = sendable.steps.map(s => s.toJSON());
          const version = sendable.steps.length;
          const clientIDs = [sendable.clientID];
          const html = view.dom.innerHTML;
          const text = defaultMarkdownSerializer.serialize(view.state.doc);
          const versions = [
            {
              steps,
              clientIDs
            }
          ];
          resolve({ versions, html, text, version });
        }
      }
    });
    const div = document.createElement('div');
    if (contentType === 'text') {
      div.innerText = contentToGenerate;
    }
    if (contentType === 'html') {
      div.innerHTML = contentToGenerate;
    }
    const node = DOMParser.fromSchema(editorSchema).parse(div);
    view.dispatch(state.tr.insert(0, node));
  });
}
