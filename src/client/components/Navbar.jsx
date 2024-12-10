import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
export const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/seo">Home</Link>
      <Link to="/seo/about">About</Link>
      <Link to="/seo/contact-us">Contact Us</Link>
    </div>
  );
};
