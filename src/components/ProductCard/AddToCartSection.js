import { useCart } from "@/contexts/CartContext";

const AddToCartSection = ({ product }) => {
  const { items, addToCart, removeFromCart } = useCart();
  const cartItem = items.find((item) => item.productId === product._id);
  return (
    <>
      {cartItem ? (
        <div className="mt-3 flex items-center space-x-3">
          <button
            onClick={() => removeFromCart({ productId: product._id })}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            -
          </button>
          <span className="text-lg font-semibold">{cartItem.quantity}</span>
          <button
            onClick={() =>
              addToCart({
                productId: product._id,
                title: product.title,
                price: product.price,
              })
            }
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() =>
            addToCart({
              productId: product._id,
              title: product.title,
              price: product.price,
            })
          }
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Add to Cart
        </button>
      )}
    </>
  );
};

export default AddToCartSection;
