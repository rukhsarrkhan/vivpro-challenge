import React from 'react';
import { TableCell, TableSortLabel } from '@mui/material';

const SortableHeader = ({ column, sortColumn, sortDirection, onSort }) => {
    return (
        <TableCell>
            <TableSortLabel
                active={sortColumn === column}
                direction={sortColumn === column ? sortDirection : 'asc'}
                onClick={() => onSort(column)}
            >
                {column.toUpperCase()}
            </TableSortLabel>
        </TableCell>
    );
};

export default SortableHeader;