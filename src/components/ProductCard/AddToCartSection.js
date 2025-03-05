import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const AddToCartSection = ({ product }) => {
  const { items, addToCart, removeFromCart } = useCart();
  const cartItem = items.find((item) => item.product._id === product._id);
  const router = useRouter();

  return (
    <div className="mt-3 h-10 flex items-center justify-between">
      {cartItem ? (
        <>
          {/* Quantity Control */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => removeFromCart(product._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 rounded-lg h-10 flex items-center justify-center"
            >
              -
            </button>
            <span className="text-base font-semibold w-6 text-center">
              {cartItem.quantity}
            </span>
            <button
              onClick={() => addToCart(product)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 rounded-lg h-10 flex items-center justify-center"
            >
              +
            </button>
          </div>

          {/* "Go to Cart" Button */}
          <button
            onClick={() => router.push("/summary")}
            className="bg-green-600 hover:bg-green-700 text-white px-3 rounded-lg h-10 flex items-center space-x-1 text-xs"
          >
            <span>Checkout</span>
            <ArrowRight size={14} />
          </button>
        </>
      ) : (
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg h-10 flex items-center justify-center"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default AddToCartSection;
