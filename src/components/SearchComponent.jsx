import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

const SearchComponent = () => {
  const {
    search,
    inputValue,
    setInputValue,
    setFilter,
    handleClick,
  } = useContext(MyContext);

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
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleClick(search) }
      >
        Filter
      </button>
    </div>
  );
};

export default SearchComponent;
