import React, { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';
import signInImage from '../../asset/sign-up.png'; // Assuming a placeholder image exists
import './SignIn.css';

function SignIn() {
  const [formData, setFormData] = useState({ username: '', password: '', remember_me: true });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous error

    try {
      const response = await API.post('api/login/', {
        grant_type: 'ALL_USER_INFO',
        username: formData.username,
        password: formData.password,
        remember_me: formData.remember_me,
      });

      if (response.data) {
        alert('Login successful!');
        // Store username and password in local storage if login succeeds
        const fullUsername = response.data.Userdetails.firstname + ' ' + response.data.Userdetails.lastname;  
        localStorage.setItem('email', formData.username);
        localStorage.setItem('username', fullUsername);

        navigate('/home'); // Redirect to home page
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="sign-in-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <input type="email" name="username" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <label>
            <input
              type="checkbox"
              name="remember_me"
              checked={formData.remember_me}
              onChange={() => setFormData({ ...formData, remember_me: !formData.remember_me })}
            />
            Remember Me
          </label>
          <button type="submit">Sign In</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
      <div className="image-container">
        <img src={signInImage} alt="Sign In" />
      </div>
    </div>
  );
}

export default SignIn;
