import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import "../styles/navbar.css";
import AuthContext from "../context/authContext";
import avatar from "../assets/img_avatar.png";
import notification from "../assets/notification.png";
import home from "../assets/216242_home_icon.png";
import mail from "../assets/211660_email_icon.png";
import answer from "../assets/326714_pencil_translate_write_icon.png";
import user from "../assets/285645_user_icon.png";
function NavComponent() {
  const { loggedIn, userName } = useContext(AuthContext);
  return (
    <div className="navbar">
      <ul>
        <li>
          <a href>
            <h1 style={{ color: "#00cc44" }}>GREQUO</h1>
          </a>
        </li>
        <li>
          <NavLink to="/">
            <img src={home} alt="" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/contact">
            <img src={mail} alt="" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/writeAnswer">
            <img src={answer} alt="" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <img src={user} alt="" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/">
            <img src={notification} alt="" />
          </NavLink>
        </li>
        <li>
          <input type="text" placeholder="Search....." />
        </li>

        <li>
          <img src={avatar} alt="Avatar" className="avatar" />
        </li>
        <li>
          <NavLink to="/modal" id="myBtn">Add question</NavLink>
        </li>
        <li>
          <NavLink to="/user/signUp">Sign Up</NavLink>
        </li>
        <li>
          <NavLink to="/user/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/user/logout">Logout</NavLink>
        </li>
      </ul>
    </div>
  );
}
export default NavComponent;
