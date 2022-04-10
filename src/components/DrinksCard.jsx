import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';

const DrinksCard = () => {
  const [arrayToRender, setArrayToRender] = useState([]);
  const { filteredDrinks, isFiltered, isDrinks } = useContext(MyContext);
  const history = useHistory();
  const SHOW_ITEMS = 12;

  useEffect(() => (
    isFiltered ? setArrayToRender(filteredDrinks) : setArrayToRender(isDrinks)),
  [isFiltered, filteredDrinks, isDrinks]);

  return (
    <>
      <h2>Render Drinks</h2>
      {arrayToRender && arrayToRender.slice(0, SHOW_ITEMS).map((drink, index) => (
        <button
          type="button"
          key={ `${drink.idDrink}` }
          data-testid={ `${index}-recipe-card` }
          onClick={ () => history.push(`/drinks/${drink.idDrink}`) }
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
        </button>
      ))}
    </>
  );
};

export default DrinksCard;
