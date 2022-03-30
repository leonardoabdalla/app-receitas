import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import FooterComponent from '../components/FooterComponent';
import Header from '../components/Header';

function ExploreFoods({ history }) {
  const handleClickByIngredient = () => {
    history.push('/explore/foods/ingredients');
  };

  const handleClickByNationality = () => {
    history.push('/explore/foods/Nationalities');
  };

  const handleClickSurprise = () => {
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
        onChange={ () => handleClickSurprise() }
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
