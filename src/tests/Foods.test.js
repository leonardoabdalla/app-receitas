import { screen } from '@testing-library/react';
import React from 'react';
import Foods from '../pages/Foods';
import renderWithRouter from './renderWithRouter';
import MyProvider from '../context/MyProvider';

describe('Testes da pagina Foods (tela principal), requisitos 25 ao 32', () => {
  beforeEach(() => {
    renderWithRouter(
      <MyProvider>
        <Foods />
      </MyProvider>,
    );
  });

  it('1 - Testa se o componente <Header /> foi renderizado', () => {
    const getProfileButton = screen.getByTestId('profile-top-btn');

    expect(getProfileButton).toBeInTheDocument();
  });

  it('2 - Testa se o componente <CategoryFoodFilter /> foi renderizado', () => {
    const getFilterButton = screen.getByTestId('All-category-filter');

    expect(getFilterButton).toBeInTheDocument();
  });

  it('3 - Testa se o componente <FoodCard /> foi renderizado', () => {
    const getTitle = screen.getByRole('heading', { level: 2, name: 'Render Foods' });

    expect(getTitle).toBeInTheDocument();
  });

  it('4 - Testa se o componente <FooterComponent /> foi renderizado', () => {
    const getDrinksButton = screen.getByTestId('drinks-bottom-btn');

    expect(getDrinksButton).toBeInTheDocument();
  });
});
