import React from 'react';
import { Box, Typography, Container, Paper, useTheme, useMediaQuery, Grid } from '@mui/material';
import SongTable from './components/SongTable';
import SearchBar from './components/SearchBar';
import ScatterChart from './components/ScatterChart';
import HistogramChart from './components/HistogramChart';
import BarCharts from './components/BarCharts';
import { useSongData } from './hooks/useSongData';

const App = () => {
  const {
    songs,
    loading,
    error,
    fetchSongs,
    rateSong,
    searchSongByTitle,
    totalPages,
    currentPage
  } = useSongData();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearch = (term) => {
    if (term) {
      searchSongByTitle(term);
    } else {
      fetchSongs(1, 10);
    }
  };

  if (loading) return <Box sx={{ p: 3 }}>Loading...</Box>;
  if (error) return <Box sx={{ p: 3 }}>Error: {error}</Box>;

  return (
    <Container maxWidth="xxl">
      <Paper
        elevation={3}
        sx={{
          mt: { xs: 2, sm: 3, md: 4 },
          p: { xs: 2, sm: 3, md: 4 },
          border: 1,
          borderColor: 'grey.300',
          borderRadius: 2,
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          component="h2"
          gutterBottom
          align="center"
        >
          Song Playlist
        </Typography>
        <Box sx={{ mb: { xs: 2, sm: 3 } }}>
          <SearchBar onSearch={handleSearch} />
        </Box>
        <SongTable
          songs={songs}
          onRateSong={rateSong}
          onPageChange={(page) => fetchSongs(page, 10)}
          currentPage={currentPage}
          totalPages={totalPages}
        />
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5">Danceability Scatter Chart</Typography>
            <ScatterChart songs={songs} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5">Duration Histogram</Typography>
            <HistogramChart songs={songs} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Acousticness and Tempo Bar Charts</Typography>
            <BarCharts songs={songs} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;