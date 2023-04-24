import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, redirect, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { fetchApi } from "../../utils/fetchApi";
import useForm from "../../hooks/use-Form";
import { resetPassword, setNewPassword } from "../../utils/formConfig";
import classes from "./AuthForm.module.css";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { form, renderFormInputs, isFormValid } = useForm(resetPassword);

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/");
    }
  }, [isAuthenticated]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const email = form.email.value;

    const response = await fetchApi({
      url: `api/v1/user/forgotPassword`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.status !== "success") {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      setTimeout(() => {
        navigate("/login");
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
          <h1>Reset Password</h1>
          {renderFormInputs()}
          <button type="submit" disabled={!isFormValid()}>
            Submit
          </button>
        </Form>
      </div>
      <div className={classes["area"]}>
        <ul className={classes["circles"]}>
          {Array(10)
            .fill(null)
            .map(() => (
              <li />
            ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { form, renderFormInputs, isFormValid } = useForm(setNewPassword);

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/");
    }
  }, [isAuthenticated]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    console.log(token);

    const response = await fetchApi({
      url: `api/v1/user/resetPassword`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password, confirmPassword }),
    });

    if (response.status !== "success") {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      setTimeout(() => {
        navigate("/login");
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
          <h1>Set New Password</h1>
          {renderFormInputs()}
          <button type="submit" disabled={!isFormValid()}>
            Submit
          </button>
        </Form>
      </div>
      <div className={classes["area"]}>
        <ul className={classes["circles"]}>
          {Array(10)
            .fill(null)
            .map(() => (
              <li />
            ))}
        </ul>
      </div>
    </React.Fragment>
  );
};
