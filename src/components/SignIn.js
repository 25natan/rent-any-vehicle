import React, {useEffect} from "react";
import { Link } from "@mui/material";
import {auth, provider, db} from '../firebase-config';
import {signInWithPopup} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"; 

const USERS = 'users';

export default function SignIn(props) {
  let navigate = useNavigate();

  const signInWithGoogle = e => {
    try{
      e.preventDefault();
      signInWithPopup(auth, provider).then(async (result) => {
        const [email] = [result.user.email];
        const q = query(collection(db, USERS), where("email", "==", email));
        const docs = await getDocs(q);
        if(docs.docs[0].exists()){
          const data = docs.docs[0].data();
          props.setIsAuth(true);
          props.setUserName(data.userName);
          navigate('/');
        }
        else {
          alert('Sorry! Plesae sign up first\n or sign in to your google acount - if you are already registered -\nand then try again');
          navigate('/signup');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

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
        <img src='/lock-icon.jpg' alt=''/>
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
