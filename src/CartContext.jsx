// CartContext.jsx
import { createContext, useState, useReducer, useEffect } from "react";
import productData from "./data.json";

export const ShoppingCart = createContext();

export function CartProvider({ children }) {
  // const [cart, setCart] = useState([]);
  const [cartModal, setCartModal] = useState(false);
  const [cart, dispatch] = useReducer(cartReducer, []);

  function toggleCartModal() {
    setCartModal(!cartModal);
  }

  function cartReducer(state, action) {
    switch (action.type) {
      case "add_product":
        const existingProduct = state.find(
          (item) => item.id === action.product
        );
        if (existingProduct) {
          return state.map((item) =>
            item.id === action.product ? { ...item, qty: item.qty + 1 } : item
          );
        } else {
          return [...state, { id: action.product, qty: 1 }];
        }
      case "delete_product":
        return state.filter((item) => item.id !== action.product);

      case "decrease_product":
        const product = state.find((item) => item.id === action.product);
        if (product && product.qty > 1) {
          return state.map((item) =>
            item.id === action.product ? { ...item, qty: item.qty - 1 } : item
          );
        } else {
          return state.filter((item) => item.id !== action.product);
        }

      case "change_qty":
        return state.map((item) => {
          if (item.id === action.product.id) {
            return { id: item.id, qty: action.product.qty };
          } else {
            return item;
          }
        });

      default:
        return state;
    }
  }
  // useEffect(() => {
  //   setCart(state);
  // }, [state]);

  return (
    <ShoppingCart.Provider
      value={{
        cart,
        dispatch,
        toggleCartModal,
        cartModal,
        productData,
        cartReducer,
      }}
    >
      {children}
    </ShoppingCart.Provider>
  );
}
