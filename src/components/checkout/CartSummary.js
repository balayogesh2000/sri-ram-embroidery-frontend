"use client";

import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartSummary = () => {
  const router = useRouter();

  const { items, total, removeFromCart, addToCart } = useCart();

  const handleIncreaseQuantity = (product) => {
    addToCart(product);
  };

  const handleDecreaseQuantity = (productId) => {
    removeFromCart(productId);
  };

  return (
    <div className="mt-6 px-3">
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-base text-gray-600">Your cart is empty!</p>
          <Link
            href="/#gallery"
            className="mt-3 inline-block bg-green-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-green-700 transition duration-200"
          >
            Browse Collections
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-3 space-y-3">
            {items.map((item) => (
              <li key={item.productId} className="flex items-center space-x-3">
                {/* Product Image */}
                {item.product.images.length > 0 && (
                  <div className="w-12 h-12 sm:w-16 sm:h-16 relative flex-shrink-0">
                    <Image
                      src={item.product.images[0].s3Location}
                      alt={item.product.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md cursor-pointer"
                      onClick={() =>
                        router.push(`/product/${item.product._id}`)
                      }
                    />
                  </div>
                )}

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.product._id}`}>
                    <span className="block text-xs sm:text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                      {item.product.title}
                    </span>
                  </Link>

                  {/* Quantity controls & price */}
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center space-x-2">
                      <button
                        className="w-6 h-6 bg-gray-200 rounded-full flex justify-center items-center text-gray-600 hover:bg-gray-300 transition duration-200"
                        onClick={() => handleDecreaseQuantity(item.product._id)}
                      >
                        <span className="text-xs font-semibold">-</span>
                      </button>
                      <span className="text-xs sm:text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        className="w-6 h-6 bg-gray-200 rounded-full flex justify-center items-center text-gray-600 hover:bg-gray-300 transition duration-200"
                        onClick={() => handleIncreaseQuantity(item.product)}
                      >
                        <span className="text-xs font-semibold">+</span>
                      </button>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between items-center text-sm sm:text-base font-semibold border-t pt-2">
            <span>Total</span>
            <span className="text-sm sm:text-lg text-green-600">
              ₹{total.toFixed(2)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;
