import * as React from 'react';
import Box from '@mui/material/Box';
import { Tooltip, Button } from '@mui/material'
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

export default function PositionPageTable({ rows }) {
  const columns = [
    { field: 'bot', headerName: 'Bot', flex: 1 },
    { field: 'position', headerName: 'Position', flex: 1 },
    { field: 'entry', headerName: 'Entry', flex: 1 },
    { field: 'exit', headerName: 'Exit', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <Tooltip title="Close">
            <Button
              variant="contained"
              sx={{ backgroundColor: '#57D57B', color: 'white', fontWeight: "500" }}
            >
              Close
            </Button>
          </Tooltip>
        </>
      ),
    },
  ]

  const handleDelete = (row) => {
    // Handle delete action
    console.log('Delete', row)
  }

  const handleEdit = (row) => {
    // Handle edit action
    console.log('Edit', row)
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
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
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
      />
    </Box>
  );
}
