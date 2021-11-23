import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import JwtService from '../../service/jwtService';
import cookie from 'react-cookies';
import { JWT_TOKEN_COOKIE } from '../../constants';

export default function LoginDialog(props) {
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [errorMessage, seterrorMessage] = React.useState('');

    // dependency [props.open] will enforce to function call
    React.useEffect(()=>{
        seterrorMessage('');
    }, [props.open])

    const handleLogin = (event) => {
        // send login request to server(axios -> xhr request)
        //1. if is successful, store jwt access token in cookies;
        JwtService.login(username, password)
        .then(response => {
            const accessToken = response.data.access;
            cookie.save(JWT_TOKEN_COOKIE, accessToken); //import a constant
            window.location.reload(); //rerender the website
        })
        .catch(error => {
            console.log(error);
            seterrorMessage(error.response.data.detail);
        }
        );
        //2. if fail, display error message;

    }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={props.open} onClose={props.handleCloseDialog}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="User Name"
            type="email"
            fullWidth
            variant="standard"
            onChange={(event)=> {setUsername(event.target.value)}}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(event)=> {setPassword(event.target.value)}}
          />
        </DialogContent>
        <DialogContentText color = 'error'> 
        {/* set the error color -- red */}
            {errorMessage}
        </DialogContentText>
        <DialogActions>
          <Button onClick={props.handleCloseDialog}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
