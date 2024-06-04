import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { defaultSpacing } from '../../constants';

function createData(pcs, overnight) {
    return { pcs, overnight };
}

const rows = [
    createData('PCS Overnight', 'PCS Overnight'),
    createData('PCS Overnight', 'PCS Overnight'),
    createData('PCS Overnight', 'PCS Overnight'),
];

export default function PositionTable() {
    return (
        <TableContainer component={Paper} sx={{mb:defaultSpacing}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Open Position</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                        >
                            <TableCell component="th" scope="row">
                                {row.pcs}
                            </TableCell>
                            <TableCell>
                                {row.overnight}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
