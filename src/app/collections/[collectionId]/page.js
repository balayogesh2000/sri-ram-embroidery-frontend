"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import ProductCard from "@/components/ProductCard/ProductCard";
import ProductCardSkeleton from "@/components/ProductCard/ProductCardSkeleton";
import CartDisplay from "@/components/CartDisplay";

export default function CollectionPage() {
  const { collectionId } = useParams();
  const router = useRouter();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.collections.getOne(collectionId);
        setCollection(data.collection);
      } catch (err) {
        setError(err.message || "Failed to load collection");
      } finally {
        setLoading(false);
      }
    };
    if (collectionId) fetchCollection();
  }, [collectionId]);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-96 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-10">Error: {error}</div>;
  }

  if (!collection) {
    return <div className="text-center p-10">Collection not found.</div>;
  }

  return (
    <section className="max-w-6xl mx-auto p-6">
      {/* Header with Back, Centered Title/Desc, Cart */}
      <div className="flex items-center justify-between mb-8 gap-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium shadow-sm transition"
          aria-label="Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </button>
        {/* Centered Name & Description */}
        <div className="flex-1 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-1 text-center">
            {collection.name}
          </h1>
          <p className="text-gray-600 text-lg text-center max-w-2xl">
            {collection.description}
          </p>
        </div>
        {/* CartDisplay on right */}
        <div className="flex-shrink-0">
          <CartDisplay />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(collection.products || []).length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No products in this collection.
          </div>
        ) : (
          collection.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </section>
  );
}
