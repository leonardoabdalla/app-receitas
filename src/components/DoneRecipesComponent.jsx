import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ShareButton from './ShareButton';
import '../styles/DoneRecipes.css';

const DoneRecipesComponent = () => {
  const [arrayToRender, setArrayToRender] = useState([]);
  const [localSaved, setLocalSaved] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const getLocalDone = JSON.parse(localStorage.getItem('doneRecipes'));
    setLocalSaved(getLocalDone);
    setArrayToRender(getLocalDone);
  }, []);

  const handleFilter = (filter) => {
    const filterArr = localSaved.filter((item) => item.type === filter.toLowerCase());
    return setArrayToRender(filterArr);
  };

  return (
    <div>

      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setArrayToRender(localSaved) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => handleFilter('Food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilter('Drink') }
      >
        Drink
      </button>
      {arrayToRender && arrayToRender.map((item, index) => (
        <>
          <button
            type="button"
            key={ item.name }
            className="done-recipes-card"
            onClick={ () => history.push(`/${item.type}s/${item.id}`) }
            data-testid={ `${index}-horizontal-div` }
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
              {item.tags.map((tag) => (
                <p
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ tag }
                >
                  {tag}
                </p>
              ))}
            </div>
          </button>
          <ShareButton
            pathname={ `/${item.type}s/${item.id}` }
            testId={ `${index}-horizontal-share-btn` }
          />
        </>
      ))}
    </div>
  );
};

export default DoneRecipesComponent;
