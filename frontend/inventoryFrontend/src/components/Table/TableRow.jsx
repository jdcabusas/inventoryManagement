// src/components/Table/TableRowComponent.js
import React from 'react';
import { TableRow, TableCell } from '@mui/material';

const TableRowComponent = ({ item, onClick }) => {
  if (!item) {
    console.log("No item provided to TableRowComponent");
    return null;
  }

  return (
    <TableRow onClick={onClick} sx={{ cursor: 'pointer', "&:hover": { backgroundColor: "#f5f5f5" } }}>
      <TableCell align="center">{item._id}</TableCell>
      <TableCell align="center">{item.name}</TableCell>
      <TableCell align="center">{item.quantity}</TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
