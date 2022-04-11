import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import MyProvider from '../context/MyProvider';
import Foods from '../pages/Foods';

describe('Testa o componente <CategoryFoodFilter />', () => {
  const BeefCategory = 'Beef-category-filter';
  const FirtsBeefRecipe = 'Beef and Mustard Pie';

  beforeEach(() => {
    renderWithRouter(
      <MyProvider>
        <Foods />
      </MyProvider>,
    );
  });

  it('1 - Testa se o botão "Beef" foi renderizado', async () => {
    await waitForElement(() => screen.getByTestId(BeefCategory));
    const getBeefButton = screen.getByTestId(BeefCategory);
    expect(getBeefButton).toBeInTheDocument();
  });

  it('2 - Testa se o filtro "Beef" funciona', async () => {
    await waitForElement(() => screen.getByTestId(BeefCategory));
    const getBeefButton = screen.getByTestId(BeefCategory);

    userEvent.click(getBeefButton);

    await waitForElement(() => screen.getByText(FirtsBeefRecipe));
    const getFirstRecipe = screen.getByText(FirtsBeefRecipe);

    expect(getFirstRecipe).toBeInTheDocument();

    userEvent.click(getBeefButton);

    await waitForElement(() => screen.getByText('Corba'));
    const getFirstUnfilteredRecipe = screen.getByText('Corba');

    expect(getFirstUnfilteredRecipe).toBeInTheDocument();
  });

  it('3 - Testa se o filtro "All" funciona', async () => {
    await waitForElement(() => screen.getByTestId(BeefCategory));
    const getBeefButton = screen.getByTestId(BeefCategory);

    userEvent.click(getBeefButton);

    await waitForElement(() => screen.getByText(FirtsBeefRecipe));
    const getFirstRecipe = screen.getByText(FirtsBeefRecipe);

    expect(getFirstRecipe).toBeInTheDocument();

    await waitForElement(() => screen.getByTestId('All-category-filter'));
    const getAllButton = screen.getByTestId('All-category-filter');

    userEvent.click(getAllButton);

    await waitForElement(() => screen.getByText('Corba'));
    const getFirstAllRecipe = screen.getByText('Corba');

    expect(getFirstAllRecipe).toBeInTheDocument();
  });
});
