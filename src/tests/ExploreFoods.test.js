import { screen, waitForElement } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import ExploreFoods from '../pages/ExploreFoods';
import App from '../App';

describe('Teste do componente <ExploreFoods />', () => {
  const rota = '/explore/foods';
  it('Teste se a página ExploreFoods possui um botão com o texto By Ingredient', () => {
    renderWithRouter(<ExploreFoods />);
    const firstButton = screen.getByRole('button', { name: /By Ingredient/i });
    expect(firstButton).toBeInTheDocument();
  });
  it('Teste se ao clicar no botão de <by Ingredients />,'
      + 'redireciona para a página Explore Ingredients', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    await waitForElement(() => screen.getByRole('button', { name: /By Ingredient/i }));
    userEvent.click(screen.getByRole('button', { name: /by ingredient/i }));
    await waitForElement(() => screen.getByText(/Explore Ingredients/i));
    expect(screen.getByText(/Explore Ingredients/i)).toBeInTheDocument();
  });
  it('Teste se a página Explore Foods possui um botão com o texto By Nationality', () => {
    renderWithRouter(<ExploreFoods />);
    const secondButton = screen.getByRole('button', { name: /by nationality/i });
    expect(secondButton).toBeInTheDocument();
  });
  it('Teste se ao clicar no botão de By Nationality,'
      + 'redireciona para a página Explore Nationalities', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    await waitForElement(() => screen.getByRole('button', { name: /by nationality/i }));
    userEvent.click(screen.getByRole('button', { name: /by nationality/i }));
    await waitForElement(() => screen.getByText(/Explore Nationalities/i));
    expect(screen.getByText(/Explore Nationalities/i)).toBeInTheDocument();
  });
  it('Teste se a página Explore Foods possui um botão com o texto Surprise me!', () => {
    renderWithRouter(<ExploreFoods />);
    const thirdButton = screen.getByRole('button', { name: /surprise me!/i });
    expect(thirdButton).toBeInTheDocument();
  });
  it('Teste se ao clicar no botão de Surprise me,'
      + 'redireciona para a página Food Details', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    await waitForElement(() => screen.getByRole('button', { name: /surprise me!/i }));
    userEvent.click(screen.getByRole('button', { name: /surprise me!/i }));
    await waitForElement(() => screen.getByText(/Food Details/i));
    expect(screen.getByText(/Food Details/i)).toBeInTheDocument();
  });
});
