import PropTypes from 'prop-types';
import React from 'react';

export default function SnippetButton({ onIntro, onPatterns, onTransforms }) {
  return (
    <div className="button menuButton">
      <span>
        <i className='fa fa-lg fa-file-code-o fa-fw' />
        &nbsp;Snippet
      </span>
      <ul>
        <li>
          <button
            type="button"
            onClick={onIntro}>
            <i className="fa fa-file-o fa-fw" />&nbsp;Introduction
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={onPatterns}>
            <i className="fa fa-file-o fa-fw" />&nbsp;Patterns
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={onTransforms}>
            <i className="fa fa-file-o fa-fw" />&nbsp;Transforms
          </button>
        </li>
      </ul>
    </div>
  );
}

SnippetButton.propTypes = {
  onIntros: PropTypes.func,
  onPatterns: PropTypes.func,
  onTransforms: PropTypes.func,
};
