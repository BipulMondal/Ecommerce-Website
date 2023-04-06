import React, { useState } from "react";
import { useCartContext } from "../context/CartContext";
import { FaCheck } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import CartAmountToggle from "./CartAmountToggle";
import axios from "axios";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();

  const API = "http://localhost:4000/api/v1/cartItems";

  const { _id, name, colors, price, images, countInStock } = product;
  // console.log(product)

  const [color, setColor] = useState(colors[0]);
  const [image, setImage] = useState(images[0]);
  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    if (amount < countInStock && amount < 3) {
      setAmount(amount + 1);
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(
      API,
      {
        userId,
        productId: _id + color,
        name,
        color,
        amount,
        price,
        image,
      },
      config
    );

    addToCart(_id, name, color, amount, image, price, product);
  };

  return (
    <div>
      <div className="flex space-x-12">
        {/* color code */}
        <div className="mt-4">
          <p>
            colors:
            {colors.map((curColor, index) => {
              return (
                <button
                  key={index}
                  className="h-[1.5rem] w-[1.5rem] rounded-full ml-2"
                  style={{ backgroundColor: curColor }}
                  onClick={() => setColor(curColor)}
                >
                  {color === curColor ? (
                    <FaCheck className="fill-red-500 ml-1" />
                  ) : null}
                </button>
              );
            })}
          </p>
        </div>

        {/* add to cart */}
        <div>
          <CartAmountToggle
            amount={amount}
            setDecrease={setDecrease}
            setIncrease={setIncrease}
          />
        </div>
      </div>

      <NavLink to={"/cart"} onClick={handleAddToCart}>
        <button className="h-[3.5rem] w-[10rem] bg-red-700 text-white font-bold text-xl mt-4">
          Add to cart
        </button>
      </NavLink>
    </div>
  );
};

export default AddToCart;
