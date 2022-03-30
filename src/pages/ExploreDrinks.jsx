import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import FooterComponent from '../components/FooterComponent';

function ExploreDrinks({ history }) {
  const handleClickByIngredient = () => {
    history.push('/explore/drinks/ingredients');
  };
  return (
    <div>
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
      >
        Surprise me!
      </button>
      <FooterComponent />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.node.isRequired,
};

export default withRouter(ExploreDrinks);
