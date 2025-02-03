"use client";

import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

export default function CartPopup() {
  const router = useRouter();
  const { items, clearCart } = useCart();

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-white shadow-md border border-gray-200 rounded-md p-4 w-56 z-50">
      <h4 className="text-base font-medium text-gray-800 mb-2">Summary</h4>

      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-600">
          {totalItems} item{totalItems > 1 ? "s" : ""}
        </span>
        <span className="text-sm font-semibold text-gray-900">
          ₹{totalPrice.toFixed(2)}
        </span>
      </div>

      <button
        className="w-full bg-green-500 hover:bg-green-600 text-white py-1.5 px-3 rounded-md text-sm font-medium mb-3"
        onClick={() => router.push("/summary")}
      >
        Review
      </button>

      <button
        className="text-red-500 text-xs underline hover:text-red-600"
        onClick={clearCart}
      >
        Clear Selection
      </button>
    </div>
  );
}
