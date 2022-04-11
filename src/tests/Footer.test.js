import React from 'react';
import { screen } from '@testing-library/react';
import FooterComponent from '../components/FooterComponent';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente < FooterComponent />', () => {
  it('Verifica se existe o elemento footer', () => {
    renderWithRouter(<FooterComponent />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Verifica se o componente Footer possui os elementos corretos', () => {
    renderWithRouter(<FooterComponent />);

    const drinksBottonBtn = screen.getByTestId('drinks-bottom-btn');
    const exploreBottonBtn = screen.getByTestId('explore-bottom-btn');
    const foodsBottonBtn = screen.getByTestId('food-bottom-btn');

    expect(drinksBottonBtn).toBeInTheDocument();
    expect(exploreBottonBtn).toBeInTheDocument();
    expect(foodsBottonBtn).toBeInTheDocument();
  });

  it('Verificando se existe 3 botões', () => {
    renderWithRouter(<FooterComponent />);
    const three = 3;
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(three);
  });
});

// npm run test-coverage
