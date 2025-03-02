"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import handleError from "@/utils/handleError";
import { useCart } from "@/contexts/CartContext";
import CartDisplay from "@/components/CartDisplay";

export default function ProductPage() {
  const { items, addToCart, removeFromCart } = useCart();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(0); // State for quantity selection
  const router = useRouter();
  const { productId } = useParams();

  const handleBackClick = () => {
    router.back(); // Navigate to the previous page
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const {
          data: { product },
        } = await api.products.getOne(productId);
        setProduct(product);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <section className="max-w-4xl mx-auto p-6 animate-pulse">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-96 bg-gray-300 rounded-lg"></div>
          <div>
            <div className="h-8 w-2/3 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 w-32 bg-gray-300 rounded mt-4"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!product) return <p className="text-center py-10">Product not found</p>;

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const isInCart = ({ productId }) => {
    return items.find((item) => item.productId === productId);
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      title: product.title,
      price: product.price,
    });
  };

  const handleDecrement = () => {
    removeFromCart({ productId: product._id });
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <button onClick={handleBackClick} className="text-gray-600">
          <ArrowLeft size={24} /> {/* Only the back icon */}
        </button>
        <CartDisplay />
      </div>
      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {/* Image Carousel Section */}
        <div className="relative w-full h-auto flex flex-col justify-center">
          <Carousel className="relative h-full">
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full h-96">
                    <Image
                      src={image.s3Location}
                      alt={`Handbag ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white" />
            <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white" />
          </Carousel>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            {product.title}
          </h1>
          <p className="text-gray-600 mt-2">{product.shortDescription}</p>
          <p className="text-xl font-semibold text-gray-500 line-through">
            ₹{product.originalPrice}
          </p>
          <p className="text-2xl font-bold text-green-600">
            ₹{product.price}{" "}
            <span className="text-sm font-medium text-red-500">
              ({discountPercentage}% off)
            </span>
          </p>
          {/* Specifications */}
          <ul className="mt-4 space-y-2 text-gray-700 text-sm">
            <li>
              <span className="font-semibold">Material:</span>{" "}
              {product.material}
            </li>
            <li>
              <span className="font-semibold">Size:</span> {product.dimensions}
            </li>
            <li>
              <span className="font-semibold">Embroidery Type:</span>{" "}
              {product.embroideryType}
            </li>
            <li>
              <span className="font-semibold">Closure:</span>{" "}
              {product.closureType}
            </li>
            <li>
              <span className="font-semibold">Pockets:</span> {product.pockets}
            </li>
          </ul>

          <div className="mt-4">
            {" "}
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
                className="mt-2 bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded w-full"
              >
                Select
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
