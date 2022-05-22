import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignUp(props) {
  let navigate = useNavigate();

  useEffect(() => {
    console.log(props.isAuth);
    if(props.isAuth)  navigate('/');
  },[]);

  const submitform = event => {
    event.preventDefault();
    const [userName, email, phoneNumber, hasWhatsapp, password] = [event.target.userName.value, 
                                                                  event.target.email.value, 
                                                                  event.target.phoneNumber.value, 
                                                                  event.target.hasWhatsapp.checked, 
                                                                  event.target.password.value];
    props.signUserUp({userName, email, phoneNumber, hasWhatsapp, password});
  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={submitform}>
      <h1>Sign Up</h1>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
             <LockOutlinedIcon />
        </Avatar>
        <label htmlFor='userName'>User Name</label>
        <input required name='userName'></input>
        <label htmlFor='email'>Email </label>
        <input type='email' required name='email'></input>
        <label htmlFor='phoneNumber'>Phone Number</label>
        <input required type='tel' name='phoneNumber'></input>
        <label htmlFor='hasWhatsapp' className="hasWhatsappCheckBox">Phone number has Whatsapp</label>
        <input type='checkbox' name='hasWhatsapp'></input>
        <label htmlFor='password' className="password">Password</label>
        <input type='password' name='password'></input>
        <button className="sumbit-signup" type='submit'>Submit</button>
       <span className="error" aria-live="polite">{props.error}</span>
        <Link href='/signIn'>
                 {"Already have an account? Sign In"}
       </Link>
      </form>
    </div>
  );
}
