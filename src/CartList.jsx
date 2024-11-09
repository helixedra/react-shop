import CartListItem from "./CartListItem";

function CartList({ cartData }) {
  // console.log(cartData);

  return (
    <>
      {cartData.map((item) => (
        <CartListItem {...item} key={item.id} />
      ))}
    </>
  );
}

export default CartList;
