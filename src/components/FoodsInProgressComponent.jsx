import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchFoodById } from '../api/services';
import '../styles/FoodsInProgressComponent.css';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

const CHECKBOX_CLASS = 'ingredient-step';

const FoodDetailsComponent = () => {
  const [foodId, setFoodId] = useState('');
  const [foodItem, setFoodItem] = useState({});
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [quantitiesArr, setQuantitiesArr] = useState([]);
  const [localSaved, setLocalSaved] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    const getPath = pathname.split('/')[2];
    setFoodId(getPath);

    const getFoodById = async () => {
      const getFood = await fetchFoodById(getPath);
      return setFoodItem(getFood[0]);
    };
    getFoodById();

    const getLocalSaved = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setLocalSaved(getLocalSaved);

    if (!getLocalSaved?.meals?.[getPath]) {
      setLocalSaved({
        ...getLocalSaved,
        meals: {
          ...getLocalSaved?.meals,
          [getPath]: [],
        },
      });

      return localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...getLocalSaved,
        meals: {
          ...getLocalSaved?.meals,
          [getPath]: [],
        },
      }));
    }

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodItem]);

  const handleLocalSave = (ingredient) => {
    const getLocalSaved = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getLocalSaved?.meals?.[foodId].includes(ingredient)) {
      const filteredArr = getLocalSaved.meals[foodId]
        .filter((item) => item !== ingredient);
      setLocalSaved({
        ...getLocalSaved,
        meals: {
          ...getLocalSaved.meals,
          [foodId]: [...filteredArr],
        },
      });
      return localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...getLocalSaved,
        meals: {
          ...getLocalSaved.meals,
          [foodId]: [...filteredArr],
        },
      }));
    }
    const tempItem = getLocalSaved.meals?.[foodId];
    setLocalSaved({
      ...getLocalSaved,
      meals: {
        ...getLocalSaved.meals,
        [foodId]: [...tempItem, ingredient],
      },
    });
    return localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...getLocalSaved,
      meals: {
        ...getLocalSaved.meals,
        [foodId]: [...tempItem, ingredient],
      },
    }));
  };

  useEffect(() => {
    if (localSaved?.meals?.[foodId]?.length === ingredientsArray.length) {
      return setIsDisabled(false);
    }
    setIsDisabled(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSaved, ingredientsArray]);

  const handleStyle = (ingredient) => {
    if (localSaved.meals?.[foodId].includes(ingredient)) {
      return { textDecoration: 'line-through' };
    }
  };

  return (
    <>
      <h1>Food In Progress</h1>
      {foodItem && (
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
            <ShareButton
              pathname={ `/foods/${pathname.split('/')[2]}` }
              testId="share-btn"
            />
            <FavoriteButton foodId={ foodId } />
          </div>
          <h3>Ingredientes</h3>
          <div data-testid="ingredient-box">
            {
              ingredientsArray
                .map((ingredient, index) => (
                  <div key={ index }>
                    <label htmlFor={ `${index}-ingredient-step` }>
                      <p
                        data-testid={ `${index}-ingredient-step` }
                        id={ `${index}-ingredient-step` }
                        className={ CHECKBOX_CLASS }
                        style={ handleStyle(ingredient) }
                      >
                        <input
                          type="checkbox"
                          name={ `${index}-ingredient-step` }
                          data-testid={ `${index}-ingredient-checkbox` }
                          onChange={ () => {
                            handleLocalSave(ingredient);
                          } }
                          checked={ localSaved.meals?.[foodId].includes(ingredient) }
                        />
                        {` ${ingredient}: ${quantitiesArr[index]}`}
                      </p>
                    </label>
                  </div>
                ))
            }
          </div>
          <p
            data-testid="instructions"
          >
            {foodItem.strInstructions}
          </p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ () => history.push('/done-recipes') }
            disabled={ isDisabled }
          >
            Finish Recipe
          </button>

        </div>
      )}
    </>
  );
};

export default FoodDetailsComponent;
