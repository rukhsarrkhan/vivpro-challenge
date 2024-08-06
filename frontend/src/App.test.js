/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

// Mock the custom hook
jest.mock('./hooks/useSongData', () => ({
  useSongData: jest.fn()
}));

// Mock the child components
jest.mock('./components/SongTable', () => () => <div data-testid="song-table">Song Table</div>);
jest.mock('./components/SearchBar', () => ({ onSearch }) => (
  <input data-testid="search-bar" onChange={(e) => onSearch(e.target.value)} />
));
jest.mock('./components/ScatterChart', () => () => <div data-testid="scatter-chart">Scatter Chart</div>);
jest.mock('./components/HistogramChart', () => () => <div data-testid="histogram-chart">Histogram Chart</div>);
jest.mock('./components/BarCharts', () => () => <div data-testid="bar-charts">Bar Charts</div>);

// Mock MUI components
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}));

describe('App Component', () => {
  const mockUseSongData = {
    songs: [],
    loading: false,
    error: null,
    fetchSongs: jest.fn(),
    rateSong: jest.fn(),
    searchSongByTitle: jest.fn(),
    totalPages: 1,
    currentPage: 1
  };

  beforeEach(() => {
    jest.clearAllMocks();
    require('./hooks/useSongData').useSongData.mockReturnValue(mockUseSongData);
    require('@mui/material').useMediaQuery.mockReturnValue(false);
  });

  test('renders App component with all child components', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Song Playlist')).toBeInTheDocument();
      expect(screen.getByTestId('search-bar')).toBeInTheDocument();
      expect(screen.getByTestId('song-table')).toBeInTheDocument();
      expect(screen.getByTestId('scatter-chart')).toBeInTheDocument();
      expect(screen.getByTestId('histogram-chart')).toBeInTheDocument();
      expect(screen.getByTestId('bar-charts')).toBeInTheDocument();
    });
  });

  test('displays loading state', async () => {
    require('./hooks/useSongData').useSongData.mockReturnValue({ ...mockUseSongData, loading: true });
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  test('displays error state', async () => {
    require('./hooks/useSongData').useSongData.mockReturnValue({ ...mockUseSongData, error: 'Test error' });
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Error: Test error')).toBeInTheDocument();
    });
  });

  test('handles search', async () => {
    render(<App />);

    const searchBar = screen.getByTestId('search-bar');
    await userEvent.type(searchBar, 'test search');

    await waitFor(() => {
      expect(mockUseSongData.searchSongByTitle).toHaveBeenCalledWith('test search');
    });
  });

  test('calls searchSongByTitle when search term is not empty', async () => {
    render(<App />);

    const searchBar = screen.getByTestId('search-bar');
    await userEvent.type(searchBar, 'test');

    await waitFor(() => {
      expect(mockUseSongData.searchSongByTitle).toHaveBeenCalledWith('test');
    });
  });

  test('calls fetchSongs when search term is cleared', async () => {
    render(<App />);

    const searchBar = screen.getByTestId('search-bar');
    await userEvent.type(searchBar, 'test');
    await userEvent.clear(searchBar);

    await waitFor(() => {
      expect(mockUseSongData.fetchSongs).toHaveBeenCalledWith(1, 10);
    });
  });

  test('uses mobile typography when screen is small', async () => {
    require('@mui/material').useMediaQuery.mockReturnValue(true);
    render(<App />);

    await waitFor(() => {
      const title = screen.getByText('Song Playlist');
      expect(title).toHaveClass('MuiTypography-h5');
    });
  });

  test('uses desktop typography when screen is large', async () => {
    require('@mui/material').useMediaQuery.mockReturnValue(false);
    render(<App />);

    await waitFor(() => {
      const title = screen.getByText('Song Playlist');
      expect(title).toHaveClass('MuiTypography-h4');
    });
  });
});