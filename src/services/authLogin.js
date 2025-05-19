import { API } from "@config/apiConfig";

export const fetchAuthUser = async ({ user, pass }) => {
  const credentials = { username: user, password: pass };

  try {
    const response = await API.post("auth/login", credentials);
    const { token } = response.data;

    const usersResponse = await API.get("users");
    const userData = usersResponse.data.find((u) => u.username === user);
    console.log(userData);
    if (!userData) {
      throw new Error("User not found");
    }

    return {
      error: false,
      data: {
        token,
        user: userData,
      },
    };
  } catch (error) {
    return {
      error: true,
      status: error.response?.status,
      message: error.response?.data?.message || "Incorrect username or password",
    };
  }
};
