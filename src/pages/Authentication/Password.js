import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, redirect, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Button from "../../components/UI/Button";
import Background from "../../components/Background/Background";
import { fetchApi } from "../../utils/fetchApi";
import useForm from "../../hooks/use-Form";
import { resetPassword, setNewPassword } from "../../utils/formConfig";
import classes from "./AuthForm.module.css";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { form, renderFormInputs, isFormValid } = useForm(resetPassword);

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/");
    }
  }, [isAuthenticated]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
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
      setIsLoading(false);
    } else {
      toast.success(response.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <Background>
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
        <Button
          isLoading={loading}
          text="Submit"
          type="submit"
          disabled={!isFormValid()}
        />
      </Form>
    </Background>
  );
};

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { form, renderFormInputs, isFormValid } = useForm(setNewPassword);

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/");
    }
  }, [isAuthenticated]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
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
      setIsLoading(false);
    } else {
      toast.success(response.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <Background>
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
        <Button
          isLoading={loading}
          text="Submit"
          type="submit"
          disabled={!isFormValid()}
        />
      </Form>
    </Background>
  );
};
