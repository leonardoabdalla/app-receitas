import React from 'react';
import { screen, waitForElement, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do componente <FoodDetailsComponent', () => {
  afterEach(() => cleanup);

  const route = '/foods/52977';
  const buttonTestId = 'start-recipe-btn';

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

    history.push(route);

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

    history.push(route);

    const getIngredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(getIngredient).toBeInTheDocument();

    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();

    localStorage.clear();
  });

  it('5 - Testa se o botão "Start Recipe" não aparece', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    localStorage.setItem('doneRecipes', JSON.stringify(
      [{
        alcoholicOrNot: '',
        category: 'Side',
        id: '52977',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        name: 'Corba',
        nationality: 'Turkish',
        type: 'food',
        doneDate: '',
        tags: [],
      },
      {
        alcoholicOrNot: '',
        category: 'Side',
        id: '53060',
        image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
        name: 'Burek',
        nationality: 'Croatian',
        type: 'food',
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

  it('6 - Testa se o texto "Continue Recipe" aparece', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    localStorage.setItem('inProgressRecipes', JSON.stringify(
      { meals: { 52977: [] } },
    ));

    history.push(route);

    const getStartButton = await screen.findByTestId(buttonTestId);
    expect(getStartButton).toHaveTextContent('Continue Recipe');

    userEvent.click(getStartButton);
    const getTitle = await screen.findByText(/food in progress/i);
    expect(getTitle).toBeInTheDocument();

    localStorage.clear();
  });

  it('7 - Testa se redireciona para Drink In Progress', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    localStorage.setItem('inProgressRecipes', JSON.stringify(
      { meals: { 52977: [] } },
    ));

    history.push(route);

    const getStartButton = screen.getByTestId(buttonTestId);
    userEvent.click(getStartButton);

    const getTitle = await screen.findByText(/food in progress/i);
    expect(getTitle).toBeInTheDocument();

    localStorage.clear();
  });
});
