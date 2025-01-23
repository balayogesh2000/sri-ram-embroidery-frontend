import CartSummary from "@/components/checkout/CartSummary";
import SendEnquiryButton from "@/components/checkout/SendEnquiryButton";
import ShippingInformation from "@/components/checkout/ShippingInformation";

const Checkout = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Summary
        </h2>
        <CartSummary />
        <ShippingInformation />
      </div>
    </section>
  );
};

export default Checkout;
