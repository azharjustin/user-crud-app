import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Drawer, Card } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';

import UserTable from './components/UserTable';
import DrawerForm from './components/DrawerForm';
import DeleteDialog from './components/DeleteDialog';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [rows, setRows] = useState([]);
  const [state, setState] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [rowData, setRowData] = useState({});
  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [nameError, setNameError] = useState(false);
  const [usernameError, setUserNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [websiteError, setWebsiteError] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const userData = await axios.get('https://jsonplaceholder.typicode.com/users');
      setRows(userData.data);
    } catch (err) {
      toast.error('Failed to fetch user data!');
    }
  };

  const toggleDrawer = (open) => () => setState(open);

  const handleEdit = (row) => {
    setEditingId(row.id);
    setName(row.name);
    setUserName(row.username);
    setPhone(row.phone);
    setWebsite(row.website);
    setState(true);
  };

  const handleDelete = (row) => {
    setOpen(true);
    setRowData(row);
  };

  const handleClose = () => setOpen(false);

  const resetData = () => {
    setName('');
    setUserName('');
    setPhone('');
    setWebsite('');
    setEditingId(null);
    setState(false);
  };

  const validateInputs = () => {
    const isPhoneValid = /^\d{10}$/.test(phone);
    const isWebsiteValid = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]+)+(\/[a-zA-Z0-9-]*)*$/.test(website);
    const fields = [
      { value: name, setError: setNameError },
      { value: username, setError: setUserNameError },
      { value: phone, setError: setPhoneError },
      { value: website, setError: setWebsiteError },
    ];

    let isValid = true;

    fields.forEach(({ value, setError, isValid: customValidation = true }) => {
      if (!value || !customValidation) {
        setError(true);
        isValid = false;
      } else {
        setError(false);
      }
    });
    if (!editingId) {
      if (!isPhoneValid) {
        setPhoneError(true)
        isValid = false;
        toast.error('Phone number must be a valid 10-digit number!');
      }
    }
    if (!isWebsiteValid) {
      setWebsiteError(true)
      isValid = false;
      toast.error('Website must be a valid URL!');
    }

    return isValid;
  }

    const createOrUpdateData = async () => {
      if(!validateInputs()) return
      if (editingId) {
        try {
          const updateUser = await axios.put('https://jsonplaceholder.typicode.com/posts/' + editingId)
          // console.log("updateUser-------------", updateUser)
          setRows((prevRows) =>
            prevRows.map((row) =>
              row.id === editingId ? { ...row, name, username, phone, website } : row
            )
          );
          // setState(false)
          toast.success('User updated successfully!');
        } catch (err) {
          toast.error('Failed to update user');
        }
      } else {
        try {
          const userResp = await axios.post('https://jsonplaceholder.typicode.com/posts', { name, username, phone, website })
          // console.log("userResp-----------", userResp)
          getUserData()
          toast.success('User created successfully!');
        } catch (err) {
          // console.log("errr---create-------", err)
          toast.error('Failed to create user');
        }
      }
      resetData()
    }

  const handleConfirm = async (data) => {
    try {
      const deleteUser = await axios.delete('https://jsonplaceholder.typicode.com/posts/' + data.id)
      // console.log("deleteUser-----------", deleteUser)
      setRows((prevRows) => prevRows.filter((row) => row.id !== data.id));
      toast.success("User deleted successfullty!")
    } catch (err) {
      toast.error("Failed to delete user")
    }
    handleClose()
  }
  return (
    <Card className="body" style={{ width: '100%', height: '100%' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <b>Users Management Table</b>
          <Button variant="outlined" onClick={toggleDrawer(true)}>
            <AddIcon/>
            Add User
          </Button>
        </div>
        <UserTable rows={rows} handleEdit={handleEdit} handleDelete={handleDelete} />
        <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
          <DrawerForm
            name={name}
            setName={setName}
            username={username}
            setUserName={setUserName}
            phone={phone}
            setPhone={setPhone}
            website={website}
            setWebsite={setWebsite}
            nameError={nameError}
            usernameError={usernameError}
            phoneError={phoneError}
            websiteError={websiteError}
            resetData={resetData}
            createOrUpdateData={createOrUpdateData}
            toggleDrawer={toggleDrawer}
            editingId={editingId}
          />
        </Drawer>
        <ToastContainer />
        {open && <DeleteDialog isOpen={open} data={rowData} handleClose={handleClose} handleConfirm={handleConfirm} />}
      </div>
    </Card>
  );
}

export default App;

