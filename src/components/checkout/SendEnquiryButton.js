"use client";

const SendEnquiryButton = () => {
  const handlePlaceOrder = () => {
    // Here, you would trigger the order placement logic (API call, etc.)
    alert("Order Placed!");
  };

  return (
    <div className="mt-8 flex justify-end">
      <button
        onClick={handlePlaceOrder}
        className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200"
      >
        Send Enquiry
      </button>
    </div>
  );
};

export default SendEnquiryButton;
