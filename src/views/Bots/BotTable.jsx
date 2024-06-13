import * as React from 'react';
import Box from '@mui/material/Box';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import { Tooltip, IconButton } from '@mui/material'
import {
  DataGrid,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';

function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      shape="rounded"
      variant='outlined'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        '& .MuiPaginationItem-root': {
          backgroundColor: 'white',
          color: 'black',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
          '&.Mui-selected': {
            backgroundColor: '#57D57B',
            color: 'white',
            // '&:hover': {
            //   backgroundColor: '#f0f0f0',
            // },
          },
        },
      }}
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}
const getRandomColor = () => {
  // Generate a random hexadecimal color code
  return '#' + Math.floor(Math.random()*16777215).toString(16);
};
const botCell = (row) => {
  const randomColor = getRandomColor();
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center', // Align items to the start to handle multiple lines
      borderRadius: '10px',
      padding: '15px', // Added padding for better spacing
      gap: '10px', // Added gap for spacing between items
      height:"100%"
    }}>
      <div style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: randomColor,
        flexShrink: 0, // Prevent shrinking to maintain the circle size
      }} />
      <div style={{
        display: 'flex',
        flexDirection: 'column', // Stack the text vertically
        justifyContent: 'center', // Center the text vertically
      }}>
        <div style={{ marginBottom: '5px', color: "#6C5CBB" }}>PCS Oversight Reversal</div>
        <div style={{ marginBottom: '5px', color: "#717178" }}>SPXW Put Debit Spread</div>
        <div style={{ color: "#717178" }}>****7258</div>
      </div>
    </div>
  )
}

const statusCell = (row) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%', // Ensure it takes the full height of the cell
    }}>
      <div style={{ marginBottom: '5px', background: "#35715D", width: "min-content", padding: "0 5px 0 5px", borderRadius: 100 }}>Enabled</div>
      <div style={{ color: "#717178" }}>Active 30 minutes ago</div>
    </div>
  )
}

const exitCell = (row) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%', // Ensure it takes the full height of the cell
    }}>
      <div style={{ color: "#717178" }}>80% stop loss</div>
    </div>
  )
}

const entryCell = (row) => {
  return (
    <div>
        <div style={{ color: "#717178" }}>Sequential (max 1 per day)</div>
        <div style={{ color: "#717178" }}>All days of week</div>
        <div style={{ color: "#717178" }}>Before 12:20 PM</div>
        <div style={{ color: "#717178" }}>1 contract</div>
        <div style={{ color: "#717178" }}>-0.5 PUT ^</div>
        <div style={{ color: "#717178" }}>Put spread 0.90 wide</div>
        <div style={{ color: "#717178" }}>0 target, 0 max DTE</div>
        <div style={{ color: "#717178" }}>Variable 0 DTE PCS KICKER REALIZED PL less than 0</div>
    </div>
  )
}

export default function CustomPaginationGrid({ rows, handleDeleteRow, handleEditRow }) {
  const columns = [
    { field: 'bot', headerName: 'Bot', flex: 1, renderCell: (params) => botCell(params.row) },
    { field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => statusCell(params.row) },
    { field: 'entry', headerName: 'Entry', flex: 1, renderCell: (params) => entryCell(params.row) },
    { field: 'exit', headerName: 'Exit', flex: 1, renderCell: (params) => exitCell(params.row) },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDeleteRow(params.row)}>
              <DeleteIcon sx={{ color: 'red', cursor: 'pointer' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEditRow(params.row)}>
              <DriveFileRenameOutlineIcon sx={{ color: 'white', cursor: 'pointer' }} />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ]

  return (
    <Box sx={{ height: "70vh", width: '100%' }}>
      <DataGrid
        pagination
        slots={{
          pagination: CustomPagination,
        }}
        sx={{
          background: "#181818",
          '& .MuiDataGrid-footerContainer': {
            display: 'flex',
            justifyContent: 'center',
          },
        }}
        rows={rows}
        rowSelection={false}
        columns={columns}
        getRowHeight={() => "auto"}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
      />
    </Box>
  );
}
