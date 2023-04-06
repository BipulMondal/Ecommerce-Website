import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProductContext } from './context/ProductContext';
import { CartProvider  } from './context/CartContext';
import { FilterContextProvider } from './context/FilterContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductContext>
      <FilterContextProvider>
        <CartProvider>
           <App />
        </CartProvider>
      </FilterContextProvider>
    </ProductContext>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
