import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
// import MyProvider from '../context/MyProvider';
import Explore from '../pages/Explore';

describe('Teste do componente <Explore />', () => {
  it('Teste se a página explore possui um botão com o texto Explore Foods', () => {
    renderWithRouter(<Explore />);
    const firstButton = screen.getByRole('button', { name: /explore foods/i });
    expect(firstButton).toBeInTheDocument();
  });
  it('Teste se ao clicar no botão de <Explore Foods />,'
    + 'redireciona para a página <Explore Foods />', () => {
    renderWithRouter(<Explore />);
    const exploreFoods = screen.getByRole('button', { name: /explore foods/i });
    userEvent.click(exploreFoods);
    const newPageExploreFoods = screen.getByRole('heading', { name: /explore foods/i });
    expect(newPageExploreFoods).toBeInTheDocument();
  });
  it('Teste se a página explore possui um botão com o texto Explore Drinks', () => {
    renderWithRouter(<Explore />);
    const secondButton = screen.getByRole('button', { name: /explore drinks/i });
    expect(secondButton).toBeInTheDocument();
  });
  it('Teste se ao clicar no botão de <Explore Drinks />,'
    + 'redireciona para a página <Explore Drinks />', () => {
    renderWithRouter(<Explore />);
    const exploreDrinks = screen.getByRole('button', { name: /explore drinks/i });
    userEvent.click(exploreDrinks);
    const newPageExploreDrinks = screen.getByRole('heading', { name: /explore drinks/i });
    expect(newPageExploreDrinks).toBeInTheDocument();
  });
});
