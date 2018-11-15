import PropTypes from 'prop-types';
import React from 'react';

export default function SnippetButton({ onIntro, onVariables, onPatterns, onTransforms }) {
  return (
    <div className="button menuButton">
      <span>
        <i className='fa fa-lg fa-file-code-o fa-fw' />
        &nbsp;Lessons
      </span>
      <ul>
        <li>
          <button
            type="button"
            onClick={onIntro}>
            <i className="fa fa-file-code-o fa-fw" />&nbsp;Intro
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={onVariables}>
            <i className="fa fa-file-code-o fa-fw" />&nbsp;Variables
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={onPatterns}>
            <i className="fa fa-file-code-o fa-fw" />&nbsp;Patterns
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={onTransforms}>
            <i className="fa fa-file-code-o fa-fw" />&nbsp;Transforms
          </button>
        </li>
      </ul>
    </div>
  );
}

SnippetButton.propTypes = {
  onIntro: PropTypes.func,
  onPatterns: PropTypes.func,
  onTransforms: PropTypes.func,
  onVariables: PropTypes.func,
};
