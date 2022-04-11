import { screen } from '@testing-library/react';
import React from 'react';
// import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import MyProvider from '../context/MyProvider';
import SearchComponent from '../components/SearchComponent';

describe('Testes do componente <SearchComponent />', () => {
  it('Testa se o input está na tela ', () => {
    renderWithRouter(
      <MyProvider>
        <SearchComponent />
      </MyProvider>,
    );
    const inputElement = screen.getByTestId('search-input');
    expect(inputElement).toBeInTheDocument();
  });
  it('Testa se os input radio e o botão estão na tela', () => {
    renderWithRouter(
      <MyProvider>
        <SearchComponent />
      </MyProvider>,
    );
    const radioIng = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    expect(radioIng).toBeInTheDocument();
    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    expect(radioName).toBeInTheDocument();
    const radioLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });
    expect(radioLetter).toBeInTheDocument();
    const button = screen.getByRole('button', {
      name: /search/i,
    });
    expect(button).toBeInTheDocument();
  });
});
