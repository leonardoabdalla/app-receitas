import React from 'react';
import { shape, func } from 'prop-types';
import { withRouter } from 'react-router-dom';
import FooterComponent from '../components/FooterComponent';
import Header from '../components/Header';

function Explore({ history }) {
  const handleClickExploreFoods = () => {
    history.push('/explore/foods');
  };

  const handleClickExploreDrinks = () => {
    history.push('/explore/drinks');
  };
  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="explore-foods"
        onClick={ () => handleClickExploreFoods() }
      >
        Explore Foods
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => handleClickExploreDrinks() }
      >
        Explore Drinks
      </button>
      <FooterComponent />
    </div>
  );
}

Explore.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default withRouter(Explore);
