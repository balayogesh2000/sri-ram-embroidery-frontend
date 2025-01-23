"use client";

import { useCart } from "@/contexts/CartContext";

const CartSummary = () => {
  const { products, total, removeFromCart, addToCart } = useCart();

  const handleIncreaseQuantity = (itemId) => {
    addToCart({ id: itemId }); // Add one more quantity
  };

  const handleDecreaseQuantity = (itemId) => {
    removeFromCart(itemId); // Remove one quantity
  };

  return (
    <div className="mt-8">
      <ul className="mt-4">
        {products.map((item) => (
          <li key={item.id} className="flex justify-between items-center py-2">
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            <div className="flex items-center space-x-2">
              <button
                className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center text-gray-600 hover:bg-gray-300 transition duration-200"
                onClick={() => handleDecreaseQuantity(item.id)} // Decrease quantity
              >
                <span className="text-lg font-semibold">-</span>
              </button>
              <span className="text-lg font-medium">{item.quantity}</span>{" "}
              {/* Display current quantity */}
              <button
                className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center text-gray-600 hover:bg-gray-300 transition duration-200"
                onClick={() => handleIncreaseQuantity(item.id)} // Increase quantity
              >
                <span className="text-lg font-semibold">+</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between items-center">
        <span className="font-medium">Total</span>
        <span className="font-semibold text-xl">₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;
