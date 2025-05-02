const CollectionCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden animate-pulse">
      {/* Header Skeleton */}
      <div className="p-5 border-b">
        <div className="h-6 bg-gray-300 rounded w-3/5 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-4/5"></div>
      </div>

      {/* Image Carousel Skeleton */}
      <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center">
        <div className="w-11/12 h-56 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default CollectionCardSkeleton;
