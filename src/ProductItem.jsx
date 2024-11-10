//ProductItem.jsx
import styles from "./ProductItem.module.css";
import { useContext } from "react";
import { ShoppingCart } from "./CartContext";
import Rating from "./Rating";

function ProductItem({ id, name, category, price, rating }) {
  const { dispatch, toggleCartModal } = useContext(ShoppingCart);

  const handleAddToCart = () => {
    dispatch({ type: "add_product", product: id });
    toggleCartModal();
  };
  return (
    <div className={styles.product_item}>
      <div className={styles.name}>{name}</div>
      <div className={styles.category}>{category}</div>
      <div className={styles.price}>
        <span>$</span>
        {price}
      </div>
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
