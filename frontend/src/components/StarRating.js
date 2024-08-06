import React from 'react';
import { Rating, Box } from '@mui/material';

const StarRating = ({ rating, onRate }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Rating
                name="song-rating"
                value={rating}
                onChange={(event, newValue) => {
                    onRate(newValue);
                }}
                size="small"
            />
        </Box>
    );
};

export default StarRating;