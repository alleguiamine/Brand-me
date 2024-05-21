import Header from "../components/Header";
import Carousel from "../components/carousel/Carousel";

import ProductHome from "./ProductHome";
import Rating from "../components/Rating";
export default function HomeScreen() {
  return (
    <div className="row center">
      <Header /> 
      <Carousel/>
      <ProductHome/>   
      <Rating/> 
    </div>
  );
}
