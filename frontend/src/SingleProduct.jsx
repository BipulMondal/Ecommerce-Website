import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "./context/ProductContext";
import PageNavigation from "./components/PageNavigation";
import MyImage from "./components/MyImage";
import FormatPrice from "./helpers/FormatPrice";
import {TbReplace } from "react-icons/tb";
import {BsTruck} from 'react-icons/bs'
import { MdSecurity } from "react-icons/md";
import Star from './components/Star'
import AddToCart from "./components/AddToCart";

const API = "http://localhost:4000/api/v1/products";

const SingleProduct = () => {
  const { getSingleProduct, singleProduct } = useProductContext();

  const { id } = useParams();

  const { name, company, price, description, countInStock, images, star, numReviews } =
    singleProduct;

  useEffect(() => {
    getSingleProduct(`${API}/${id}`);
  }, []);

  return (
    <div className="bg-gray-100">
      <PageNavigation title={name} />
      <div className="w-full flex justify-around pl-24">
        {/* product image */}
        <div className="w-2/5">
          <div className="">
            <MyImage imgs={images} product={singleProduct}/>
          </div>
        </div>

        {/* product data */}
        <div className=" w-3/5  h-[31rem] border-2 border-slate-300 pl-12 mr-10">
          <div className="space-y-2 h-[13.5rem]">
            <h2 className="font-bold text-2xl text-blue-600">{name}</h2>
            <Star stars={star} reviews={numReviews} />
            <p className="font-semibold">
              MRP :  <del className="text-gray-500">
                <FormatPrice price={price + 250000} /> 
              </del><span className="text-green-800 ml-6">Up to 13% off </span>
            </p>
            <p className="font-semibold">
              Deal of the Day : <span className="text-blue-800"><FormatPrice price={price} /></span>
            </p>
            <p className="pr-[2rem]">
              <span className="font-semibold mr-2">Descriptions</span> :{description}</p>
          </div>

          {/* product data warranty */}
          <div className="flex justify-between mt-4 mr-12 text-lg font-semibold">
            <div className="flex flex-col items-center">
              <BsTruck size="2.2rem" className="fill-blue-700" />
              <p>Free Delivary</p>
            </div>
            <div className="flex flex-col items-center">
              <TbReplace size="2.2rem" className="fill-blue-700" />
              <p>07 days replacement</p>
            </div>
            <div className="flex flex-col items-center">
              <BsTruck size="2.2rem" className="fill-blue-700" />
              <p>eKart delivary</p>
            </div>
            <div className="flex flex-col items-center">
              <MdSecurity size="2.2rem" className="fill-blue-700" />
              <p>1 years warranty</p>
            </div>
          </div>
          {/* product data info */}
          <div className="ml-2 mt-2">
            <p >
             <span className="font-semibold"> Available</span> : {" "}
              <span>{countInStock > 0 ? "InStock" : "not Available"} </span>
            </p>
            <p >
             <span className="font-semibold"> Company</span> : <span>{company}</span>
            </p>
          </div>
          <hr className="mt-2 mr-10" />
          {countInStock > 0 && <AddToCart product={singleProduct} />  }

        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
