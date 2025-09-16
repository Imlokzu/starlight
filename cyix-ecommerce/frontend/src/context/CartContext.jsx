import React, { createContext, useReducer } from 'react';

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItem = action.payload;
      const existItem = state.cart.find((item) => item._id === newItem._id);

      const cartItems = existItem
        ? state.cart.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart, newItem];

      return { ...state, cart: cartItems };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };
    case 'CHANGE_QTY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload.id ? { ...item, qty: action.payload.qty } : item
        ),
      };
    case 'CLEAR_CART':
        return { ...state, cart: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
