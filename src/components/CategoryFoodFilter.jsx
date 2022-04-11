import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
import { fetchFoodCategories, fetchFilteredFoods } from '../api/services';
import '../css/Category.css';

const CategoryFoodFilter = () => {
  const [categories, setCategories] = useState([]);
  const {
    updateFoodCategoryFilter,
    foodCategoryFilter,
    updateFilteredFoods,
    updateIsFiltered,
    isFiltered,
  } = useContext(MyContext);

  useEffect(() => {
    const getCategories = async () => {
      const getCartegoriesArr = await fetchFoodCategories();
      return setCategories(getCartegoriesArr);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getFilteredFoods = async () => {
      const getFilteredFoodsArr = await fetchFilteredFoods(foodCategoryFilter);
      return updateFilteredFoods(getFilteredFoodsArr);
    };
    getFilteredFoods();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodCategoryFilter]);

  const handleIsFiltered = ({ target: { name } }) => {
    if (name === 'All') return updateIsFiltered(false);
    if (name === foodCategoryFilter) return updateIsFiltered(!isFiltered);
    return updateIsFiltered(true);
  };

  return (
    <div className="categories">
      <div key="All">
        <button
          type="button"
          name="All"
          data-testid="All-category-filter"
          onClick={ (e) => {
            updateFoodCategoryFilter('');
            handleIsFiltered(e);
          } }
        >
          All
        </button>
      </div>
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
                handleIsFiltered(e);
                updateFoodCategoryFilter(category.strCategory);
              } }
            >
              {category.strCategory}
            </button>
          </div>
        );
      })}
    </div>

  );
};

export default CategoryFoodFilter;
