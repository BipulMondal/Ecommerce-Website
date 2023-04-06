import React from "react";
import { useProductContext } from "../context/ProductContext";
import { NavLink } from "react-router-dom";
import FormatPrice from "../helpers/FormatPrice";

const Electronic = () => {
  const { isLoading, electronicProduct } = useProductContext();

  if (isLoading) {
    return (
      <div className="text-center text-2xl mt-48 font-bold">.......Loading</div>
    );
  }

  return (
    <div>
      <div className="mx-24">
        {electronicProduct.map((curElem, index) => {
          return (
            <NavLink to={`/singleproduct/${curElem._id}`}>
              <div
                className="px-28 grid grid-cols-3 gap-6 text-center border-2 border-black my-2"
                key={index}
              >
                <div className="">
                  <img
                    className="h-[14rem] w-[9rem]"
                    src={curElem.images[0]}
                    alt="logo"
                  />
                </div>
                <div className="mt-14">
                  <p className="text-xl font-semibold text-blue-800">
                    {curElem.name}
                  </p>
                  <p className="mt-4">{curElem.description}</p>
                </div>
                <div className="mt-20">
                  <p className="text-2xl font-bold">
                    <FormatPrice price={curElem.price} />
                  </p>
                  <p>No. of stars: {curElem.star} </p>
                  <p>No. of reviews : {curElem.numReviews} </p>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Electronic;
