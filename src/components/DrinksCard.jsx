import React, { useEffect, useState } from 'react';
import { fetchDrinks } from '../api/services';

const DrinksCard = () => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchDrinksFunc = async () => {
      const getDrinks = await fetchDrinks();
      return setDrinks(getDrinks);
    };
    fetchDrinksFunc();
  }, []);

  return (
    <>
      {drinks.map((drink, index) => {
        const SHOW_ITEMS = 11;
        if (index > SHOW_ITEMS) return null;
        return (
          <div
            key={ `${drink.idDrink}` }
            data-testid={ `${index}-recipe-card` }
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

export default DrinksCard;
