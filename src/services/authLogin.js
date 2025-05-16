import { API } from "@config/apiConfig";

export const fetchAuthUser = async ({ user, pass }) => {
  const credentials = { username: user, password: pass };
  try {
    const response = await API.post("auth/login", credentials);
    return response.data;
  } catch (error) {
    return {
      error: true,
      status: error.response?.status,
      message:
        error.response?.data?.message || "Incorrect username or password",
    };
  }
};
