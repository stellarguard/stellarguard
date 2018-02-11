import { action, computed, observable } from 'mobx';

class AddStellarUiState {
  @observable step = 0;
  @observable transaction;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  buildMultiSigTransaction(transaction) {
    this.transaction = transaction;
  }

  @computed
  get xdr() {
    return 'AAAAAJ5uBuJgh8TI/SC3IejsQaa23plTqSW/7CY9s6BHa06PAAAAZABmPmUAAAAKAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAADmhpaGloaWhpaGloaWhpAAAAAAABAAAAAAAAAAEAAAAAnm4G4mCHxMj9ILch6OxBprbemVOpJb/sJj2zoEdrTo8AAAAAAAAAAACYloAAAAAAAAAAAA==';
  }

  @action
  gotoStep(step) {
    this.step = step;
  }
}

export default AddStellarUiState;
