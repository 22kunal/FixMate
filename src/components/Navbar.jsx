import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useState,useEffect } from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userName, setUserName] = useState(""); 

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      // Validate token
      fetch("http://localhost:5000/api/auth/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            // Token is valid
            console.log(response);
            return response.json();
          } else {
            // Token is invalid
            throw new Error("Invalid token");
          }
        })
        .then((data) => {
          setIsLoggedIn(true);
          console.log(data);
          setUserName(data.name); 
        })
        .catch(() => {
          localStorage.removeItem("jwtToken"); 
        });
    }
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleDropdown = () => {
    if (isLoggedIn) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setIsDropdownOpen(false);
      setUserName(""); // Clear the user's name on logout
      localStorage.removeItem("jwtToken"); // Remove JWT from local storage
    } else {
      setIsSignInModalOpen(true); // Open the sign-in modal
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const { token, name } = await response.json();
        localStorage.setItem("jwtToken", token); // Save JWT in local storage
        setUserName(name); // Set the user's name
        setIsLoggedIn(true);
        setIsSignInModalOpen(false); // Close the sign-in modal
      } else {
        console.error("Failed to sign in");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, password }),
      });
      if (response.ok) {
        setIsSignUpModalOpen(false); // Close the sign-up modal
        setIsSignInModalOpen(true); // Open the sign-in modal
      } else {
        console.error("Failed to sign up");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false); // Close the sign-in modal
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true); // Open the sign-up modal
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false); // Close the sign-up modal
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <div className="logo-icon">FM</div>
        <span className="logo-text">Fix Mate</span>
      </Link>

      {/* Links */}
      <div className="navbar-links">
        <Link to="/ServiceWorker">Services</Link>
        <Link to="/ComplainCreation">Complain</Link>
        <Link to="/native">Native</Link>
      </div>

      {/* Location and Search */}
      <div className="search">
        <div className="location" onClick={toggleModal}>
          <span className="location-icon">📍</span>
          <span>Near Neelam, Rajpura</span>
          <span className="dropdown-arrow">▼</span>
        </div>
        <div className="navbar-search">
          <CiSearch />
          <input type="text" placeholder="Search for ‘AC services’" />
        </div>
      </div>

      {/* Icons */}
      <div className="navbar-icons" onClick={toggleDropdown}>
        {isLoggedIn ? (
          <span className="login-button">
            {userName} 
          </span>
        ) : (
          <span className="login-button" onClick={handleLoginLogout}>
            Sign In
          </span>
        )}
        <FaRegUser style={{ fontSize: "25px" }} />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Select Your Location</h2>
            <input
              type="text"
              placeholder="Enter your location"
              className="location-input"
            />
            <button className="modal-button" onClick={toggleModal}>
              Save Location
            </button>
          </div>
        </div>
      )}

      {/* Dropdown */}
      {isDropdownOpen && isLoggedIn && (
        <div className="dropdown-menu">
          <a href="#" className="dropdown-item">
            Profile
          </a>
          <a href="#" className="dropdown-item">
            History
          </a>
          <a
            href="#"
            className="dropdown-item"
            onClick={() => {
              setIsLoggedIn(false);
              setUserName(""); // Clear the user's name
              localStorage.removeItem("jwtToken"); // Remove JWT from local storage
            }}
          >
            Logout
          </a>
        </div>
      )}

      {isSignInModalOpen && (
        <div className="modal-overlay" onClick={closeSignInModal}>
          <div
            className="modal-content sign-in-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Sign In</h2>
            <input
              type="text"
              placeholder="Enter your email"
              className="sign-in-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="sign-in-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="modal-button" onClick={openSignUpModal}>
              Sign Up
            </button>
            <button className="modal-button" onClick={handleSignIn}>
              Sign In
            </button>
          </div>
        </div>
      )}

      {isSignUpModalOpen && (
        <div className="modal-overlay" onClick={closeSignUpModal}>
          <div
            className="modal-content sign-up-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Sign Up</h2>
            <input
              type="text"
              placeholder="Enter your full name"
              className="sign-up-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="sign-up-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="sign-up-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="sign-up-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="modal-button" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
