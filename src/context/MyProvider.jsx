import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import MyContext from './MyContext';
import { fetchFoods, fetchDrinks } from '../api/services';

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
  const [isDrinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchFoodsFunc = async () => {
      const getFoods = await fetchFoods();
      return setFoods(getFoods);
    };
    fetchFoodsFunc();
  }, []);

  useEffect(() => {
    const fetchDrinksFunc = async () => {
      const getFoods = await fetchDrinks();
      return setDrinks(getFoods);
    };
    fetchDrinksFunc();
  }, []);

  const exploreFoodsByIngredients = (strIngredient) => {
    const fetchFoodByIngredient = async () => {
      const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`).then((response) => response.json());
      setFoods(meals);
    };
    fetchFoodByIngredient();
  };

  const exploreDrinksByIngredients = (strIngredient1) => {
    const fetchDrinksByIngredient = async () => {
      const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${strIngredient1}`).then((response) => response.json());
      setDrinks(drinks);
    };
    fetchDrinksByIngredient();
  };

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
    isDrinks,
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
    exploreFoodsByIngredients,
    exploreDrinksByIngredients,
    setFilteredFoods,
    setIsFiltered,
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
