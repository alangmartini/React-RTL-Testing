import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const favoritePokemons = pokemonList.reduce((acc, { id }) => {
  acc[id] = true;
  return acc;
}, {});

const fetchPokemonTypes = () => [...new Set(pokemonList
  .reduce((types, { type }) => [...types, type], []))];

describe('Tests Pokedex page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ favoritePokemons }
    />);
  });
  const pokemonNameTestId = 'pokemon-name';
  test('If page has a heading with text Encountered Pokemon', () => {
    const heading = screen.getByRole('heading', { name: /Encountered Pokémon/ });
    expect(heading).toBeInTheDocument();
  });
  test('If next pokemon is shown when "Próximo Pokémon" button is clicked', () => {
    const nextPokemonButton = screen.getByRole('button', { name: /Próximo Pokémon/ });
    const currentPokemon = screen.getByTestId(pokemonNameTestId);
    const currentPokemonName = currentPokemon.innerHTML;
    userEvent.click(nextPokemonButton);

    // Funilly, currentPokemon innerHTMl is updated with next pokemon name
    // even if stored before nextPokemonButton is clicked
    expect(currentPokemon.innerHTML).not.toEqual(currentPokemonName);
  });
  test('If when there is no more pokemons, goes to first pokemon', () => {
    const totalPokemons = pokemonList.length;
    const nextPokemonButton = screen.getByRole('button', { name: /Próximo Pokémon/ });
    const currentPokemon = screen.getByTestId(pokemonNameTestId);
    const currentPokemonName = currentPokemon.innerHTML;

    Array.from(Array(totalPokemons).keys()).forEach(() => {
      userEvent.click(nextPokemonButton);
    });

    expect(currentPokemon.innerHTML).toEqual(currentPokemonName);
  });
  test('If only one pokemon card is displayed', () => {
    const currentPokemon = screen.getAllByTestId(pokemonNameTestId);
    expect(currentPokemon).toHaveLength(1);
  });
  test('If pokemon card has buttons for filters ', () => {
    const everyFilterButton = screen.getAllByTestId('pokemon-type-button');
    const allButton = screen.getByRole('button', { name: /All/ });
    expect(allButton).toBeVisible();

    const typesButton = fetchPokemonTypes();
    expect(everyFilterButton).toHaveLength(typesButton.length);
    everyFilterButton.forEach((button, index) => {
      const type = typesButton[index];
      expect(button.innerHTML).toBe(type);
    });
  });
  test('If pokemon card has a reset filter button', () => {
    const filterPokemon = (filteredType) => {
      this.setState({ filteredType, pokemonIndex: 0 });
    };

    const allButton = screen.getByRole('button', { name: /All/ });
    expect(allButton).toBeVisible();

    const currentPokemon = screen.getByTestId(pokemonNameTestId);
    const currentPokemonName = currentPokemon.innerHTML;

    expect(currentPokemonName).toBe(pokemonList[0].name);

    userEvent.click(allButton);

    expect(currentPokemonName).toBe(pokemonList[0].name);
  });
});
