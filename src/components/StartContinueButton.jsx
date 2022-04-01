import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';

const StartContinueButton = ({ foodId }) => {
  const [showButton, setShowButton] = useState(true);
  const [buttonText, setButtonText] = useState('Start Recipe');
  const history = useHistory();

  useEffect(() => {
    const getLocalStorageDone = JSON.parse(localStorage.getItem('doneRecipes'));

    console.log('oi', foodId);
    if (getLocalStorageDone) {
      getLocalStorageDone.forEach((recipe) => {
        console.log('recipe.id', recipe.id);
        if (recipe.id === foodId) {
          console.log('oi2', foodId);
          return setShowButton(false);
        }
      });
    }

    const getLocalStorageProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (getLocalStorageProgress && Object.keys(getLocalStorageProgress?.meals)
      .includes(foodId)) setButtonText('Continue Recipe');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <span />
      { showButton && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/foods/${foodId}/in-progress`) }
          className="start-recipe-button"
        >
          {buttonText}
        </button>
      )}
    </>
  );
};

StartContinueButton.propTypes = {
  foodId: string.isRequired,
};

export default StartContinueButton;
