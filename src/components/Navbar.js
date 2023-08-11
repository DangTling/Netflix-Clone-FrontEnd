import { Link, useNavigate } from "react-router-dom";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import "../assets/styles/Navbar.scss";
import { firebaseAuth } from "../utils/firebase-config";
import logo from "../assets/images/logo.png";
import { toast } from "react-toastify";

function Navbar({ isScrolled }) {
  const links = [
    { name: "Home", link: "/" },
    { name: "TV shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) {
      navigate("/login");
    }
  });

  return (
    <div className="navbar">
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="logo" />
          </div>
          <ul className="links flex">
            {links.map((item, index) => {
              return (
                <li key={item.name}>
                  <Link to={item.link}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search anything you want watch"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button
            onClick={() => {
              signOut(firebaseAuth);
              toast.success("Đăng Xuất Thành Công");
            }}
          >
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
