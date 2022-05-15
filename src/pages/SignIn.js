import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Link as RouterLink} from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {auth, provider, db} from '../firebase-config';
import {signInWithPopup} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore"; 


const theme = createTheme();

const USERS = 'users';

export default function SignIn(props) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      props.signUserUp(result.user.displayName, result.user.email);
    })
    localStorage.setItem('isAuth', true);
    console.log('isauth');
    props.setIsAuth(true);
    navigate('/');
  };

  const signIn = (event) => {
    event.preventDefault();
    const userDocRef = doc(db, USERS, event.target.userName.value);
    getDoc(userDocRef).then((userDocSnap) => {
      if(userDocSnap.exists() && userDocSnap.data().password === event.target.password.value){
        localStorage.setItem('isAuth', true);
        console.log('isauth');
        props.setIsAuth(true);
        navigate('/');
      }
      else
        console.log('username or password are not correct');
    })
  };

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
                <RouterLink to='#'>
                  <Link variant="body2">
                    Forgot password?
                  </Link>
                </RouterLink>
              </Grid>
              <Grid item>
                <RouterLink to='/signUp'>
                  <Link variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </RouterLink>
              </Grid>
            </Grid>
            <button className="signin-with-google-btn" onClick={signInWithGoogle}>Sign in with google</button>
          </Box>

        </Box>
        
      </Container>
          
    </ThemeProvider>
  );
}
