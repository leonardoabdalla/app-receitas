import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { fetchFoodById } from '../api/services';

const FavoriteButton = ({ foodId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [foodItem, setFoodItem] = useState([{}]);
  const [foodToSaveLocal, setFoodToSaveLocal] = useState({});
  const [localStorageItems, setLocalStorageItems] = useState([]);

  useEffect(() => {
    const getLocalFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    getLocalFavorites?.forEach((recipe) => {
      if (recipe.id === foodId) return setIsFavorite(true);
    });

    const getFoodItem = async () => {
      const getFood = await fetchFoodById(foodId);
      return setFoodItem(getFood[0]);
    };
    getFoodItem();

    const getLocalItems = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getLocalItems) return setLocalStorageItems(getLocalItems);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFoodToSaveLocal({
      id: foodItem.idMeal,
      type: 'food',
      nationality: foodItem.strArea,
      category: foodItem.strCategory,
      alcoholicOrNot: '',
      name: foodItem.strMeal,
      image: foodItem.strMealThumb,
    });
  }, [foodItem]);

  const handleLocalSave = () => {
    if (!isFavorite) {
      const tempLocal = localStorageItems.concat(foodToSaveLocal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(tempLocal));
    }
    if (isFavorite) {
      const removeFavorite = localStorageItems
        .filter((favorite) => favorite.id !== foodId);
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

FavoriteButton.propTypes = {
  foodId: string.isRequired,
};

export default FavoriteButton;
