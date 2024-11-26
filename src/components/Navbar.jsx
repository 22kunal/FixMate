import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useState,useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


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
  const [location, setLocation] = useState("Select Location");
  const [error, setError] = useState(null);

  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [fieldsOfExpertise, setFieldsOfExpertise] = useState("electrician");

  const { handleLogin, handleLogout } = useContext(AuthContext);
  const [Vendor, setVendor] = useState(false); 
  const [isVen, setIsVen] = useState(false); 
  const path = useLocation();
  const [active, setActive] = useState(path.pathname);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    setActive(path.pathname);
  }, [path.pathname]);

  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      setLocation(data.name);
      toast.success("Loaction updated");
      console.log(data);
    } catch (err) {
      setError("Unable to retrieve address.");
    }
  };

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
            // toast.success("jwt logged in successfully");
            return response.json();
          } else {
            // Token is invalid
            throw new Error("Invalid token");
          }
        })
        .then((data) => {
          setIsLoggedIn(true);
          setUserName(data.name);
          setVendor(data.isVendor);
          // handleLogin(token, data.name, data.id, data.isVendor);
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
      setUserName("");
      handleLogout();
    } else {
      setIsSignInModalOpen(true);
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
        const { token, name, isVendor, id, fieldsOfExpertise,isAdmin:admin } = await response.json();
        localStorage.setItem("jwtToken", token);
        handleLogin(token, name, id,isVendor,fieldsOfExpertise);
        setVendor(isVendor); 
        setUserName(name);
        setIsLoggedIn(true);
        setIsSignInModalOpen(false);
        setIsDropdownOpen(false);
        setIsAdmin(admin);
      } else {
        const error = await response.json();
        toast.error(error.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignUp = async () => {
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      
      toast.error("Passwords do not match");
      return;
    }

    const vendorData = isVen ? { yearsOfExperience, fieldsOfExpertise } : {};

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          isVendor:isVen,
          ...vendorData,
        }),
      });
      if (response.ok) {
        setIsSignUpModalOpen(false);
        setIsSignInModalOpen(true);
        toast.success("Account created successfully");
      } else {
        toast.error("Account exists");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleVendorCheckbox = () => {
    setIsVen(!isVen);
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const handleProtectedLink = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error("Please sign in!");
    }
  };
  console.log(isAdmin);
  
  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <div className="logo-icon">FM</div>
        <span className="logo-text">FixMate</span>
      </Link>

      {/* Links */}
      <div className="navbar-links">
        <Link
          to="/"
          className={`${
            active == "/" ? "text-black" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Home
        </Link>
        {Vendor && isLoggedIn ? (
          <Link
            to="/ServiceWorker"
            className={`${
              active == "/ServiceWorker"
                ? "text-black"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Services
          </Link>
        ) : (
          <>
            <Link
              to="/History"
              className={`${
                active == "/History"
                  ? "text-black"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={handleProtectedLink}
            >
              History
            </Link>
            <Link
              to="/ComplainCreation"
              className={`${
                active == "/ComplainCreation"
                  ? "text-black"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={handleProtectedLink}
            >
              Complain
            </Link>
          </>
        )}
        {isAdmin && isLoggedIn && (
          <Link
            to="/admin"
            className={`${
              active == "/admin"
                ? "text-black"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Dashboard
          </Link>
        )}
      </div>

      {/* Location and Search */}
      <div className="search">
        <div className="location" onClick={getLocation}>
          <span className="location-icon">📍</span>
          <span>{error ? error : location}</span>
          <span className="dropdown-arrow">▼</span>
        </div>
        {/* <div className="navbar-search">
          <CiSearch />
          <input type="text" placeholder="Search for ‘AC services’" />
        </div> */}
      </div>

      {/* Icons */}
      <div className="navbar-icons" onClick={toggleDropdown}>
        {isLoggedIn ? (
          <span className="login-button">{userName}</span>
        ) : (
          <span className="login-button" onClick={handleLoginLogout}>
            Sign In
          </span>
        )}
        <FaRegUser style={{ fontSize: "25px" }} />
      </div>

      {/* Dropdown */}
      {isDropdownOpen && isLoggedIn && (
        <div className="dropdown-menu">
          <a href="#" className="dropdown-item">
            Profile
          </a>
          <a
            href="#"
            className="dropdown-item"
            onClick={() => {
              setIsLoggedIn(false);
              setUserName("");
              localStorage.removeItem("jwtToken");
              toast.info("Logged out successfully");
              navigate("/");
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

            <div className="check_vendor">
              <input
                type="checkbox"
                id="isVendor"
                checked={isVen}
                onChange={toggleVendorCheckbox}
              />
              <label htmlFor="isVendor">Are you a Service Provider?</label>
            </div>

            {isVen && (
              <div>
                <input
                  type="number"
                  placeholder="Years of Experience"
                  className="sign-up-input"
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                />
                <h4>Fields of Expertise:</h4>
                <select
                  className="sign-up-input select-expertise"
                  value={fieldsOfExpertise}
                  onChange={(e) => setFieldsOfExpertise(e.target.value)}
                >
                  <option value="electrician">Electrician</option>
                  <option value="plumber">Plumber</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="painter">Painter</option>
                </select>
              </div>
            )}

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
