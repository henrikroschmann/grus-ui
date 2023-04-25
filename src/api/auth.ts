export const login = async (
  email: string,
  password: string,
  setIsAuthenticated: (value: boolean) => void
) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_API}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    setIsAuthenticated(true); // set isAuthenticated to true when the user logs in
    return data;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.detail);
  }
};
