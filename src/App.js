import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { AiFillThunderbolt } from "react-icons/ai";
import Home from './components/home';
import Alldata from './components/alldata';
import Rejection from './components/rejection';
import Approved from './components/approved';
import './App.css';
import Unapproved from './components/unapproved';
import Login from './components/login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false); // Set isLoggedIn state to false on logout
  };

  return (
    <Router>
      <div className="App">
        {!isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} />}
        {isLoggedIn && (
          <>
            <nav className="sidebar">
              <ul>
                <li>
                  <NavLink to="/" activeClassName="active"> <AiFillThunderbolt />All Data</NavLink>
                </li>
                <li>
                  <NavLink to="/approved" activeClassName="active"> <AiFillThunderbolt />Approved</NavLink>
                </li>
                <li>
                  <NavLink to="/unapproved" activeClassName="active"> <AiFillThunderbolt />Un Approved</NavLink>
                </li>
                <li>
                  <NavLink to="/rejection" activeClassName="active"> <AiFillThunderbolt />Rejection</NavLink>
                </li>
                <li>
                  {/* <button onClick={handleLogout}>Logout</button> Logout button */}
                </li>
              </ul>
            </nav>

            <div className="content">
              <Routes>
                <Route path="/" element={<Alldata />} />
                <Route path="/approved" element={<Approved />} />
                <Route path="/unapproved" element={<Unapproved />} />
                <Route path="/rejection" element={<Rejection />} />
                <Route path="/home" element={<Home />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
