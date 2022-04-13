import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FooterComponent from '../components/FooterComponent';
import Header from '../components/Header';
import '../css/Profile.css';

function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('user'));
    console.log(getLocalStorage);
    if (getLocalStorage !== null) return setEmail(getLocalStorage.email);
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
      <Header />
      <div className="profile">
        <p className="email-profile" data-testid="profile-email">{ email }</p>
        <button
          className="button-profile"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => handleClickDone() }
        >
          Done Recipes
        </button>
        <button
          className="button-profile"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => handleClickFavorite() }
        >
          Favorite Recipes
        </button>
        <button
          className="button-profile"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => handleClickLogout() }
        >
          Logout
        </button>
      </div>
      <FooterComponent />
    </div>
  );
}

export default Profile;
