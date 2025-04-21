import React, { useState, useRef } from 'react';
import { MDBContainer, MDBInput, MDBBtn , MDBSpinner } from 'mdb-react-ui-kit';
import {Link ,useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";
import emailjs from '@emailjs/browser';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [issubmit, setissubmit] = useState(false)
  const navigate = useNavigate();
  const form = useRef(null);
  const submit = async (e) => {
    e.preventDefault();
    setissubmit(true)

    if (!email) {
        setissubmit(false)
        Swal.fire({
            icon: 'warning',
            title: 'Please enter your email',
            confirmButtonColor: 'rgb(59, 113, 202)'
        });
        return;
    }

    try {

    

    //temp simulating any mail sucess remove when using email

    const tempUser = (email) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ success: true }); 
          }, 500); 
        });
      };
  

      //remove upto this

      // const response = await axios.get(`http://localhost:5000/users/${email}`); //API for verfing user exits
      //change function depands upon users API

      // console.log(email)
      
      
      try {
        // const response = await axios.get(`http://localhost:5000/users/${email}`); //API for verfing user exits
      //change function depands upon users API
        const response = await tempUser(email);
        const result = await emailjs.send(
          process.env.REACT_APP_SERVICE_ID,
          process.env.REACT_APP_TEMPLATE_ID,
          { email: email,link:"https://aakashrio.github.io/login_module/change-password" },
          process.env.REACT_APP_PUBLIC_ID
        )
      
        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Link Sent',
            text: `A password reset link has been sent to ${email}`,
            confirmButtonColor: 'rgb(59, 113, 202)'
          }).then(() => {
            navigate('/login');
          });
        }
      
      } catch (error) {
        setissubmit(false);
        console.error("Email sending failed:", error); // This logs the actual error
        Swal.fire({
          icon: 'error',
          title: 'Email Sending Failed',
          text: error.text || 'Something went wrong. Please try again later.',
          confirmButtonColor: 'rgb(59, 113, 202)'
        });
      }      
    } catch (error) {
      setissubmit(false)
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Something went wrong. Please try again later.',
        confirmButtonColor: 'rgb(59, 113, 202)'
      });
    }
  };

  return (
    <div className='main_containerd d-flex justify-content-center align-items-center' style={{ width: '100%', height: '100vh' }}>
      <MDBContainer className='d-flex justify-content-center align-items-center square border border-2 rounded w-auto flex-column p-3 pb-4'>
        <p className="font-monospace fw-bolder fs-4" style={{ fontFamily: 'poppins' }}>Forgot Password</p>
        <form ref={form} className='d-flex flex-column mt-2' onSubmit={submit}>
          <MDBInput
            label="Email input"
            id="typeEmail"
            type="email"
            name="userEmail"
            style={{ minWidth: '400px' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBBtn className='mt-3 mb-4' type='submit' block disabled={issubmit}>
            {issubmit ? 
                <MDBSpinner size='sm' role='status'> <span className='visually-hidden'>Loading...</span></MDBSpinner>
                : 
                'Generate Link' }
          </MDBBtn>
        </form>
        <span className='d-flex justify-content-evenly align-items-center m-2'>
          Back to login? <Link to="/login" className='ms-2' style={{ textDecoration: 'underline' }}>Login</Link>
        </span>
      </MDBContainer>
    </div>
  );
}

export default ForgotPassword;
