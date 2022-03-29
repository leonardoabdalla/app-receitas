import React, { useEffect, useState } from 'react';
import { fetchFoods } from '../api/services';

const FoodCard = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoodsFunc = async () => {
      const getFoods = await fetchFoods();
      return setFoods(getFoods);
    };
    fetchFoodsFunc();
  }, []);

  return (
    <>
      {foods.map((meal, index) => {
        const SHOW_ITEMS = 11;
        if (index > SHOW_ITEMS) return null;
        return (
          <div
            key={ `${meal.idMeal}` }
            data-testid={ `${index}-recipe-card` }
          >

            <img
              src={ `${meal.strMealThumb}` }
              alt={ `${meal.strMeal}` }
              data-testid={ `${index}-card-img` }
              width="100px"
            />
            <h3
              data-testid={ `${index}-card-name` }
            >
              {meal.strMeal}
            </h3>
          </div>
        );
      })}
    </>
  );
};

export default FoodCard;
