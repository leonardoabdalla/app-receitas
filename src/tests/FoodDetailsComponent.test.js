import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import MyProvider from '../context/MyProvider';
import FoodDetails from '../pages/FoodDetails';

describe('Testes do componente <FoodDetailsComponent', () => {
  beforeEach(() => {
    renderWithRouter(
      <MyProvider>
        <FoodDetails />
      </MyProvider>,
      { route: '/foods/52977' },
    );
  });

  it('1 - Testa se os cards de recomendação foram renderizados', async () => {
    await waitForElement(() => screen.getByTestId('0-recomendation-card'));
    const getFirstRecCard = screen.getByTestId('0-recomendation-card');

    expect(getFirstRecCard).toBeInTheDocument();

    userEvent.click(getFirstRecCard);

    await waitForElement(() => screen.getByText('GG'));
    const getTitle = screen.getByText('GG');

    expect(getTitle).toBeInTheDocument();
  });
});
