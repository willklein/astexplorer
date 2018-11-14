import { connect } from 'react-redux';
import {
  loadJsSnippet,
  selectCategory,
  openSettingsDialog,
  openShareDialog,
  selectTransformer,
  hideTransformer,
  setParser,
  reset,
  setKeyMap,
} from '../store/actions';
import Toolbar from '../components/Toolbar';
import * as selectors from '../store/selectors';
import { logEvent } from '../utils/logger';

function mapStateToProps(state) {
  const parser = selectors.getParser(state);

  return {
    canSave: selectors.canSave(state),
    canFork: selectors.canFork(state),
    category: parser.category,
    parser,
    transformer: selectors.getTransformer(state),
    keyMap: selectors.getKeyMap(state),
    showTransformer: selectors.showTransformer(state),
    snippet: selectors.getRevision(state),
    info: selectors.getInfo(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onParserChange: parser => {
      dispatch(setParser(parser));
      logEvent('parser', 'select', parser.id);
    },
    onCategoryChange: category => {
      dispatch(selectCategory(category));
      logEvent('category', 'select', category.id);
    },
    onParserSettingsButtonClick: () => {
      dispatch(openSettingsDialog());
      logEvent('parser', 'open_settings');
    },
    onShareButtonClick: () => {
      dispatch(openShareDialog());
      logEvent('ui', 'open_share');
    },
    onTransformChange: transformer => {
      dispatch(transformer ? selectTransformer(transformer) : hideTransformer());
      if (transformer) {
        logEvent('tool', 'select', transformer.id);
      }
    },
    onKeyMapChange: keyMap => {
      dispatch(setKeyMap(keyMap))
      if (keyMap) {
        logEvent('keyMap', keyMap);
      }
    },
    onIntro: () => dispatch(loadJsSnippet('intro')),
    onVariables: () => dispatch(loadJsSnippet('variables')),
    onPatterns: () => dispatch(loadJsSnippet('patterns')),
    onTransforms: () => dispatch(loadJsSnippet('transforms')),
    onNew: () => {
      if (global.location.hash) {
        global.location.hash = '';
      } else {
        dispatch(reset());
      }
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

