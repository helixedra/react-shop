import styles from "./CartListItem.module.css";
import { ShoppingCart } from "./CartContext";
import { useContext, useEffect, useState, useMemo } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

function CartListItem({ id, qty }) {
  const { dispatch, productData } = useContext(ShoppingCart);
  const [qtyState, setQtyState] = useState(qty);

  const itemData = useMemo(() => {
    return productData.find((item) => item.id === id);
  }, [id, productData]);

  const subTotal = useMemo(() => {
    return parseFloat(parseFloat(itemData.price).toFixed(2) * qtyState).toFixed(
      2
    );
  }, [itemData.price, qtyState]);

  // const itemData = productData.find((item) => item.id === id);

  // const [subTotal, setSubTotal] = useState(
  //   parseFloat(itemData.price).toFixed(2) * qty
  // );
  const handleIncreaseQty = () => {
    dispatch({ type: "add_product", product: id });
    setQtyState((prevQty) => prevQty + 1);
  };
  const handleQtyInput = (event) => {
    if (isNaN(qtyState)) {
      return;
    }
    const inputQty = event.target.value;
    const parsedQty = parseInt(inputQty, 10);

    if (!isNaN(parsedQty) && parsedQty >= 1) {
      setQtyState(parsedQty);
    } else {
      setQtyState("");
    }
  };
  const handleInputBlur = () => {
    if (isNaN(qtyState) || qtyState === "") {
      setQtyState(1);
    }
  };

  useEffect(() => {
    if (isNaN(qtyState) || qtyState === "") {
      return;
    }
    dispatch({ type: "change_qty", product: { id, qty: qtyState } });
    // setSubTotal(
    //   parseFloat(parseFloat(itemData.price).toFixed(2) * qtyState).toFixed(2)
    // );
    // subTotal();
  }, [qtyState, dispatch, id]);

  const handleDecreaseQty = () => {
    if (qty > 1) {
      dispatch({ type: "decrease_product", product: id });
      setQtyState(qtyState - 1);
    } else {
      dispatch({ type: "delete_product", product: id });
    }
  };

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
              onChange={(e) => handleQtyInput(e)}
              onBlur={handleInputBlur}
              value={qtyState}
            />
            <button onClick={handleIncreaseQty}>
              <Plus size={20} />
            </button>
          </div>
          {/* <div>{itemData.price}</div> */}
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
