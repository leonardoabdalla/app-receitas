import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import MyProvider from '../context/MyProvider';
import FoodDetails from '../pages/FoodDetails';

describe('Testes da página FoodDetails', () => {
  beforeEach(() => {
    renderWithRouter(
      <MyProvider>
        <FoodDetails />
      </MyProvider>,
      { route: '/foods/52977' },
    );
  });

  it('Testa se o titulo "Food Details" é renderizado', async () => {
    await waitForElement(() => screen.getByText('Food Details'));
    const getTitle = screen.getByText('Food Details');

    expect(getTitle).toBeInTheDocument();
  });
});
