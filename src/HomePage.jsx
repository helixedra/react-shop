import ProductItem from "./ProductItem";
import { ShoppingCart } from "./CartContext";
import { useContext } from "react";
import HeaderCart from "./HeaderCart";

function HomePage() {
  const { productData } = useContext(ShoppingCart);

  return (
    <div>
      <header className="header">
        <nav></nav>
        <HeaderCart />
      </header>
      {productData.map((item) => (
        <ProductItem key={item.id} {...item} />
      ))}
    </div>
  );
}

export default HomePage;
