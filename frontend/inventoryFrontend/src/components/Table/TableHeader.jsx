// src/components/Table/TableHeader.js
import React from 'react';
import { TableRow, TableCell } from '@mui/material';

const TableHeader = () => {
  return (
    <TableRow>
      <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f4f4f4' }}>ID</TableCell>
      <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f4f4f4' }}>Name</TableCell>
      <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f4f4f4' }}>Quantity</TableCell>
    </TableRow>
  );
};

export default TableHeader;
