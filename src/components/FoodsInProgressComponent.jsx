import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { fetchFoodById } from '../api/services';

const FoodDetailsComponent = ({ location: { pathname } }) => {
  const [foodId, setFoodId] = useState('');
  const [foodItem, setFoodItem] = useState({});
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [quantitiesArr, setQuantitiesArr] = useState([]);

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

  const handleStyle = (e) => {
    const styleChecked = e.target;
    styleChecked.className = 'checked-ingredient';
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
                      >
                        {`${ingredient}: ${quantitiesArr[index]}`}
                      </p>
                      <input
                        className="ingrediente-step"
                        type="checkbox"
                        name={ `${index}-ingredient-step` }
                        id={ `${index}-ingredient-step` }
                        onChange={ (e) => handleStyle(e) }
                      />
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
            onClick={ () => { } }
          >
            Finalizar Receita
          </button>

        </div>
      )}
    </>
  );
};

FoodDetailsComponent.propTypes = {
  location: shape({
    pathname: string.isRequired,
  }).isRequired,
};

export default withRouter(FoodDetailsComponent);
