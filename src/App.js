import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyProvider from './context/MyProvider';
import Login from './pages/Login';
import Food from './pages/Food';

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
          <Route path="/food" render={ (props) => <Food { ...props } /> } />
        </Switch>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
