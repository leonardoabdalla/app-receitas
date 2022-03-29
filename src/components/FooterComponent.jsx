import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function FooterComponent() {
  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <nav>
        <Link to="/drinks">
          <button
            type="button"
          >
            <img
              data-testid="drinks-bottom-btn"
              src={ drinkIcon }
              alt="Drink Icon"
            />
          </button>
        </Link>
        <Link to="/explore">
          <button
            type="button"
          >
            <img
              data-testid="explore-bottom-btn"
              src={ exploreIcon }
              alt="Explore Icon"
            />
          </button>
        </Link>
        <Link to="/foods">
          <button
            type="button"
          >
            <img
              data-testid="food-bottom-btn"
              src={ mealIcon }
              alt="Meal Icon"
            />
          </button>
        </Link>
      </nav>
    </footer>
  );
}

export default FooterComponent;
