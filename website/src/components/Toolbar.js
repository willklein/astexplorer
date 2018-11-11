import PropTypes from 'prop-types';
import React from 'react';
import ParserButton from './buttons/ParserButton';
import SnippetButton from './buttons/SnippetButton';
import TransformButton from './buttons/TransformButton';

export default function Toolbar(props) {
  let { parser, transformer, showTransformer } = props;
  let parserInfo = parser.id;
  let transformerInfo = '';
  if (parser) {
    if (parser.version) {
      parserInfo += '-' + parser.version;
    }
    if (parser.homepage) {
      parserInfo =
        <a href={parser.homepage} target="_blank" rel="noopener noreferrer">{parserInfo}</a>;
    }
  }
  if (showTransformer) {
    transformerInfo = transformer.displayName;
    if (transformer.version) {
      transformerInfo += '-' + transformer.version;
    }
    if (transformer.homepage) {
      transformerInfo =
        <a href={transformer.homepage} target="_blank" rel="noopener noreferrer">{transformerInfo}</a>;
    }
    transformerInfo = <span>Transformer: {transformerInfo}</span>;
  }

  return (
    <div id="Toolbar">
      <h1>AST Explorer</h1>
      <SnippetButton {...props} />
      <ParserButton {...props} />
      <TransformButton {...props} />
    </div>
  );
}

Toolbar.propTypes = {
  onIntro: PropTypes.func,
  onPatterns: PropTypes.func,
  onTransforms: PropTypes.func,
  onParserChange: PropTypes.func,
  onParserSettingsButtonClick: PropTypes.func,
  onShareButtonClick: PropTypes.func,
  onTransformChange: PropTypes.func,
  onKeyMapChange: PropTypes.func,
  parser: PropTypes.object,
  transformer: PropTypes.object,
  showTransformer: PropTypes.bool,
};
