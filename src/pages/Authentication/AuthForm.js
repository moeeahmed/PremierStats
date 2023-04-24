import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { fetchApi } from "../../utils/fetchApi";
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
    const body = {
      email: form.email.value,
      password: form.password.value,
    };

    if (isSignup) {
      body.name = form.name.value;
      body.passwordConfirm = form.confirmPassword.value;
    }

    const response = await fetchApi({
      url: `api/v1/user/${isSignup ? "signup" : "login"}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.status !== "success") {
      toast.error(response.message);
    } else {
      toast.success(`Welcome, ${response.data.user.name}`);
      dispatch(loginSuccess(response));
      setTimeout(() => {
        state ? navigate(state.pathname) : navigate("/");
      }, 2000);
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
