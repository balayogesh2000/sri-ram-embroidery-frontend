"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import handleError from "@/utils/handleError";
import ProductCard from "./ProductCard";

export default function Gallery() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const {
          data: { products },
        } = await api.products.getAllActiveProducts();
        setProducts(products);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  return (
    <section id="gallery" className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Our Collections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
