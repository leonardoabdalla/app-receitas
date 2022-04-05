import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Profile from '../pages/Profile';

describe('Teste a pagina <Profile />', () => {
  it('Verifica se existe o elemento Profile', () => {
    renderWithRouter(<Profile />);
    const profile = screen.getByTestId('profile-email');
    expect(profile).toBeInTheDocument();
  });

  it('Verifica se a pagina <Profile /> possui os elementos corretos', () => {
    renderWithRouter(<Profile />);

    const profileEmail = screen.getByTestId('profile-email');
    const profileprofileDoneBtn = screen.getByTestId('profile-done-btn');
    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    const profilelogoutBtn = screen.getByTestId('profile-logout-btn');

    expect(profileEmail).toBeInTheDocument();
    expect(profileprofileDoneBtn).toBeInTheDocument();
    expect(profileFavoriteBtn).toBeInTheDocument();
    expect(profilelogoutBtn).toBeInTheDocument();
  });

  it('Verificando se existe 3 botões', () => {
    renderWithRouter(<Profile />);
    const seven = 7;
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(seven);
  });

  it(`Verifica se quando clica no botão de Done Recipies
   redireciona para a página certa`, () => {
    const { history } = renderWithRouter(<Profile />);
    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(profileDoneBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  it(`Verifica se quando clica no botão de Favorite Recipes
   redireciona para a página certa`, () => {
    const { history } = renderWithRouter(<Profile />);
    const profilefavoriteBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(profilefavoriteBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  it(`Verifica se quando clica no botão de Logout
   redireciona para a página certa`, () => {
    const { history } = renderWithRouter(<Profile />);
    const profilelogoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(profilelogoutBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Teste xxxxxxxxxxxx', () => {
    renderWithRouter(<Profile />);
    screen.findByText('email');
  });
});

// Falta um teste para cobrir a linha 13.

// npm run test-coverage
