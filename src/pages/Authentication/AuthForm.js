import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import useForm from "../../hooks/use-Form";
import { loginForm, signupForm } from "../../utils/formConfig";
import { loginSuccess } from "../../store/reducer";
import classes from "./AuthForm.module.css";

const AuthForm = ({ isSignup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const formConfig = isSignup ? signupForm : loginForm;
  const { form, renderFormInputs, isFormValid } = useForm(formConfig);

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/");
    }
  }, [isAuthenticated]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const dataBody = {
      email: form.email.value,
      password: form.password.value,
    };

    if (isSignup) {
      dataBody.name = form.name.value;
      dataBody.passwordConfirm = form.confirmPassword.value;
    }

    const endpoint = isSignup
      ? "http://localhost:9000/api/v1/user/signup"
      : "http://localhost:9000/api/v1/user/login";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataBody),
    });

    const resp = await response.json();

    const token = resp.token;

    if (response.ok) {
      const { name } = resp.data.user;
      toast.success(`Welcome, ${name}`);
      dispatch(loginSuccess({ token }));
      state ? navigate(state.pathname) : navigate("/");
    } else {
      toast.error(resp.message);
    }
  };

  return (
    <React.Fragment>
      <div className={classes["container"]}>
        <Toaster
          containerStyle={{
            boxSizing: "borderBox",
          }}
          toastOptions={{
            position: "top-center",
            style: {
              background: "#fff",
              color: "#444",
              fontSize: "16px",
              textTransform: "capitalize",
            },
          }}
        />
        <Form onSubmit={onSubmitHandler} className={classes["authForm"]}>
          <h1>{isSignup ? "Sign Up" : "Login"}</h1>

          {renderFormInputs()}
          <button type="submit" disabled={!isFormValid()}>
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </Form>
      </div>
      <div className={classes["area"]}>
        <ul className={classes["circles"]}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default AuthForm;
