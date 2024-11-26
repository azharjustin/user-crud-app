import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

const DeleteDialog = ({ isOpen, data, handleClose, handleConfirm }) => {
   return (
      <Dialog open={isOpen} onClose={handleClose}>
         <DialogTitle>
            Are you sure you want to delete this user <b>{data.name}</b>?
         </DialogTitle>
         <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
               No
            </Button>
            <Button variant="contained" onClick={() => handleConfirm(data)}>
               Yes
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default DeleteDialog;
