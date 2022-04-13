import React from 'react';
import { useHistory } from 'react-router-dom';
import FooterComponent from '../components/FooterComponent';
import Header from '../components/Header';
import '../css/Explore.css';

function Explore() {
  const history = useHistory();

  const handleClickExploreFoods = () => {
    history.push('/explore/foods');
  };

  const handleClickExploreDrinks = () => {
    history.push('/explore/drinks');
  };
  return (
    <div>
      <Header />
      <div className="explore-page">
        <button
          className="button-profile"
          button-profile
          type="button"
          data-testid="explore-foods"
          onClick={ () => handleClickExploreFoods() }
        >
          Explore Foods
        </button>
        <button
          className="button-profile"
          button-profile
          type="button"
          data-testid="explore-drinks"
          onClick={ () => handleClickExploreDrinks() }
        >
          Explore Drinks
        </button>
      </div>
      <FooterComponent />
    </div>
  );
}

export default Explore;
