"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // Import the ArrowLeft icon from lucide-react
import CartSummary from "@/components/checkout/CartSummary";
import ShippingInformation from "@/components/checkout/ShippingInformation";

const Checkout = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back(); // Navigate to the previous page
  };

  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          {/* Back Button */}
          <button onClick={handleBackClick} className="text-gray-600">
            <ArrowLeft size={24} /> {/* Only the back icon */}
          </button>
          {/* Centered Heading */}
          <h2 className="text-3xl font-semibold text-gray-800 mx-auto">
            Summary
          </h2>
        </div>
        <CartSummary />
        <ShippingInformation />
      </div>
    </section>
  );
};

export default Checkout;
