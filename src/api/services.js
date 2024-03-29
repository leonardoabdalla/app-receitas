export const fetchFoods = () => {
  const getFoods = fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => data.meals);
  return getFoods;
};

export const fetchDrinks = () => {
  const getDrinks = fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => data.drinks);
  return getDrinks;
};

export const fetchFoodCategories = () => {
  const getFoodCategories = fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((data) => data.meals);
  return getFoodCategories;
};

export const fetchDrinksCategories = () => {
  const getDrinksCategories = fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((data) => data.drinks);
  return getDrinksCategories;
};

export const fetchFilteredFoods = (filter) => {
  if (filter) {
    const getFilteredFoods = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`)
      .then((response) => response.json())
      .then((data) => data.meals);
    return getFilteredFoods;
  }
};

export const fetchFilteredDrinks = (filter) => {
  if (filter) {
    const getFilteredDrinks = fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`,
    ).then((response) => response.json())
      .then((data) => data.drinks);
    return getFilteredDrinks;
  }
};

export const fetchFoodById = (id) => {
  const getFoodById = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => data.meals);
  return getFoodById;
};

export const fetchDrinkById = (id) => {
  const getDrinkById = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => data.drinks);
  return getDrinkById;
};

export const fetchFoodByIngredient = async (ingredient) => {
  const result = await ((await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)).json());
  return result.meals;
};

export const fetchFoodByName = async (name) => {
  const result = await ((await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)).json());
  return result.meals;
};

export const fetchFoodByFirstLetter = async (firstLetter) => {
  const result = await ((await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)).json());
  return result.meals;
};

export const fetchDrinkByIngredient = async (ingredient) => {
  const result = await ((await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)).json());
  return result.drinks;
};

export const fetchDrinkByName = async (name) => {
  const result = await ((await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)).json());
  return result.drinks;
};

export const fetchDrinkByFirstLetter = async (firstLetter) => {
  const result = await ((await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`)).json());
  return result.drinks;
};
