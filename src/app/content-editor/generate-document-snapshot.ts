import { Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { Document } from 'functions/src/interfaces/document';
import { VersionsMananger } from './versions-managet';
import { defaultMarkdownSerializer } from './to-markdown';

export function generateDocumentSnapshot<T extends Schema>(versionsMananger: VersionsMananger<T>, view: EditorView<T>): Document {
  const versions = versionsMananger.getVersions().map(v => ({
    steps: v.steps ? v.steps.map(s => s.toJSON()) : [],
    clientIDs: v.clientIDs ? [...v.clientIDs] : []
  }));
  const version = versionsMananger.versions.length;
  const html = view.dom.innerHTML;
  const text = defaultMarkdownSerializer.serialize(view.state.doc);
  return { versions, html, text, version };
}
