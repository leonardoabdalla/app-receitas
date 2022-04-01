import React, { useState } from 'react';
import { string } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const ShareButton = ({ pathname }) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <button
      type="button"
      data-testid="share-btn"
      onClick={ () => { copy(`http://localhost:3000${pathname}`); setIsCopied(true); } }
    >
      { !isCopied ? (
        <img
          src={ shareIcon }
          alt="Botão de compartilhar"
        />
      ) : <span>Link copied!</span>}
    </button>
  );
};

ShareButton.propTypes = {
  pathname: string.isRequired,
};

export default ShareButton;
