import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footer.css';

function FooterComponent() {
  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <nav>
        <Link to="/drinks" className="link">
          <button
            type="button"
            className="foods"
          >
            <img
              data-testid="drinks-bottom-btn"
              src={ drinkIcon }
              alt="Drink Icon"
              className="drinks"
            />
          </button>
        </Link>
        <Link to="/explore">
          <button
            type="button"
            className="foods"
          >
            <img
              data-testid="explore-bottom-btn"
              src={ exploreIcon }
              alt="Explore Icon"
              className="explore"
            />
          </button>
        </Link>
        <Link to="/foods" className="a">
          <button
            type="button"
            className="foods"
          >
            <img
              data-testid="food-bottom-btn"
              src={ mealIcon }
              alt="Meal Icon"
              className="icon"
            />
          </button>
        </Link>
      </nav>
    </footer>
  );
}

export default FooterComponent;
