import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const services = require('../api/services');

describe('Testes do componente <SearchComponent />', () => {
  const searchButtonTestId = 'search-top-btn';
  const searchInputTestId = 'search-input';
  jest.mock('../api/services');
  afterEach(() => jest.clearAllMocks());
  it('Testa se o input está na tela ', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    history.push('/foods');
    const serchHideButton = screen.getByTestId(searchButtonTestId);
    expect(serchHideButton).toBeInTheDocument();
  });
  it('Testa se os input radio e o botão estão na tela', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    history.push('/foods');
    const serchHideButton = screen.getByTestId(searchButtonTestId);
    expect(serchHideButton).toBeInTheDocument();
    userEvent.click(serchHideButton);
    const inputElement = screen.getByTestId(searchInputTestId);
    expect(inputElement).toBeInTheDocument();
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
  it('3 - Testa se redireciona para Food Details com apenas 1 resultado', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    history.push('/foods');
    const serchHideButton = screen.getByTestId(searchButtonTestId);
    expect(serchHideButton).toBeInTheDocument();
    userEvent.click(serchHideButton);
    const inputElement = screen.getByTestId(searchInputTestId);
    expect(inputElement).toBeInTheDocument();
    userEvent.type(inputElement, 'Arrabiata');
    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    expect(radioName).toBeInTheDocument();
    userEvent.click(radioName);
    const button = screen.getByRole('button', {
      name: /search/i,
    });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const getTitle = await screen.findByText(/food details/i);
    expect(getTitle).toBeInTheDocument();
  });
  it('4 - Testa se redireciona para Drink Details com apenas 1 resultado', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    history.push('/drinks');
    const serchHideButton = screen.getByTestId(searchButtonTestId);
    expect(serchHideButton).toBeInTheDocument();
    userEvent.click(serchHideButton);
    const inputElement = screen.getByTestId(searchInputTestId);
    expect(inputElement).toBeInTheDocument();
    userEvent.type(inputElement, 'Aquamarine');
    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    expect(radioName).toBeInTheDocument();
    userEvent.click(radioName);
    const button = screen.getByRole('button', {
      name: /search/i,
    });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const getTitle = await screen.findByText(/drink details/i);
    expect(getTitle).toBeInTheDocument();
  });
  it('5 - Testa se fetchFoodByIngredient foi chamada', async () => {
    const mockFetchFoodByIngredient = jest.spyOn(services, 'fetchFoodByIngredient');
    const { history } = renderWithRouter(
      <App />,
    );
    history.push('/foods');
    const serchHideButton = screen.getByTestId(searchButtonTestId);
    expect(serchHideButton).toBeInTheDocument();
    userEvent.click(serchHideButton);
    const inputElement = screen.getByTestId(searchInputTestId);
    expect(inputElement).toBeInTheDocument();
    userEvent.type(inputElement, 'milk');
    const radioIngred = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    expect(radioIngred).toBeInTheDocument();
    userEvent.click(radioIngred);
    const button = screen.getByRole('button', {
      name: /search/i,
    });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(mockFetchFoodByIngredient).toHaveBeenCalled();
    const getResult = await screen.findByText(/apam balik/i);
    expect(getResult).toBeInTheDocument();
  });
  it('6 - Testa se fetchFoodByName foi chamada', async () => {
    const mockFetchFoodByName = jest.spyOn(services, 'fetchFoodByName');
    const { history } = renderWithRouter(
      <App />,
    );
    history.push('/foods');
    const serchHideButton = screen.getByTestId(searchButtonTestId);
    userEvent.click(serchHideButton);
    const inputElement = screen.getByTestId(searchInputTestId);
    userEvent.type(inputElement, 'Beef');
    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    userEvent.click(radioName);
    const button = screen.getByRole('button', {
      name: /search/i,
    });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(mockFetchFoodByName).toHaveBeenCalled();
    const getResult = await screen.findByText(/beef lo mein/i);
    expect(getResult).toBeInTheDocument();
  });
  it('7 - Testa se fetchFoodByFirstLetter foi chamada', async () => {
    const mockFetchFoodByFirstLetter = jest.spyOn(services, 'fetchFoodByFirstLetter');
    const { history } = renderWithRouter(
      <App />,
    );
    history.push('/foods');
    const serchHideButton = screen.getByTestId(searchButtonTestId);
    expect(serchHideButton).toBeInTheDocument();
    userEvent.click(serchHideButton);

    const inputElement = screen.getByTestId(searchInputTestId);
    userEvent.type(inputElement, 'a');
    const radioName = screen.getByRole('radio', {
      name: /first letter/i,
    });
    userEvent.click(radioName);

    const button = screen.getByRole('button', {
      name: /search/i,
    });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(mockFetchFoodByFirstLetter).toHaveBeenCalled();
    const getResult = await screen.findByText(/apple frangipan tart/i);
    expect(getResult).toBeInTheDocument();
  });
  it('8 - Testa se fetchDrinkByFirstLetter foi chamada', async () => {
    const mockFetchDrinkByFirstLetter = jest.spyOn(services, 'fetchDrinkByFirstLetter');
    const { history } = renderWithRouter(
      <App />,
    );
    history.push('/drinks');
    const serchHideButton = screen.getByTestId(searchButtonTestId);
    expect(serchHideButton).toBeInTheDocument();
    userEvent.click(serchHideButton);
    const inputElement = screen.getByTestId(searchInputTestId);
    expect(inputElement).toBeInTheDocument();
    userEvent.type(inputElement, 'a');
    const radioName = screen.getByRole('radio', {
      name: /first letter/i,
    });
    userEvent.click(radioName);
    const button = screen.getByRole('button', {
      name: /search/i,
    });
    userEvent.click(button);
    expect(mockFetchDrinkByFirstLetter).toHaveBeenCalled();
    const getResult = await screen.findByText(/a1/i);
    expect(getResult).toBeInTheDocument();
  });
  it('9 - Testa se fetchDrinkByIngredient foi chamada', async () => {
    const mockFetchDrinkByIngredient = jest.spyOn(services, 'fetchDrinkByIngredient');

    const { history } = renderWithRouter(
      <App />,
    );
    history.push('/drinks');
    const serchHideButton = screen.getByTestId(searchButtonTestId);
    userEvent.click(serchHideButton);
    const inputElement = screen.getByTestId(searchInputTestId);
    userEvent.type(inputElement, 'milk');
    const radioName = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    userEvent.click(radioName);
    const button = screen.getByRole('button', {
      name: /search/i,
    });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(mockFetchDrinkByIngredient).toHaveBeenCalled();
    const getResult = await screen.findByText(/baby eskimo/i);
    expect(getResult).toBeInTheDocument();
  });
});
