const handleLogin = (e) => {
  e.preventDefault();

  if (username === "owner" && password === "1234") {
    localStorage.setItem("ownerLoggedIn", "true"); // save login status
    navigate("/owner"); // redirect to dashboard
  } else {
    setError("Invalid username or password");
  }
};
