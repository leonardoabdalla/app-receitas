import React, { useEffect, useState } from 'react';
import { func, shape, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { fetchFoodById } from '../api/services';

const FoodDetailsComponent = ({ location: { pathname }, history }) => {
  const [foodId, setFoodId] = useState('');
  const [foodItem, setFoodItem] = useState({
    strMeal: '',
    strMealThumb: '',
    strCategory: '',
    strInstructions: '',
  });
  const [IngredientsArray, setIngredientsArray] = useState([]);
  const [recomendedDrinks, setRecomendedDrinks] = useState([{}]);

  useEffect(() => {
    const getPath = pathname.split('/')[2];
    setFoodId(getPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (foodId) {
      const getFoodById = async () => {
        const getFood = await fetchFoodById(foodId);
        return setFoodItem(getFood[0]);
      };
      getFoodById();
    }
  }, [foodId]);

  useEffect(() => {
    const getEntries = Object.entries(foodItem);
    const filterEntries = getEntries
      .filter((entrie) => entrie[0].includes('strIngredient'));

    const ingredientsArray = filterEntries
      .reduce((acc, entrie) => acc.concat(entrie[1]), []);

    const noEmptyEleArr = ingredientsArray.filter((ingredient) => ingredient);
    setIngredientsArray(noEmptyEleArr);

    const getRecomendedDrinks = foodItem.strDrinkAlternate;
    setRecomendedDrinks(getRecomendedDrinks);
  }, [foodItem]);

  return (
    <>
      <h1>Food Details</h1>
      { foodItem && (
        <div>
          <h2
            data-testid="recipe-title"
          >
            {foodItem.strMeal}
          </h2>
          <h3
            data-testid="recipe-category"
          >
            {foodItem.strCategory}
          </h3>
          <img
            data-testid="recipe-photo"
            src={ foodItem.strMealThumb }
            alt={ `Meal: ${foodItem.strMeal}` }
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
              IngredientsArray
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
            {foodItem.strInstructions}
          </p>
          <iframe
            data-testid="video"
            title={ foodItem.strMeal }
            width="300px"
            height="200px"
            src={ foodItem.strYoutube && foodItem.strYoutube.replace('watch', 'embed') }
          />
          <div>
            {recomendedDrinks === null
              ? <h3 data-testid="0-recomendation-card">Sem recomendações</h3>
              : recomendedDrinks && recomendedDrinks.map((drink, index) => (
                <div
                  data-testid={ `${index}-recomendation-card` }
                  key={ index }
                  onClick={ () => history.push(`/drinks/${drink.idDrink}`) }
                  onKeyDown={ () => history.push(`/drinks/${drink.idDrink}`) }
                  role="button"
                  tabIndex={ index }
                >
                  <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
                  <h3>{ drink.strDrink }</h3>
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

FoodDetailsComponent.propTypes = {
  location: shape({
    pathname: string.isRequired,
  }).isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default withRouter(FoodDetailsComponent);
