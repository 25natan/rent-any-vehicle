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

  const [isAuth, setIsAuth] = useState(false);
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = 'signin';
    })
  };

  const signUserUp = (userName, password) => {
      setDoc(doc(db, "users", userName), {
      userName: userName,
      password: password
    }, {merge: true});
  }

  return (
    <div className="App">
      <Router>
        <nav>
          <Link to='/'>Home</Link>
          {!isAuth ? <Link to='/signin'>Sign In</Link> : 
          <>
          <Link to='/addItem'>Add Item</Link>
          <Link to='#' onClick={signUserOut}>Sign Out</Link>
          </>
          }
        </nav>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/addItem" element={<AddItem />}/>
          <Route path="/signIn" element={<SignIn signUserUp={signUserUp} setIsAuth={setIsAuth}/>}/>
          <Route path="/signUp" element={<SignUp signUserUp={signUserUp} setIsAuth={setIsAuth}/>}/>
        </Routes>
      </Router>
      <div className="footer"><p>© Copyrights: Natan Ytzhaki & Yair Biber</p></div>
    </div>
  );
}

export default App;
