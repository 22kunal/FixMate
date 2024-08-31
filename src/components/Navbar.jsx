import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false); 
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

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
    } else {
      setIsSignInModalOpen(true); // Open the sign-in modal
    }
  };

  const handleSignIn = () => {
    setIsLoggedIn(true);
    setIsSignInModalOpen(false); // Close the sign-in modal
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
      <div className="navbar-logo">
        <div className="logo-icon">FM</div>
        <span className="logo-text">Fix Mate</span>
      </div>

      {/* Links */}
      <div className="navbar-links">
        <a href="#">Beauty</a>
        <a href="#">Homes</a>
        <a href="#">Native</a>
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
        {!isLoggedIn && (
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
            onClick={() => setIsLoggedIn(false)}
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
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="sign-in-input"
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
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="sign-up-input"
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="sign-up-input"
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="sign-up-input"
            />
            <button className="modal-button" onClick={closeSignUpModal}>
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
