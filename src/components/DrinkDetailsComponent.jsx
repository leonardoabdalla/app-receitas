import React, { useState, useEffect } from 'react';
import { func, shape, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { fetchDrinkById, fetchFoods } from '../api/services';
import '../styles/DrinkDetailsComponent .css';

const DrinkDetailComponent = ({ location: { pathname }, history }) => {
  const [drinkItem, setDrinkItem] = useState([{}]);
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [quantitiesArray, setQuantitiesArray] = useState([]);
  const [recommendedFoods, setRecommendedFoods] = useState([{}]);
  const [showButton, setShowButton] = useState(true);
  const [buttonText, setButtonText] = useState('Start Recipe');

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

    const getLocalDrinksDone = JSON.parse(localStorage.getItem('doneRecipes'));
    getLocalDrinksDone?.forEach((drink) => {
      if (drink.id === getPathId) return setShowButton(false);
    });

    const getLocalDrinkProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getLocalDrinkProgress && Object.keys(getLocalDrinkProgress?.cocktails)
      .includes(getPathId)) setButtonText('Continue Recipe');

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
    <>
      <h1>Drink Details</h1>
      { drinkItem && (
        <div>
          <h2
            data-testid="recipe-title"
          >
            {drinkItem.strDrink}
          </h2>
          <h3
            data-testid="recipe-category"
          >
            {`${drinkItem.strCategory} - ${drinkItem.strAlcoholic}`}
          </h3>
          <img
            data-testid="recipe-photo"
            src={ drinkItem.strDrinkThumb }
            alt={ `Drink: ${drinkItem.strDrink}` }
            width="250px"
          />
          <div>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => {} }
            >
              Compartilhar
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ () => {} }
            >
              Favoritar
            </button>
          </div>
          <div>
            <h3>Ingredientes</h3>
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
          </div>
          <p
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
                  <div
                    onClick={ () => history.push(`/foods/${food.idMeal}`) }
                    onKeyDown={ () => history.push(`/foods/${food.idMeal}`) }
                    role="button"
                    tabIndex={ index }
                  >
                    <img src={ food.strMealThumb } alt={ food.strMeal } width="100px" />
                    <h3
                      data-testid={ `${index}-recomendation-title` }
                    >
                      { food.strMeal }

                    </h3>
                  </div>
                </li>
              );
            })}
          </ul>
          {
            showButton && (
              <button
                type="button"
                data-testid="start-recipe-btn"
                onClick={ () => {} }
                className="start-recipe--drink-button"
              >
                { buttonText }
              </button>
            )
          }
        </div>
      )}
    </>
  );
};

DrinkDetailComponent.propTypes = {
  location: shape({
    pathname: string.isRequired,
  }).isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default withRouter(DrinkDetailComponent);
