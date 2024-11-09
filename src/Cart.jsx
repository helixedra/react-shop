import { useRef, useState, useContext, useEffect, useMemo } from "react";
import { ShoppingCart } from "./CartContext";
import CartList from "./CartList";
import styles from "./Cart.module.css";
import { X } from "lucide-react";

function Cart() {
  const { cart, toggleCartModal, cartModal, productData } =
    useContext(ShoppingCart);
  const dialogRef = useRef();

  function getCartTotal() {
    if (cart && cart.length > 0) {
      return cart.reduce((acc, item) => {
        const currentProduct = productData.find(
          (product) => product.id === item.id
        );
        return (
          acc + parseFloat(currentProduct.price).toFixed(2) * parseInt(item.qty)
        );
      }, 0);
    }
    return 0;
  }

  const cartTotal = useMemo(
    () => (cart ? getCartTotal().toFixed(2) : 0.0),
    [cart]
  );

  useEffect(() => {
    if (cartModal) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [cartModal]);

  return (
    <dialog className={styles.cart} ref={dialogRef}>
      <div className={styles.dialog_header}>
        Shopping Cart
        <button className={styles.close_button} onClick={toggleCartModal}>
          <X size={20} />
        </button>
      </div>
      <div className={styles.list}>
        {cart && cart.length > 0 ? (
          <CartList cartData={cart} />
        ) : (
          <div className={styles.empty_state}>Cart is empty</div>
        )}
      </div>
      {cart && cart.length > 0 ? (
        <div className={styles.total}>
          Total:
          <div className={styles.total_price}>
            <span>$</span>
            {cartTotal}
          </div>
        </div>
      ) : (
        ``
      )}
    </dialog>
  );
}

export default Cart;
