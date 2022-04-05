import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Header from '../components/Header';
import MyProvider from '../context/MyProvider';

describe('Testes do componente <Header /> ', () => {
  const headerProps = { isHidden: true };
  it('Teste se a página header possui o botão de perfil', () => {
    renderWithRouter(<Header />);
    const button = screen.getByTestId('profile-top-btn');
    expect(button).toBeInTheDocument();
  });
  it('Teste se ao clicar no botão de perfil', () => {
    renderWithRouter(<Header />);
    const perfil = screen.getByTestId('profile-top-btn');
    userEvent.click(perfil);
    const email = screen.getByTestId('page-title');
    expect(email).toHaveTextContent('Profile');
  });
  it('Testa header em foods e drinks', () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <Header { ...headerProps } />
      </MyProvider>,
    );
    history.push('/foods');
    const titleFoods = screen.getByRole('heading', { name: 'Foods', level: 2 });
    expect(titleFoods).toBeInTheDocument();
    const buttonSearch = screen.getByTestId('search-top-btn');
    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);
    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();

    history.push('/drinks');
    const title = screen.getByRole('heading', { name: 'Drinks', level: 2 });
    expect(title).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);
    expect(input).toBeInTheDocument();
  });
  it('Testa header em explorar por nacionalidade', () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <Header { ...headerProps } />
      </MyProvider>,
    );
    history.push('/explore/foods/nationalities');
    const title = screen.getByRole('heading', {
      name: 'Explore Nationalities', level: 2,
    });
    expect(title).toBeInTheDocument();
    const buttonSearch = screen.getByTestId('search-top-btn');
    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);
    expect(input).toBeInTheDocument();
  });
  it('Testa header em Explorar', () => {
    const { history } = renderWithRouter(<Header />);
    history.push('/explore');
    const title = screen.getByRole('heading', {
      name: 'Explore', level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  it('Testa header em Favorite Recipes', () => {
    const { history } = renderWithRouter(<Header />);
    history.push('/favorite-recipes');
    const title = screen.getByRole('heading', {
      name: 'Favorite Recipes', level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  it('Testa header em Explore Ingredients', () => {
    const { history } = renderWithRouter(<Header />);
    history.push('/explore/drinks/ingredients');
    const title = screen.getByRole('heading', {
      name: 'Explore Ingredients', level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  it('Testa header em Done Recipes', () => {
    const { history } = renderWithRouter(<Header />);
    history.push('/done-recipes');
    const title = screen.getByRole('heading', {
      name: 'Done Recipes', level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  it('Testa header em Explore Drinks', () => {
    const { history } = renderWithRouter(<Header />);
    history.push('/explore/drinks');
    const title = screen.getByRole('heading', {
      name: 'Explore Drinks', level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  it('Testa header em Explore Ingredients', () => {
    const { history } = renderWithRouter(<Header />);
    history.push('/explore/foods/ingredients');
    const title = screen.getByRole('heading', {
      name: 'Explore Ingredients', level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  it('Testa header em Explore Foods', () => {
    const { history } = renderWithRouter(<Header />);
    history.push('/explore/foods');
    const title = screen.getByRole('heading', {
      name: 'Explore Foods', level: 2,
    });
    expect(title).toBeInTheDocument();
  });
});
