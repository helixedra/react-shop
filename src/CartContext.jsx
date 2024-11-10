// CartContext.jsx
import {
  createContext,
  useState,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import productData from "./data.json";

export const ShoppingCart = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "add_product": {
      const existingProduct = state.find((item) => item.id === action.product);
      if (existingProduct) {
        return state.map((item) =>
          item.id === action.product ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...state, { id: action.product, qty: 1 }];
      }
    }

    case "delete_product":
      return state.filter((item) => item.id !== action.product);

    case "decrease_product": {
      const product = state.find((item) => item.id === action.product);
      if (product && product.qty > 1) {
        return state.map((item) =>
          item.id === action.product ? { ...item, qty: item.qty - 1 } : item
        );
      } else {
        return state.filter((item) => item.id !== action.product);
      }
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

export function CartProvider({ children }) {
  const [cartModal, setCartModal] = useState(false);
  const [cart, dispatch] = useReducer(cartReducer, []);

  const toggleCartModal = useCallback(() => {
    setCartModal((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({ cart, dispatch, toggleCartModal, cartModal, productData }),
    [cart, cartModal, toggleCartModal]
  );

  return (
    <ShoppingCart.Provider value={value}>{children}</ShoppingCart.Provider>
  );
}
