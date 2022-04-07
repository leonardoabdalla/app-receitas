import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import ExploreFoods from '../pages/ExploreFoods';

describe('Teste do componente <ExploreFoods />', () => {
  it('Teste se a página ExploreFoods possui um botão com o texto By Ingredient', () => {
    renderWithRouter(<ExploreFoods />);
    const firstButton = screen.getByRole('button', { name: /By Ingredient/i });
    expect(firstButton).toBeInTheDocument();
  });
  it('Teste se ao clicar no botão de <by Ingredients />,'
      + 'redireciona para a página Explore Ingredients', () => {
    renderWithRouter(<ExploreFoods />);
    const byIngredients = screen.getByRole('button', { name: /By Ingredient/i });
    userEvent.click(byIngredients);
    const pageByIngredients = screen.getByText('Explore Ingredients');
    expect(pageByIngredients).toBeInTheDocument();
  });
  it('Teste se a página Explore Foods possui um botão com o texto By Nationality', () => {
    renderWithRouter(<ExploreFoods />);
    const secondButton = screen.getByRole('button', { name: /by nationality/i });
    expect(secondButton).toBeInTheDocument();
  });
  it('Teste se ao clicar no botão de By Nationality,'
      + 'redireciona para a página Explore Nationalities', () => {
    renderWithRouter(<ExploreFoods />);
    const exploreNationalities = screen.getByRole('button', { name: /by nationality/i });
    userEvent.click(exploreNationalities);
    const newPageExploreDrinks = screen.getByText(/explore nationalities/i);
    expect(newPageExploreDrinks).toBeInTheDocument();
  });
  it('Teste se a página Explore Foods possui um botão com o texto Surprise me!', () => {
    renderWithRouter(<ExploreFoods />);
    const thirdButton = screen.getByRole('button', { name: /surprise me!/i });
    expect(thirdButton).toBeInTheDocument();
  });
  it.only('Teste se ao clicar no botão de Surprise me,'
      + 'redireciona para a página Food Details', () => {
    render(<ExploreFoods />);
    const exploreFoodsSurprise = screen.getByRole('button', { name: /surprise me!/i });
    userEvent.click(exploreFoodsSurprise);
    const name = screen.getByText(/Food Details/i);
    expect(name).toBeInTheDocument();
  });
});
