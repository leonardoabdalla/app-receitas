import React from 'react';
import { screen, waitForElement, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do componente <DrinkDetailsComponent', () => {
  afterEach(() => cleanup);

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

    await waitForElement(() => screen.getByText('Corba'));
    const getTitle = screen.getByText('Corba');

    expect(getTitle).toBeInTheDocument();

    userEvent.click(getTitle);

    await waitForElement(() => screen.getByText('Food Details'));
    const getDrinkTitle = screen.getByText('Food Details');

    expect(getDrinkTitle).toBeInTheDocument();
  });
});
