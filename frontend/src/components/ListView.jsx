import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../helpers/FormatPrice";

const ListView = ({ products }) => {
  return (
    <div>
      <div>
        {products.map((curElem) => {
          const { id, name, images, price, description } = curElem;
          return (
            <div key={id} className="flex border-2 border-black mt-6">
              <figure className="w-2/4 flex justify-center">
                <img className="h-[14rem]" src={images[0]} alt={name} />
              </figure>
              <div className="flex flex-col items-center justify-center w-2/4 text-xl text-left">
                <div className="w-full text-left">
                  <h3 className="font-bold text-2xl text-blue-700">{name}</h3>
                  <p>Price : 
                    <FormatPrice price={ price } />{" "}
                  </p>
                  <p>{description.slice(0, 90)}....</p>

                  <NavLink to={`/singleproduct/${id}`}>
                    <button className="text-blue-800">Read More.....</button>
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListView;
