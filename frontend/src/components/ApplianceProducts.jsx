import React from "react";
import { useProductContext } from "../context/ProductContext";
import Product from "./Product";

const ApplianceProducts = () => {
  const { isLoading, applianceProducts } = useProductContext();
  // console.log(applianceProducts)

  if (isLoading) {
    return (
      <div className="text-center text-2xl mt-48 font-bold">.......Loading</div>
    );
  }

  return (
    <div className="h-[25rem] bg-gray-100 mt-4 space-y-2">
      <div className="flex justify-evenly items-center pt-2">
        <div className="">
          <div className="bg-white h-[17rem] w-[15rem] mt-12 mx-10 flex items-center justify-center rounded rounded-xl">
            <h1 className="text-3xl font-bold mt-6 text-blue-700">
              Best of <br /> Appliances
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-5 place-items-center mt-8">
          {applianceProducts.map((curElem) => {
            return <Product key={curElem.id} {...curElem} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ApplianceProducts;
