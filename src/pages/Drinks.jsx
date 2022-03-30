import React from 'react';
import FooterComponent from '../components/FooterComponent';
import DrinksCard from '../components/DrinksCard';
import Header from '../components/Header';
import CategoryDrinkFilter from '../components/CategoryDrinkFilter';

function Drinks() {
  return (
    <div>
      <Header />
      <CategoryDrinkFilter />
      <DrinksCard />
      <FooterComponent />
    </div>
  );
}

export default Drinks;
