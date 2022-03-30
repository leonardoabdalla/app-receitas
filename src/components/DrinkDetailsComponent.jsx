import React, { useState, useEffect } from 'react';
import { func, shape, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { fetchDrinkById } from '../api/services';

const DrinkDetailComponent = ({ location: { pathname }, history }) => {
  const [drinkItem, setDrinkItem] = useState([{}]);
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [recommendedFoods, setRecommendedFoods] = useState([{}]);

  useEffect(() => {
    const getPathId = pathname.split('/')[2];

    const getDrinkById = async () => {
      const getDrink = await fetchDrinkById(getPathId);
      return setDrinkItem(getDrink[0]);
    };
    getDrinkById();
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

    const getRecommended = drinkItem.strDrinkAlternate;
    setRecommendedFoods(getRecommended);
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
            {drinkItem.strCategory}
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
                    {ingredient}
                  </p>
                ))
            }
          </div>
          <p
            data-testid="instructions"
          >
            {drinkItem.strInstructions}
          </p>
          <div>
            {recommendedFoods === null
              ? <h3 data-testid="0-recomendation-card">Sem recomendações</h3>
              : recommendedFoods && recommendedFoods.map((food, index) => (
                <div
                  data-testid={ `${index}-recomendation-card` }
                  key={ index }
                  onClick={ () => history.push(`/foods/${food.idFood}`) }
                  onKeyDown={ () => history.push(`/foods/${food.idFood}`) }
                  role="button"
                  tabIndex={ index }
                >
                  <img src={ food.strFoodThumb } alt={ food.strFood } />
                  <h3>{ food.strFood }</h3>
                </div>
              ))}
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => {} }
            >
              Iniciar Receita
            </button>
          </div>

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
