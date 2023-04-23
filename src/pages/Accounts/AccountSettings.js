import React, { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Button from "../../components/UI/Button";
import classes from "./Accounts.module.css";
import { store } from "../../store/index";

const AccountSettings = () => {
  const user = useOutletContext();
  const { token } = store.getState().auth;
  const nameRef = useRef();
  const emailRef = useRef();
  const currentPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const passwordLabels = [
    "Current Password",
    "New Password",
    "Confirm Password",
  ];

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const currentPassword = currentPasswordRef.current.value;
    const confirmPassword = passwordRef.current.value;
    const password = confirmPasswordRef.current.value;

    let url;
    let body = {};

    if (event.target.id === "details") {
      if (!name && !email) {
        window.location.reload();
      }
      url = "updateDetails";
      body.name = name || user.user.name;
      body.email = email || user.user.email;
    }

    if (event.target.id === "password") {
      url = "updatePassword";
      body.currentPassword = currentPassword;
      body.password = password;
      body.confirmPassword = confirmPassword;
    }

    const response = await fetch(`http://localhost:9000/api/v1/user/${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const resp = await response.json();

    if (!response.ok) {
      toast.error(resp.message);
      return;
    }

    let message;

    message =
      event.target.id === "details"
        ? name && email
          ? "Your name and email have been updated"
          : name
          ? "Your name has been updated"
          : email
          ? "Your email has been updated"
          : ""
        : "Your password has been updated";

    toast.success(message);

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <React.Fragment>
      <div className={classes["user-view__form-container"]}>
        <Toaster
          containerStyle={{
            boxSizing: "borderBox",
          }}
          toastOptions={{
            position: "top-center",
            style: {
              background: "#444",
              color: "#fff",
              fontSize: "16px",
            },
          }}
        />
        <h2
          className={`${classes["heading-secondary"]} ${classes["ma-bt-md"]}`}
        >
          Your account settings
        </h2>
        <form id="details" onSubmit={onSubmitHandler}>
          <div
            className={`${classes["form__group"]} ${classes["form__photo-upload"]}`}
          >
            <img
              className={classes["form__user-photo"]}
              src="/img/users/default.jpg"
              alt="User"
            />
            <input
              className={classes["form__upload"]}
              type="file"
              accept="image/*"
              id="photo"
              name="photo"
            />
            <label htmlFor="photo">Choose new photo</label>
          </div>
          <div className={classes["form__group"]}>
            <label className={classes["form__label"]} htmlFor="name">
              Name
            </label>
            <input
              ref={nameRef}
              className={classes["form__input"]}
              id="details_name"
              type="text"
              placeholder={user.user.name}
              name="name"
            />
          </div>
          <div className={`${classes["form__group"]} ${classes["ma-bt-md"]}`}>
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              ref={emailRef}
              className={classes["form__input"]}
              id="details_email"
              type="email"
              placeholder={user.user.email}
              name="email"
            />
          </div>
          <div className={`${classes["right"]} ${classes["form__group"]}`}>
            <Button text={"Update Details"} />
          </div>
        </form>
      </div>
      <div className={classes["line"]}>&nbsp;</div>
      <div className={classes["user-view__form-container"]}>
        <h2
          className={`${classes["heading-secondary"]} ${classes["ma-bt-md"]}`}
        >
          Password change
        </h2>
        <form id="password" onSubmit={onSubmitHandler}>
          {[currentPasswordRef, passwordRef, confirmPasswordRef].map(
            (ref, i) => {
              return (
                <div key={i} className={classes["form__group"]}>
                  <label className={classes["form__label"]}>
                    {passwordLabels[i]}
                  </label>
                  <input
                    ref={ref}
                    className={classes["form__input"]}
                    type="password"
                    placeholder="••••••••"
                    minLength="8"
                    autoComplete="current-password"
                  />
                </div>
              );
            }
          )}
          <div className={`${classes["right"]} ${classes["form__group"]}`}>
            <Button text={"Save password"} />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AccountSettings;
