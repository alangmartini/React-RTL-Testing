import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests App component', () => {
  let currentHistory;
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    currentHistory = history;
  });

  test('If first link is Home', () => {
    const linkHome = screen.getByRole('link', { name: /Home/ });
    expect(linkHome).toBeInTheDocument();
  });
  test('If second link is About', () => {
    const linkAbout = screen.getByRole('link', { name: /About/ });
    expect(linkAbout).toBeInTheDocument();
  });
  test('If third link is Favorite Pokemon', () => {
    const linkFavoritePokemon = screen.getByRole('link', {
      name: /Favorite Pokémon/,
    });
    expect(linkFavoritePokemon).toBeInTheDocument();
  });

  test('If properly redirects to Home Page', async () => {
    const linkHome = screen.getByRole('link', { name: /Home/ });
    userEvent.click(linkHome);
    const currentUrl = currentHistory.location.pathname;
    expect(currentUrl).toBe('/');
  });
  test('If properly redirects to About Page', async () => {
    const linkAbout = screen.getByRole('link', { name: /About/ });
    userEvent.click(linkAbout);
    const currentUrl = currentHistory.location.pathname;
    expect(currentUrl).toBe('/about');
  });
  test('If properly redirects to Favorite Pokemons Page', async () => {
    const linkFavoritePokemon = screen.getByRole('link', {
      name: /Favorite Pokémon/,
    });
    userEvent.click(linkFavoritePokemon);
    const currentUrl = currentHistory.location.pathname;
    expect(currentUrl).toBe('/favorites');
  });
});

describe('Test for Not Found component', () => {
  test('If properly shows Not Found component when in a non-existent route', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/bad/route'));

    const currentUrl = history.location.pathname;
    const title = screen.getByRole('heading', { name: /Page requested not found/ });

    expect(currentUrl).toBe('/bad/route');
    expect(title).toBeInTheDocument();
  });
});
