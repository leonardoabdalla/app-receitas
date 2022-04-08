import { screen, waitForElement } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import ExploreDrinks from '../pages/ExploreDrinks';

describe('Teste do componente <ExploreDrinks />', () => {
  it('Teste se a página ExploreDrinks possui um botão com o texto By Ingredient', () => {
    renderWithRouter(<ExploreDrinks />);
    const firstButton = screen.getByRole('button', { name: /By Ingredient/i });
    expect(firstButton).toBeInTheDocument();
  });
  it('Teste se ao clicar no botão de <by Ingredients />,'
      + 'redireciona para a página Explore Ingredients', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks');
    await waitForElement(() => screen.getByRole('button', { name: /By Ingredient/i }));
    userEvent.click(screen.getByRole('button', { name: /by ingredient/i }));
    await waitForElement(() => screen.getByText(/Explore Ingredients/i));
    expect(screen.getByText(/Explore Ingredients/i)).toBeInTheDocument();
  });
  it('Teste se a página Explore Drinks possui um botão com o texto Surprise me!', () => {
    renderWithRouter(<ExploreDrinks />);
    const secondButton = screen.getByRole('button', { name: /surprise me!/i });
    expect(secondButton).toBeInTheDocument();
  });
  it('Teste se ao clicar no botão de Surprise me,'
      + 'redireciona para a página Food Details', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks');
    await waitForElement(() => screen.getByRole('button', { name: /surprise me!/i }));
    userEvent.click(screen.getByRole('button', { name: /surprise me!/i }));
    await waitForElement(() => screen.getByText(/Drink Details/i));
    expect(screen.getByText(/Drink Details/i)).toBeInTheDocument();
  });
});
