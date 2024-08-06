import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Box, useTheme, useMediaQuery } from '@mui/material';

const ScatterPlot = ({ songs }) => {
    const chartRef = useRef(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Danceability vs Energy',
                        data: songs.map(song => ({
                            x: song.danceability,
                            y: song.energy
                        })),
                        backgroundColor: 'rgba(75, 192, 192, 0.6)'
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            title: {
                                display: true,
                                text: 'Danceability'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Energy'
                            }
                        }
                    }
                }
            });
        }
    }, [songs]);

    return (
        <Box sx={{ height: isMobile ? 300 : 400, width: '100%' }}>
            <canvas ref={chartRef} />;
        </Box>
    );
};

export default ScatterPlot;