import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
export default function BotTable({rows}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Bot</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Entry</TableCell>
            <TableCell >Exit</TableCell>
            <TableCell >Status</TableCell>
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
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.entry}</TableCell>
              <TableCell>{row.exit}</TableCell>
              <TableCell>
                <Tooltip title="Delete">
                  <DeleteIcon sx={{ color: 'red',cursor:"pointer" }}/>
                  </Tooltip>
                  <Tooltip title="Edit">
                  <DriveFileRenameOutlineIcon sx={{color:"white",cursor:"pointer" }}/>
                  </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
