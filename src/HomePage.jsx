import ProductItem from "./ProductItem";
import HeaderCart from "./HeaderCart";
import productData from "./data.json";

function HomePage() {
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
