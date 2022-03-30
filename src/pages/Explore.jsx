import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import FooterComponent from '../components/FooterComponent';

function Explore({ history }) {
  const handleClickExploreFoods = () => {
    history.push('/explore/foods');
  };

  const handleClickExploreDrinks = () => {
    history.push('/explore/drinks');
  };
  return (
    <div>
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
  history: PropTypes.node.isRequired,
};

export default withRouter(Explore);
