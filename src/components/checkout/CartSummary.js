"use client";

import { useCart } from "@/contexts/CartContext";

const CartSummary = () => {
  const { items, total, removeFromCart, addToCart } = useCart();

  const handleIncreaseQuantity = ({ productId }) => {
    addToCart({ productId });
  };

  const handleDecreaseQuantity = ({ productId }) => {
    removeFromCart({ productId });
  };

  return (
    <div className="mt-8">
      <ul className="mt-4">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex justify-between items-center py-2"
          >
            <span>
              {item.title} (x{item.quantity})
            </span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            <div className="flex items-center space-x-2">
              <button
                className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center text-gray-600 hover:bg-gray-300 transition duration-200"
                onClick={() =>
                  handleDecreaseQuantity({ productId: item.productId })
                }
              >
                <span className="text-lg font-semibold">-</span>
              </button>
              <span className="text-lg font-medium">{item.quantity}</span>
              <button
                className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center text-gray-600 hover:bg-gray-300 transition duration-200"
                onClick={() =>
                  handleIncreaseQuantity({ productId: item.productId })
                }
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
