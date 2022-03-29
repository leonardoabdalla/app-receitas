import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyProvider from './context/MyProvider';
import Login from './pages/Login';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodDetails from './pages/FoodDetails';
import DrinksDetails from './pages/DrinksDetails';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsByIngredients from './pages/ExploreFoodsByIngredients';
import ExploreDrinksByIngredients from './pages/ExploreDrinksByIngredients';
import ExploreFoodsByNationalities from './pages/ExploreFoodsByNationalities';
import FoodInProgress from './pages/FoodInProgress';
import DrinksInProgress from './pages/DrinksInProgress';
import Foods from './pages/Foods';

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
          <Route exact path="/foods" render={ Foods } />
          <Route exact path="/foods/:id" render={ FoodDetails } />
          <Route exact path="/drinks" render={ Drinks } />
          <Route exact path="/drinks/:id" render={ DrinksDetails } />
          <Route exact path="/explore" component={ Explore } />
          <Route path="/profile" render={ Profile } />
          <Route path="/done-recipes" render={ DoneRecipes } />
          <Route path="/drinks/:id/in-progress" render={ DrinksInProgress } />
          <Route path="/foods/:id/in-progress" render={ FoodInProgress } />
          <Route path="/favorite-recipes" render={ FavoriteRecipes } />
          <Route path="/explore/foods" component={ ExploreFoods } />
          <Route path="/explore/drinks" component={ ExploreDrinks } />
          <Route
            path="/explore/foods/ingredients"
            component={ ExploreFoodsByIngredients }
          />
          <Route
            path="/explore/drinks/ingredients"
            component={ ExploreDrinksByIngredients }
          />
          <Route
            path="/explore/foods/nationalities"
            component={ ExploreFoodsByNationalities }
          />
          <Route path="/*" render={ () => (<h1>not found</h1>) } />
        </Switch>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
