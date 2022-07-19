'use babel';

import PaketPaketView from './paket-paket-view';
import { CompositeDisposable } from 'atom';

export default {

  paketPaketView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.paketPaketView = new PaketPaketView(state.paketPaketViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.paketPaketView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'paket-paket:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.paketPaketView.destroy();
  },

  serialize() {
    return {
      paketPaketViewState: this.paketPaketView.serialize()
    };
  },

  toggle() {
    console.log('PaketPaket was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
