import React, { useContext, useEffect, useState } from 'react';
import { shape, func } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { fetchDrinks } from '../api/services';
import MyContext from '../context/MyContext';

const DrinksCard = ({ history }) => {
  const [drinks, setDrinks] = useState([]);
  const [arrayToRender, setArrayToRender] = useState([]);
  const { filteredDrinks, isFiltered } = useContext(MyContext);

  useEffect(() => {
    const fetchDrinksFunc = async () => {
      const getDrinks = await fetchDrinks();
      return setDrinks(getDrinks);
    };
    fetchDrinksFunc();
  }, []);

  useEffect(() => (
    isFiltered ? setArrayToRender(filteredDrinks) : setArrayToRender(drinks)),
  [filteredDrinks, isFiltered, drinks]);

  return (
    <>
      <h2>Render Drinks</h2>
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
    </>
  );
};

DrinksCard.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default withRouter(DrinksCard);
