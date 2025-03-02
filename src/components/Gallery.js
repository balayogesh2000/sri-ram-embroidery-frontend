"use client";

import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import handleError from "@/utils/handleError";

export default function Gallery() {
  const { items, addToCart, removeFromCart } = useCart();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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

  const handleAddToCart = (product) => {
    addToCart({
      productId: product._id,
      title: product.title,
      price: product.price,
    });
  };

  const handleDecrement = (product) => {
    removeFromCart({ productId: product._id });
  };

  const isInCart = ({ productId }) => {
    return items.find((item) => item.productId === productId);
  };

  return (
    <section className="py-10 px-4" id="gallery">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full h-80 bg-gray-200 animate-pulse rounded shadow-lg"
                />
              ))
            : products.map((product) => (
                <div
                  key={product._id}
                  className="group relative w-full h-80 rounded overflow-hidden shadow-lg cursor-pointer"
                  onClick={() => router.push(`/product/${product._id}`)}
                >
                  <Image
                    src={product.images[0]?.s3Location || "/placeholder.png"}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                    {product.title}
                  </div>

                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                    <span className="block">₹{product.price}</span>

                    {isInCart({ productId: product._id }) ? (
                      <div className="flex items-center mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDecrement(product);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 w-8 rounded"
                        >
                          -
                        </button>
                        <span className="mx-2">
                          {
                            items.find((item) => item.productId === product._id)
                              ?.quantity
                          }
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white py-1 w-8 rounded"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="mt-2 bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                      >
                        Select
                      </button>
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
