import React, { useState } from 'react';
import API from '../services/api';
import signUpImage from '../asset/sign-up.png';
import './SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/signup', formData);
      alert(response.data.message);
      setOtpSent(true);
    } catch (error) {
      alert('Error sending OTP. Please try again.');
    }
  };

  return (
    <>
  <div className="sign-up-container">
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      {otpSent && <p>OTP has been sent. Please verify.</p>}
    </div>
    <div className="image-container">
      <img src={signUpImage} alt="Sign Up" /> {/* Replace with your image path */}
    </div>
  </div>
</>
  );
}

export default SignUp;