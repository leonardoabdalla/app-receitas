import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchFoodById, fetchDrinks } from '../api/services';
import '../styles/FoodDetailsComponent.css';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import StartContinueButton from './StartContinueButton';
import '../css/Details.css';
import '../styles/DrinkDetailsComponent .css';

const FoodDetailsComponent = () => {
  const [foodItem, setFoodItem] = useState({});
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [quantitiesArr, setQuantitiesArr] = useState([]);
  const [recomendedDrinks, setRecomendedDrinks] = useState([{}]);

  const history = useHistory();
  const { location: { pathname } } = history;

  const SHOW_RECOMMENDED = 6;

  useEffect(() => {
    const getPathId = pathname.split('/')[2];
    const getRecomendedDrinks = async () => {
      const getDrinks = await fetchDrinks();
      return setRecomendedDrinks(getDrinks);
    };
    getRecomendedDrinks();

    const getFoodById = async () => {
      const getFood = await fetchFoodById(getPathId);
      return setFoodItem(getFood[0]);
    };
    getFoodById();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className="details-page">
      <div>
        <img
          className="food-image"
          data-testid="recipe-photo"
          src={ foodItem.strMealThumb }
          alt={ `Meal: ${foodItem.strMeal}` }
          width="250px"
        />
        <div className="ingredients-div">
          <div className="buttons-image">
            <ShareButton
              pathname={ pathname }
              testId="share-btn"
              className="buttons-favorite"
            />
            <FavoriteButton
              className="buttons-favorite"
              foodId={ pathname.split('/')[2] }
            />
          </div>
          <h2
            className="food-name"
            data-testid="recipe-title"
          >
            {foodItem.strMeal}
          </h2>
          <h3
            className="food-category"
            data-testid="recipe-category"
          >
            {foodItem.strCategory}
          </h3>
          <h4 className="ingredients">Ingredients</h4>
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

          <p
            className="instructions"
            data-testid="instructions"
          >
            {foodItem.strInstructions}
          </p>
          <div className="video">
            <iframe
              data-testid="video"
              title={ foodItem.strMeal }
              width="300px"
              height="200px"
              src={ foodItem.strYoutube?.replace('watch', 'embed') }
            />
          </div>
          <ul className="recommended-box">
            {recomendedDrinks.slice(0, SHOW_RECOMMENDED).map((drink, index) => (
              <li
                className="recommended-card"
                data-testid={ `${index}-recomendation-card` }
                key={ index }
              >
                <button
                  onClick={ () => history.push(`/drinks/${drink.idDrink}`) }
                  type="button"
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
                </button>
              </li>
            ))}
          </ul>
        </div>
        <StartContinueButton className="button-start" foodId={ pathname.split('/')[2] } />
      </div>
    </div>
  );
};

export default FoodDetailsComponent;
