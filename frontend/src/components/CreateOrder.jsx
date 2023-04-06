import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const CreateOrder = () => {
    const API = "http://localhost:4000/api/v1/orders";
    const navigate = useNavigate();

    const [registerError, setRegisterError] = useState(" ");
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState(" ");
    const [phError, setPhError] = useState(" ");

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        street: "",
        landmark: "",
        pin: "",
        city: "",
        country: "",
        showPasswordField: true,
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (token && user != null) {
            const { name, email, phone, street, landmark, pin, city, country } = user;

            setUserData({
                name,
                email,
                phone,
                street,
                landmark,
                pin,
                city,
                country,
                showPasswordField: false,
            });
        } else {
            // If token is not present, show the password field by default
            setUserData((prevState) => ({ ...prevState, showPasswordField: true }));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        const cartItem = JSON.parse(localStorage.getItem("cart"));

        const cartItemData = cartItem.map((item) => {
            return {
                name: item.name,
                color: item.colors[0],
                image: item.images[0],
                price: item.price,
                star: item.star,
            };
        });
        if (token && user) {
            try {
                const response = await axios.post(
                    API,
                    {
                        userId: user._id,
                        items: cartItemData,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 201) {
                    localStorage.removeItem("cart");
                    alert("Order has been placed successfully!");
                    navigate("/");
                } else {
                    throw new Error("Error placing order");
                }
            } catch (err) {
                console.error(err);
                alert("Error placing order");
            }
        } else {
            if (userData.name.length === 0 ||
                userData.email.length === 0 ||
                userData.password.length === 0 ||
                userData.phone.length === 0 ||
                userData.street.length === 0 ||
                userData.landmark.length === 0 ||
                userData.pin.length === 0 ||
                userData.city.length === 0 ||
                userData.country.length === 0
            ) {
                setSubmitted(true)
            }
            else if (
                userData.name &&
                userData.email &&
                userData.password &&
                userData.phone &&
                userData.street &&
                userData.landmark &&
                userData.pin &&
                userData.city &&
                userData.country
            ) {
                try {
                    const regEx = /^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const PhregEx = /^[6-9]\d{9}$/;

                    let isEmailValid = regEx.test(userData.email);
                    let isPhoneValid = PhregEx.test(userData.phone);

                    if(isEmailValid && isPhoneValid) {
                    const response = await axios.post(API, {
                        user: userData,
                        items: cartItemData,
                    });

                    if (response.status === 201) {
                        // clear cart item from local storage
                        localStorage.removeItem("cart");
                        const { user, token } = response.data;

                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token);

                        alert("Order has been placed successfully!");

                        navigate("/");
                    } else {
                        throw new Error("Error placing order");
                    }
                }else {
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
                }
            }
        }
    };

    return (
        <div className="flex px-28 h-screen items-center ">
            <div className="w-1/2 border-2 border-gray-300">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-5xl absolute text-white mt-[12rem] ml-[10rem]">
                        <span className="text-yellow-500">O</span>rder
                    </h1>
                    <img src="images\logo.jpg" alt="logo" />
                </div>
            </div>
            <div className="w-[38rem] border-2 border-gray-300">
                <form onSubmit={handleSubmit}>
                    <label className="px-4 font-semibold" htmlFor="name">
                        Name
                    </label> {submitted && userData.name.trim().length === 0 && (
                        <label className="text-red-500 text-xs ml-36">
                            *** Name is required ***
                        </label>
                    )}
                    <br />
                    <input
                        className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
                        type="text"
                        name="name"
                        id="username"
                        value={userData.name}
                        autoComplete="off"
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        placeholder="Enter Your Name"
                    />
                    <br />
                    <label className="px-4 font-semibold" htmlFor="email">
                        Email
                    </label> {submitted && userData.email.trim().length === 0 && (
                        <label className="text-red-500 text-xs ml-40">
                            *** Email is required ***
                        </label>
                    )}
                    <br />
                    <div className="flex">
                    <input
                        className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
                        type="text"
                        name="email"
                        id="email"
                        value={userData.email}
                        autoComplete="off"
                        onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                        }
                        placeholder="Enter Your Email"
                    /><p className="text-red-600 bg-red font-bold ml-2 mt-2 text-xs">{message}</p>
                    </div>
                    {userData.showPasswordField && (
                        <div>
                            <label className="px-4 font-semibold" htmlFor="password">
                                Password
                            </label>{submitted && userData.password.trim().length === 0 && (
                                 <label className="text-red-500 text-xs ml-28">
                                 *** Password is required ***
                             </label>
                            )}
                            <br />
                            <input
                                className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
                                type="text"
                                name="password"
                                id="password"
                                value={userData.password}
                                onChange={(e) =>
                                    setUserData({ ...userData, password: e.target.value })
                                }
                                placeholder="Enter Your Password"
                            />
                            <br />
                        </div>
                    )}
                    <label className="px-4 font-semibold" htmlFor="phone">
                        Phone
                    </label>{submitted && userData.phone.trim().length === 0 && (
                         <label className="text-red-500 text-xs ml-36">
                         *** Phone is required ***
                     </label>
                    )}
                    <br />
                    <div className="flex">
                    <input
                        className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
                        type="text"
                        name="phone"
                        id="phone"
                        value={userData.phone}
                        onChange={(e) =>
                            setUserData({ ...userData, phone: e.target.value })
                        }
                        placeholder="Enter Your Phone"
                    /><p className="text-red-600 bg-red font-bold ml-2 mt-2 text-xs">{phError}</p>
                    </div>
                    <label className="px-4 font-semibold" htmlFor="street">
                        Street
                    </label>{submitted && userData.street.trim().length === 0 && (
                         <label className="text-red-500 text-xs ml-36">
                         *** Street is required ***
                     </label>
                    )}
                    <br />
                    <input
                        className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
                        type="text"
                        name="street"
                        id="street"
                        value={userData.street}
                        onChange={(e) =>
                            setUserData({ ...userData, street: e.target.value })
                        }
                        placeholder="Enter Your Street"
                    />
                    <br />
                    <label className="px-4 font-semibold" htmlFor="landmark">
                        Landmark
                    </label>{submitted && userData.landmark.trim().length === 0 && (
                         <label className="text-red-500 text-xs ml-24">
                         *** Landmark is required ***
                     </label>
                    )}
                    <br />
                    <input
                        className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
                        type="text"
                        name="landmark"
                        id="landmark"
                        value={userData.landmark}
                        onChange={(e) =>
                            setUserData({ ...userData, landmark: e.target.value })
                        }
                        placeholder="Enter Your Landmark"
                    />
                    <br />
                    <label className="px-4 font-semibold" htmlFor="pin">
                        Pin
                    </label>{submitted && userData.pin.trim().length === 0 && (
                         <label className="text-red-500 text-xs ml-40">
                         *** Pin is required ***
                     </label>
                    )}
                    <br />
                    <input
                        className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
                        type="text"
                        name="pin"
                        id="pin"
                        value={userData.pin}
                        onChange={(e) => setUserData({ ...userData, pin: e.target.value })}
                        placeholder="Enter Your Pin"
                    />
                    <br />
                    <label className="px-4 font-semibold" htmlFor="city">
                        City
                    </label>{submitted && userData.city.trim().length === 0 && (
                         <label className="text-red-500 text-xs ml-36">
                         *** City is required ***
                     </label>
                    )}
                    <br />
                    <input
                        className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
                        type="text"
                        name="city"
                        id="city"
                        value={userData.city}
                        onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                        placeholder="Enter Your City"
                    />
                    <br />
                    <label className="px-4 font-semibold" htmlFor="country">
                        Country
                    </label>{submitted && userData.country.trim().length === 0 && (
                         <label className="text-red-500 text-xs ml-28">
                         *** Country is required ***
                     </label>
                    )}
                    <br />
                    <input
                        className="w-[25rem] border-2 border-gray-200 focus:outline-none pl-4 ml-2"
                        type="text"
                        name="country"
                        id="country"
                        value={userData.country}
                        onChange={(e) =>
                            setUserData({ ...userData, country: e.target.value })
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
                                <span className="ml-4 font-bold hover:text-blue-700">
                                    Login
                                </span>
                            </NavLink>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateOrder;
