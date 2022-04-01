import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';

const StartDrinkButton = ({ drinkId }) => {
  const [showButton, setShowButton] = useState(true);
  const [buttonText, setButtonText] = useState('Start Recipe');
  const history = useHistory();

  useEffect(() => {
    const getLocalStorageDone = JSON.parse(localStorage.getItem('doneRecipes'));

    if (getLocalStorageDone) {
      getLocalStorageDone.forEach((recipe) => {
        if (recipe.id === drinkId) {
          return setShowButton(false);
        }
      });
    }

    const getLocalStorageProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (getLocalStorageProgress && Object.keys(getLocalStorageProgress?.cocktails)
      .includes(drinkId)) setButtonText('Continue Recipe');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <span />
      { showButton && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/drinks/${drinkId}/in-progress`) }
          className="start-recipe-button"
        >
          {buttonText}
        </button>
      )}
    </>
  );
};

StartDrinkButton.propTypes = {
  drinkId: string.isRequired,
};

export default StartDrinkButton;
