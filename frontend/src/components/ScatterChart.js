import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Box, useTheme, useMediaQuery } from '@mui/material';


ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const ScatterChart = ({ songs }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const data = {
        datasets: [
            {
                label: 'Danceability vs Index',
                data: songs.map((song, index) => ({ x: index, y: song.danceability })),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const options = {
        scales: {
            x: { title: { display: true, text: 'Index' } },
            y: { title: { display: true, text: 'Danceability' } },
        },
    };

    return (
        <Box sx={{ height: isMobile ? 300 : 400, width: '100%' }}>
            <Scatter data={data} options={options} />
        </Box>
    );
};

export default ScatterChart;