import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './tests/renderWithRouter';
import App from './App';

test('Testa se a página Not Found é carregada', () => {
  const { history } = renderWithRouter(
    <App />,
  );

  history.push('/xablau');

  const getTitle = screen.getByText(/not found/i);
  expect(getTitle).toBeInTheDocument();
});
