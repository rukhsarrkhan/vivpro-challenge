import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    useTheme,
    useMediaQuery,
    Typography
} from '@mui/material';
import SortableHeader from './SortableHeader';
import Pagination from './Pagination';
import StarRating from './StarRating';
import { exportToCsv } from '../utils/csvExport';

const SongTable = ({ songs, onRateSong, onPageChange, currentPage, totalPages }) => {
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedSongs = [...songs].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const columnOrder = ['index', 'id', 'title', ...Object.keys(songs[0] || {}).filter(key => !['index', 'id', 'title'].includes(key))];

    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'hidden',
                border: 1,
                borderColor: 'grey.300',
                borderRadius: 2,
            }}
        >
            <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
                <Button onClick={() => exportToCsv(songs)} variant="contained" fullWidth={isMobile}>
                    Export to CSV
                </Button>
            </Box>
            <TableContainer sx={{ maxHeight: { xs: 300, sm: 400, md: 440 } }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columnOrder.map(key => (
                                <SortableHeader
                                    key={key}
                                    column={key}
                                    sortColumn={sortColumn}
                                    sortDirection={sortDirection}
                                    onSort={handleSort}
                                />
                            ))}
                            <TableCell>RATING</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedSongs.map((song, index) => (
                            <TableRow key={song.id} hover>
                                {columnOrder.map(key => (
                                    <TableCell key={key}>
                                        {isMobile ? (
                                            <Typography variant="body2" noWrap>
                                                {key === 'index' ? index + 1 : song[key]}
                                            </Typography>
                                        ) : (
                                            key === 'index' ? index + 1 : song[key]
                                        )}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <StarRating
                                        rating={song.rating}
                                        onRate={(rating) => onRateSong(song.id, rating)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </Box>
        </Paper>
    );
};

export default SongTable;