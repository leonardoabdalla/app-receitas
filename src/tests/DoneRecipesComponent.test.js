import React from 'react';
import { screen } from '@testing-library/react';
import DoneRecipesComponent from '../components/DoneRecipesComponent';
import renderWithRouter from './renderWithRouter';
import '@testing-library/jest-dom';

describe('Teste o componente < DoneRecipesComponent />', () => {
  it('Verifica se o componente DoneRecipes possui os elementos corretos', () => {
    renderWithRouter(<DoneRecipesComponent />);

    const filterAllBtn = screen.getByTestId('filter-by-all-btn');
    const filterFoodBtn = screen.getByTestId('filter-by-food-btn');
    const filterDrinkBtn = screen.getByTestId('filter-by-drink-btn');

    expect(filterAllBtn).toBeInTheDocument();
    expect(filterFoodBtn).toBeInTheDocument();
    expect(filterDrinkBtn).toBeInTheDocument();
  });

  it('Verificando se existe 3 botões', () => {
    renderWithRouter(<DoneRecipesComponent />);
    const three = 3;
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(three);
  });
});
