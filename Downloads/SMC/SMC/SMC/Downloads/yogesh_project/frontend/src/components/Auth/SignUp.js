import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import API from '../../services/api';
import signUpImage from '../../asset/sign-up.png';
import './SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
    role: 'ADMIN',
    Admin: '',
    profilephoto: ''
  });
  
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/api/register/', formData);
      alert(response.data.message || 'Registration successful.');
      navigate('/'); // Redirect to sign-in page after success
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <>
      <div className="sign-up-container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
            <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="image-container">
          <img src={signUpImage} alt="Sign Up" />
        </div>
      </div>
    </>
  );
}

export default SignUp;
