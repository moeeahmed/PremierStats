import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  redirect,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { fetchApi } from "../../utils/fetchApi";
import useForm from "../../hooks/use-Form";
import { loginForm, signupForm } from "../../utils/formConfig";
import { loginSuccess } from "../../store/reducer";
import Background from "../../components/Background/Background";
import Button from "../../components/UI/Button";
import classes from "./AuthForm.module.css";

const AuthForm = ({ isSignup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
      setIsLoading(false);
    } else {
      toast.success(`Welcome, ${response.data.user.name}`);
      dispatch(loginSuccess(response));
      setTimeout(() => {
        state ? navigate(state.pathname) : navigate("/");
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
        <h1>{isSignup ? "Sign Up" : "Login"}</h1>
        {renderFormInputs()}
        <Button
          isLoading={loading}
          text={isSignup ? "Sign Up" : "Login"}
          type="submit"
          disabled={!isFormValid()}
        />
        <p className={classes["redirect"]}>
          {isSignup ? "Already" : " Don't"} have an account?
          {isSignup ? (
            <a href="/login"> Login</a>
          ) : (
            <a href="/signup"> Sign up</a>
          )}
        </p>
        {!isSignup && (
          <Link to="/forgot-password" className={classes["forgot--password"]}>
            Forgot Password
          </Link>
        )}
      </Form>
    </Background>
  );
};

export default AuthForm;
