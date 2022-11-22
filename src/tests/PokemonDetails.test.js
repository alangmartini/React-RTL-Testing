import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Tests Pokemon Details page', () => {
  const TEST_URL = '/pokemon/25';
  test('If detailed infos about the pokemon is displayed', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(TEST_URL));

    const heading = await screen.findByRole('heading', { name: /Details/ });
    expect(heading).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links.some((link) => link.href.includes('/pokemon/25'))).toBeFalsy();

    const summary = screen.getByRole('heading', { name: /Summary/ });
    expect(summary).toBeInTheDocument();

    const summaryText = screen.getByText(pokemonList[0].summary);
    expect(summaryText).toBeInTheDocument();
  });
  test('If there is a map sections', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(TEST_URL));

    const mapsHeading = await screen.findByRole('heading', { name: /Game Locations/ });
    expect(mapsHeading).toBeInTheDocument();

    pokemonList[0].foundAt.forEach((location) => {
      const images = screen.getAllByRole('img');
      const locationName = screen.getByText(location.location);
      expect(images.some((img) => img.src === location.map)).toBeTruthy();
      expect(images.some((img) => img.alt.includes('location'))).toBeTruthy();
      expect(locationName).toBeInTheDocument();
    });
  });
  test('If FavoriteInput is working properly', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(TEST_URL));

    const heading = screen.getByLabelText('Pokémon favoritado?');
    expect(heading).toBeInTheDocument();

    userEvent.click(heading);
    expect(heading.checked).toBeTruthy();

    userEvent.click(heading);
    expect(heading.checked).toBeFalsy();
  });
});
