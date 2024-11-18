import React,{useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

function Home() {
  const navigate = useNavigate(); // Use navigate hook for programmatic navigation

  const handleLogout = () => {
    // Clear any session or authentication data (e.g., localStorage)
    localStorage.removeItem('username');
    localStorage.removeItem('email'); // Or any other session data you are using
    localStorage.removeItem('log_out_time');
    // Redirect the user to the login page after logout
    navigate('/');
  };
   useEffect(() => {
    const expTime = localStorage.getItem('log_out_time');
    if (expTime) {
      const currentTime = new Date().getTime(); // Get current time in epoch
      if (currentTime > expTime) {
        localStorage.removeItem('username');
        localStorage.removeItem('email'); // Or any other session data you are using
        localStorage.removeItem('log_out_time');
        navigate('/'); // Redirect to login if expired
      }
    } else {
      navigate('/');
    } 
  }, [navigate]); // Run this effect on component mount

  return (
    <div className="home_background">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Smart Student Monitoring System</h1>
        </div>
        <div className="navbar-right">
          <div className="user-info">
            <img
              src="https://www.nicepng.com/png/full/128-1280406_user-icon-png.png"
              alt="User Icon"
              className="user-icon"
            />
            <span className="username">{localStorage.getItem('username')}</span>
            {/* Dummy username */}
          </div>
          {/* Logout button */}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className="home">
        <h1>Welcome to Smart Student Monitoring System</h1>
        <p>Your one-stop platform for academic guidance, aptitude analysis, and counseling.</p>

        <div className="home-links">
          <Link to="/aptitude-test">
            <button className="home-button">Aptitude Test</button>
          </Link>
          <Link to="/counseling-appointment">
            <button className="home-button">Counseling</button>
          </Link>
          <Link to="/webinars">
            <button className="home-button">Webinars</button>
          </Link>
          <Link to="/add-marks">
            <button className="home-button">Add Marks</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
