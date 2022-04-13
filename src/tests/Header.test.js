import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do componente <Header /> ', () => {
  const searchTopButtonTestId = 'search-top-btn';
  const searchButtonTestId = 'search-input';
  it('Teste se a página header possui o botão de perfil', () => {
    const { history } = renderWithRouter(
      <App />,
    );

    history.push('/foods');
    const button = screen.getByTestId('profile-top-btn');
    expect(button).toBeInTheDocument();
  });
  it('Teste se ao clicar no botão de perfil', () => {
    const { history } = renderWithRouter(
      <App />,
    );

    history.push('/foods');
    const perfil = screen.getByTestId('profile-top-btn');
    userEvent.click(perfil);
    const email = screen.getByTestId('page-title');
    expect(email).toHaveTextContent('Profile');
  });
  it('Testa header em foods e drinks', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    history.push('/foods');
    const titleFoods = screen.getByRole('heading', { name: 'Foods', level: 2 });
    expect(titleFoods).toBeInTheDocument();
    const buttonSearch = screen.getByTestId(searchTopButtonTestId);
    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);
    const input = screen.getByTestId(searchButtonTestId);
    expect(input).toBeInTheDocument();

    history.push('/drinks');
    const title = screen.getByRole('heading', { name: 'Drinks', level: 2 });
    expect(title).toBeInTheDocument();
    const buttonSearchDrinksPage = screen.getByTestId(searchTopButtonTestId);
    expect(buttonSearchDrinksPage).toBeInTheDocument();
    userEvent.click(buttonSearchDrinksPage);
    const inputDrinksPage = screen.getByTestId(searchButtonTestId);
    expect(inputDrinksPage).toBeInTheDocument();
  });
  it('Testa header em explorar por nacionalidade', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    history.push('/explore/foods/nationalities');
    const title = screen.getByRole('heading', {
      name: 'Explore Nationalities', level: 2,
    });
    expect(title).toBeInTheDocument();
    const buttonSearch = screen.getByTestId(searchTopButtonTestId);
    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);
    const input = screen.getByTestId(searchButtonTestId);
    expect(input).toBeInTheDocument();
  });
  it('Testa header em Explorar', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    history.push('/explore');
    const title = screen.getByRole('heading', {
      name: 'Explore', level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  it('Testa header em Favorite Recipes', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    history.push('/favorite-recipes');
    const title = screen.getByRole('heading', {
      name: 'Favorite Recipes', level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  it('Testa header em Explore Ingredients', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    history.push('/explore/drinks/ingredients');
    const title = screen.getByRole('heading', {
      name: 'Explore Ingredients', level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  it('Testa header em Done Recipes', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    history.push('/done-recipes');
    const title = screen.getByRole('heading', {
      name: 'Done Recipes', level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  it('Testa header em Explore Drinks', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    history.push('/explore/drinks');
    const title = screen.getByRole('heading', {
      name: 'Explore Drinks', level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  it('Testa header em Explore Ingredients', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    history.push('/explore/foods/ingredients');
    const title = screen.getByRole('heading', {
      name: 'Explore Ingredients', level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  it('Testa header em Explore Foods', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    history.push('/explore/foods');
    const title = screen.getByRole('heading', {
      name: 'Explore Foods', level: 2,
    });
    expect(title).toBeInTheDocument();
  });
});
