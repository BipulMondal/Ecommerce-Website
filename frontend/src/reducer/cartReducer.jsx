const cartReducer = (state, action) => {

  if(action.type === "ADD_TO_CART") {
    let {id, name, color, amount, product} = action.payload;

    let existProduct = state.cart.find((curElem) => curElem.productId === id + color);
    if(existProduct) {
      let updateProduct = state.cart.map((curElem) => {
        if(curElem.productId === id + color) {
          let newAmount = curElem.amount + amount;

          if(newAmount >= curElem.max) {
            newAmount = curElem.max
          }
          return {
            ...curElem,
            amount: newAmount
          }
        }else{
          return curElem
        }
      });
      return {
        ...state,
        cart: updateProduct
      }
    }else{
     
    let cartProduct;
    cartProduct = {
      id: id + color,
      name,
      color, 
      amount,
      images: product.images[0],
      price: product.price,
      max: product.countInStock
    }
    return {
      ...state,
      cart: [...state.cart, cartProduct],
    }
  }
}
  

  if(action.type === "SET_CART_ITEM_DATA") {
    return {
      ...state,
      cart: action.payload
    }
  }

  if(action.type === "SET_INCREASE") {
    let updateProduct = state.cart.map((curElem) => {
      if(curElem.productId === action.payload) {
        let incAmount = curElem.amount + 1;

        if(incAmount >= curElem.max) {
          incAmount = curElem.max;
        }
        if(incAmount > 3) {
          incAmount = 3;
        }
        return {
          ...curElem,
          amount: incAmount,
        }
      }else{
        return curElem
      }
    });
    return {
      ...state,
      cart: updateProduct
    }
  }
  if(action.type === "SET_DECREASE") {
    let updateProduct = state.cart.map((curElem) => {
      if(curElem.productId === action.payload) {
        let decAmount = curElem.amount - 1;

        if(decAmount <= 1) {
          decAmount = 1;
        }
        return {
          ...curElem,
          amount: decAmount,
        }
      }else{
        return curElem
      }
    });
    return {
      ...state,
      cart: updateProduct
    }
  }

  //remove item
  if(action.type === "REMOVE_ITEM") {
      let updateCart = state.cart.filter((curElem) => curElem.productId !== action.payload);
  
      return {
        ...state,
        cart: updateCart
      }
    }

  //clear cart
  if(action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: []
    }
  }

  //cart total item
  if(action.type === "CART_TOTAL_ITEM") {
    let updateItemValue = state.cart.reduce((initialVal, curElem) => {
      let { amount } = curElem;
      initialVal = initialVal + amount;
      return initialVal;
    }, 0);

    return {
      ...state,
      total_item: updateItemValue
    }
  }

  // cart total price
  if(action.type === "CART_TOTAL_PRICE") {
    let updateItemPrice = state.cart.reduce((initialVal, curElem) => {
      let { price, amount } = curElem;

      initialVal = initialVal + price * amount
      return initialVal ;
    }, 0);
    return {
      ...state,
      total_price: updateItemPrice,
    }
  }


  return state
}

export default cartReducer
