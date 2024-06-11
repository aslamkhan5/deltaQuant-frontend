import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { defaultSpacing } from '../../../constants';
import { Button, TableFooter } from '@mui/material';
import { toast } from 'react-toastify';

export default function Entry({ rows }) {
  return (
    <TableContainer component={Paper} sx={{ background: "#1e1e1e" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
            >
              <TableCell>
                {row.key}
              </TableCell>
              <TableCell>
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ textAlign: "center", marginTop: "32px" }}><Button sx={{ background: '#233228', textAlign: "center", minWidth: 200, textTransform: "none" }} onClick={() => toast.success("Updated Successfully")}>Update</Button></div>
    </TableContainer>
  );
}
