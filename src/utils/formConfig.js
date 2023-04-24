import React from "react";
import Input from "../components/forms components/Input";

import {
  minLengthRule,
  maxLengthRule,
  passwordMatchRule,
  requiredRule,
} from "./inputValidationRules";

/**
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 */
function createFormFieldConfig(label, name, type, defaultValue = "") {
  return {
    renderInput: (handleChange, value, isValid, error, key) => {
      return (
        <Input
          key={key}
          name={name}
          type={type}
          label={label}
          isValid={isValid}
          value={value}
          handleChange={handleChange}
          errorMessage={error}
        />
      );
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: "",
    touched: false,
  };
}

// object representation of signup form
export const signupForm = {
  name: {
    ...createFormFieldConfig("Full Name", "name", "text"),
    validationRules: [
      requiredRule("name"),
      minLengthRule("name", 3),
      maxLengthRule("name", 25),
    ],
  },
  email: {
    ...createFormFieldConfig("Email", "email", "email"),
    validationRules: [
      requiredRule("email"),
      minLengthRule("email", 10),
      maxLengthRule("email", 25),
    ],
  },
  password: {
    ...createFormFieldConfig("Password", "password", "password"),
    validationRules: [
      requiredRule("password"),
      minLengthRule("password", 8),
      maxLengthRule("password", 20),
    ],
  },
  confirmPassword: {
    ...createFormFieldConfig("Confirm Password", "confirmPassword", "password"),
    validationRules: [passwordMatchRule()],
  },
};

// object representation of login form
export const loginForm = {
  email: {
    ...createFormFieldConfig("Email", "email", "email"),
    validationRules: [requiredRule("email")],
  },
  password: {
    ...createFormFieldConfig("Password", "password", "password"),
    validationRules: [
      requiredRule("password"),
      minLengthRule("password", 3),
      maxLengthRule("password", 20),
    ],
  },
};

// object representation of reset password form
export const resetPassword = {
  email: {
    ...createFormFieldConfig("Email", "email", "email"),
    validationRules: [requiredRule("email")],
  },
};
