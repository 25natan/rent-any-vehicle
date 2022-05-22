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
import { doc, getDoc, setDoc } from "firebase/firestore"; 


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
      else props.setError('Sorry... Username or password are not correct');
    })
  };

  useEffect(() => {
    if(props.isAuth) navigate('/');
  },[]);

  return (
    <div className="signin-page">
      <form className="signup-form" onSubmit={signIn}>
        <h1>Sign In</h1>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
        </Avatar>
        <label htmlFor='userName'>User Name</label>
        <input required name='userName'></input>
        <label htmlFor='password' className="password">Password</label>
        <input type='password' name='password'></input>
        <button className="sumbit-signup" type='submit'>Submit</button>
        <span className="error" aria-live="polite">{props.error}</span>
        <button className="signin-with-google-btn" onClick={signInWithGoogle}>Sign in with google</button>
        {/* <Link href='#'>Forgot password?</Link> */}
        <Link href='/signUp'>
              {"Don't have an account? Sign Up"}
        </Link>
        
      </form>
  </div>
  );
}
