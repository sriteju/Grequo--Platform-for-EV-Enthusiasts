import React, { useState, useEffect, useContext } from "react";
import '../styles/Login.css'
import { NavLink } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/authContext";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const initialState = {
  username: "",
  password: "",
};
function Login() {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState(initialState);
  const [response, setResponse] = useState("");
  const history = useHistory();
  useEffect(() => {
    return () => {
      setUser({});
      setResponse(""); // This worked for me
    };
  }, []);

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:3001/user/login", user);
      console.log(res.data);
      setResponse(res.data.msg);
      setTimeout(() => {
        setResponse(null);
      }, 1000);
      //call this to update loggedIn , bcoz getLoggedIn is in effect and is executed only when component mounts,
      //the components update only after refresh(mpunt again) if this method is not called
      await getLoggedIn();
      setUser(initialState);
      if (res.data.added) {
        setTimeout(() => {
          history.push("/");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      setResponse("sorry for inconvinience, try again later");
      setTimeout(() => {
        setResponse(null);
      }, 2000);
    }
  };
  return (
    <div className="container ">
      <h2>LOGIN </h2>
      <br />
      <div className="Login-form-form ">
        <form onSubmit={handleFormSubmit}>
          <div>
            
            <input
              type="text "
              className="item "
              name="username"
              placeholder="Enter Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div>
            <input
              type="passward "
              className="item-1"
              name="passward "
              placeholder="Enter Password "
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div id="account">
            <p>
              {" "}
              don't have an account?
              <NavLink
                style={{ textDecoration: "underline" }}
                to="/user/signUp"
              >
                Register
              </NavLink>
            </p>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Login;
