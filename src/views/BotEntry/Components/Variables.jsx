import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { defaultSpacing } from '../../../constants';

export default function Variables({ rows }) {
  return (
    <TableContainer component={Paper} sx={{ background: "#1e1e1e" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>variable Name</TableCell>
            <TableCell>Used By Bots</TableCell>
            <TableCell>Conditions</TableCell>
            <TableCell>value to Set</TableCell>
            <TableCell>Current Value</TableCell>
            <TableCell>Last Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
            >
              <TableCell>
                {row.variableName}
              </TableCell>
              <TableCell>
                {row.usedByBots}
              </TableCell>
              <TableCell>
                {row.conditions}
              </TableCell>
              <TableCell>
                {row.valueToSet}
              </TableCell>
              <TableCell>
                {row.currentValue}
              </TableCell>
              <TableCell>
                {row.lastUpdated}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
