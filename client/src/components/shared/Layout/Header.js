import React from "react";
import { useSelector } from "react-redux";
import { BiDonateBlood } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  //logout
  const logoutHandler = () => {
    localStorage.clear();
    toast.success("Logout successful", { autoClose: 2000 });
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Left Side */}
        <div className="navbar-brand d-flex align-items-center">
          <span className="h4 mb-0">
            {" "}
            <BiDonateBlood color="red" size="1.5rem" margin="0.5rem" />
            Blood App
          </span>
        </div>

        {/* Right Side */}
        <ul className="navbar-nav d-flex flex-row align-items-center">
          <li className="nav-item mx-3">
            <span className="nav-link mb-0">
              <FaRegCircleUser size="1.5rem" margin-right="2rem" /> Welcome,{" "}
              {user?.name || user?.hospitalName || user?.organizationName}{" "}
              &nbsp;
              <span className="badge bg-warning text-dark">{user?.role}</span>
            </span>
          </li>
          {location.pathname === "/" || location.pathname === "/donar" || location.pathname === "/hospital"? (
            <li className="nav-item mx-3">
              <Link to="/analytics" className="nav-link">
                Analytics
              </Link>
            </li>
          ) : (
            <li className="nav-item mx-3">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          )}
          <li className="nav-item">
            <button className="btn btn-danger btn-sm" onClick={logoutHandler}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
