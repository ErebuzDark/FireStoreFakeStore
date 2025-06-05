import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuthUser } from "@services/authLogin";
import { Formik, Form,} from "formik";
import * as Yup from "yup";

// Libraries
import { Checkbox, Label } from "flowbite-react";
import Button from "@components/Buttons/Button";
import FormikTextInput from "@components/TextInput/FormikTextInput";
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

const LoginForm = ({ setForm }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
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

  const storeUserData = (isRemember, userInfo, token) => {
    const storage = isRemember ? localStorage : sessionStorage;
    storage.setItem("userInfo", JSON.stringify(userInfo));
    storage.setItem("token", token);
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      const response = await fetchAuthUser({
        user: values.username,
        pass: values.password,
      });

      if (response.error) {
        const errorMessage =
          response.status === 401
            ? response.message
            : "An error occurred. Please try again.";
        toast.error(errorMessage);
      } else {
        storeUserData(isRemember, response.data.user, response.data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
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

          <FormikTextInput
            name="username"
            label="Username"
            placeholder="Username"
            maxLength={21}
          />

          <FormikTextInput
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
          />

          <div className="flex items-center gap-2 mt-2 mb-2">
            <Checkbox
              onChange={() => setIsRemember(!isRemember)}
              id="accept"
              className="checked:bg-amber-950 focus:ring-0"
            />
            <Label
              htmlFor="accept"
              className="flex text-xs text-slate-500 font-medium"
            >
              Remember me
            </Label>
          </div>

          <Button
            color="amberDark"
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Login"
            )}
          </Button>

          <p className="text-xs text-gray-500 mt-2">
            Don&apos;t have an account?{" "}
            <a
              onClick={() => setForm("signup")}
              className="text-blue-500 hover:underline hover:text-amber-700 hover:font-medium cursor-pointer"
            >
              Sign up
            </a>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
