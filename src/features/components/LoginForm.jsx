import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextInput, HelperText } from "flowbite-react";
import Button from "@components/Buttons/Button";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(6, "Username must be at least 6 characters")
    .max(20, "Username must be at most 20 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const initialValues = {
    username: "",
    password: "",
    sample: "",
  };

  const handleSubmit = (values) => {
    console.log("Form submitted", values);
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

            <Button color="amberDark" type="submit" className="w-full mt-2">
              Login
            </Button>

            <p className="text-xs text-gray-500 mt-2">
              Don't have an account?{' '}
              <a href="#" className="text-blue-500 hover:underline hover:text-amber-700 hover:font-medium">
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
