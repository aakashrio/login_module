import React, { useState } from 'react';
import { MDBContainer, MDBInput, MDBBtn, MDBSpinner } from 'mdb-react-ui-kit';
import { useNavigate , Link} from 'react-router-dom';
import Swal from 'sweetalert2';

function ChangePassword() {
  const [password, setPassword] = useState('');
  const [issubmit, setIssubmit] = useState(false);
  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    return password.length >= 4 && password.length <= 16;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIssubmit(true);

    // Check if password is valid
    if (!validatePassword(password)) {
      setIssubmit(false);
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password',
        text: 'Password must be between 4 and 16 characters.',
        confirmButtonColor: 'rgb(59, 113, 202)',
      });
      return;
    }

    try {
      // Simulate password change (you can replace this with actual API call)
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Password Changed',
          text: 'Your password has been successfully changed.',
          confirmButtonColor: 'rgb(59, 113, 202)',
        }).then(() => {
          navigate('/login'); // Redirect to login page
        });
      }, 1000);
    } catch (error) {
      setIssubmit(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
        confirmButtonColor: 'rgb(59, 113, 202)',
      });
    }
  };

  return (
    <div className="main_containerd d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100vh' }}>
      <MDBContainer className="d-flex justify-content-center align-items-center square border border-2 rounded w-auto flex-column p-3 pb-4">
        <p className="font-monospace fw-bolder fs-4" style={{ fontFamily: 'poppins' }}>Change Password</p>
        <form className="d-flex flex-column mt-2" onSubmit={handleSubmit}>
          <MDBInput
            label="New Password"
            id="newPassword"
            type="password"
            style={{ minWidth: '400px' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <MDBBtn className="mt-3 mb-4" type="submit" block disabled={issubmit}>
            {issubmit ? (
              <MDBSpinner size="sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </MDBSpinner>
            ) : (
              'Done'
            )}
          </MDBBtn>
        </form>
        <span className="d-flex justify-content-evenly align-items-center m-2">
          Back to login? <Link to="/login" className="ms-2" style={{ textDecoration: 'underline' }}>Login</Link>
        </span>
      </MDBContainer>
    </div>
  );
}

export default ChangePassword;
