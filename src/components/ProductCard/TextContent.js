const TextContent = ({ product }) => {
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-800 truncate">
        {product.title}
      </h2>
      <p className="text-gray-500 text-sm truncate">
        {product.shortDescription}
      </p>
      <div className="flex items-center space-x-2 mt-2">
        <p className="text-xl font-bold text-green-600">₹{product.price}</p>
        <p className="text-sm font-medium text-gray-400 line-through">
          ₹{product.originalPrice}
        </p>
        <p className="text-sm font-medium text-red-500">
          ({discountPercentage}% off)
        </p>
      </div>
    </>
  );
};

export default TextContent;
