import React from 'react';
import FooterComponent from '../components/FooterComponent';
import DrinksCard from '../components/DrinksCard';
import Header from '../components/Header';

function Drinks() {
  return (
    <div>
      <Header />
      <DrinksCard />
      <FooterComponent />
    </div>
  );
}

export default Drinks;
