import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
import { fetchDrinksCategories, fetchFilteredDrinks } from '../api/services';

const CategoryDrinkFilter = () => {
  const [categories, setCategories] = useState([]);
  const {
    updateDrinkCategoryFilter,
    drinkCategoryFilter,
    updateFilteredDrinks,
    updateIsFiltered,
    isFiltered,
  } = useContext(MyContext);

  useEffect(() => {
    const getCategories = async () => {
      const getCategoriesArr = await fetchDrinksCategories();
      return setCategories(getCategoriesArr);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getFilteredDrinks = async () => {
      const getDrinks = await fetchFilteredDrinks(drinkCategoryFilter);
      return updateFilteredDrinks(getDrinks);
    };
    getFilteredDrinks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drinkCategoryFilter]);

  const handleIsFiltered = ({ target: { name } }) => {
    if (name === 'All') return updateIsFiltered(false);
    if (name === drinkCategoryFilter) return updateIsFiltered(!isFiltered);

    return updateIsFiltered(true);
  };

  return (
    <>
      <div>
        <button
          type="button"
          name="All"
          data-testid="All-category-filter"
          onClick={ (e) => {
            updateDrinkCategoryFilter('');
            handleIsFiltered(e);
          } }
        >
          All
        </button>
      </div>
      <div>
        {categories.map((category, index) => {
          const SHOW_CATEGORIES = 4;
          if (index > SHOW_CATEGORIES) return null;

          return (
            <div key={ category.strCategory }>
              <button
                type="button"
                name={ `${category.strCategory}` }
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ (e) => {
                  updateDrinkCategoryFilter(category.strCategory);
                  handleIsFiltered(e);
                } }
              >
                {category.strCategory}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CategoryDrinkFilter;
