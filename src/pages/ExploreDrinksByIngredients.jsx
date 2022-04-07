import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FooterComponent from '../components/FooterComponent';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function ExploreDrinksByIngredients() {
  const { exploreDrinksByIngredients } = useContext(MyContext);
  const apiIngredients = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchIngredientsDrinks = async () => {
      const { drinks } = await fetch(apiIngredients).then((response) => response.json());
      setIngredients(drinks);
    };
    fetchIngredientsDrinks();
  }, []);

  const redirectAndFilter = (strIngredient1) => {
    exploreDrinksByIngredients(strIngredient1);
    history.push('/drinks');
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
              onClick={ () => redirectAndFilter(ingredient.strIngredient1) }
              onKeyDown={ () => history.push('/drinks') }
              role="button"
              tabIndex={ index }
            >
              <p
                data-testid={ `${index}-card-name` }
              >
                { ingredient.strIngredient1 }
              </p>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                alt={ ingredient.strIngredient1 }
              />
            </div>
          ))
        }
      </div>
      <FooterComponent />
    </>
  );
}

export default ExploreDrinksByIngredients;
