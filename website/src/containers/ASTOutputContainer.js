import { connect } from 'react-redux';
import ASTOutput from '../components/ASTOutput';
import { setParseError, toggleTreeSettings } from '../store/actions';
import * as selectors from '../store/selectors';

function mapStateToProps(state) {
  return {
    code: selectors.getCode(state),
    parser: selectors.getParser(state),
    parserSettings: selectors.getParserSettings(state),
    cursor: selectors.getCursor(state),
    showTreeSettings: selectors.getShowTreeSettings(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onParseError: error => dispatch(setParseError(error)),
    toggleTreeSettings: () => dispatch(toggleTreeSettings()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ASTOutput);
