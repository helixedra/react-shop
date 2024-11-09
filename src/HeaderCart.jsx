import { ShoppingBag } from "lucide-react";
import { ShoppingCart } from "./CartContext";
import { useContext, useEffect, useState } from "react";
import styles from "./HeaderCart.module.css";

function HeaderCart() {
  const { cart, toggleCartModal } = useContext(ShoppingCart);
  const [cartQty, setCartQty] = useState(0);

  function handleCartQty() {
    if (cart && cart.length > 0) {
      return cart.reduce((acc, item) => acc + parseInt(item.qty), 0);
    } else {
      return 0;
    }
  }
  useEffect(() => {
    setCartQty(handleCartQty());
  }, [cart]);
  return (
    <button className={styles.cart} onClick={toggleCartModal}>
      <ShoppingBag />
      {cartQty !== 0 && <span className={styles.counter}>{cartQty}</span>}
    </button>
  );
}

export default HeaderCart;
