import React from 'react';
import { screen, waitForElement, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes da página FoodsInProgress', () => {
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

    await waitForElement(() => screen.getByTestId('0-recipe-card'));
    const getFirstRecipe = screen.getByTestId('0-recipe-card');
    userEvent.click(getFirstRecipe);

    await waitForElement(() => screen.getByTestId('start-recipe-btn'));
    const getStartButton = screen.getByTestId('start-recipe-btn');

    expect(getStartButton).toBeInTheDocument();

    userEvent.click(getStartButton);

    await waitForElement(() => screen.getByText('Food In Progress'));
    const getTitle = screen.getByText('Food In Progress');

    expect(getTitle).toBeInTheDocument();

    await waitForElement(() => screen.getByTestId('0-ingredient-step'));
    const getCheckbox = screen.getByTestId('0-ingredient-step');

    expect(getCheckbox).toBeInTheDocument();

    userEvent.click(getCheckbox);

    expect(getCheckbox).toHaveTextContent('Lentils: 1 cup');
  });
});
