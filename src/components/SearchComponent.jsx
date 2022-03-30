import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { shape, func } from 'prop-types';
import MyContext from '../context/MyContext';
import { fetchFoodByIngredient,
  fetchFoodByName,
  fetchFoodByFirstLetter,
  fetchDrinkByIngredient,
  fetchDrinkByName,
  fetchDrinkByFirstLetter,
} from '../api/services';

const SearchComponent = ({ history: { location } }) => {
  const {
    filter,
    inputValue,
    setInputValue,
    setFilter,
  } = useContext(MyContext);

  const filterByIngredient = async () => {
    console.log('entrou');
    if (location.pathname === '/foods') {
      console.log('entrou2');
      const api = await fetchFoodByIngredient(inputValue);
      console.log(api);
      // mandar o objeto api pra tela
    }
    if (location.pathname === '/drinks') {
      const api = await fetchDrinkByIngredient(inputValue);
      console.log(api);
      // mandar o objeto api pra tela
    }
  };

  const filterByName = async () => {
    if (location.pathname === '/foods') {
      console.log('entrou2');
      const api = await fetchFoodByName(inputValue);
      console.log(api);
      // mandar o objeto api pra tela
    }
    if (location.pathname === '/drinks') {
      const api = await fetchDrinkByName(inputValue);
      console.log(api);
      // mandar o objeto api pra tela
    }
  };

  const filterByLetter = async () => {
    if (inputValue.length > 1) {
      console.log('entrou no tamanho inválido');
      return global.alert('Your search must have only 1 (one) character');
    }
    if (inputValue.length === 1) {
      if (location.pathname === '/foods') {
        console.log('entrou if food');
        const api = await fetchFoodByFirstLetter(inputValue);
        console.log(api);
      // mandar o objeto api pra tela
      }
      if (location.pathname === '/drinks') {
        console.log('entrou2');
        const api = await fetchDrinkByFirstLetter(inputValue);
        console.log(api);
      // mandar o objeto api pra tela
      }
    }
  };

  const handleClick = async () => {
    if (filter.searchType === 'ingredient') {
      filterByIngredient();
    }
    if (filter.searchType === 'name') {
      filterByName();
    }
    if (filter.searchType === 'letter') {
      filterByLetter();
    }
  };

  return (
    <div>
      <input
        placeholder="Search..."
        type="text"
        id="searchInput"
        name="searchInput"
        value={ inputValue }
        data-testid="search-input"
        onChange={ ({ target }) => setInputValue(target.value) }
      />
      <label htmlFor="ingredient">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="searchType"
          value="ingredient"
          onChange={ ({ target }) => setFilter({ [target.name]: target.value }) }
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name"
          name="searchType"
          value="name"
          onChange={ ({ target }) => setFilter({ [target.name]: target.value }) }
        />
        Name
      </label>
      <label htmlFor="letter">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="letter"
          name="searchType"
          value="letter"
          onChange={ ({ target }) => setFilter({ [target.name]: target.value }) }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          handleClick();
        } }
      >
        Search
      </button>
    </div>
  );
};

SearchComponent.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default withRouter(SearchComponent);
