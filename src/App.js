import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Mail from "./components/Mail/Mail";
import EmailList from "./components/EmailList/EmailList";
import SendMail from "./components/SendMail/SendMail";
import { useDispatch, useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { login, logout, selectUser } from "./features/userSlice";
import Login from "./components/Login/Login";
import { auth } from "./firebase";
// import OTP from "./components/Login/OTP";

function App() {
  const sendMessageIsOpenBox = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      console.log(user);
      if (user) {
        // user is logged-in
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      } else {
        // user is logout
        // dispatch(logout());
      }
    });
  }, []);

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        // <OTP />
        <div className="app">
          <Header />

          <div className="app__body">
            <Sidebar />
            <Switch>
              <Route path="/mail">
                <Mail />
              </Route>
              <Route path="/">
                <EmailList />
              </Route>
            </Switch>
          </div>
          {sendMessageIsOpenBox && <SendMail />}
        </div>
      )}
    </Router>
  );
}

export default App;
