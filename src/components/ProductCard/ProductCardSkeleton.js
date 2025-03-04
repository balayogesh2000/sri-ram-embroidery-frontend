const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-60 bg-gray-300"></div>

      <div className="p-4">
        {/* Title Placeholder */}
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>

        {/* Description Placeholder */}
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>

        {/* Price Placeholder */}
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-3"></div>

        {/* Add to Cart Button Placeholder */}
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
