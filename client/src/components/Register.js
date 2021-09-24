import React, { useEffect, useState, useContext } from "react";
import "../styles/Register.css";
import axios from "axios";
import AuthContext from "../context/authContext";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
const initialState = {
  name: "",
  username:"",
  email: "",
  mobile: "",
  password: "",
  passwordAgain: "",
};

function Register() {
 const history = useHistory();
 const [user, setUser] = useState(initialState);
 const [response, setResponse] = useState(null);
 const { getLoggedIn } = useContext(AuthContext); 
  useEffect(() => {
    return () => {
      setUser({});
      setResponse(""); // This worked for me
    };
  }, []);

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:3001/user/register", user);
      console.log(res.data);
      setResponse(res.data.msg);
      setTimeout(() => {
        setResponse(null);
      }, 2000);

      await getLoggedIn();
      setUser(initialState);

      if (res.data.added) {
        setTimeout(() => {
          history.push("/");
        }, 500);
      }
    } catch (err) {
      console.log(err);
      setResponse(err.data.msg);
      setTimeout(() => {
        setResponse(null);
      }, 2000);
    }
  };
    return (
      <div>
        <div>
          <div className="signup ">
            <h2>SIGN UP </h2>
            <br />
            <div className="signup-form-form ">
              <form onSubmit={handleFormSubmit}>
                <div>
                  {" "}
                  <i className="fa fa-user icon" />
                  <input
                    type="text "
                    className="item "
                    name="Name "
                    placeholder="Name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div>
                  {" "}
                  <i className="fa fa-user icon" />
                  <input
                    type="text "
                    className="item "
                    name="username "
                    placeholder="User name"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                  />
                </div>
                <div>
                  <i className="fa fa-envelope icon" />
                  <input
                    type="text "
                    className="item "
                    name="email "
                    placeholder="E-mail "
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <i className="fa  fa-phone-square icon " />
                  <input
                    type="tel "
                    className="item "
                    name="mobileno "
                    placeholder="Mobile No"
                    value={user.mobile}
                    onChange={(e) =>
                      setUser({ ...user, mobile: e.target.value })
                    }
                  />
                </div>
                {/* <div>
                <i className="fa fa-image icon" />
                <input
                  type="file"
                  className="item-1"
                  id="profile"
                  name=" profile_photo "
                  placeholder="Image"
                  required=" "
                  capture
                  accept=".jpg, .jpeg, .png"
                  style={{ paddingTop: 15 }}
                />
              </div> */}
                <div>
                  <i className="fa fa-unlock-alt icon " />
                  <input
                    type="passward "
                    className="item "
                    name="passward "
                    placeholder="Password "
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
                <div>
                  <i className="fa fa-unlock-alt icon " />
                  <input
                    type="passward"
                    size={20}
                    autoComplete="off"
                    className="item-2 "
                    id="pass "
                    name=" confirmpassward "
                    placeholder="Confirm password "
                    value={user.passwordAgain}
                    onChange={(e) =>
                      setUser({ ...user, passwordAgain: e.target.value })
                    }
                  />
                </div>
                <div className="account ">
                  <p>
                    Already have an account?
                    <NavLink
                      style={{ textDecoration: "underline" }}
                      to="/user/login"
                    >
                      Login
                    </NavLink>{" "}
                  </p>
                </div>
                <input className="button" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Register;
