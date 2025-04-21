import React, { useState } from 'react';
import { MDBContainer, MDBInput, MDBBtn , MDBSpinner } from 'mdb-react-ui-kit';
import { Link ,Navigate,useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [issubmit, setissubmit] = useState(false)
  const navigate = useNavigate();

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
  
      const response = await tempUser(email); 

      //remove upto this

      // const response = await axios.get(`http://localhost:5000/users/${email}`); //API for verfing user exits
      //change function depands upon users API

      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: 'Link Sent',
          text: `A password reset link has been sent to ${email}`,
          confirmButtonColor: 'rgb(59, 113, 202)'
        }).then(()=>{
            navigate('/login')
        });
      } else {
        setissubmit(false)
        Swal.fire({
          icon: 'error',
          title: 'User not found',
          text: 'No user found with this email address.',
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
        <form className='d-flex flex-column mt-2' onSubmit={submit}>
          <MDBInput
            label="Email input"
            id="typeEmail"
            type="email"
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
