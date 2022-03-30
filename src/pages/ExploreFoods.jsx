import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import FooterComponent from '../components/FooterComponent';

function ExploreFoods({ history }) {
  const handleClickByIngredient = () => {
    history.push('/explore/foods/ingredients');
  };

  const handleClickByNationality = () => {
    history.push('/explore/foods/Nationalities');
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
        data-testid="explore-by-nationality"
        onClick={ () => handleClickByNationality() }
      >
        By Nationality
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

ExploreFoods.propTypes = {
  history: PropTypes.node.isRequired,
};

export default withRouter(ExploreFoods);
