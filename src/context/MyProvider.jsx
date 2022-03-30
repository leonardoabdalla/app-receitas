import React, { useState } from 'react';
import { node } from 'prop-types';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [foodCategoryFilter, setFoodCategoryFilter] = useState('');
  const [drinkCategoryFilter, setDrinkCategoryFilter] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const contextValue = {
    email,
    updateEmail: (value) => setEmail(value),
    foodCategoryFilter,
    updateFoodCategoryFilter: (category) => setFoodCategoryFilter(category),
    drinkCategoryFilter,
    updateDrinkCategoryFilter: (category) => setDrinkCategoryFilter(category),
    filteredFoods,
    updateFilteredFoods: (foods) => setFilteredFoods(foods),
    filteredDrinks,
    updateFilteredDrinks: (drinks) => setFilteredDrinks(drinks),
    isFiltered,
    updateIsFiltered: (value) => setIsFiltered(value),
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
};

MyProvider.propTypes = {
  children: node.isRequired,
};

export default MyProvider;
