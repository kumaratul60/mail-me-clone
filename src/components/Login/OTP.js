import React, { useState } from "react";
import firebase from "firebase";

function OTP() {
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
  };
  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          console.log("recaptcha Verified");
        },
        defaultCountry: "IN",
      }
    );
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "+91" + setName(e.target);
    console.log(phoneNumber);
    configureCaptcha();
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("otp has been sent");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log("otp has not been sent");
        // ...
      });
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = setOtp(e.target);
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        alert(`${user} is verified`);
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  return (
    <div>
      <div id="sign-in-button"></div>
      <form onSubmit={onSignInSubmit}>
        <input
          type="number"
          name="mobile"
          placeholder="Enter the number"
          required
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <form onSubmit={onSubmitOTP}>
        <input
          type="number"
          name="otp"
          placeholder="Enter the OTP"
          required
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default OTP;
