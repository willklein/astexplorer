import PropTypes from 'prop-types';
import React from 'react';
import ForkButton from './ForkButton';
import NewButton from './NewButton';
import SaveButton from './SaveButton';
import ShareButton from './ShareButton';
import cx from 'classnames';

export default function SnippetButton(props) {
  const canForkAndNotSave = props.canFork && !props.canSave;
  const savingOrForking = props.saving || props.forking;

  return (
    <div className="button menuButton">
      <span>
        <i className='fa fa-lg fa-file-code-o fa-fw' />
        &nbsp;Snippet
      </span>
      <ul>
        <li><NewButton {...props} /></li>
        <li><SaveButton {...props} /></li>
      </ul>
    </div>
  );
}

SnippetButton.propTypes = {
  canFork: PropTypes.bool,
  canSave: PropTypes.bool,
  forking: PropTypes.bool,
  onFork: PropTypes.func,
  onSave: PropTypes.func,
  saving: PropTypes.bool,
};
