import React, { useEffect, useState } from 'react';
import { func, shape, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { fetchFoodById, fetchDrinks } from '../api/services';
import '../styles/FoodDetailsComponent.css';

const FoodDetailsComponent = ({ location: { pathname }, history }) => {
  const [foodId, setFoodId] = useState('');
  const [foodItem, setFoodItem] = useState({});
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [quantitiesArr, setQuantitiesArr] = useState([]);
  const [recomendedDrinks, setRecomendedDrinks] = useState([{}]);

  useEffect(() => {
    const getPath = pathname.split('/')[2];
    setFoodId(getPath);
    const getRecomendedDrinks = async () => {
      const getDrinks = await fetchDrinks();
      return setRecomendedDrinks(getDrinks);
    };
    getRecomendedDrinks();
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
    const filterIngredEntries = getEntries
      .filter((entrie) => entrie[0].includes('strIngredient'));

    const ingredientsArr = filterIngredEntries
      .reduce((acc, entrie) => acc.concat(entrie[1]), []);

    const noEmptyEleArr = ingredientsArr.filter((ingredient) => ingredient);
    setIngredientsArray(noEmptyEleArr);

    const filterQuantEntries = getEntries
      .filter((entrie) => entrie[0].includes('strMeasure'));

    const quantArr = filterQuantEntries
      .reduce((acc, entrie) => acc.concat(entrie[1]), []);

    const noEmptyQuantArr = quantArr.filter((quant) => quant && quant.trim());
    setQuantitiesArr(noEmptyQuantArr);
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
              ingredientsArray
                .map((ingredient, index) => (
                  <p
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${ingredient}: ${quantitiesArr[index]}`}
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
          <div className="recommended-box">
            <ul>
              {recomendedDrinks && recomendedDrinks.map((drink, index) => {
                const SHOW_RECOMMENDED = 5;
                if (index > SHOW_RECOMMENDED) return null;
                return (
                  <li
                    className="recommended-card"
                    data-testid={ `${index}-recomendation-card` }
                    key={ index }
                  >
                    <div
                      onClick={ () => history.push(`/drinks/${drink.idDrink}`) }
                      onKeyDown={ () => history.push(`/drinks/${drink.idDrink}`) }
                      role="button"
                      tabIndex={ index }
                    >
                      <img
                        src={ drink.strDrinkThumb }
                        alt={ drink.strDrink }
                        width="100px"
                      />
                      <h3
                        data-testid={ `${index}-recomendation-title` }
                      >
                        { drink.strDrink }

                      </h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="start-recipe-button">
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => {} }

            >
              Start Recipe
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
