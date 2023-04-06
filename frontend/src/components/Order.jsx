import React, { useState, useEffect } from "react";
import axios from "axios";
import FormatPrice from "../helpers/FormatPrice";
import { AiFillDelete } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

function OrderList() {
  const [orderList, setOrderList] = useState([]);

  const deleteOrder = (orderId) => {
    const token = localStorage.getItem("token");
    axios.delete(`http://localhost:4000/api/v1/orders/${orderId}`, {
      headers :{
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      const filterOrderList = orderList.filter((order) => order._id !== orderId);

      setOrderList( filterOrderList );
      console.log('order deleted successfully')
    })
    .catch((error) => {
      console.log(error)
    })
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // get the token from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    // const userId = user._id;
    const userId = user ? user._id : null;

    if (token) {
      axios
        .get(`http://localhost:4000/api/v1/orders/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // add the token as an authorization header
          },
        })
        .then((response) => {
          setOrderList(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div>
      {orderList && orderList.length === 0 && (
        <>
        <p className="text-4xl font-semibold">No orders found for this user.</p>
        <NavLink to='/' className="mt-20 ml-10 hover:font-semibold hover:text-blue-500 cursor-pointer"><span>Go to home</span></NavLink>
        </>
      )}
      {orderList && orderList.length > 0 && orderList.map((order, index) => {
            const orderDate = new Date(order.dateOrdered)
            const deliveryDate = new Date(orderDate.setDate(orderDate.getDate() + 7))
            const formattedDeliveryDate = deliveryDate.toLocaleDateString()

            return (
          <div className="w-full">
            
            <div key={index} className="flex">
              <div className="w-full mx-28 text-blue-700 text-xl font-semibold ">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-around items-center h-[10rem] w-full border-2 border-gray-300 rounded my-6 "
                  >
                    <div className="flex space-x-4">
                      {item.image && (
                        <img
                          className="h-[7rem]"
                          src={item.image}
                          alt="Product"
                        />
                      )}
                      <div className="flex flex-col justify-center ">
                        <p className="">{item.name}</p>
                        <p className=""> Color : <span
                          className="mt-2"
                          style={{
                            backgroundColor: item.color,
                            width: "1.5rem",
                            height: "1.5rem",
                            display: "inline-block",
                            marginRight: "1rem",
                          }}
                        ></span></p>
                      </div>
                    </div>
                    <p>
                      <FormatPrice price={item.price} />{" "}
                    </p>
                    <div className="">
                      <p>Status: {order.status}</p>
                      <p>Estimated Delivery Date: {formattedDeliveryDate}</p>
                    </div>
                    <p>
                      <AiFillDelete 
                      className="fill-red-500 h-16 w-10 cursor-pointer hover:scale-105" 
                      onClick={() => deleteOrder(order._id)}
                      />
                      </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
            )}
        )}
    </div>
  );
}

export default OrderList;
