import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const FavoriteButton = ({ foodId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const getLocalFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    getLocalFavorites?.forEach((recipe) => {
      if (recipe.id === foodId) return setIsFavorite(true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ () => {} }
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
    >
      {isFavorite ? (
        <img
          src={ blackHeartIcon }
          alt="Comida favoritada"
        />
      ) : (
        <img
          src={ whiteHeartIcon }
          alt="Comida não está entre as favoritas"
        />
      ) }
    </button>
  );
};

FavoriteButton.propTypes = {
  foodId: string.isRequired,
};

export default FavoriteButton;
