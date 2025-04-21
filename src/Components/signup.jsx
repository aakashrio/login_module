import React, { useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBSpinner
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Signup({ onSignup }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreed: false
  });

  const [isSigningUp, setIsSigningUp] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, agreed } = formData;

    if (!firstName || !lastName || !email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing fields',
        text: 'Please fill out all fields.',
        confirmButtonColor: 'rgb(59, 113, 202)'
      });
      return;
    }

    if (password.length < 4 || password.length > 16) {
      Swal.fire({
        icon: 'warning',
        title: 'Password Error',
        text: 'Password must be 4 to 16 characters long.',
        confirmButtonColor: 'rgb(59, 113, 202)'
      });
      return;
    }

    if (!agreed) {
      Swal.fire({
        icon: 'warning',
        title: 'Terms not accepted',
        text: 'You must accept the terms and conditions to sign up.',
        confirmButtonColor: 'rgb(59, 113, 202)'
      });
      return;
    }

    setIsSigningUp(true);

    try {


      // program for api 


      // const response = await axios.post('http://localhost:5000/api/signup', {
      //   firstName, lastName, email, password
      // });
      // if (response.data.success) {
      //   localStorage.setItem("userData", JSON.stringify(response.data.user));
      //   onSignup(response.data.user);
      //   navigate('/home');
      // }


      // upto  to this

      //this fake signup 
      const fakeSignup = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ success: true, user: { name: `${firstName} ${lastName}`, email } });
          }, 1000);
        });
      };

      const response = await fakeSignup();

      //upto this

      if (response.success) {
        localStorage.setItem("userData", JSON.stringify(response.user));
        onSignup(response.user);
        Swal.fire({
          icon: 'success',
          title: 'Signup Successful',
          confirmButtonColor: 'rgb(59, 113, 202)'
        }).then(() => {
          navigate('/home');
        });
      } else {
        setIsSigningUp(false);
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: 'Something went wrong. Try again.',
          confirmButtonColor: 'rgb(59, 113, 202)'
        });
      }
    } catch (error) {
      setIsSigningUp(false);
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
        <p className="font-monospace fw-bolder fs-3" style={{ fontFamily: 'poppins' }}>SignUp</p>
        <form onSubmit={handleSubmit}>
          <MDBRow className='mb-4'>
            <MDBCol>
              <MDBInput id='firstName' size='lg' label='First name' value={formData.firstName} onChange={handleChange} />
            </MDBCol>
            <MDBCol>
              <MDBInput id='lastName' size='lg' label='Last name' value={formData.lastName} onChange={handleChange} />
            </MDBCol>
          </MDBRow>
          <MDBInput className='mb-4' size='lg' type='email' id='email' label='Email address' value={formData.email} onChange={handleChange} />
          <MDBInput className='mb-4' size='lg' type='password' id='password' label='Password' value={formData.password} onChange={handleChange} />
          <MDBCheckbox
            wrapperClass='d-flex justify-content-start mb-4'
            id='agreed'
            label='I have read and agree to the terms'
            checked={formData.agreed}
            onChange={handleChange}
          />
          <MDBBtn type='submit' className='mb-4' block disabled={isSigningUp}>
            {isSigningUp ? (
              <MDBSpinner size='sm' role='status'>
                <span className='visually-hidden'>Signing up...</span>
              </MDBSpinner>
            ) : 'Sign up'}
          </MDBBtn>
        </form>
        <span className='d-flex justify-content-evenly align-items-center m-2'>
          Already have an account? <Link to="/login" className='ms-2' style={{ textDecoration: 'underline' }}>Login</Link>
        </span>
      </MDBContainer>
    </div>
  );
}

export default Signup;
