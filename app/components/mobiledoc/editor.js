import Component from '@glimmer/component';
import { action } from '@ember/object';
import createComponentAtom from 'ember-mobiledoc-editor/utils/create-component-atom';
import createComponentCard from 'ember-mobiledoc-editor/utils/create-component-card';


export default class MobiledocEditorComponent extends Component {
  // Defaults
  block = 'c-mobiledoc-editor';


  // Getter and setter
  get atoms() {
    return [
      createComponentAtom('mobiledoc/atoms/line-break'),
    ];
  }

  get cards() {
    return [
      createComponentCard('mobiledoc/cards/image'),
    ];
  }


  // Actions
  @action
  didCreateEditor(editor) {
    const lineBreakCommand = {
      str: 'SHIFT+ENTER',
      run(editor) {
        editor.run(postEditor => {
          const lineBreak = postEditor
            .builder
            .createAtom('mobiledoc/atoms/line-break');

          postEditor.insertMarkers(editor.range.head, [lineBreak]);
        });
      }
    };

    editor.registerKeyCommand(lineBreakCommand);
  }
}
