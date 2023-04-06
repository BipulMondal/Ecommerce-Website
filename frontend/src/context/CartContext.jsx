import React, { createContext, useEffect, useReducer, useContext } from 'react'
import reducer from '../reducer/cartReducer'
import axios from 'axios'

const CartContext = createContext();
const user = JSON.parse(localStorage.getItem('user'));
const userId = user ? user._id : null;

// console.log(userId)

const API = `http://localhost:4000/api/v1/cartItems/${userId}`;

const initialState = {
    cart : [],
    total_item: "",
    total_price: "",
    shipping_fee: 50000
}

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getCartItem = async (url) => {
        try {
            const res = await axios.get(url);
            const cartItems = await res.data;
            // console.log(cartItems)
            dispatch({type: "SET_CART_ITEM_DATA", payload: cartItems})

            dispatch({ type: "CART_TOTAL_ITEM" })
            dispatch({ type: "CART_TOTAL_PRICE" })

        } catch (error) {
            dispatch({type: "CART_ITEM_ERROR"})
        }
    };

    const addToCart = (id, name, color, amount, price, image, product) => {
        dispatch({type: "ADD_TO_CART", payload:{id, name, color, amount, price, image, product}})
        dispatch({ type: "CART_TOTAL_ITEM" })
        dispatch({ type: "CART_TOTAL_PRICE" })
    }

    const setIncrease = (id) => {
        dispatch({ type: "SET_INCREASE", payload: id});
        dispatch({ type: "CART_TOTAL_ITEM" })
        dispatch({ type: "CART_TOTAL_PRICE" })
    }
    const setDecrease = (id) => {
        dispatch({ type: "SET_DECREASE", payload: id});
        dispatch({ type: "CART_TOTAL_ITEM" })
        dispatch({ type: "CART_TOTAL_PRICE" })
    }

    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
        dispatch({ type: "CART_TOTAL_ITEM" })
        dispatch({ type: "CART_TOTAL_PRICE" })
      };

    //CLEAR CART
    const clearCart = async () => {
        dispatch({type: "CLEAR_CART"})
        dispatch({type: "CART_TOTAL_ITEM"})
    }

    useEffect(() => {
        if (userId) {
            getCartItem(API);
          }
        // getCartItem(API)
    }, []);

  return (
    <CartContext.Provider value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setIncrease,
        setDecrease
    }}>
        {children}
    </CartContext.Provider>
  )
}
const useCartContext = () => {
    return useContext(CartContext)
}

export {CartProvider, useCartContext};
