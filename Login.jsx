import React, { useState } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const [showDOB, setShowDOB] = useState(false);
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Define our predefined users (4 admins and 1 regular user)
  const predefinedUsers = [
    { phone: "9597624584", dob: "23/01/2005", role: "admin", name: "Admin 1" },
    { phone: "8610712150", dob: "13/06/2005", role: "admin", name: "Admin 2" },
    { phone: "7867842198", dob: "21/06/2004", role: "admin", name: "Admin 3" },
    { phone: "9489665066", dob: "04/04/1993", role: "admin", name: "Admin 4" },
    { phone: "6383560369", dob: "11/06/2005", role: "user", name: "Regular User" }
  ];
  
  const handleLogin = () => {
    // Reset error state
    setError("");
    
    // Find matching user based on phone and dob
    const user = predefinedUsers.find(
      u => u.phone === phone && u.dob === dob
    );
    
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
    } else {
      setError("Invalid phone number or date of birth");
    }
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setPhone("");
    setDob("");
  };
  
  // If user is logged in, show dashboard
  if (isLoggedIn && currentUser) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="dashboard-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <h1>Welcome, {currentUser.name}</h1>
          <p>Role: {currentUser.role === "admin" ? "Administrator" : "Regular User"}</p>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        
        <div className="dashboard-content">
          {currentUser.role === "admin" ? (
            <div className="admin-panel">
              <h2>Admin Panel</h2>
              <p>You have access to admin features</p>
              {/* Admin-specific content would go here */}
              <div className="admin-actions">
                <button>Manage Users</button>
                <button>View Reports</button>
                <button>System Settings</button>
              </div>
            </div>
          ) : (
            <div className="user-panel">
              <h2>User Dashboard</h2>
              <p>Welcome to your user dashboard</p>
              {/* Regular user content would go here */}
              <div className="user-actions">
                <button>View Profile</button>
                <button>Update Information</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Otherwise show login form
  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="Login" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
              <input 
                type="tel" 
                placeholder="Phone Number" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="pass-input-div">
                <input 
                  type={showDOB ? "text" : "password"} 
                  placeholder="Date of Birth (MM/DD/YYYY)" 
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                {showDOB ? 
                  <FaEyeSlash onClick={() => {setShowDOB(!showDOB)}} /> : 
                  <FaEye onClick={() => {setShowDOB(!showDOB)}} />
                }
              </div>
              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot date of birth?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="button" onClick={handleLogin}>Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;