import React, { useEffect, useState } from 'react';
import { func, shape, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { fetchDrinkById } from '../api/services';
import '../styles/DrinkInProgressComponent.css';
import ShareButton from './ShareButton';
import FavoriteDrinkButton from './FavoriteDrinkButton';

const CHECKBOX_CLASS = 'ingredient-step';

const DrinkInProgressComponent = ({ location: { pathname }, history }) => {
  const [drinkId, setDrinkId] = useState('');
  const [drinkItem, setDrinkItem] = useState({});
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [quantitiesArr, setQuantitiesArr] = useState([]);
  const [localSaved, setLocalSaved] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const getPath = pathname.split('/')[2];
    setDrinkId(getPath);

    const getDrinkById = async () => {
      const getDrink = await fetchDrinkById(getPath);
      return setDrinkItem(getDrink[0]);
    };
    getDrinkById();

    const getLocalSaved = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setLocalSaved(getLocalSaved);

    if (!getLocalSaved?.cocktails?.[getPath]) {
      setLocalSaved({
        ...getLocalSaved,
        cocktails: {
          ...getLocalSaved?.cocktails,
          [getPath]: [],
        },
      });
      return localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...getLocalSaved,
        cocktails: {
          ...getLocalSaved?.cocktails,
          [getPath]: [],
        },
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getEntries = Object.entries(drinkItem);
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
  }, [drinkItem]);

  const handleLocalSave = (ingredient) => {
    const getLocalSaved = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getLocalSaved?.cocktails?.[drinkId].includes(ingredient)) {
      const filteredArr = getLocalSaved.cocktails[drinkId]
        .filter((item) => item !== ingredient);
      setLocalSaved({
        ...getLocalSaved,
        cocktails: {
          ...getLocalSaved.cocktails,
          [drinkId]: [...filteredArr],
        },
      });
      return localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...getLocalSaved,
        cocktails: {
          ...getLocalSaved.cocktails,
          [drinkId]: [...filteredArr],
        },
      }));
    }
    if (getLocalSaved) {
      const tempItem = getLocalSaved.cocktails?.[drinkId] || [];
      setLocalSaved({
        ...getLocalSaved,
        cocktails: {
          ...getLocalSaved.cocktails,
          [drinkId]: [...tempItem, ingredient],
        },
      });
      return localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...getLocalSaved,
        cocktails: {
          ...getLocalSaved.cocktails,
          [drinkId]: [...tempItem, ingredient],
        },
      }));
    }
    setLocalSaved({
      cocktails: {
        ...getLocalSaved.cocktails,
        [drinkId]: [ingredient],
      },
    });
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {
        ...getLocalSaved.cocktails,
        [drinkId]: [ingredient],
      },
    }));
  };

  useEffect(() => {
    if (localSaved?.cocktails?.[drinkId]?.length === ingredientsArray.length) {
      return setIsDisabled(false);
    }
    setIsDisabled(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSaved, ingredientsArray]);

  const handleStyle = (ingredient) => {
    if (localSaved?.cocktails?.[drinkId].includes(ingredient)) {
      return { textDecoration: 'line-through' };
    }
  };

  return (
    <>
      <h1>Drink In Progress</h1>
      {drinkItem && (
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
            alt={ `Meal: ${drinkItem.strDrink}` }
            width="250px"
          />
          <div>
            <ShareButton
              pathname={ `/drinks/${pathname.split('/')[2]}` }
              testId="share-btn"
            />
            <FavoriteDrinkButton drinkId={ pathname.split('/')[2] } />
          </div>
          <div>
            <h3>Ingredientes</h3>
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
                          onChange={ () => handleLocalSave(ingredient) }
                          checked={ localSaved.cocktails?.[drinkId].includes(ingredient) }
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
            {drinkItem.strInstructions}
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

DrinkInProgressComponent.propTypes = {
  location: shape({
    pathname: string.isRequired,
  }).isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default withRouter(DrinkInProgressComponent);
