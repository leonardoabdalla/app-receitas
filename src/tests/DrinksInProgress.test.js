import React from 'react';
import { screen, waitForElement, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes da página DrinksInProgress', () => {
  afterEach(cleanup);

  const route = '/drinks/15997/in-progress';

  it('1 - Testa se a página renderiza ', () => {
    const { history } = renderWithRouter(
      <App />,
    );

    history.push(route);

    const getTitleH1 = screen
      .getByRole('heading', { level: 1, name: /drink in progress/i });

    expect(getTitleH1).toBeInTheDocument();
  });

  it('2 - Testa se os ingredientes renderizam.', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    history.push(route);

    await waitForElement(() => screen.getByTestId('0-ingredient-step'));
    const getCheckbox = screen.getByTestId('0-ingredient-step');

    expect(getCheckbox).toBeInTheDocument();
    expect(getCheckbox).toHaveTextContent('Galliano: 2 1/2 shots');
  });

  it('3 - Testa se ao selecionar todos os checkbox o botão é liberado', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    history.push(route);

    const getFinishButton = screen.getByTestId('finish-recipe-btn');
    expect(getFinishButton.disabled).toBe(true);

    const getAllChecks = await screen.findAllByRole('checkbox');
    getAllChecks.forEach((_, index) => {
      const getCheckbox = screen.getByTestId(`${index}-ingredient-checkbox`);
      expect(getCheckbox).toBeInTheDocument();
      expect(getCheckbox.checked).toBe(false);

      userEvent.click(getCheckbox);
      expect(getCheckbox.checked).toBe(true);
    });

    expect(getFinishButton.disabled).toBe(false);

    const getLocalSaved = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(getLocalSaved)
      .toEqual({ cocktails: { 15997: ['Galliano', 'Ginger ale', 'Ice'] } });

    userEvent.click(getFinishButton);
    const getNextPageTitle = screen.getByText(/done recipes/i);
    expect(getNextPageTitle).toBeInTheDocument();

    localStorage.clear();
  });

  it('4 - Testa se salva o progresso no localStorage', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    localStorage.clear();

    history.push('/drinks/17222/in-progress');

    const getAllChecks = await screen.findAllByRole('checkbox');

    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(getLocalStorage).toEqual({ cocktails: { 17222: [] } });

    getAllChecks.slice(0, 2).forEach((_, index) => {
      const getCheckbox = screen.getByTestId(`${index}-ingredient-checkbox`);
      expect(getCheckbox).toBeInTheDocument();

      userEvent.click(getCheckbox);
      expect(getCheckbox.checked).toBe(true);
    });

    const getLocalSaved = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(getLocalSaved).toEqual({ cocktails: { 17222: ['Gin', 'Grand Marnier'] } });

    const getFirstCheckBox = screen.getByTestId('0-ingredient-checkbox');
    userEvent.click(getFirstCheckBox);

    const getLocalSavedAfter = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(getLocalSavedAfter).toEqual({ cocktails: { 17222: ['Grand Marnier'] } });

    userEvent.click(getFirstCheckBox);

    localStorage.clear();
  });
});
