
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./Pages/Home"
import Super from "./Pages/Super"
import Admin from "./Pages/Admin"
import Faculty from "./Pages/Faculty"
import Program from "./Pages/Program"
import Partner from "./Pages/Partner"
import Theme from "./Pages/Theme"
import Login from "./Pages/Login"
import Error from "./Pages/Error"

function App() {
  return (
   
      <div className="App">
          <Router>
          <ul>
            <li><Link class="active" to="/">CICT API</Link></li>
            <li><Link  to="/Super">SUPER ADMIN</Link></li>
            <li><Link  to="/Admin">ADMIN</Link></li>
            <li><Link  to="/Faculty">FACULTY</Link></li>
            <li><Link  to="/Program">PROGRAM</Link></li>
            <li><Link  to="/Partner">PARTNERS</Link></li>
            <li><Link  to="/Theme">THEME</Link></li>
            <li><Link  to="/Login">LOGIN</Link></li>
          </ul>
            <Routes>
               <Route path='/' element={<Home />}></Route>
               <Route path='/Super' element={<Super />}></Route>
               <Route path='/Admin' element={<Admin />}></Route>
               <Route path='/Faculty' element={<Faculty />}></Route>
               <Route path='/Program' element={<Program />}></Route>
               <Route path='/Partner' element={<Partner />}></Route>
               <Route path='/Theme' element={<Theme />}></Route>
               <Route path='/Login' element={<Login />}></Route>
               <Route path='*' element={<Error />}></Route>
            </Routes>
          </Router>
      </div>
   
  );
}

export default App;
