// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import './App.css'

// import { DataGrid } from '@mui/x-data-grid';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';

// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import CloseIcon from '@mui/icons-material/Close';
// import TextField from '@mui/material/TextField';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogTitle from '@mui/material/DialogTitle';

// const columns = (handleEdit, handleDelete)=>[
//   { field: 'id', headerName: 'ID', width: 100 },
//   { field: 'name', headerName: 'Name', width: 250 },
//   { field: 'username', headerName: 'User name', width: 250 },
//   {
//     field: 'phone',
//     headerName: 'Phone',
//     // type: 'number',
//     width: 290,
//   },
//   {
//     field: 'website',
//     headerName: 'Website',
//     // type: 'number',
//     width: 340,
//   },
//   {
//     field: 'actions',
//     headerName: 'Actions',
//     width: 150,
//     renderCell: (params) => (
//       <>
//         <IconButton onClick={() => handleEdit(params.row)}>
//           <EditIcon color="primary" />
//         </IconButton>
//         <IconButton onClick={() => handleDelete(params.row)}>
//           <DeleteIcon color="error" />
//         </IconButton>
//       </>
//     ),
//   },
// ];

// const paginationModel = { page: 0, pageSize: 5 };


// function App() {
//   const [rows, setRows] = useState([])
//   const [state, setState] = useState(false);
//   const [name, setName] = useState('')
//   const [username, setUserName] = useState('')
//   const [phone, setPhone] = useState('')
//   const [website, setWebsite] = useState('')
//   const [nameError, setNameError] = useState(false)
//   const [usernameError, setUserNameError] = useState(false)
//   const [phoneError, setPhoneError] = useState(false)
//   const [websiteError, setWebsiteError] = useState(false)
//   const [editingId, setEditingId] = useState(null); 
//   const [rowData, setRowData] =useState({})

//   const [open, setOpen] = useState(false);

//   const handleClose = () => {
//     setOpen(false);
//     setRowData({})
//   };

//   const getUserData = async () => {
//     try {
//       const userData = await axios.get('https://jsonplaceholder.typicode.com/users')
//       // console.log("user data----------", userData.data)
//       setRows(userData.data)
//     } catch (err) {
//       // console.log("err-------", err)
//       toast.error('Failed to fetch user data!');
//     }
//   }
//   useEffect(() => {
//     getUserData()
//   }, [])
  // const validateInputs = () => {
  //   const isPhoneValid = /^\d{10}$/.test(phone);
  //   const isWebsiteValid = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]+)+(\/[a-zA-Z0-9-]*)*$/.test(website);
  //   const fields = [
  //     { value: name, setError: setNameError },
  //     { value: username, setError: setUserNameError },
  //     { value: phone, setError: setPhoneError },
  //     { value: website, setError: setWebsiteError },
  //   ];

  //   let isValid = true;

  //   fields.forEach(({ value, setError, isValid: customValidation = true }) => {
  //     if (!value || !customValidation) {
  //       setError(true);
  //       isValid = false;
  //     } else {
  //       setError(false);
  //     }
  //   });
  //   if (!editingId) {
  //     if (!isPhoneValid) {
  //       setPhoneError(true)
  //       isValid = false;
  //       toast.error('Phone number must be a valid 10-digit number!');
  //     }
  //   }
  //   if (!isWebsiteValid) {
  //     setWebsiteError(true)
  //     isValid = false;
  //     toast.error('Website must be a valid URL!');
  //   }

  //   return isValid;
  // }
//   const createOrUpdateData = async () => {
//     if(!validateInputs()) return
//     if (editingId) {
//       try {
//         const updateUser = await axios.put('https://jsonplaceholder.typicode.com/posts/' + editingId)
//         // console.log("updateUser-------------", updateUser)
//         setRows((prevRows) =>
//           prevRows.map((row) =>
//             row.id === editingId ? { ...row, name, username, phone, website } : row
//           )
//         );
//         // setState(false)
//         toast.success('User updated successfully!');
//       } catch (err) {
//         toast.error('Failed to update user');
//       }
//     } else {
//       try {
//         const userResp = await axios.post('https://jsonplaceholder.typicode.com/posts', { name, username, phone, website })
//         // console.log("userResp-----------", userResp)
//         getUserData()
//         toast.success('User created successfully!');
//       } catch (err) {
//         // console.log("errr---create-------", err)
//         toast.error('Failed to create user');
//       }
//     }
//     resetData()
//   }

//   const resetData = () => {
//     setName('')
//     setUserName('')
//     setPhone('')
//     setWebsite('')
//     setNameError(false)
//     setUserNameError(false)
//     setPhoneError(false)
//     setWebsiteError(false)
//     setState(false)
//     setEditingId(null);
//   }
  
//   const toggleDrawer = (open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setState(open);
//   };

//   const handleEdit = (row) => {
//     setEditingId(row.id);
//     setName(row.name);
//     setUserName(row.username);
//     setPhone(row.phone);
//     setWebsite(row.website);
//     setState(true);
//   };

//   const handleDelete = (rowData) => {
//     // console.log("rowData-------------", rowData)
//     setOpen(true);
//     setRowData(rowData)
//   };

  // const handleConfirm = async(data) => {
  //   try {
  //     const deleteUser = await axios.delete('https://jsonplaceholder.typicode.com/posts/' + data.id)
  //     // console.log("deleteUser-----------", deleteUser)
  //     setRows((prevRows) => prevRows.filter((row) => row.id !== data.id));
  //     toast.success("User deleted successfullty!")
  //   } catch (err) {
  //     toast.error("Failed to delete user")
  //   }
  //   handleClose()
  // }

//   const DeleteDialog = ({ isOpen, data }) => {
//     return (
//       <Dialog
//         open={isOpen}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title" style={{fontWeight:'normal'}}>
//           Are you sure you want to delete this user <b>{data.name}</b>?
//         </DialogTitle>
//         <DialogActions>
//           <Button variant='outlined' onClick={handleClose}>No</Button>
//           <Button variant='contained' onClick={()=>handleConfirm(data)}>
//             Yes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     );
//   }

//   const list = () => (
//     <Box
//       sx={{ width : 450 }}
//       role="presentation"
//       onClose={toggleDrawer(false)}
//     >
//       <List style={{margin:'30px'}}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <b>Add new user</b>
//           <Button ><CloseIcon onClick={toggleDrawer(false)} /></Button>
//         </div>
//       </List>
//       <Divider />
//       <List style={{ margin: '30px' }}>
//         <TextField
//           style={{width:'100%'}}
//           required
//           id="outlined-required"
//           label="Name"
//           placeholder='Enter your name'
//           value={name}
//           error={nameError}
//           onChange={(e)=>setName(e.target.value)}
//         />
//         <TextField
//           style={{ width: '100%',marginTop:'30px' }}
//           required
//           id="outlined-required"
//           label="User name"
//           placeholder='Enter your user name'
//           value={username}
//           error={usernameError}
//           onChange={(e) => setUserName(e.target.value)}
//         />
//         <TextField
//           style={{ width: '100%', marginTop: '30px' }}
//           required
//           id="outlined-required"
//           label="phone"
//           placeholder='Enter your phone number'
//           value={phone}
//           error={phoneError}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         <TextField
//           style={{ width: '100%', marginTop: '30px' }}
//           required
//           id="outlined-required"
//           label="website"
//           placeholder='Enter your website'
//           value={website}
//           error={websiteError}
//           onChange={(e) => setWebsite(e.target.value)}
//         />
//         <div style={{marginTop:'30px', display:'flex', gap:'10px'}}>
//           <Button variant='outlined' onClick={resetData}>Cancel</Button>
//           <Button variant="contained" onClick={createOrUpdateData}>
//             {editingId ? 'Update' : 'Create'}
//           </Button>
//         </div>
//       </List>
//     </Box>
//   );
  
//   return (
//     <Card className='body' style={{ width: '100%', height: '100%' }}>
//       <div>
//         <div  style={{display:'flex' ,justifyContent:'space-between'}}>
//           <div><b>Users Data Table</b></div>
//         <Button  variant="outlined" onClick={toggleDrawer(true)}>Add User</Button>
//         </div>
//         <DataGrid
//           style={{marginTop:'10px'}}
//           rows={rows}
//           columns={columns(handleEdit, handleDelete)}
//           initialState={{ pagination: { paginationModel } }}
//           pageSizeOptions={[5, 10]}
//           // checkboxSelection
//           // sx={{ border: 0 }}
//         />
//         <Drawer
//           anchor='right'
//           open={state}
//           onClose={toggleDrawer( false)}
//         >
//           {list()}
//         </Drawer>
//       </div>
//       <ToastContainer />
//       {rowData && open && (
//         <DeleteDialog isOpen={open} data={rowData} />
//       )}
    
//     </Card>
//   );
// }

// export default App

