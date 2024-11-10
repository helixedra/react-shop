// CartList.jsx
import CartListItem from "./CartListItem";

function CartList({ cartData }) {
  return (
    <>
      {cartData.map((item) => (
        <CartListItem {...item} key={item.id} />
      ))}
    </>
  );
}

export default CartList;
