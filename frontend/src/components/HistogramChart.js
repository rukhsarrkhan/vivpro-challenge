import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, useTheme, useMediaQuery } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HistogramChart = ({ songs }) => {
    const durations = songs.map(song => song.duration_ms / 1000);
    const binWidth = 30;
    const bins = Math.ceil((Math.max(...durations) - Math.min(...durations)) / binWidth);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const data = {
        labels: Array.from({ length: bins }, (_, i) => `${i * binWidth}-${(i + 1) * binWidth}`),
        datasets: [{
            label: 'Song Duration',
            data: Array.from({ length: bins }, (_, i) => durations.filter(d => d >= i * binWidth && d < (i + 1) * binWidth).length),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
    };

    const options = {
        scales: {
            x: { title: { display: true, text: 'Duration (seconds)' } },
            y: { title: { display: true, text: 'Frequency' } },
        },
    };

    return (
        <Box sx={{ height: isMobile ? 300 : 400, width: '100%' }}>
            <Bar data={data} options={options} />;
        </Box>
    );
};

export default HistogramChart;