import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./hooks/useSongData', () => ({
  useSongData: jest.fn(() => ({
    songs: [],
    loading: true,
    error: null,
    fetchSongs: jest.fn(),
    rateSong: jest.fn(),
    searchSongByTitle: jest.fn(),
    totalPages: 0,
    currentPage: 1
  }))
}));

test('renders loading state', () => {
  render(<App />);
  const loadingElement = screen.getByText(/Loading.../i);
  expect(loadingElement).toBeInTheDocument();
});