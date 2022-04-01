import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { fetchDrinkById } from '../api/services';

const FavoriteDrinkButton = ({ drinkId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [drinkItem, setDrinkItem] = useState([{}]);
  const [drinkToSaveLocal, setDrinkToSaveLocal] = useState({});
  const [localStorageItems, setLocalStorageItems] = useState([]);

  useEffect(() => {
    const getLocalFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    getLocalFavorites?.forEach((recipe) => {
      if (recipe.id === drinkId) return setIsFavorite(true);
    });

    const getDrinkItem = async () => {
      const getDrink = await fetchDrinkById(drinkId);
      return setDrinkItem(getDrink[0]);
    };
    getDrinkItem();

    const getLocalDrinks = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getLocalDrinks) return setLocalStorageItems(getLocalDrinks);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDrinkToSaveLocal({
      id: drinkItem.idDrink,
      type: 'drink',
      nationality: '',
      category: drinkItem.strCategory,
      alcoholicOrNot: drinkItem.strAlcoholic,
      name: drinkItem.strDrink,
      image: drinkItem.strDrinkThumb,
      /*      doneDate: drinkItem.dateModified,
      tags: drinkItem.strTags || [], */
    });
  }, [drinkItem]);

  const handleLocalSave = () => {
    if (!isFavorite) {
      const tempLocal = localStorageItems.concat(drinkToSaveLocal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(tempLocal));
    }
    if (isFavorite) {
      const removeFavorite = localStorageItems
        .filter((favorite) => favorite.id !== drinkId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
    }
  };

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ () => { setIsFavorite(!isFavorite); handleLocalSave(); } }
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

FavoriteDrinkButton.propTypes = {
  drinkId: string.isRequired,
};

export default FavoriteDrinkButton;
