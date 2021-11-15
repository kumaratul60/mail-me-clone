import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { login } from "../../features/userSlice";
import { auth, provider } from "../../firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./Login.css";

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    auth

      .signInWithPopup(provider)
      .then(({ user }) => {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://www.nicepng.com/png/detail/15-152707_gmail-logo-png-vector-gmail-new-logo-png.png "
          alt="logo"
        />
        <Button variant="contained" color="primary" onClick={signIn}>
          {" "}
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
