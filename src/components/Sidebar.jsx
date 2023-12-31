import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import FinancialBox from "./FinancialBox";
function Sidebar({ isVisible, onClose }) {
  const navigate = useNavigate();
  return (
    <div
      className={`d-flex flex-column flex-shrink-0 p-3 bg-light ${
        isVisible ? "" : "d-none"
      } sidebar`}
    >
      {/* <div className="bg-dark">
        <img
          src={require("../assets/images/mmfont.png")}
          alt="logo"
          width="200"
        />
      </div> */}
      <FinancialBox/>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            className="nav-link link-dark"
            aria-current="page"
          >
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/controlandmonitor"
            className="nav-link link-dark"
            aria-current="page"
          >
            Control And Monitor
          </NavLink>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <strong>Profile</strong>
        </a>
        <ul
          className="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <a className="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => {
                sessionStorage.removeItem("logged");
                navigate("/");
              }}
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
