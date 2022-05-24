import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function SignUp(props) {
  let navigate = useNavigate();

  useEffect(() => {
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
      <img src='/lock-icon.jpg' alt=''/>
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
