import React, { useState } from 'react';
import { MDBContainer, MDBInput, MDBCol, MDBRow, MDBCheckbox, MDBBtn, MDBSpinner } from 'mdb-react-ui-kit';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing fields',
        text: 'Please enter both email and password.',
        confirmButtonColor: 'rgb(59, 113, 202)'
      });
      return;
    }

    setIsLoggingIn(true);

    try {
      // TEMP login system
      const tempLogin = (email, password) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (email === 'test@example.com' && password === '1234') {
              resolve({ success: true, user: { name: 'Naveen', email } });
            } else {
              resolve({ success: false });
            }
          }, 800);
        });
      };

      const response = await tempLogin(email, password);

      if (response.success) {
        localStorage.setItem("userData", JSON.stringify(response.user));
        onLogin(response.user); // 👈 Notify App.js of login
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          confirmButtonColor: 'rgb(59, 113, 202)'
        }).then(() => {
          navigate('/home');
        });
      } else {
        setIsLoggingIn(false);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid email or password.',
          confirmButtonColor: 'rgb(59, 113, 202)'
        });
      }
    } catch (err) {
      setIsLoggingIn(false);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Please try again later.',
        confirmButtonColor: 'rgb(59, 113, 202)'
      });
    }
  };

  return (
    <div className='main_containerd d-flex justify-content-center align-items-center' style={{ width: '100%', height: '100vh' }}>
      <MDBContainer className='d-flex justify-content-center align-items-center square border border-2 rounded w-auto flex-column p-3'>
        <p className="font-monospace fw-bolder fs-3" style={{ fontFamily: 'poppins' }}>Login</p>
        <form className='square w-100 m-2 mt-1 p-2' onSubmit={handleLogin}>
          <MDBInput
            className='mb-4'
            size="lg"
            type='email'
            label='Email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput
            className='mb-4'
            size="lg"
            type='password'
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <MDBRow className='mb-4 d-flex justify-content-between align-items-center'>
            <MDBCol size='auto'>
              <MDBCheckbox id='rememberMe' label='Remember me' defaultChecked />
            </MDBCol>
            <MDBCol size='auto'>
              <Link to="/forgot-password" className='ms-2' style={{ textDecoration: 'underline' }}>Forgot Password</Link>
            </MDBCol>
          </MDBRow>
          <MDBBtn type='submit' block disabled={isLoggingIn}>
            {isLoggingIn ? (
              <MDBSpinner size='sm' role='status'>
                <span className='visually-hidden'>Logging in...</span>
              </MDBSpinner>
            ) : 'Login'}
          </MDBBtn>
        </form>
        <span className='d-flex justify-content-evenly align-items-center m-2'>
          New to the Platform? <Link to="/signup" className='ms-2' style={{ textDecoration: 'underline' }}>Sign up</Link>
        </span>
      </MDBContainer>
    </div>
  );
}

export default Login;
