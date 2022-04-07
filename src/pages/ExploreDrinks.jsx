import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FooterComponent from '../components/FooterComponent';
import Header from '../components/Header';

function ExploreDrinks() {
  const api = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const [drinksId, setDrinksId] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchDrinks = async () => {
      const { drinks } = await fetch(api).then((response) => response.json());
      setDrinksId(drinks[0].idDrink);
    };
    fetchDrinks();
  }, []);

  const handleClickByIngredient = () => {
    history.push('/explore/drinks/ingredients');
  };

  const handleClickSurprise = () => {
    history.push(`/drinks/${drinksId}`);
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
