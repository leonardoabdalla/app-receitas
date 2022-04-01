import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import ShareButton from './ShareButton';
import '../styles/DoneRecipes.css';

const DoneRecipesComponent = ({ location: { pathname } }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [arrayToRender, setArrayToRender] = useState([]);

  useEffect(() => {
    const getLocalDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getLocalDone) return setArrayToRender(getLocalDone);
  }, []);

  useEffect(() => {
    console.log('activeFilter', activeFilter);
  }, [activeFilter]);

  return (
    <div>

      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setActiveFilter('All') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setActiveFilter('Food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setActiveFilter('Drinks') }
      >
        Drinks
      </button>
      {arrayToRender && arrayToRender.map((item, index) => (
        <div
          type="button"
          key={ item.name }
          className="done-recipes-card"
        >
          <img
            src={ item.image }
            alt={ item.name }
            data-testid={ `${index}-horizontal-image` }
            width="100px"
          />
          <div>

            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {item.alcoholicOrNot}
              {` ${item.nationality} - `}
              {item.category}
            </p>
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              {item.name}
            </p>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {item.doneDate}
            </p>
            <ShareButton
              pathname={ pathname }
              testId={ `${index}-horizontal-share-btn` }
            />
            {item.tags.map((tag) => (
              <p
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ tag }
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

DoneRecipesComponent.propTypes = {
  location: shape({
    pathname: string.isRequired,
  }).isRequired,
};

export default withRouter(DoneRecipesComponent);
