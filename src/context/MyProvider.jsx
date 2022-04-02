import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import MyContext from './MyContext';
import { fetchFoods } from '../api/services';

const MyProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [filter, setFilter] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [foodCategoryFilter, setFoodCategoryFilter] = useState('');
  const [drinkCategoryFilter, setDrinkCategoryFilter] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [foods, setFoods] = useState([]);
  const [favoriteDrink, setFavoriteDrinks] = useState([]);
  const [favoriteFoods, setFavoriteFoods] = useState({});

  useEffect(() => {
    const fetchFoodsFunc = async () => {
      const getFoods = await fetchFoods();
      return setFoods(getFoods);
    };
    fetchFoodsFunc();
  }, []);

  const contextValue = {
    email,
    updateEmail: (value) => setEmail(value),
    favoriteDrink,
    setFavoriteDrinks,
    favoriteFoods,
    setFavoriteFoods,
    inputValue,
    setInputValue,
    filter,
    setFilter,
    foodCategoryFilter,
    foods,
    setFoods,
    updateFoodCategoryFilter: (category) => setFoodCategoryFilter(category),
    drinkCategoryFilter,
    updateDrinkCategoryFilter: (category) => setDrinkCategoryFilter(category),
    filteredFoods,
    updateFilteredFoods: (food) => setFilteredFoods(food),
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
