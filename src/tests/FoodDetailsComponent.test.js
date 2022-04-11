import React from 'react';
import { screen, waitForElement, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do componente <FoodDetailsComponent', () => {
  afterEach(() => cleanup);

  it('1 -  Testa se o componente e os cards de recomendação renderizaram.', async () => {
    renderWithRouter(
      <App />,
    );

    const getEmailInput = screen.getByTestId('email-input');
    userEvent.type(getEmailInput, 'test@test.com');

    const getPasswordInput = screen.getByTestId('password-input');
    userEvent.type(getPasswordInput, '1234567');

    const getEnterButton = screen.getByTestId('login-submit-btn');
    userEvent.click(getEnterButton);

    await waitForElement(() => screen.getByTestId('0-recipe-card'));
    const getFirstRecipe = screen.getByTestId('0-recipe-card');
    userEvent.click(getFirstRecipe);

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

  it('2 - Testa o botão de favoritar', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    history.push('/foods/52977');

    localStorage.clear();

    const getIngredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(getIngredient).toBeInTheDocument();

    const getFavoriteButton = screen.getByTestId('favorite-btn');
    expect(getFavoriteButton).toBeInTheDocument();
    userEvent.click(getFavoriteButton);
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(getLocalStorage[0].id).toBe('52977');

    userEvent.click(getFavoriteButton);
    const getLocalStorageAfter = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(getLocalStorageAfter.length).toBe(0);

    localStorage.clear();
  });

  it('3 - Testa se ao clicar o no botão a comida é desfavoritada', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      alcoholicOrNot: '',
      category: 'Side',
      id: '53060',
      image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
      name: 'Burek',
      nationality: 'Croatian',
      type: 'food',
    }]));

    const localTest = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(localTest[0].id).toBe('53060');

    history.push('/foods/53060');

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

  it('4 - Testa o botão de share', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    history.push('/foods/52977');

    const getIngredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(getIngredient).toBeInTheDocument();

    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
  });
});
