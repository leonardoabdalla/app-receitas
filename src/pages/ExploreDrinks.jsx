import React from 'react';
import { useHistory } from 'react-router-dom';
import FooterComponent from '../components/FooterComponent';
import Header from '../components/Header';

function ExploreDrinks() {
  const api = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const history = useHistory();

  const handleClickByIngredient = () => {
    history.push('/explore/drinks/ingredients');
  };

  const handleClickSurprise = async () => {
    const { drinks } = await fetch(api).then((response) => response.json());
    history.push(`/drinks/${drinks[0].idDrink}`);
  };
  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => handleClickByIngredient() }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => handleClickSurprise() }
      >
        Surprise me!
      </button>
      <FooterComponent />
    </div>
  );
}

//
export default ExploreDrinks;
