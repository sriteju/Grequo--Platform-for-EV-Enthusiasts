import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Register";
import { useContext } from "react";
import AuthContext from "./context/authContext";
import ErrorComponent from "./components/ErrorComponent";
import Login from "./components/Login";
import Contact from "./components/Contact";
import NavComponent from "./components/NavComponent";
import Modal from "./components/Modal";
import WriteAnswers from "./components/WriteAnswers";
import Home from "./components/Home";
import HomeQuestionsDisplay from "./components/HomeQuestionsDisplay";
import Logout from "./components/Logout";

function RouterComP() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <Router>
      <>
          <NavComponent/>
        <Switch>
          <Route exact path="/user/signUp">
            <Register />{" "}
          </Route>
          <Route exact path="/">
            <HomeQuestionsDisplay />{" "}
          </Route>
          <Route exact path="/user/login">
            <Login />{" "}
          </Route>
          <Route exact path="/user/contact">
            <Contact />{" "}
          </Route>
          <Route exact path="/user/logout">
            <Logout />{" "}
          </Route>
          <Route exact path="/modal">
            <Modal/>{" "}
          </Route>
          <Route exact path="/writeAnswer">
            <WriteAnswers/>{" "}
          </Route>
          <Route>
            {" "}
            <ErrorComponent />{" "}
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default RouterComP;
