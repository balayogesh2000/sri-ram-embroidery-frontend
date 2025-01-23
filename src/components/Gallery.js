"use client";

import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

export default function Gallery() {
  const { products, addToCart, removeFromCart } = useCart();

  const items = [
    {
      id: 1,
      name: "Handbag 1",
      image: "/images/bag1.jpg",
      type: "image",
      price: 30,
    },
    {
      id: 2,
      name: "Handbag 2",
      image: "/images/bag2.jpg",
      type: "image",
      price: 40,
    },
    {
      id: 3,
      name: "Handbag 3",
      image: "/images/bag3.jpg",
      type: "image",
      price: 50,
    },
    {
      id: 4,
      name: "Handbag 4",
      image: "/images/bag4.jpg",
      type: "image",
      price: 60,
    },
    {
      id: 5,
      name: "Handbag 5",
      image: "/images/bag5.jpg",
      type: "image",
      price: 70,
    },
    {
      id: 6,
      name: "Handbag 6",
      videoSrc: "/videos/video1.mp4",
      type: "video",
      price: 15,
    },
    {
      id: 7,
      name: "Handbag 7",
      videoSrc: "/videos/video2.mp4",
      type: "video",
      price: 25,
    },
  ];

  // Function to handle the addition of products to the cart
  const handleAddToCart = (item) => {
    addToCart(item); // Add item to the cart using CartContext
  };

  // Function to handle quantity increment
  const handleIncrement = (item) => {
    addToCart(item); // Since addToCart already handles quantity, just call it again
  };

  // Function to handle quantity decrement
  const handleDecrement = (item) => {
    removeFromCart(item.id); // Calls removeFromCart to decrement quantity
  };

  // Function to check if the item is already in the cart
  const isInCart = (itemId) => {
    return products.find((product) => product.id === itemId);
  };

  return (
    <section className="py-16 px-4" id="gallery">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative w-full h-80 rounded overflow-hidden shadow-lg"
            >
              {/* Conditionally render Image or Video */}
              {item.type === "image" ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full relative">
                  <video
                    src={item.videoSrc}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    muted
                    loop
                    playsInline
                    autoPlay
                    controls={false} // Hide controls to make it play automatically
                  />
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                {item.name}
              </div>

              {/* Price and Add to Cart Button */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                <span className="block">₹{item.price}</span>

                {/* Conditionally render Add to Cart or Quantity Adjuster */}
                {isInCart(item.id) ? (
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecrement(item)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">
                      {
                        products.find((product) => product.id === item.id)
                          .quantity
                      }
                    </span>
                    <button
                      onClick={() => handleIncrement(item)}
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
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
