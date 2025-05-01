"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import ProductCard from "@/components/ProductCard/ProductCard";
import ProductCardSkeleton from "@/components/ProductCard/ProductCardSkeleton";
import CartDisplay from "@/components/CartDisplay";
import { ArrowLeft } from "lucide-react";

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
      <div className="mb-6 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-gray-600">
          <ArrowLeft size={24} /> {/* Only the back icon */}
        </button>
        <CartDisplay />
      </div>
      {/* Centered name/desc below */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-1">{collection.name}</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {collection.description}
        </p>
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
