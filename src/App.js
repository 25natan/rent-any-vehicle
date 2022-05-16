import logo from "./logo.svg";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AddItem from "./pages/Add-item";
import Home from "./pages/Home";
import { useState } from "react";
import {signOut} from 'firebase/auth';
import { auth, db } from "./firebase-config";
import {setDoc, doc} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function App() {

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.setItem('auth', null);
      window.location.pathname = '/signin';
    })
  };

  const signUserUp = (userName, password) => {
      setDoc(doc(db, "users", userName),
        {
          userName: userName,
          password: password
        },
        {
          merge: true
        }
      )
      .then(() => {
        localStorage.setItem('auth', JSON.stringify({userName: userName, password: password}));
        window.location.pathname = '/';
      });
  }

  return (
    <div className="App">
      <Router>
        <nav>
          {!localStorage.getItem('auth') ? <Link to='/signin'>Sign In</Link> : 
          <>
          <Link to='/addItem'>Add Vehicle</Link>
          <Link to='#' onClick={signUserOut}>Sign Out</Link>
          <Link to='/'>Home</Link>
          </>
          }
        </nav>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/addItem" element={<AddItem />}/>
          <Route path="/signIn" element={<SignIn signUserUp={signUserUp} />}/>
          <Route path="/signUp" element={<SignUp signUserUp={signUserUp} />}/>
        </Routes>
      </Router>
      <div className="footer"><p>© Copyrights: Natan Ytzhaki & Yair Biber</p></div>
    </div>
  );
}

export default App;
