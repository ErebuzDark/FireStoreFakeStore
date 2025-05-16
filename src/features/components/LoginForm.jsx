import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuthUser } from "@services/authLogin";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Libraries
import { TextInput, HelperText } from "flowbite-react";
import Button from "@components/Buttons/Button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 6 characters")
    .max(20, "Username must be at most 20 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    username: "",
    password: "",
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    if (isLoggedIn) {
      navigate("/home");
    }
  }, []);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetchAuthUser({
        user: values.username,
        pass: values.password,
      });
      if (response.error) {
        if (response.status === 401) {
          toast.error(response.message);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else {
        localStorage.setItem("username", values.username);
        localStorage.setItem("token", response.token);
        navigate("/home");
      }
    } catch (error) {
      console.log(error.status);
      toast.error("An unexpected error occurred");
    }
    setIsLoading(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-4xl font-bold text-amber-950 mb-5">Login</h1>

          <div className="flex flex-col gap-2">
            <Field
              as={TextInput}
              type="text"
              name="username"
              placeholder="Username"
              maxLength={21}
              className="border-gray-300 rounded"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-xs text-red-500 -mt-2 mb-2"
            />

            <Field
              as={TextInput}
              type="password"
              name="password"
              placeholder="Password"
              className="border-gray-300 rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-xs text-red-500 -mt-2 mb-2"
            />

            <Button color="amberDark" type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Login"
              )}
            </Button>

            <p className="text-xs text-gray-500 mt-2">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-blue-500 hover:underline hover:text-amber-700 hover:font-medium"
              >
                Sign up
              </a>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
