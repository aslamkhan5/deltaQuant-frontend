import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { defaultSpacing } from '../../../constants';

export default function Exit({ rows }) {
  return (
    <TableContainer component={Paper} sx={{ background: "#1e1e1e" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Monitored Sops</TableCell>
            <TableCell></TableCell>
            <TableCell>Monitored Steps Sensitivity</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
            >
              <TableCell component="th" scope="row">
                {row.stops}
              </TableCell>
              <TableCell>
                {row.percentage}
              </TableCell>
              <TableCell>
                {row.speed}
              </TableCell>
              <TableCell>
                {row.aggressive}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
