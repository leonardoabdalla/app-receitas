import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { fetchDrinkById } from '../api/services';
import '../styles/DrinkInProgressComponent.css';

const CHECKBOX_CLASS = 'ingredient-step';

const DrinkInProgressComponent = ({ location: { pathname } }) => {
  const [drinkId, setDrinkId] = useState('');
  const [drinkItem, setDrinkItem] = useState({});
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [quantitiesArr, setQuantitiesArr] = useState([]);

  useEffect(() => {
    const getPath = pathname.split('/')[2];
    setDrinkId(getPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (drinkId) {
      const getDrinkById = async () => {
        const getDrink = await fetchDrinkById(drinkId);
        console.log('getDrink', getDrink);
        return setDrinkItem(getDrink[0]);
      };
      getDrinkById();
    }
  }, [drinkId]);

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

  const handleStyle = (index) => {
    const getElemment = document.getElementById(`${index}-ingredient-step`);
    console.log('antes getElemment', getElemment.className);
    if (getElemment.className === CHECKBOX_CLASS) {
      getElemment.className = 'checked-ingredient-step';
      return console.log('dentro getElemment', getElemment.className);
    }
    getElemment.className = CHECKBOX_CLASS;
    return console.log('dentro getElemment', getElemment.className);
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
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => { } }
            >
              Compartilhar
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ () => { } }
            >
              Favoritar
            </button>
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
                      >
                        <input
                          type="checkbox"
                          name={ `${index}-ingredient-step` }
                          onChange={ () => handleStyle(index) }
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
            onClick={ () => { } }
          >
            Finalizar Receita
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
};

export default withRouter(DrinkInProgressComponent);
