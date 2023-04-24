import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, redirect, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { fetchApi } from "../../utils/fetchApi";
import useForm from "../../hooks/use-Form";
import { resetPassword } from "../../utils/formConfig";
import classes from "./AuthForm.module.css";

const ForgotPassword = () => {
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

export default ForgotPassword;
