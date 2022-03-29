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
