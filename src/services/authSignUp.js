import { API } from "@config/apiConfig";

export const fetchAuthSignUpUser = async ({ user, pass, email }) => {
  const credentials = { username: user, password: pass, email };

  try {
    const response = await API.post("users", credentials);
    return {
      console: response.data,
    };
  } catch (error) {
    return {
      console: error.response?.data?.message || "An error occurred during sign up",
    };
  }
}