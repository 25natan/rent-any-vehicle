import logo from "./logo.svg";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AddItem from "./components/Add-item";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import {signOut} from 'firebase/auth';
import { auth, db } from "./firebase-config";
import {setDoc, doc} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState(null);

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
        setIsAuth(true);
        setUserName(userName);
        window.location.pathname = '/';
      });
  }

  return (
    <div className="App">
      <Router>
        <nav>
          {!isAuth ? <Link to='/signin'>Sign In</Link> :
          <>
          <Link to='/addItem'>Add Vehicle</Link>
          <Link to='#' onClick={signUserOut}>Sign Out</Link>
          <Link to='/'>Home</Link>
            </>
        }
        </nav>
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth}/>}/>
          <Route path="/addItem" element={<AddItem isAuth={isAuth} userName={userName}/>}/>
          <Route path="/signIn" element={<SignIn setUserName={setUserName} signUserUp={signUserUp} isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route path="/signUp" element={<SignUp setUserName={setUserName} signUserUp={signUserUp} isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
        </Routes>
      </Router>
      <footer className="footer"><p>© Copyrights: Natan Ytzhaki & Yair Biber</p></footer>
    </div>
  );
}

export default App;
