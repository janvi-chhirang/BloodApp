import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../styles/Layout.css";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <div>
      <div className="Sidebar">
        <div className="menu">
          
          {/* --- ORGANISATION MENU --- */}
          {user?.role === "organisation" && (
            <>
              <div className={`menu-item ${location.pathname === "/" ? "active" : ""}`}>
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/">Inventory</Link>
              </div>
              <div className={`menu-item ${location.pathname === "/donar" ? "active" : ""}`}>
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/donar">Donar</Link>
              </div>
              <div className={`menu-item ${location.pathname === "/hospital" ? "active" : ""}`}>
                <i className="fa-solid fa-hospital"></i>
                <Link to="/hospital">Hospital</Link>
              </div>
            </>
          )}

          {/* --- ADMIN MENU --- */}
          {user?.role === "admin" && (
            <>
              <div className={`menu-item ${location.pathname === "/donar-list" ? "active" : ""}`}>
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/donar-list">Donar List</Link>
              </div>
              <div className={`menu-item ${location.pathname === "/hospital-list" ? "active" : ""}`}>
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/hospital-list">Hospital List</Link>
              </div>
              <div className={`menu-item ${location.pathname === "/org-list" ? "active" : ""}`}>
                <i className="fa-solid fa-hospital"></i>
                <Link to="/org-list">Organisation List</Link>
              </div>
            </>
          )}

          {/* --- DONAR & HOSPITAL SHARED MENU --- */}
          {(user?.role === "donar" || user?.role === "hospital") && (
            <div className={`menu-item ${location.pathname === "/organisation" ? "active" : ""}`}>
              <i className="fa-sharp fa-solid fa-building-ngo"></i>
              <Link to="/organisation">Organisation</Link>
            </div>
          )}

          {/* --- HOSPITAL ONLY MENU --- */}
          {user?.role === "hospital" && (
            <div className={`menu-item ${location.pathname === "/consumer" ? "active" : ""}`}>
              <i className="fa-solid fa-cart-shopping"></i>
              <Link to="/consumer">Consumer</Link>
            </div>
          )}

          {/* --- DONAR ONLY MENU --- */}
          {user?.role === "donar" && (
            <div className={`menu-item ${location.pathname === "/donation" ? "active" : ""}`}>
              <i className="fa-solid fa-hand-holding-droplet"></i>
              <Link to="/donation">Donation</Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Sidebar;
