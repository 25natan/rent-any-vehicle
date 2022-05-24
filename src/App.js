import logo from "./logo.svg";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AddItem from "./components/AddItem";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import {signOut} from 'firebase/auth';
import { auth, db } from "./firebase-config";
import {setDoc, doc, getDoc} from "firebase/firestore";
import Mailbox from "./components/Mailbox";
import $ from 'jquery';
const USERS = 'users';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState(null);
  const [error, setError] = useState('');

  const signUserOut = () => {
    signOut(auth).then(() => {
      setIsAuth(false);
      setUserName(null);
      localStorage.clear();
      window.location.pathname = '/signin';
    })
  };

  useEffect(() => {
    isAuth && localStorage.setItem('isAuth', isAuth);
  }, [isAuth]);

  useEffect(() => {
      userName && localStorage.setItem('userName', userName);
  }, [userName]);

  useEffect(() => {
    setIsAuth(localStorage.getItem('isAuth') === 'true');
    setUserName(localStorage.getItem('userName'));
  }, []);

  const signUserUp = async ({userName, email, phoneNumber, hasWhatsapp, password}) => {
    try{
      setIsLoading(true);
      const userDocRef = doc(db, USERS, userName);
      const docs = await getDoc(userDocRef);
      if(docs.exists()) {
        setError("Sorry! User name already exists\nPlesae try another name");
        setIsLoading(false);
        return;
      }
      setDoc(doc(db, "users", userName),
        {userName: userName, email: email, phoneNumber: phoneNumber, hasWhatsapp: hasWhatsapp, password: password},
          {
            merge: true
          }
        )
        .then(() => {
          setIsAuth(true);
          setUserName(userName);
          setIsLoading(false);
          window.location.pathname = '/';
        });
    } catch(e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Router>
      <div className="header">
      <div className="logo"> <img src='/logo.png' alt='logo'/></div>
        <div className="main-nav">
          {!isAuth ? <Link to='/signin'>Sign In</Link> :
          <>
          <Link to='/'>Home</Link>
          <Link to='/addItem'>Add Vehicle</Link>
          <Link to='#' onClick={signUserOut}>Sign Out</Link>
          <div className="user-profile">Hi {userName} </div>
          <div className=" mailbox-nav-btn"><Link to='messages'><i className="fa fa-envelope" aria-hidden="true"></i></Link></div>
          </>
        }
        </div>
        {isLoading &&  <div className="loader-circle-9">Loading<span></span></div>} 
        </div>
        <Routes>
          <Route path="/*" element={<Home isAuth={isAuth} isLoading={isLoading} setIsLoading={setIsLoading} userName={userName} />}/>
          <Route path="/addItem" element={<AddItem isAuth={isAuth} userName={userName}  setIsLoading={setIsLoading}/>}/>
          <Route path="/signIn" element={<SignIn setUserName={setUserName} signUserUp={signUserUp} isAuth={isAuth} setIsAuth={setIsAuth} error={error} setError={setError} />}/>
          <Route path="/signUp" element={<SignUp setUserName={setUserName} signUserUp={signUserUp} isAuth={isAuth} setIsAuth={setIsAuth} error={error} />}/>
          <Route path="/messages" element={<Mailbox isAuth={isAuth} userName={userName} />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
