import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do componente DoneRecipes', () => {
  afterEach(() => cleanup);

  const route = '/done-recipes';

  it('1 -  Testa se a página renderiza.', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    history.push(route);

    const getTitle = screen.getByRole('heading', { level: 1, name: 'Done Recipes' });
    expect(getTitle).toBeInTheDocument();
  });

  it('2 - Testa filtros', async () => {
    const drinkName = 'Castillian Hot Chocolate';

    const { history } = renderWithRouter(
      <App />,
    );

    localStorage.setItem('doneRecipes', JSON.stringify([
      {
        alcoholicOrNot: '',
        category: 'Side',
        id: '53060',
        image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
        name: 'Burek',
        nationality: 'Croatian',
        type: 'food',
        doneDate: '02/04/2022',
        tags: ['Streetfood', 'Onthego'],
      },
      {
        alcoholicOrNot: 'Non alcoholic',
        category: 'Cocoa',
        id: '12730',
        image: 'https://www.thecocktaildb.com/images/media/drink/3nbu4a1487603196.jpg',
        name: drinkName,
        nationality: '',
        type: 'drink',
        doneDate: '01/04/2022',
        tags: [],
      },
    ]));

    history.push(route);

    const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(getLocalStorage.length).toBe(2);

    const getFoodName = await screen.findByText('Burek');
    expect(getFoodName).toBeInTheDocument();
    const getDrinkName = screen.getByText(drinkName);
    expect(getDrinkName).toBeInTheDocument();

    const foodButton = screen.getByTestId('filter-by-food-btn');
    expect(foodButton).toBeInTheDocument();
    userEvent.click(foodButton);

    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    expect(drinkButton).toBeInTheDocument();
    userEvent.click(drinkButton);
    const getDrinkNameAfter = await screen.getByText(drinkName);
    expect(getDrinkNameAfter).toBeInTheDocument();

    const allButton = screen.getByTestId('filter-by-all-btn');
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    const getFoodAfterAll = await screen.findByText('Burek');
    expect(getFoodAfterAll).toBeInTheDocument();
    const getDrinkAfterAll = screen.getByText(drinkName);
    expect(getDrinkAfterAll).toBeInTheDocument();

    localStorage.clear();
  });

  it('3 - Testa se redireciona ao clicar', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    localStorage.setItem('doneRecipes', JSON.stringify([
      {
        alcoholicOrNot: '',
        category: 'Side',
        id: '53060',
        image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
        name: 'Burek',
        nationality: 'Croatian',
        type: 'food',
        doneDate: '03/04/2022',
        tags: ['Streetfood', 'Onthego'],
      }]));

    history.push(route);

    const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(getLocalStorage.length).toBe(1);

    const getFoodName = await screen.findByTestId('0-horizontal-div');
    expect(getFoodName).toBeInTheDocument();
    userEvent.click(getFoodName);
    const getTitle = await screen.findByText(/food details/i);
    expect(getTitle).toBeInTheDocument();
  });
});
