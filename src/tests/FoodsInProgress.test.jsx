import React from 'react';
import { screen, waitForElement, cleanup, getByRole, findByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes da página FoodsInProgress', () => {
  afterEach(cleanup);

  const route = '/foods/52977/in-progress';

  it('1 - Testa se a página renderiza ', () => {
    const { history } = renderWithRouter(
      <App />,
    );

    history.push(route);

    const getTitleH1 = screen
      .getByRole('heading', { level: 1, name: /food in progress/i });

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
    expect(getCheckbox).toHaveTextContent('Lentils: 1 cup');
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

    const getLocalSaved = localStorage.getItem('inProgressRecipes');
    expect(getLocalSaved).toBe('{"meals":{"52977":'
      + '["Lentils","Onion","Carrots","Tomato Puree",'
      + '"Cumin","Paprika","Mint","Thyme","Black Pepper",'
      + '"Red Pepper Flakes","Vegetable Stock","Water","Sea Salt"]}}');

    userEvent.click(getFinishButton);
    const getNextPageTitle = screen.getByText(/done recipes/i);
    expect(getNextPageTitle).toBeInTheDocument();

    localStorage.clear();
  });

  it('4 - Testa se salva o progresso no localStorage', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    history.push('foods/53060/in-progress');

    const getAllChecks = await screen.findAllByRole('checkbox');

    const getLocalStorage = localStorage.getItem('inProgressRecipes');
    expect(getLocalStorage).toBe('{"meals":{"53060":[]}}');

    getAllChecks.slice(0, 2).forEach((_, index) => {
      const getCheckbox = screen.getByTestId(`${index}-ingredient-checkbox`);
      expect(getCheckbox).toBeInTheDocument();

      userEvent.click(getCheckbox);
      expect(getCheckbox.checked).toBe(true);
    });

    const getLocalSaved = localStorage.getItem('inProgressRecipes');
    expect(getLocalSaved).toBe('{"meals":{"53060":["Filo Pastry","Minced Beef"]}}');

    const getFirstCheckBox = screen.getByTestId('0-ingredient-checkbox');
    userEvent.click(getFirstCheckBox);

    const getLocalSavedAfter = localStorage.getItem('inProgressRecipes');
    expect(getLocalSavedAfter).toBe('{"meals":{"53060":["Minced Beef"]}}');

    userEvent.click(getFirstCheckBox);

    localStorage.clear();
  });
});
