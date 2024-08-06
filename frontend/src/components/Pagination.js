import React from 'react';
import { Button, Box, useMediaQuery, useTheme } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                size={isMobile ? 'small' : 'medium'}
            >
                Previous
            </Button>
            <Box component="span" sx={{ mx: 2 }}>
                Page {currentPage} of {totalPages}
            </Box>
            <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                size={isMobile ? 'small' : 'medium'}
            >
                Next
            </Button>
        </Box>
    );
};

export default Pagination;