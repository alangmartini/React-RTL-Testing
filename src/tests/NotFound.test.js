import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../pages/NotFound';

const imgOfNotFound = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('Tests Not Found page', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  test('If page has a heading with text "Page requested not found"', () => {
    const heading = screen.getByRole('heading', { name: /Page requested not found/ });
    expect(heading).toBeInTheDocument();
  });
  test('If page shows proper image', () => {
    const image = screen.getByRole('img');
    expect(image.src).toBe(imgOfNotFound);
  });
});
