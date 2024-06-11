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

export default function ConnectionTable({ rows }) {
  const columns = [
    { field: 'account', headerName: 'Account', flex: 1 },
    { field: 'broker', headerName: 'Broker', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'availableBalance', headerName: 'Available Balance', flex: 1 },
    { field: 'buyingOption', headerName: 'Buying Option', flex: 1 },
    {
      field: 'actions',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row)}>
              <DeleteIcon sx={{ color: 'red', cursor: 'pointer' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)}>
              <DriveFileRenameOutlineIcon sx={{ color: 'white', cursor: 'pointer' }} />
            </IconButton>
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
          background:"#181818",
          '& .MuiDataGrid-footerContainer': {
            display: 'flex',
            justifyContent: 'center',
          },
        }}
        getRowId={(row)=>row?.id}
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
