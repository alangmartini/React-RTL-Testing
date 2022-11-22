import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Tests Pokemon component', () => {
  let currentHistory;
  beforeEach(() => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemonList[0] }
      isFavorite
      showDetailsLink
    />);
    currentHistory = history;
  });
  const { averageWeight, id, image, name, type } = pokemonList[0];
  const { measurementUnit, value } = averageWeight;

  test('If a card is rendered with info about a pokemon', () => {
    const pokemonName = screen.getByText(name);
    const pokemonType = screen.getByText(type);
    const aveWeight = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
    const images = screen.getAllByRole('img');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(aveWeight).toBeInTheDocument();
    expect(images.some((img) => img.src === image)).toBeTruthy();
    expect(images.some((img) => img.alt.includes('sprite'))).toBeTruthy();
  });
  test('If there is a link to a detailed page about the pokemon.', () => {
    const linkToDetails = screen.getByRole('link', { name: /More details/ });
    expect(linkToDetails.href.includes(`pokemon/${id}`)).toBeTruthy();
  });
  test('If when clicked the link, is it properly redirected', async () => {
    const linkToDetails = screen.getByRole('link', { name: /More details/ });
    userEvent.click(linkToDetails);
    expect(currentHistory.location.pathname).toBe(`/pokemon/${id}`);
  });
  test('If there is a star icon on favorites pokemon', () => {
    const images = screen.getAllByRole('img');
    const favoriteImage = images.find((img) => img.src.includes('/star-icon.svg'));
    expect(favoriteImage.src.includes('/star-icon.svg')).toBeTruthy();
    console.log(favoriteImage.alt);
    expect(favoriteImage.alt).toBe(`${name} is marked as favorite`);
  });
});
