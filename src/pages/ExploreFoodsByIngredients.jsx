import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import FooterComponent from '../components/FooterComponent';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function ExploreFoodsByIngredients({ history }) {
  const { exploreFoodsByIngredients } = useContext(MyContext);
  const apiIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    const fetchIngredientsFood = async () => {
      const { meals } = await fetch(apiIngredients).then((response) => response.json());
      setIngredients(meals);
    };
    fetchIngredientsFood();
  }, []);

  const redirectAndFilter = (strIngredient) => {
    exploreFoodsByIngredients(strIngredient);
    history.push('/foods');
  };
  const maxVisibleIng = 12;
  return (
    <>
      <Header />
      <div>
        {
          ingredients.slice(0, maxVisibleIng).map((ingredient, index) => (
            <div
              Key={ index }
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => redirectAndFilter(ingredient.strIngredient) }
              onKeyDown={ () => history.push('/foods') }
              role="button"
              tabIndex={ index }
            >
              <p
                data-testid={ `${index}-card-name` }
              >
                { ingredient.strIngredient }
              </p>
              <img
                data-testid={ `${index}-card-img` }
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
