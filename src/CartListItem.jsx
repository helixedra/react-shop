// CartListItem.jsx
import styles from "./CartListItem.module.css";
import { ShoppingCart } from "./CartContext";
import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

function CartListItem({ id, qty }) {
  const { dispatch, productData } = useContext(ShoppingCart);
  const [qtyState, setQtyState] = useState(qty);

  const itemData = useMemo(() => {
    return productData.find((item) => item.id === id);
  }, [id, productData]);

  const subTotal = useMemo(() => {
    return parseFloat(itemData.price * (qtyState || 0)).toFixed(2);
  }, [itemData.price, qtyState]);

  const handleIncreaseQty = useCallback(() => {
    dispatch({ type: "add_product", product: id });
    setQtyState((prevQty) => (prevQty || 0) + 1);
  }, [dispatch, id]);

  const handleDecreaseQty = useCallback(() => {
    if (qtyState > 1) {
      dispatch({ type: "decrease_product", product: id });
      setQtyState((prevQty) => prevQty - 1);
    } else {
      dispatch({ type: "delete_product", product: id });
    }
  }, [dispatch, id, qtyState]);

  const handleQtyInput = useCallback((event) => {
    const inputQty = event.target.value;
    const parsedQty = parseInt(inputQty, 10);
    setQtyState(isNaN(parsedQty) ? "" : parsedQty); // Зберігаємо "" якщо поле порожнє
  }, []);

  const handleInputBlur = useCallback(() => {
    if (qtyState === "" || qtyState < 1) {
      setQtyState(1); // Встановлюємо мінімум після втрати фокусу
    }
  }, [qtyState]);

  useEffect(() => {
    if (qtyState !== qty && qtyState !== "") {
      dispatch({ type: "change_qty", product: { id, qty: qtyState } });
    }
  }, [qtyState, qty, dispatch, id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>{itemData.name}</div>
      <div className={styles.controls_container}>
        <div className={styles.container}>
          <div className={styles.qty_controls}>
            <button onClick={handleDecreaseQty} disabled={qtyState <= 1}>
              <Minus size={20} />
            </button>
            <input
              type="number"
              onChange={handleQtyInput}
              onBlur={handleInputBlur} // Встановлюємо значення після втрати фокусу
              value={qtyState}
            />
            <button onClick={handleIncreaseQty}>
              <Plus size={20} />
            </button>
          </div>
          <div className={styles.price}>
            <span>$</span>
            {subTotal}
          </div>
        </div>
        <div className={styles.delete_button}>
          <button
            onClick={() => dispatch({ type: "delete_product", product: id })}
          >
            <Trash2 size={18} className={styles.bin} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartListItem;
