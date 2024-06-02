import React, { useState } from "react";
import KusinaButton from "../components/KusinaButton";
import { useNavigate } from "react-router-dom";

function Login() {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    // event.preventDefault();

    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: inputUsername,
        password: inputPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          localStorage.setItem("user_id", data.user_id); // Save user_id to localStorage
          navigate("/kusina"); // Navigate to /kusina
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again.");
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="bg-kusinabg min-h-screen min-w-screen flex items-center justify-center">
      <div className="w-1/3 flex flex-col items-center">
        <div className="text-kusinaprimary font-bold text-4xl pb-5 text-left w-full px-11">
          Sign in
        </div>
        <div className="flex flex-col align-middle justify-center items-center w-full px-11">
          <div className="pb-4 w-full">
            <input
              type="text"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Username"
              className="input input-bordered input-accent w-full placeholder-accent bg-transparent"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              value={inputPassword}
              placeholder="Password"
              onChange={(e) => setInputPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input input-bordered input-accent w-full placeholder-accent bg-transparent"
            />
          </div>
        </div>
        {error && (
          <div className="text-kusinaprimarylight text-sm">{error}</div>
        )}
        <div className="text-kusinaprimary font-semibold text-xs text-left w-full px-11 hover:text-kusinaprimarylight pt-2">
          <a href="/">Forgot password?</a>
        </div>
        <div className="pt-6">
          <KusinaButton action="Sign in" onClick={handleLogin} />
        </div>
        <div className="pt-5 text-kusinablack font-medium text-xs text-left w-full px-11">
          New to Kusina?{" "}
          <a
            className="text-kusinaprimary font-semibold hover:text-kusinaprimarylight"
            href="/sign-up"
          >
            Tara, sali ka
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
