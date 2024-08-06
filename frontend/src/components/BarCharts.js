import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Grid, Box, useTheme, useMediaQuery } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarCharts = ({ songs }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const acousticData = {
        labels: songs.map((_, index) => index),
        datasets: [{
            label: 'Acousticness',
            data: songs.map(song => song.acousticness),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
    };

    const tempoData = {
        labels: songs.map((_, index) => index),
        datasets: [{
            label: 'Tempo',
            data: songs.map(song => song.tempo),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: true },
        },
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Box sx={{ height: isMobile ? 300 : 400 }}>
                    <Bar data={acousticData} options={options} />
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box sx={{ height: isMobile ? 300 : 400 }}>
                    <Bar data={tempoData} options={options} />
                </Box>
            </Grid>
        </Grid>
    );
};

export default BarCharts;