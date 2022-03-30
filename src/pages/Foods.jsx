import React from 'react';
import FooterComponent from '../components/FooterComponent';
import Header from '../components/Header';
import FoodCard from '../components/FoodCard';
import CategoryFoodFilter from '../components/CategoryFoodFilter';

function Foods() {
  return (
    <div>
      <button
        type="button"
        onClick={ () => handleClickExploreFoods() }
      >
        explore foods
      </button>
      <Header />
      <CategoryFoodFilter />
      <FoodCard />
      <FooterComponent />
    </div>
  );
}

export default Foods;
