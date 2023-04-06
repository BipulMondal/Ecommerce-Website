import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const API = "http://localhost:4000/api/v1";
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  // console.log(userEmail, userPassword);

  //send the data to the database
  const submitData = async () => {
    const data = {
      email: userEmail,
      password: userPassword,
    };
    try {
      const res = await axios.post(`${API}/users/login`, data);

      if (res.data.success) {
        console.log("user logged in successfully");

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setUserEmail("");
        setUserPassword("");
        navigate("/");
      } else {
        console.log("user login failed");
        setLoginError(res.data.message);
      }
    } catch (error) {
      console.log("Error: ", error.message);
      if (error.response && error.response.status === 404) {
        setLoginError("The user not found");
      } else {
        setLoginError("Something went wrong. Please try again later.");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userEmail.length === 0 || userPassword.length === 0) {
      setError(true);
    } else if (userEmail && userPassword) {
      const regEx = /^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (regEx.test(userEmail)) {
        console.log("Email is valid");

        submitData();
      } else {
        setMessage("Email is invalid");
        console.log("Email is invalid");
      }
    }
  };

  return (
    <div className="flex px-28 h-screen items-center space-x-4">
      <div className="w-1/2 border-2 border-gray-300">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl absolute text-white mt-[12rem] ml-[10rem]">
            <span className="text-yellow-500">S</span>ign in
          </h1>
          <img src="images\logo.jpg" alt="logo" />
        </div>
      </div>

      <div className="w-[30rem] border-2 border-gray-300">
        <form
          action=""
          onSubmit={handleSubmit}
          className="h-[450px] w-5/6 py-4 px-12 text-bold rounded-2xl "
        >
            <div className="h-24">
            <label className="text-lg ml-2 font-semibold" htmlFor="email">
              Email
            </label> {error && userEmail <= 0 ? <label className="ml-24 text-xs text-red-500 font-semibold">*** Email is required ***</label> : " "}
            <br />
            <input
              className="w-[20rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
              type="text"
              name="name"
              id="username"
              autoComplete="off"
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
              placeholder="Enter Your Name"
            />
            <p className="text-red-600 bg-red font-bold ml-10 mt-2 text-xs">{message}</p>
            </div>
            <div className="h-24">
            <label className="text-lg ml-2 font-semibold" htmlFor="password">
              Password
            </label> {error && userPassword <= 0 ? (
              <label className="ml-12 text-xs text-red-500 font-semibold">*** Password is required ***</label>
            ) : (
              " "
            )}
            <br />
            <input
              type="password"
              name="password"
              id="password"
              value={userPassword}
              onChange={(event) => setUserPassword(event.target.value)}
              placeholder="Enter Your Password"
              className="w-[20rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
            />
           
            {loginError && (
              <p className="text-red-600 font-bold mt-4 ml-6">{loginError}</p>
            )}
            </div>
          <button
            type="submit"
            id="btn"
            className="h-12 w-40 bg-white text-black text-lg font-bold rounded  hover:bg-blue-500 ml-2 border-2 border-black hover:border-none hover:text-white mt-6 transition duration-700"
          >
            Sign In
          </button>
              <div className="flex ">
              <p className="mt-4 underline underline-offset-2">
            Don't have an account ?
          </p>
            <span className="ml-4 text-xl font-bold hover:text-blue-500 mt-4" id="signup">
              <NavLink to={"/register"}>Sign Up</NavLink>
            </span>
              </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
