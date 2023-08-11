import logo from "../assets/images/logo.png";
import "../assets/styles/Header.scss";

import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  return (
    <div className="header flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Login" : "Signup"}
      </button>
    </div>
  );
}

export default Header;
