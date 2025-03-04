import ImageSlider from "./ImageSlider";
import TextContent from "./TextContent";
import AddToCartSection from "./AddToCartSection";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <ImageSlider product={product} />
      <div className="p-4">
        <TextContent product={product} />
        <AddToCartSection product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
