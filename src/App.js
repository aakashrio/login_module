import './App.css';
import Login from "./Components/login";
import Signup from "./Components/signup";
import Forgot from "./Components/forgot_password";
import Home from "./Components/home";
import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {MDBBtn , MDBIcon} from 'mdb-react-ui-kit';

function App() {
  const [userData, setUserData] = useState(() => {
    const savedUser = localStorage.getItem("userData");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserData(null);
  };

  const isLoggedIn = !!userData;

  return (
    <div className="App">
      <Router>
        <div className='main_containerd d-flex justify-content-center align-items-center flex-column' style={{ width: '100%', height: '100vh' }}>
          {isLoggedIn && (
            <div className="userinfo-container d-flex justify-content-center align-items-center flex-column" style={{ padding: "1rem" }}>
              <span>Welcome {userData.name}</span>
              <MDBBtn className='m-2'onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout  <MDBIcon  className='ms-2'fas icon="sign-out-alt" /></MDBBtn>
            </div>
          )}
          <Routes>
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/home" />
                ) : (
                  <Login onLogin={setUserData} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isLoggedIn ? (
                  <Navigate to="/home" />
                ) : (
                  <Signup onSignup={setUserData} />
                )
              }
            />
            <Route path="/forgot-password" element={<Forgot />} />
            <Route
              path="/home"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
