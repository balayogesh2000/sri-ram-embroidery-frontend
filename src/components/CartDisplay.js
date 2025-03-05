"use client";

import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";

export default function CartDisplay() {
  const router = useRouter();
  const { items, clearCart } = useCart();

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <ShoppingCart size={16} className="text-gray-700" />
      <span className="text-xs font-medium text-gray-700">
        {totalItems} item{totalItems > 1 ? "s" : ""} - ₹{totalPrice.toFixed(2)}
      </span>
      <button
        className="bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-md hover:bg-green-600"
        onClick={() => router.push("/summary")}
      >
        Checkout
      </button>
      <button onClick={clearCart} className="text-gray-500 hover:text-red-400">
        <X size={16} />
      </button>
    </div>
  );
}
