import React, {useEffect} from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {auth, provider, db} from '../firebase-config';
import {signInWithPopup} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; 

const USERS = 'users';

export default function SignIn(props) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      const [userName, password] = [result.user.displayName, result.user.email];
      const userDocRef = doc(db, USERS, userName);
      getDoc(userDocRef).then((userDocSnap) => {
      if(userDocSnap.exists() && userDocSnap.data().password === password){
        props.setIsAuth(true);
        props.setUserName(userName);
        navigate('/');
      }
      else {
        alert('Sorry! Plesae sign up first\n or sign in to your google acount - if you are already registered -\nand then try again');
        navigate('/signup');
      }
    });
  });}

  useEffect(() => {
    if(props.isAuth)  navigate('/');
  },[]);

  const signIn = (event) => {
    event.preventDefault();
    const [userName, password] = [event.target.userName.value, event.target.password.value];
    const userDocRef = doc(db, USERS, userName);
    getDoc(userDocRef).then((userDocSnap) => {
      if(userDocSnap.exists() && userDocSnap.data().password === password){
        props.setIsAuth(true);
        props.setUserName(userName);
        navigate('/');
      }
      else props.setError('Sorry... Username or password are not correct');
    }).catch((e)=> console.log(e));
  };

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
