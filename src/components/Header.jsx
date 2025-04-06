import React from "react";
import "./Header.css";
import logo from "../../public/Logo_gimnasio.png";

const Header = ({ toggleMenu }) => {
  return (
    <header className="header">
      <button className="hamburger-btn" onClick={toggleMenu}>
        ☰
      </button>
      <img src={logo} alt="Logo del Gym" className="header-logo" />
    </header>
  );
};

export default Header;
