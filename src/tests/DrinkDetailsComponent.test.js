import React from 'react';
import { screen, waitForElement, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do componente <DrinkDetailsComponent', () => {
  afterEach(() => cleanup);

  const route = '/drinks/15997';
  const buttonTestId = 'start-recipe-btn';

  it('1 - Testa se o componente e os cards de recomendação renderizaram. ', async () => {
    renderWithRouter(
      <App />,
    );

    const getEmailInput = screen.getByTestId('email-input');
    userEvent.type(getEmailInput, 'test@test.com');

    const getPasswordInput = screen.getByTestId('password-input');
    userEvent.type(getPasswordInput, '1234567');

    const getEnterButton = screen.getByTestId('login-submit-btn');
    userEvent.click(getEnterButton);

    await waitForElement(() => screen.getByTestId('drinks-bottom-btn'));
    const bottomButton = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(bottomButton);

    await waitForElement(() => screen.getByTestId('0-recipe-card'));
    const getFirstRecipe = screen.getByTestId('0-recipe-card');
    userEvent.click(getFirstRecipe);

    await waitForElement(() => screen.getByTestId('0-ingredient-name-and-measure'));
    const getIngredients = screen.getByTestId('0-ingredient-name-and-measure');
    expect(getIngredients).toBeInTheDocument();

    await waitForElement(() => screen.getByTestId('0-recomendation-card'));
    const getFirstRecCard = screen.getByTestId('0-recomendation-card');

    expect(getFirstRecCard).toBeInTheDocument();

    userEvent.click(getFirstRecCard);

    await waitForElement(() => screen.getByText('GG'));
    const getTitle = screen.getByText('GG');

    expect(getTitle).toBeInTheDocument();

    userEvent.click(getTitle);

    await waitForElement(() => screen.getByText('Drink Details'));
    const getDrinkTitle = screen.getByText('Drink Details');

    expect(getDrinkTitle).toBeInTheDocument();
  });

  it('2 - Testa se ao clicar no botão a bebida é favoritada', () => {
    const { history } = renderWithRouter(
      <App />,
    );

    history.push('/drinks/12730');

    const getFavoriteButton = screen.getByTestId('favorite-btn');
    expect(getFavoriteButton).toBeInTheDocument();
    userEvent.click(getFavoriteButton);
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(getLocalStorage.length).toBe(1);

    localStorage.clear();
  });

  it('3 - Testa se ao clicar o no botão a bebida é desfavoritada', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      alcoholicOrNot: 'Non alcoholic',
      category: 'Cocoa',
      id: '12730',
      image: 'https://www.thecocktaildb.com/images/media/drink/3nbu4a1487603196.jpg',
      name: 'Castillian Hot Chocolate',
      nationality: '',
      type: 'drink',
    }]));

    const localTest = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(localTest[0].id).toBe('12730');

    history.push('/drinks/12730');

    const getIngredient = await screen.findByTestId('1-ingredient-name-and-measure');
    expect(getIngredient).toBeInTheDocument();

    const getButton = screen.getByAltText(/comida favoritada/i);
    expect(getButton).toBeInTheDocument();

    const getFavoriteButton = screen.getByTestId('favorite-btn');
    expect(getFavoriteButton).toBeInTheDocument();
    userEvent.click(getFavoriteButton);
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(getLocalStorage.length).toBe(0);

    localStorage.clear();
  });

  it('4 - Testa se o botão "Start Recipe" não aparece', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    localStorage.setItem('doneRecipes', JSON.stringify(
      [{
        alcoholicOrNot: 'Optional alcohol',
        category: 'Ordinary Drink',
        id: '15997',
        image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
        name: 'GG',
        nationality: '',
        type: 'drink',
        doneDate: '',
        tags: [],
      },
      {
        alcoholicOrNot: 'Non alcoholic',
        category: 'Cocoa',
        id: '12730',
        image: 'https://www.thecocktaildb.com/images/media/drink/3nbu4a1487603196.jpg',
        name: 'Castillian Hot Chocolate',
        nationality: '',
        type: 'drink',
        doneDate: '',
        tags: [],
      },
      ],
    ));

    history.push(route);

    const getStartButton = await screen.findByTestId(buttonTestId);
    expect(getStartButton).not.toBeInTheDocument();

    localStorage.clear();
  });

  it('5 - Testa se o texto "Continue Recipe" aparece', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    localStorage.setItem('inProgressRecipes', JSON.stringify(
      { cocktails: { 15997: ['Galliano', 'Ginger ale', 'Ice'] } },
    ));

    history.push(route);

    const getStartButton = await screen.findByTestId(buttonTestId);
    expect(getStartButton).toHaveTextContent('Continue Recipe');

    userEvent.click(getStartButton);
    const getTitle = await screen.findByText(/drink in progress/i);
    expect(getTitle).toBeInTheDocument();

    localStorage.clear();
  });

  it('6 - Testa se redireciona para Drink In Progress', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    localStorage.setItem('inProgressRecipes', JSON.stringify(
      { cocktails: { 15997: [] } },
    ));

    history.push(route);

    const getStartButton = screen.getByTestId(buttonTestId);
    userEvent.click(getStartButton);

    const getTitle = await screen.findByText(/drink in progress/i);
    expect(getTitle).toBeInTheDocument();

    localStorage.clear();
  });

  it('7 - Testa se o card de recomendação redireciona', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    history.push(route);

    const getRedCard = screen.getByTestId('0-recomendation-button');
    userEvent.click(getRedCard);

    const getTitle = await screen.findByText(/food details/i);
    expect(getTitle).toBeInTheDocument();
  });
});
