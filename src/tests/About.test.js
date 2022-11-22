import React from 'react';
import { screen, render } from '@testing-library/react';
import { About } from '../pages';

const TEXT_1 = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon';

const TEXT_2 = 'One can filter Pokémon by type, and see more details for each one of them';

const imgPokedex = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('Tests About page', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('If page contains a h2 heading with About Pokedex text', () => {
    const heading = screen.getByRole('heading', { name: /About Pokédex/ });
    expect(heading).toBeInTheDocument();
  });
  test('If page has two "p" with texts about Pokédex', () => {
    const firstParagraph = screen.getByText(TEXT_1);
    const secondParagraph = screen.getByText(TEXT_2);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  test('If page has given image of Pokedex', () => {
    const img = screen.getByRole('img');
    expect(img.src).toEqual(imgPokedex);
  });
});
