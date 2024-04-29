// HomeScreen.js
import Header from "../components/Header";
import ProductHome from "./ProductHome";
import Carousel from "../components/carousel/Carousel";

export default function HomeScreen() {
  return (
    <div className="home-container">
      <Header /> 
      <Carousel />
      <ProductHome />
    </div>
  );
}
