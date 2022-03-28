import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyProvider from './context/MyProvider';
import Login from './pages/Login';
import Food from './pages/Food';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodDetails from './pages/FoodDetails';
import DrinksDetails from './pages/DrinksDetails';

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
          <Route path="/food" render={ Food } />
          <Route path="/food/:id" render={ FoodDetails } />
          <Route path="/drinks" render={ Drinks } />
          <Route path="/drinks/:id" render={ DrinksDetails } />
          <Route path="/explore" render={ Explore } />
          <Route path="/profile" render={ Profile } />
          <Route path="/done-recipes" render={ DoneRecipes } />
          <Route path="/favorite-recipes" render={ FavoriteRecipes } />
          <Route path="/*" render={ () => (<h1>not found</h1>) } />
        </Switch>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
