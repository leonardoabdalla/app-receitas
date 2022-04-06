import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drinks from '../pages/Drinks';
import MyProvider from '../context/MyProvider';
import renderWithRouter from './renderWithRouter';

describe('Testes do componente <CategoryDrinkFilter />', () => {
  const CocktailFilter = 'Cocktail-category-filter';
  const FirtsCocktailRecipe = '155 Belmont';

  beforeEach(() => {
    renderWithRouter(
      <MyProvider>
        <Drinks />
      </MyProvider>,
    );
  });

  it('1 - Testa se o botão "Beef" foi renderizado', async () => {
    await waitForElement(() => screen.getByTestId(CocktailFilter));
    const getCocktailButton = screen.getByTestId(CocktailFilter);
    expect(getCocktailButton).toBeInTheDocument();
  });

  it('2 - Testa se o filtro "Beef" funciona', async () => {
    await waitForElement(() => screen.getByTestId(CocktailFilter));
    const getCocktailButton = screen.getByTestId(CocktailFilter);

    userEvent.click(getCocktailButton);

    await waitForElement(() => screen.getByText(FirtsCocktailRecipe));
    const getFirstRecipe = screen.getByText(FirtsCocktailRecipe);

    expect(getFirstRecipe).toBeInTheDocument();

    userEvent.click(getCocktailButton);

    await waitForElement(() => screen.getByText('GG'));
    const getFirstUnfilteredRecipe = screen.getByText('GG');

    expect(getFirstUnfilteredRecipe).toBeInTheDocument();
  });

  it('3 - Testa se o filtro "All" funciona', async () => {
    await waitForElement(() => screen.getByTestId(CocktailFilter));
    const getCocktailButton = screen.getByTestId(CocktailFilter);

    userEvent.click(getCocktailButton);

    await waitForElement(() => screen.getByText(FirtsCocktailRecipe));
    const getFirstRecipe = screen.getByText(FirtsCocktailRecipe);

    expect(getFirstRecipe).toBeInTheDocument();

    await waitForElement(() => screen.getByTestId('All-category-filter'));
    const getAllButton = screen.getByTestId('All-category-filter');

    userEvent.click(getAllButton);

    await waitForElement(() => screen.getByText('GG'));
    const getFirstAllRecipe = screen.getByText('GG');

    expect(getFirstAllRecipe).toBeInTheDocument();
  });
});
