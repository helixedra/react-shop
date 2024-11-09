//ProductItem.jsx
import styles from "./ProductItem.module.css";
import { useContext } from "react";
import { ShoppingCart } from "./CartContext";
import Rating from "./Rating";
// import { ShoppingCart as ShoppingCartIcon } from "lucide-react";

function ProductItem({ id, name, category, price, stock, rating }) {
  const { dispatch, toggleCartModal } = useContext(ShoppingCart);
  // const [state, dispatch] = useReducer(cartReducer, { product: id });
  const handleAddToCart = () => {
    dispatch({ type: "add_product", product: id });
    toggleCartModal(); // Виклик модального вікна після оновлення кошика
  };
  return (
    <div className={styles.product_item}>
      {/* <div>ID: {id}</div> */}
      <div className={styles.name}>{name}</div>
      <div className={styles.category}>{category}</div>
      <div className={styles.price}>
        <span>$</span>
        {price}
      </div>
      {/* <div>Stock: {stock}</div> */}
      {/* <div>Rating: {rating}</div> */}
      <Rating rating={rating} />
      {
        <button className={styles.add_cart_button} onClick={handleAddToCart}>
          Add to Cart
        </button>
      }
    </div>
  );
}

export default ProductItem;
