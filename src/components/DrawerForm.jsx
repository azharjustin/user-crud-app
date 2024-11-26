import React from 'react';
import { Box, List, Divider, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DrawerForm = ({
   name,
   setName,
   username,
   setUserName,
   phone,
   setPhone,
   website,
   setWebsite,
   nameError,
   usernameError,
   phoneError,
   websiteError,
   resetData,
   createOrUpdateData,
   toggleDrawer,
   editingId,
}) => {
   return (
      <Box sx={{ width: 450 }} role="presentation">
         <List style={{ margin: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <b>{editingId ? 'Edit User' : 'Add New User'}</b>
               <Button onClick={toggleDrawer(false)}>
                  <CloseIcon />
               </Button>
            </div>
         </List>
         <Divider />
         <List style={{ margin: '30px' }}>
            <TextField
               style={{ width: '100%' }}
               required
               label="Name"
               placeholder="Enter your name"
               value={name}
               error={nameError}
               onChange={(e) => setName(e.target.value)}
            />
            <TextField
               style={{ width: '100%', marginTop: '30px' }}
               required
               label="User Name"
               placeholder="Enter your username"
               value={username}
               error={usernameError}
               onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
               style={{ width: '100%', marginTop: '30px' }}
               required
               label="Phone"
               placeholder="Enter your phone number"
               value={phone}
               error={phoneError}
               onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
               style={{ width: '100%', marginTop: '30px' }}
               required
               label="Website"
               placeholder="Enter your website"
               value={website}
               error={websiteError}
               onChange={(e) => setWebsite(e.target.value)}
            />
            <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
               <Button variant="outlined" onClick={resetData}>
                  Cancel
               </Button>
               <Button variant="contained" onClick={createOrUpdateData}>
                  {editingId ? 'Update' : 'Create'}
               </Button>
            </div>
         </List>
      </Box>
   );
};

export default DrawerForm;
