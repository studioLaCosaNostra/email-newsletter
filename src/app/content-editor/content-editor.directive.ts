import { Directive, forwardRef, ElementRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { DOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { exampleSetup } from 'prosemirror-example-setup';
import { collab, receiveTransaction, sendableSteps, getVersion } from 'prosemirror-collab';
import { Step } from 'prosemirror-transform';
import { history } from 'prosemirror-history';
import { generateDocumentSnapshot } from './generate-document-snapshot';
import { Version } from './version.interface';
import { VersionsMananger } from './versions-managet';
import { editorSchema } from './schema';

@Directive({
  selector: '[appContentEditor]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ContentEditorDirective),
    multi: true
  }]
})
export class ContentEditorDirective implements ControlValueAccessor, OnInit {
  versionManager: VersionsMananger<typeof schema> = new VersionsMananger();
  editorSchema: typeof schema;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    const container: Element = this.elementRef.nativeElement;
    const state = EditorState.create({
      doc: DOMParser.fromSchema(editorSchema).parse(document.createElement('div')),
      plugins: exampleSetup({ schema: editorSchema, history: false }).concat([
        history(),
        collab({ version: this.versionManager.versions.length })
      ])
    });
    const view = new EditorView(container, {
      state,
      dispatchTransaction: transaction => {
        const newState = view.state.apply(transaction);
        view.updateState(newState);
        const sendable = sendableSteps(newState);
        if (sendable) {
          this.versionManager.receiveSteps(sendable.version, sendable.steps, [sendable.clientID]);
          this.propagateChange(generateDocumentSnapshot(this.versionManager, view));
        }
      }
    });

    this.versionManager.onNewSteps.push(() => {
      const newVersions = this.versionManager.stepsSince(getVersion(view.state));
      newVersions.forEach((version) => {
        view.dispatch(
          receiveTransaction(view.state, version.steps, version.clientIDs));
      });
    });
    this.editorSchema = editorSchema;
  }

  writeValue(value: any) {
    if (value) {
      const versions: Version<typeof schema>[] = value.versions.map(version => ({
        steps: version.steps.map(j => Step.fromJSON(this.editorSchema, j)),
        clientIDs: version.clientIDs
      }));
      this.versionManager.receiveSnapshot(value.version, versions);
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
