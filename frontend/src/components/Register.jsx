import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const API = "http://localhost:4000/api/v1/users/register";
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState(" ");
  const [phError, setPhError] = useState(" ");
  const [registerError, setRegisterError] = useState(" ");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    street: "",
    landmark: "",
    pin: "",
    city: "",
    country: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.name.length === 0 ||
      formData.email.length === 0 ||
      formData.password.length === 0 ||
      formData.phone.length === 0 ||
      formData.street.length === 0 ||
      formData.landmark.length === 0 ||
      formData.pin.length === 0 ||
      formData.city.length === 0 ||
      formData.country.length === 0
    ) {
      setSubmitted(true);
    } else if (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.phone &&
      formData.street &&
      formData.landmark &&
      formData.pin &&
      formData.city &&
      formData.country
    ) {
      try {
        const regEx = /^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const PhregEx = /^[6-9]\d{9}$/;

        let isEmailValid = regEx.test(formData.email);
        let isPhoneValid = PhregEx.test(formData.phone);

        if (isEmailValid && isPhoneValid) {
          console.log("Email is valid");
          console.log("Phone is valid");

        const res = await axios.post(API, formData);

        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          navigate("/");
        }
      }else{
        if (!isEmailValid) {
          setMessage("** Email is invalid **");
        }
        if (!isPhoneValid) {
          setPhError("** Phone No is invalid **");
        }
        console.log("Email is invalid");
        console.log("Phone No is invalid");
        }
      } catch (error) {
        console.log("Error: ", error.message);
        if (error.response && error.response.status === 401) {
          setRegisterError("The user already present");
        }
        else {
          setRegisterError("Something went wrong. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="flex px-28 h-screen items-center space-x-4">
      <div className="w-1/2 border-2 border-gray-300">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl absolute text-white mt-[12rem] ml-[10rem]">
            <span className="text-yellow-500">S</span>ign Up
            </h1>
          <img src="images\logo.jpg" alt="logo" />
        </div>
      </div>
      <div className="w-1/2 border-2 border-gray-300">
        <form onSubmit={handleSubmit}>
          <label className="px-4 font-semibold" htmlFor="name">
            Name
          </label>
          {submitted && formData.name.trim().length === 0 && (
            <label className="text-red-500 text-xs ml-24">
              *** Name is required ***
            </label>
          )}
          <br />
          <input
            className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
            type="text"
            name="name"
            id="username"
            autoComplete="off"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter Your Name"
          /> 
          <br />
          <label className="px-4 font-semibold" htmlFor="email">
            Email
          </label>
          {submitted && formData.email.trim().length === 0 && (
            <label className="text-red-500 text-xs ml-24">
              *** Email is required ***
            </label>
          )}
          <br />
          <div className="flex h-8">
          <input
            className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
            type="text"
            name="email"
            id="email"
            autoComplete="off"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter Your Email"
          /> <p className="text-red-600 bg-red font-bold ml-2 mt-2 text-xs">{message}</p>
          </div>
          <label className="px-4 font-semibold" htmlFor="password">
            Password
          </label>
          {submitted && formData.password.trim().length === 0 && (
            <label className="text-red-500 text-xs ml-16">
              *** Password is required ***
            </label>
          )}
          <br />
          <input
            className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
            type="text"
            name="password"
            id="password"
            autoComplete="off"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Enter Your Password"
          />
          <br />
          <label className="px-4 font-semibold" htmlFor="phone">
            Phone
          </label>
          {submitted && formData.phone.trim().length === 0 && (
            <label className="text-red-500 text-xs ml-24">
              *** Phone is required ***
            </label>
          )}
          <br />
         <div className="flex h-8">
         <input
            className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
            type="text"
            name="phone"
            id="phone"
            autoComplete="off"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Enter Your Phone"
          /><p className="text-red-600 bg-red font-bold ml-2 mt-2 text-xs">{phError}</p>
         </div>
          <label className="px-4 font-semibold" htmlFor="street">
            Street
          </label>{" "}
          {submitted && formData.street.trim().length === 0 && (
            <label className="text-red-500 text-xs ml-24">
              *** Street is required ***
            </label>
          )}
          <br />
          <input
            className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
            type="text"
            name="street"
            id="street"
            autoComplete="off"
            value={formData.street}
            onChange={(e) =>
              setFormData({ ...formData, street: e.target.value })
            }
            placeholder="Enter Your Street"
          />
          <br />
          <label className="px-4 font-semibold" htmlFor="landmark">
            Landmark
          </label>{" "}
          {submitted && formData.landmark.trim().length === 0 && (
            <label className="text-red-500 text-xs ml-16 ">
              *** Landmark is required ***
            </label>
          )}
          <br />
          <input
            className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
            type="text"
            name="landmark"
            id="landmark"
            autoComplete="off"
            value={formData.landmark}
            onChange={(e) =>
              setFormData({ ...formData, landmark: e.target.value })
            }
            placeholder="Enter Your Landmark"
          />
          <br />
          <label className="px-4 font-semibold" htmlFor="pin">
            Pin
          </label>
          {submitted && formData.pin.trim().length === 0 && (
            <label className="text-red-500 text-xs ml-32">
              *** Pin is required ***
            </label>
          )}
          <br />
          <input
            className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
            type="text"
            name="pin"
            id="pin"
            autoComplete="off"
            value={formData.pin}
            onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
            placeholder="Enter Your Pin"
          />
          <br />
          <label className="px-4 font-semibold" htmlFor="city">
            City
          </label>{" "}
          {submitted && formData.city.trim().length === 0 && (
            <label className="text-red-500 text-xs ml-28">
              *** City is required ***
            </label>
          )}
          <br />
          <input
            className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
            type="text"
            name="city"
            id="city"
            autoComplete="off"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Enter Your City"
          />
          <br />
          <label className="px-4 font-semibold" htmlFor="country">
            Country
          </label>
          {submitted && formData.country.trim().length === 0 && (
            <label className="text-red-500 text-xs ml-24">
              *** Country is required ***
            </label>
          )}
          <br />
          <input
            className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
            type="text"
            name="country"
            id="country"
            autoComplete="off"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            placeholder="Enter Your Country"
          />
          <br />
          <div className="mt-4 mb-4">
           <div className="flex space-x-6">
           <button className="h-[3rem] w-[8rem] ml-2 rounded border-2 border-black hover:bg-blue-600 hover:border-none cursor:pointer font-bold hover:text-white">
              Submit
            </button>
            {registerError && (
              <p className="text-red-600 font-bold  ml-6">{registerError}</p>
            )}
           </div>
            <div className="flex justify-around">
            <p className="ml-[15rem] underline underline-offset-2">
              Already have an account!!
            </p>
            <NavLink to={"/login"}>
              <span className="ml-4 font-bold hover:text-blue-700">Login</span>
            </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
