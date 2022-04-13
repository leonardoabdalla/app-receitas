import React, { useState } from 'react';
import { string } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const ShareButton = ({ pathname, testId }) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <button
      type="button"
      data-testid={ testId }
      onClick={ () => { copy(`http://localhost:3000${pathname}`); setIsCopied(true); } }
      src={ shareIcon }
      className="buttons-favorite"
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
  testId: string.isRequired,
};

export default ShareButton;
