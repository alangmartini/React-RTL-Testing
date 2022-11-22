import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemon from '../pages/FavoritePokemon';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Tests Favorite Pokemon page', () => {
  test('If given heading is shown when there is no favorite pokemon', () => {
    renderWithRouter(<FavoritePokemon />);
    const heading = screen.getByText(/No favorite Pokémon found/);
    expect(heading).toBeInTheDocument();
  });
  test('If all favorites pokemons are shown as Cards', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);
    const arrayOfTestPokemon = pokemonList
      .map((pokemon) => screen.getByText(pokemon.name));

    expect(arrayOfTestPokemon).toHaveLength(pokemonList.length);

    arrayOfTestPokemon.forEach((pokemonTest, index) => {
      const pokemonEquivalent = pokemonList[index];
      expect(pokemonTest.innerHTML).toBe(pokemonEquivalent.name);
    });
  });
});
