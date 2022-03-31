import React, { useContext, useEffect, useState } from 'react';
import { shape, func } from 'prop-types';
import { withRouter } from 'react-router-dom';
import MyContext from '../context/MyContext';

const FoodCard = ({ history }) => {
  const [arrayToRender, setArrayToRender] = useState([]);
  const { filteredFoods, isFiltered, foods } = useContext(MyContext);

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
