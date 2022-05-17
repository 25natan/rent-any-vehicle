import React, {useEffect} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {auth, provider, db} from '../firebase-config';
import {signInWithPopup} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { doc, getDoc, addDoc } from "firebase/firestore"; 


const theme = createTheme();

const USERS = 'users';

export default function SignIn(props) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      const [userName, password] = [result.user.displayName, result.user.email];
      props.signUserUp(userName, password);
    });
  };

  useEffect(() => {
    if(props.isAuth)  navigate('/home');
  },[]);

  const signIn = (event) => {
    event.preventDefault();
    const [userName, password] = [event.target.userName.value, event.target.password.value];
    const userDocRef = doc(db, USERS, userName);
    getDoc(userDocRef).then((userDocSnap) => {
      if(userDocSnap.exists() && userDocSnap.data().password === event.target.password.value){
        props.setIsAuth(true);
        props.setUserName(userName);
        window.location.pathname = '/';
      }
      else console.log('username or password are not correct');
    })
  };

  useEffect(() => {
    if(props.isAuth) navigate('/');
  },[]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={signIn}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="userName"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                  <Link href='#'>
                    Forgot password?
                  </Link>
              </Grid>
              <Grid item>
                  <Link href='/signUp'>
                    {"Don't have an account? Sign Up"}
                  </Link>
              </Grid>
            </Grid>
            <button className="signin-with-google-btn" onClick={signInWithGoogle}>Sign in with google</button>
          </Box>

        </Box>
        
      </Container>
          
    </ThemeProvider>
  );
}
