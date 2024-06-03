import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

export default function PositionPageTable({rows}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Bot</TableCell>
            <TableCell >Position</TableCell>
            <TableCell >Entry</TableCell>
            <TableCell >Exit</TableCell>
            <TableCell >P/L</TableCell>
            <TableCell >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow
              key={index}
            >
              <TableCell component="th" scope="row">
                {row.bot}
              </TableCell>
              <TableCell >{row.position}</TableCell>
              <TableCell >{row.entry}</TableCell>
              <TableCell >{row.exit}</TableCell>
              <TableCell >{row.pl}</TableCell>
              <TableCell >
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#57D57B', color: 'white',fontWeight:"500" }}
                >
                  Close
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
