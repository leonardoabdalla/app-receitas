import React, { useContext, useEffect, useState } from 'react';
import { shape, func } from 'prop-types';
import { withRouter } from 'react-router-dom';
import MyContext from '../context/MyContext';
import '../css/Cards.css';

const DrinksCard = ({ history }) => {
  const [arrayToRender, setArrayToRender] = useState([]);
  const { filteredDrinks, isFiltered, isDrinks } = useContext(MyContext);

  useEffect(() => (
    isFiltered ? setArrayToRender(filteredDrinks) : setArrayToRender(isDrinks)),
  [isFiltered, filteredDrinks, isDrinks]);

  return (
    <div className="card">
      {arrayToRender && arrayToRender.map((drink, index) => {
        const SHOW_ITEMS = 11;
        if (index > SHOW_ITEMS) return null;
        return (
          <div
            key={ `${drink.idDrink}` }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/drinks/${drink.idDrink}`) }
            onKeyDown={ () => history.push(`/drinks/${drink.idDrink}`) }
            role="button"
            tabIndex={ index }
          >

            <img
              src={ `${drink.strDrinkThumb}` }
              alt={ `${drink.strDrink}` }
              data-testid={ `${index}-card-img` }
              width="100px"
            />
            <h3
              data-testid={ `${index}-card-name` }
            >
              {drink.strDrink}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

DrinksCard.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default withRouter(DrinksCard);
