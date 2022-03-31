import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { shape, func } from 'prop-types';
import FooterComponent from '../components/FooterComponent';
import Header from '../components/Header';

function ExploreFoods({ history }) {
  const api = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const [foodsId, setFoodsId] = useState('');
  useEffect(() => {
    const fetchFoods = async () => {
      const { meals } = await fetch(api).then((response) => response.json());
      setFoodsId(meals[0].idMeal);
    };
    fetchFoods();
  }, []);
  const handleClickByIngredient = () => {
    history.push('/explore/foods/ingredients');
  };

  const handleClickByNationality = () => {
    history.push('/explore/foods/nationalities');
  };

  const handleClickSurprise = () => {
    history.push(`/foods/${foodsId}`);
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

ExploreFoods.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default withRouter(ExploreFoods);
