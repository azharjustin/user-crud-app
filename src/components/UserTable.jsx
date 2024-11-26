import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserTable = ({ rows, handleEdit, handleDelete }) => {
   const columns = [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'name', headerName: 'Name', width: 250 },
      { field: 'username', headerName: 'User name', width: 250 },
      { field: 'phone', headerName: 'Phone', width: 290 },
      { field: 'website', headerName: 'Website', width: 340 },
      {
         field: 'actions',
         headerName: 'Actions',
         width: 150,
         renderCell: (params) => (
            <>
               <IconButton onClick={() => handleEdit(params.row)}>
                  <EditIcon color="primary" />
               </IconButton>
               <IconButton onClick={() => handleDelete(params.row)}>
                  <DeleteIcon color="error" />
               </IconButton>
            </>
         ),
      },
   ];
   const paginationModel = { page: 0, pageSize: 5 };

   return (
      <DataGrid
         rows={rows}
         columns={columns}
         pageSizeOptions={[5, 10]}
         initialState={{ pagination: { paginationModel } }}
         style={{ marginTop: '10px'}}
      />
   );
};

export default UserTable;
