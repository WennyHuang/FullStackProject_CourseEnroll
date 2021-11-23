import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import LoginDialog from './dialog/LoginDialog';
//import MenuIcon from '@mui/icons-material/Menu';
import { JWT_TOKEN_COOKIE } from '../constants';
import cookie from 'react-cookies';

export default function MenuBar() {
  //define the states
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  // read cookie
  const token = cookie.load(JWT_TOKEN_COOKIE); 
  // TODO: how to validate the token
  const isLoggedIn = token ? true : false;
  const handleLogOut = () =>{
    //delete token
    cookie.remove(JWT_TOKEN_COOKIE); 
    window.location.reload();
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Course Enroll System
          </Typography>
          <Button color="inherit" component={Link} to='/' >All Courses</Button>
          <Button color="inherit" component={Link} to='/enrolled'>Enrolled Courses</Button>
          {
            isLoggedIn? <Button color="inherit" onClick={handleLogOut} >Log Out</Button>:
            <Button color="inherit" onClick={handleOpenDialog} >Login</Button>
          }
        </Toolbar>
        <LoginDialog 
        // don't need the open dialog function after open the dialog
        open = {openDialog}
        handleCloseDialog = {handleCloseDialog}
        />
      </AppBar>
    </Box>
  );
}
