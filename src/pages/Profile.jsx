import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import FooterComponent from '../components/FooterComponent';

function Profile({ history }) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('user'));
    console.log(getLocalStorage);
    setEmail(getLocalStorage.email);
  }, []);

  const handleClickDone = () => {
    history.push('/done-recipes');
  };

  const handleClickFavorite = () => {
    history.push('/favorite-recipes');
  };

  const handleClickLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <p data-testid="profile-email">{ email }</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => handleClickDone() }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => handleClickFavorite() }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => handleClickLogout() }
      >
        Logout
      </button>
      <FooterComponent />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.node.isRequired,
};

export default withRouter(Profile);
