import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchComponent from './SearchComponent';

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);

  const history = useHistory();
  const { location: { pathname } } = history;

  if (pathname === '/foods') {
    return (
      <div>
        <header>
          <Link to="/profile">
            <button
              type="button"
              data-testid="profile-top-btn"
              src={ profileIcon }
            >
              <img
                src={ profileIcon }
                alt="Um botão com o design de uma pessoa, que ao ser clicado
        leva o usuário para a página do usuário"
              />
            </button>
          </Link>
          <h1 data-testid="page-title">Foods</h1>
          <button
            type="button"
            onClick={ () => setIsHidden(!isHidden) }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Um botão com o design de três riscos, que ao ser clicado
        mostra as opções de filtragem de comida"
            />
          </button>
        </header>
        { isHidden && <SearchComponent />}
      </div>
    );
  }
  if (pathname === '/drinks') {
    return (
      <div>
        <header>
          <Link to="/profile">
            <button
              type="button"
            >
              <img
                data-testid="profile-top-btn"
                src={ profileIcon }
                alt="Um botão com o design de uma pessoa, que ao ser clicado
        leva o usuário para a página do usuário"
              />
            </button>
          </Link>
          <h1 data-testid="page-title">Drinks</h1>
          <button
            type="button"
            onClick={ () => setIsHidden(!isHidden) }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Um botão com o design de três riscos, que ao ser clicado
        mostra as opções de filtragem de comida"
            />
          </button>
        </header>
        { isHidden && <SearchComponent />}
      </div>
    );
  }
  if (pathname === '/explore/foods/nationalities') {
    return (
      <div>
        <header>
          <Link to="/profile">
            <button
              type="button"
            >
              <img
                data-testid="profile-top-btn"
                src={ profileIcon }
                alt="Um botão com o design de uma pessoa, que ao ser clicado
        leva o usuário para a página do usuário"
              />
            </button>
          </Link>
          <h1 data-testid="page-title">Explore Nationalities</h1>
          <button
            type="button"
            onClick={ () => setIsHidden(!isHidden) }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Um botão com o design de três riscos, que ao ser clicado
        mostra as opções de filtragem de comida"
            />
          </button>
        </header>
        { isHidden && <SearchComponent />}
      </div>
    );
  }
  return (
    <div>
      <header>
        <Link to="/profile">
          <button
            type="button"
          >
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Um botão com o design de uma pessoa, que ao ser clicado
        leva o usuário para a página do usuário"
            />
          </button>
        </Link>
        {
          pathname === '/explore'
            && <h1 data-testid="page-title">Explore</h1>
        }
        {
          pathname === '/profile'
            && <h1 data-testid="page-title">Profile</h1>
        }
        {
          pathname === '/favorite-recipes'
        && <h1 data-testid="page-title">Favorite Recipes</h1>
        }
        {
          pathname === '/done-recipes'
        && <h1 data-testid="page-title">Done Recipes</h1>
        }
        {
          pathname === '/explore/foods/ingredients'
        && <h1 data-testid="page-title">Explore Ingredients</h1>
        }
        {
          pathname === '/explore/foods'
        && <h1 data-testid="page-title">Explore Foods</h1>
        }
        {
          pathname === '/explore/drinks'
        && <h1 data-testid="page-title">Explore Drinks</h1>
        }
        {
          pathname === '/explore/drinks/ingredients'
        && <h1 data-testid="page-title">Explore Ingredients</h1>
        }
      </header>
    </div>
  );
};

export default Header;
