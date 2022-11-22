import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Tests Pokemon Details page', () => {
  test('If detailed infos about the pokemon is displayed', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/pokemon/25'));
    console.log(history.location.pathname);

    const heading = await screen.findByRole('heading', { name: /Details/ });
    expect(heading).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links.some((link) => link.href.includes('/pokemon/25'))).toBeFalsy();

    const summary = screen.getByRole('heading', { name: /Summary/ });
    const summaryText = screen.getByText(pokemonList[0].summary);

    
  });
});