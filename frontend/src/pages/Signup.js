import React, { useState } from "react";
import KusinaButton from "../components/KusinaButton";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (inputUsername.trim() === "" || inputPassword.trim() === "") {
      setError("Username and password cannot be empty");
      return;
    }

    if (inputPassword.length < 6) {
      setError("Password must at least have 6 characters");
      return;
    }
    fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: inputUsername,
        password: inputPassword,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((error) => {
            throw new Error(error.error);
          });
        }
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <div className="bg-kusinabg min-h-screen min-w-screen flex items-center justify-center">
      <div className="w-1/3 flex flex-col items-center">
        <div className="text-kusinaprimary font-bold text-4xl pb-5 text-left w-full px-11">
          Sign up
        </div>
        <div className="flex flex-col align-middle justify-center items-center w-full px-11">
          <div className="pb-4 w-full">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setInputUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input input-bordered input-accent w-full placeholder-accent bg-transparent"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
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
        <div className="pt-6">
          <KusinaButton action="Sign up" onClick={handleSignup} />
        </div>
        <div className="pt-5 text-kusinablack font-medium text-xs text-left w-full px-11">
          Already have an account?{" "}
          <a
            className="text-kusinaprimary font-semibold hover:text-kusinaprimarylight"
            href="/"
          >
            Tara, tuloy ka
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
