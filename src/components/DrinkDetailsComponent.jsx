import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchDrinkById, fetchFoods } from '../api/services';
import '../styles/DrinkDetailsComponent .css';
import ShareButton from './ShareButton';
import FavoriteDrinkButton from './FavoriteDrinkButton';
import StartDrinkButton from './StartDrinkButton';
import '../css/Details.css';

const DrinkDetailComponent = () => {
  const [drinkItem, setDrinkItem] = useState([{}]);
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [quantitiesArray, setQuantitiesArray] = useState([]);
  const [recommendedFoods, setRecommendedFoods] = useState([{}]);

  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    const getPathId = pathname.split('/')[2];

    const getDrinkById = async () => {
      const getDrink = await fetchDrinkById(getPathId);
      return setDrinkItem(getDrink[0]);
    };
    getDrinkById();

    const getRecommended = async () => {
      const getFoods = await fetchFoods();
      return setRecommendedFoods(getFoods);
    };
    getRecommended();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getEntries = Object.entries(drinkItem);
    const filteredEntries = getEntries
      .filter((entrie) => entrie[0].includes('strIngredient'));

    const ingredientsArr = filteredEntries
      .reduce((acc, entrie) => acc.concat(entrie[1]), []);
    const noEmptyEleArr = ingredientsArr.filter((ingredient) => ingredient);
    setIngredientsArray(noEmptyEleArr);

    const filteredQuants = getEntries
      .filter((entrie) => entrie[0].includes('strMeasure'));
    const quantArr = filteredQuants
      .reduce((acc, entrie) => acc.concat(entrie[1]), []);
    const noEmptyQuant = quantArr.filter((quant) => quant);
    setQuantitiesArray(noEmptyQuant);
  }, [drinkItem]);

  return (
    <div className="details-page">
      { drinkItem && (
        <div>
          <img
            className="food-image"
            data-testid="recipe-photo"
            src={ drinkItem.strDrinkThumb }
            alt={ `Drink: ${drinkItem.strDrink}` }
            width="250px"
          />
          <div className="ingredients-div">
            <div className="buttons-image">
              <ShareButton
                className="buttons-favorite"
                pathname={ pathname }
                testId="share-btn"
              />
              <FavoriteDrinkButton
                drinkId={ pathname.split('/')[2] }
                className="buttons-favorite"
              />
            </div>
            <h2
              className="food-name"
              data-testid="recipe-title"
            >
              {drinkItem.strDrink}
            </h2>
            <h3
              className="food-category"
              data-testid="recipe-category"
            >
              {`${drinkItem.strCategory} - ${drinkItem.strAlcoholic}`}
            </h3>
            <h4 className="ingredients">Ingredients</h4>
            {
              ingredientsArray
                .map((ingredient, index) => (
                  <p
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${ingredient}: ${quantitiesArray[index]}`}
                  </p>
                ))
            }

            <p
              className="instructions"
              data-testid="instructions"
            >
              {drinkItem.strInstructions}
            </p>
            <ul className="recommended-box">
              {recommendedFoods && recommendedFoods.map((food, index) => {
                const SHOW_RECOMMENDED = 5;
                if (index > SHOW_RECOMMENDED) return null;
                return (
                  <li
                    data-testid={ `${index}-recomendation-card` }
                    key={ index }
                  >
                    <button
                      onClick={ () => history.push(`/foods/${food.idMeal}`) }
                      /* onKeyDown={ () => history.push(`/foods/${food.idMeal}`) } */
                      type="button"
                    /* tabIndex={ index } */
                    >
                      <img src={ food.strMealThumb } alt={ food.strMeal } width="100px" />
                      <h3
                        data-testid={ `${index}-recomendation-title` }
                      >
                        { food.strMeal }

                      </h3>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <StartDrinkButton className="button-start" drinkId={ pathname.split('/')[2] } />
        </div>
      )}
    </div>
  );
};

export default DrinkDetailComponent;
