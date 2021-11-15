import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";

import "./SendMail.css";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../../features/mailSlice";
import { db } from "../../firebase";
import firebase from "firebase";

function SendMail() {
  const dispatch = useDispatch();
  // when you use form you must try to use useForm

  // const { register, handleSubmit, watch, errors } = useForm();  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // handleSubmit:
  // ((data: Object, e?: Event) => void, (errors: Object, e?: Event) => void) => Function
  // This function will receive the form data if form validation is successful.

  // It can be invoked remotely as well. =>  handleSubmit(onSubmit)();

  // You can pass an async function for asynchronous validation. => handleSubmit(async (data) => await fetchAPI(data))

  const onSubmit = (formData) => {
    console.log(formData);
    console.log(JSON.stringify(formData));
    db.collection("emails").add({
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Once send the message close the form
    dispatch(closeSendMessage());
  };

  return (
    <div className="sendMail">
      <div className="sendMail__header">
        <h3>New Message</h3>
        <CloseIcon
          className="sendMail__close"
          onClick={() => dispatch(closeSendMessage())}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function with value "name" */}
        <input
          placeholder="To"
          type="email"
          {...register("to", { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.to && <p className="sendMail__error">To is required!</p>}
        <input
          placeholder="Subject"
          type="text"
          {...register("subject", { required: true })}
        />
        {errors.subject && (
          <p className="sendMail__error">Subject is required!</p>
        )}
        <input
          placeholder="Message..."
          type="text"
          {...register("message", { required: true })}
          className="sendMail__message"
        />{" "}
        {errors.message && (
          <p className="sendMail__error">Message is required!</p>
        )}
        <div className="sendMail__options">
          <Button
            className="sendMail__send"
            variant="contained"
            color="primaty"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMail;
