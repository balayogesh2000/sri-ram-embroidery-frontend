"use client";

import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";

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
    <div className="fixed top-0 left-0 w-full bg-green-600 text-white shadow-md px-4 py-3 z-50 flex justify-between items-center">
      {/* Left Section: Cart Icon + Summary */}
      <div className="flex items-center gap-2">
        <ShoppingCart size={20} />
        <span className="text-sm">
          {totalItems} item{totalItems > 1 ? "s" : ""}
        </span>
        <span className="text-sm font-semibold">₹{totalPrice.toFixed(2)}</span>
      </div>

      {/* Right Section: Review Button + Clear Icon */}
      <div className="flex items-center gap-3">
        <button
          className="bg-white text-green-600 hover:bg-gray-100 py-2 px-5 rounded-md text-sm font-medium"
          onClick={() => router.push("/summary")}
        >
          Review
        </button>
        <button onClick={clearCart} className="hover:text-red-300">
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
