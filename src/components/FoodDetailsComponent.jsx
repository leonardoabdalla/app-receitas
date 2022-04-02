import React, { useEffect, useState } from 'react';
import { func, shape, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { fetchFoodById, fetchDrinks } from '../api/services';
import '../styles/FoodDetailsComponent.css';
<<<<<<< HEAD
// import MyContext from '../context/MyContext';
=======
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import StartContinueButton from './StartContinueButton';
>>>>>>> ba3b860d6ccd981cfa0d2f3e99f42b5c76452676

const FoodDetailsComponent = ({ location: { pathname }, history }) => {
  const [foodId, setFoodId] = useState('');
  const [foodItem, setFoodItem] = useState({});
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [quantitiesArr, setQuantitiesArr] = useState([]);
  const [recomendedDrinks, setRecomendedDrinks] = useState([{}]);

  const SHOW_RECOMMENDED = 6;

  useEffect(() => {
    const getPathId = pathname.split('/')[2];
    setFoodId(getPathId);
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

  const makingObjFav = (food) => {
    const objFood = {
      id: food.idMeal,
      type: 'food',
      nationality: food.strArea,
      category: food.strCategory,
      alcoholicOrNot: '',
      name: food.strMeal,
      image: food.strMealThumb,
    };
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([objFood]));
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        // O JSON.parse transforma a string em JSON novamente, o inverso do JSON.strigify
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('favoriteRecipes')),
          objFood,
        ]),
      );
    }
  };

  return (
    <>
      <h1>Food Details</h1>
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
<<<<<<< HEAD
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
              onClick={ () => makingObjFav(foodItem) }
=======
          <ShareButton pathname={ pathname } testId="share-btn" />
          <FavoriteButton foodId={ pathname.split('/')[2] } />
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
          src={ foodItem.strYoutube?.replace('watch', 'embed') }
        />
        <ul>
          {recomendedDrinks.slice(0, SHOW_RECOMMENDED).map((drink, index) => (
            <li
              className="recommended-card"
              data-testid={ `${index}-recomendation-card` }
              key={ index }
>>>>>>> ba3b860d6ccd981cfa0d2f3e99f42b5c76452676
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
        <StartContinueButton foodId={ pathname.split('/')[2] } />
      </div>
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
