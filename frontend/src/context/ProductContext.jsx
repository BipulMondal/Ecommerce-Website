import React, { createContext, useContext, useEffect, useReducer } from 'react'
import axios from 'axios';
import reducer from '../reducer/productReducer';

const AppContext = createContext();

const API = 'http://localhost:4000/api/v1/products'

const initialState = {
    isLoading: false,
    isError: false,
    products:[],
    featureProducts: [],
    applianceProducts: [],
    footStyleProducts: [],
    fashionProducts: [],
    decorationProducts: [],
    beautyProducts: [],
    mobileProducts: [],
    babyToyProduct: [],
    babyToyDiscount: [],
    electronicProduct:[],
    isSingleLoading: false,
    singleProduct: {},
}

const ProductContext = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
  
    const getProducts = async (url) => {
        dispatch({type: "SET_LOADING"})
        try {
            const res = await axios.get(url);
            const products = await res.data;
            dispatch({type: "SET_API_DATA", payload: products})
        } catch (error) {
            dispatch({type: "API_ERROR"})
        }
    };

    // single product api call
    const getSingleProduct = async(url) => {
        dispatch({type: "SET_SINGLE_LOADING"})
        try {
            const res = await axios.get(url);
            const singleProduct = await res.data;
            dispatch({type: "SET_SINGLE_PRODUCT", payload: singleProduct})
        } catch (error) {
            dispatch({type: "SET_SINGLE_ERROR"})
        }
    };

    useEffect(() => {
        getProducts(API);
      }, []);


  return (
    <AppContext.Provider value={{...state, getSingleProduct}}>
        {children}
    </AppContext.Provider>
  )
};

//custom hooks
const useProductContext = () => {
    return useContext(AppContext);
}

export {ProductContext, AppContext, useProductContext}
