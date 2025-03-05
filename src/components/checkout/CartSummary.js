"use client";

import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

const CartSummary = () => {
  const { items, total, removeFromCart, addToCart } = useCart();

  const handleIncreaseQuantity = (product) => {
    addToCart(product);
  };

  const handleDecreaseQuantity = (productId) => {
    removeFromCart(productId);
  };

  return (
    <div className="mt-8 px-4">
      {items.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg font-medium text-gray-600">
            Your cart is empty!
          </p>
          <Link
            href="/#gallery"
            className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-200"
          >
            Browse Collections
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-4 space-y-4">
            {items.map((item) => (
              <li
                key={item.productId}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                {/* Title on one line */}
                <div className="text-lg font-medium truncate">
                  {item.product.title}
                </div>

                {/* Quantity controls & price on next line */}
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center space-x-3">
                    <button
                      className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center text-gray-600 hover:bg-gray-300 transition duration-200"
                      onClick={() => handleDecreaseQuantity(item.product._id)}
                    >
                      <span className="text-lg font-semibold">-</span>
                    </button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <button
                      className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center text-gray-600 hover:bg-gray-300 transition duration-200"
                      onClick={() => handleIncreaseQuantity(item.product)}
                    >
                      <span className="text-lg font-semibold">+</span>
                    </button>
                  </div>
                  <span className="text-lg font-semibold">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center text-lg font-semibold border-t pt-4">
            <span>Total</span>
            <span className="text-xl text-green-600">₹{total.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;
