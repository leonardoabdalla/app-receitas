import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import '../css/Cards.css';

const FoodCard = () => {
  const [arrayToRender, setArrayToRender] = useState([]);
  const { filteredFoods, isFiltered, foods } = useContext(MyContext);
  const SHOW_ITEMS = 12;

  const history = useHistory();

  useEffect(() => (
    isFiltered ? setArrayToRender(filteredFoods) : setArrayToRender(foods)),
  [isFiltered, filteredFoods, foods]);

  return (
    <>
      <h2 className="title-card">Render Foods</h2>
      <div className="card">
        {arrayToRender && arrayToRender.slice(0, SHOW_ITEMS).map((meal, index) => (
          <button
            type="button"
            key={ `${meal.idMeal}` }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/foods/${meal.idMeal}`) }
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
          </button>
        ))}
      </div>

    </>
  );
};

export default FoodCard;
