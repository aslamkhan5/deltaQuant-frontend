import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(bot, status, entry, exit) {
  return { bot, status, entry, exit };
}

const rows = [
  createData('Premium', 'Premium', 'Premium', '--'),
  createData('Premium', 'Premium', 'Premium', '--'),
  createData('Premium', 'Premium', 'Premium', '--'),
  createData('Premium', 'Premium', 'Premium', '--'),
  createData('Premium', 'Premium', 'Premium', '--'),
];

export default function BotTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Bot</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Entry</TableCell>
            <TableCell align="right">Exit</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow
              key={row.index}
            >
              <TableCell component="th" scope="row">
                {row.bot}
              </TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.entry}</TableCell>
              <TableCell align="right">{row.exit}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
