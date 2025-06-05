import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuthSignUpUser } from "@services/authSignUp";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@components/Buttons/Button";
import FormikTextInput from "@components/TextInput/FormikTextInput";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUp = ( {setForm} ) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      const response = await fetchAuthSignUpUser({
        user: values.username,
        email: values.email,
        pass: values.password,
      });

      if (response.error) {
        const errorMessage =
          response.status === 400
            ? response.message
            : "An error occurred. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.success("Registration successful!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
      setForm("login");
    }

  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-4xl font-bold text-amber-950 mb-5">Login</h1>
          <FormikTextInput
            name="username"
            label="Username"
            placeholder="Enter your username"
          />
          <FormikTextInput
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <FormikTextInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <FormikTextInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm password"
            type="password"
          />

          <Button
            color="amberDark"
            type="submit"
            className="w-full mt-2"
            disabled={isSubmitting || isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
