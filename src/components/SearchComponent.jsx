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
import '../css/SearchComponent.css';

const SearchComponent = ({ history: { location }, history }) => {
  const {
    filter,
    inputValue,
    setInputValue,
    setFilter,
    updateFilteredFoods,
    updateIsFiltered,
    updateFilteredDrinks,
  } = useContext(MyContext);

  const updateFoodArray = (api) => {
    if (api === null) {
      console.log('api null');
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    updateFilteredFoods(api); // manda a resposta da api para o filteredFoods no MyProvider.
    if (api && api.length === 1) history.push(`/foods/${api[0].idMeal}`);
  };

  const updateDrinksArray = (api) => {
    if (api === null) {
      console.log('api null');
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    updateFilteredDrinks(api); // manda a resposta da api para o filteredDrinks no MyProvider.
    if (api && api.length === 1) history.push(`/drinks/${api[0].idDrink}`);
  };

  const filterByIngredient = async () => {
    console.log('entrou');
    if (location.pathname === '/foods') {
      console.log('entrou2');
      const api = await fetchFoodByIngredient(inputValue);
      console.log(api);
      // mandar o objeto api pra tela

      updateFoodArray(api); // chama a função que vai atualizar o filteredFoods.
    }
    if (location.pathname === '/drinks') {
      const api = await fetchDrinkByIngredient(inputValue);
      console.log(api);
      // mandar o objeto api pra tela

      updateDrinksArray(api); // chama a função que vai atualizar o filteredDrinks.
    }
  };

  const filterByName = async () => {
    if (location.pathname === '/foods') {
      console.log('entrou2');
      const api = await fetchFoodByName(inputValue);
      console.log(api);
      // mandar o objeto api pra tela

      updateFoodArray(api); // chama a função que vai atualizar o filteredFoods.
    }
    if (location.pathname === '/drinks') {
      const api = await fetchDrinkByName(inputValue);
      console.log(api);
      // mandar o objeto api pra tela

      updateDrinksArray(api); // chama a função que vai atualizar o filteredDrinks.
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

        updateFoodArray(api); // chama a função que vai atualizar o filteredFoods.
      }
      if (location.pathname === '/drinks') {
        console.log('entrou2');
        const api = await fetchDrinkByFirstLetter(inputValue);
        console.log(api);
        // mandar o objeto api pra tela

        updateDrinksArray(api); // chama a função que vai atualizar o filteredDrinks.
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

    updateIsFiltered(true); // muda o isFilter para true. No FoodCard/DrinkCard o isFilter = true executa a função que pega o filteredFoods/FilteredDrinks e coloca no arrayToRender.
  };

  return (
    <div className="search-div">
      <input
        placeholder="Search..."
        className="search-input"
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
