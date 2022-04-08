import React from 'react';
import { useHistory } from 'react-router-dom';
import FooterComponent from '../components/FooterComponent';
import Header from '../components/Header';

function ExploreFoods() {
  const api = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const history = useHistory();
  const handleClickByIngredient = () => {
    history.push('/explore/foods/ingredients');
  };

  const handleClickByNationality = () => {
    history.push('/explore/foods/nationalities');
  };

  const handleClickSurprise = async () => {
    const { meals } = await fetch(api).then((response) => response.json());
    history.push(`/foods/${meals[0].idMeal}`);
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
        data-testid="explore-by-nationality"
        onClick={ () => handleClickByNationality() }
      >
        By Nationality
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

export default ExploreFoods;
