import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import FooterComponent from '../components/FooterComponent';
import Header from '../components/Header';

function ExploreFoodsByIngredients({ history }) {
  const apiIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    const fetchIngredientsFood = async () => {
      const { meals } = await fetch(apiIngredients).then((response) => response.json());
      setIngredients(meals);
    };
    fetchIngredientsFood();
  }, []);
  return (
    <>
      <Header />
      <div>
        {
          ingredients.map((ingredient, index) => (
            // if(index > 12) return null
            <div
              Key={ index }
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => history.push('/foods') }
              onKeyDown={ () => history.push('/foods/') }
              role="button"
              tabIndex={ index }
            >
              <p
                data-testid={ `${ingredient.strIngredient}-card-name` }
              >
                { ingredient.strIngredient }
              </p>
              <img
                data-testid={ `${`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                alt={ ingredient.strIngredient }
              />
            </div>
          ))
        }
      </div>
      <FooterComponent />
    </>
  );
}

ExploreFoodsByIngredients.propTypes = {
  history: PropTypes.node.isRequired,
};

export default withRouter(ExploreFoodsByIngredients);
