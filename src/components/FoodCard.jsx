import React, { useContext, useEffect, useState } from 'react';
import { shape, func } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { fetchFoods } from '../api/services';
import MyContext from '../context/MyContext';

const FoodCard = ({ history }) => {
  const [foods, setFoods] = useState([]);
  const [arrayToRender, setArrayToRender] = useState([]);
  const { filteredFoods, isFiltered } = useContext(MyContext);

  useEffect(() => {
    const fetchFoodsFunc = async () => {
      const getFoods = await fetchFoods();
      return setFoods(getFoods);
    };
    fetchFoodsFunc();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => (
    isFiltered ? setArrayToRender(filteredFoods) : setArrayToRender(foods)),
  [isFiltered, filteredFoods, foods]);

  return (
    <>
      <h2>Render Foods</h2>
      {arrayToRender && arrayToRender.map((meal, index) => {
        const SHOW_ITEMS = 11;
        if (index > SHOW_ITEMS) return null;
        return (
          <div
            key={ `${meal.idMeal}` }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/foods/${meal.idMeal}`) }
            onKeyDown={ () => history.push(`/foods/${meal.idMeal}`) }
            role="button"
            tabIndex={ index }
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

FoodCard.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default withRouter(FoodCard);
