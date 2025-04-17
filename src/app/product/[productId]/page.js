"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
import CartDisplay from "@/components/CartDisplay";
import AddToCartSection from "@/components/ProductCard/AddToCartSection";

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
                  <div className="relative w-full h-[32rem]">
                    <Image
                      src={image.s3Location}
                      alt={`Handbag ${index + 1}`}
                      layout="fill"
                      objectFit="contain"
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
          <AddToCartSection product={product} />
        </div>
      </div>
    </section>
  );
}
