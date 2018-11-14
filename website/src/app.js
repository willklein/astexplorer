import * as LocalStorage from './components/LocalStorage';
import ASTOutputContainer from './containers/ASTOutputContainer';
import CodeEditorContainer from './containers/CodeEditorContainer';
import ErrorMessageContainer from './containers/ErrorMessageContainer';
import GistBanner from './components/GistBanner';
import LoadingIndicatorContainer from './containers/LoadingIndicatorContainer';
import PasteDropTargetContainer from './containers/PasteDropTargetContainer';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import React from 'react';
import SettingsDialogContainer from './containers/SettingsDialogContainer';
import ShareDialogContainer from './containers/ShareDialogContainer';
import SplitPane from './components/SplitPane';
import ToolbarContainer from './containers/ToolbarContainer';
import TransformerContainer from './containers/TransformerContainer';
import createSagaMiddleware from 'redux-saga'
import debounce from './utils/debounce';
import saga from './store/sagas';
import { Provider, connect } from 'react-redux';
import { astexplorer, persist, revive } from './store/reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { canSaveTransform, getRevision } from './store/selectors';
import { enableBatching } from 'redux-batched-actions';
import { loadSnippet, scaleDown, scaleUp } from './store/actions';
import { render } from 'react-dom';
import * as gist from './storage/gist';
import * as parse from './storage/parse';
import StorageHandler from './storage';

function resize() {
  PubSub.publish('PANEL_RESIZE');
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.shortcuts = this.shortcuts.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keyup', this.shortcuts)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.shortcuts)
  }

  shortcuts(event) {
    if (event.altKey) {
      switch (event.key) {
        case 'ArrowUp':
          this.props.onScaleUp()
          break

        case 'ArrowDown':
          this.props.onScaleDown()
      }
    }
  }

  render() {

    return (

      <div>
        <ErrorMessageContainer />
        <div className={'dropTarget' + (this.props.hasError ? ' hasError' : '')}>
          <PasteDropTargetContainer>
            <LoadingIndicatorContainer />
            <SettingsDialogContainer />
            <ShareDialogContainer />
            <div id="root">
              <ToolbarContainer />
              <GistBanner />
              <SplitPane
                className="splitpane-content"
                vertical={true}
                onResize={resize}>
                <SplitPane
                  className="splitpane"
                  onResize={resize}
                  scale={this.props.scale}>
                  <CodeEditorContainer />
                  <ASTOutputContainer />
                </SplitPane>
                {this.props.showTransformer ? <TransformerContainer /> : null}
              </SplitPane>
            </div>
          </PasteDropTargetContainer>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  hasError: PropTypes.bool,
  onScaleDown: PropTypes.func,
  onScaleUp: PropTypes.func,
  scale: PropTypes.number,
  showTransformer: PropTypes.bool,
};



function mapDispatchToProps(dispatch) {
  return {
    onScaleUp: () => {
      dispatch(scaleUp());
    },
    onScaleDown: () => {
      dispatch(scaleDown());
    },
  };
}

const AppContainer = connect(
  state => ({
    showTransformer: state.showTransformPanel,
    hasError: !!state.error,
    scale: state.scale,
  }),
  mapDispatchToProps
)(App);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  enableBatching(astexplorer),
  revive(LocalStorage.readState()),
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);
store.subscribe(debounce(() => {
  const state = store.getState();
  // We are not persisting the state while looking at an existing revision
  if (!getRevision(state)) {
    LocalStorage.writeState(persist(state));
  }
}));
sagaMiddleware.run(saga, new StorageHandler([gist, parse]));

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('container')
);

global.onhashchange = () => {
  store.dispatch(loadSnippet());
};

if (location.hash.length > 1) {
  store.dispatch(loadSnippet());
}

global.onbeforeunload = () => {
  const state = store.getState();
  if (canSaveTransform(state)) {
    return 'You have unsaved transform code. Do you really want to leave?';
  }
};
