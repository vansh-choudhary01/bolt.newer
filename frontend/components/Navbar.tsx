import React from "react";
import { FaDiscord, FaLinkedin, FaXTwitter, FaReddit } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">bolt.<span>new</span></div>
      <ul className="nav-links">
        <li>Community</li>
        <li>Enterprise</li>
        <li>Resources ▾</li>
        <li>Careers</li>
        <li>Pricing</li>
      </ul>
      <div className="nav-icons">
        <FaDiscord />
        <FaLinkedin />
        <FaXTwitter />
        <FaReddit />
      </div>
    </nav>
  );
};

export default Navbar;
