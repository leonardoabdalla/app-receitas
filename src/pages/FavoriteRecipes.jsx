import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/Favorites.css';
// Faz a copia
const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [isCopied, setIsCopied] = useState(false);
  const [arrayToRender, setArrayToRender] = useState([]);
  const [localSaved, setLocalSaved] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const storage = () => {
      const array = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setLocalSaved(array);
      setArrayToRender(array);
    };
    storage();
  }, []);

  const removeItem = (item) => {
    const newFav = arrayToRender.filter((e) => e !== item);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFav));
    setArrayToRender(newFav);
  };

  const handleFilter = (filter) => {
    const filterArr = localSaved.filter((item) => {
      console.log('item.type', item.type);
      console.log('filter', filter.toLowerCase());
      return item.type === filter.toLowerCase();
    });
    console.log('filterArr', filterArr);
    return setArrayToRender(filterArr);
  };

  const sendToItemPage = (item) => {
    if (item.type === 'food') {
      history.push(`/foods/${item.id}`);
    }
    if (item.type === 'drink') {
      history.push(`/drinks/${item.id}`);
    }
  };

  return (
    <div>
      <Header />
      <button
        className="button-profile"
        type="button"
        name="filterFoods"
        id="filterFoods"
        onClick={ () => handleFilter('food') }
        data-testid="filter-by-food-btn"
      >
        Foods
      </button>
      <button
        className="button-profile"
        type="button"
        name="filterDrinks"
        id="filterDrinks"
        onClick={ () => handleFilter('drink') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <button
        className="button-profile"
        type="button"
        name="filterAll"
        id="filterAll"
        onClick={ () => setArrayToRender(localSaved) }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      { arrayToRender && arrayToRender.map((item, index) => (
        <div
          className="favorites-page"
          key={ item.id }
        >
          <div
            role="button"
            onClick={ () => sendToItemPage(item) }
            onKeyDown={ () => sendToItemPage(item) }
            tabIndex={ index }
          >
            <h2
              data-testid={ `${index}-horizontal-name` }
            >
              {item.name}
            </h2>
            <h3
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${item.nationality} - ${item.category} ${item.alcoholicOrNot} `}
            </h3>
            <img
              className="favorite-img"
              data-testid={ `${index}-horizontal-image` }
              src={ item.image }
              alt={ `Meal: ${item.name}` }
              width="250px"
            />
          </div>
          <div>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => { copy(`http://localhost:3000/foods/${item.id}`); setIsCopied(true); } }
              src={ shareIcon }
            >
              {
                !isCopied ? (
                  <img
                    src={ shareIcon }
                    alt="Botão de compartilhar"
                  />
                ) : <span>Link copied!</span>
              }
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => removeItem(item) }
              src={ blackHeartIcon }
            >
              Remover dos Favoritos
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
