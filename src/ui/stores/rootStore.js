import UiStateStore from './uiStateStore';

export default class RootStore {
  uiState = new UiStateStore(this);
}
