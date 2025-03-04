"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "./InputField";
import { useCart } from "@/contexts/CartContext";
import handleError from "@/utils/handleError";
import api from "@/lib/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Full Name is required")
    .min(2, "Name must be at least 2 characters"),
  mobile: Yup.string()
    .required("Mobile Number is required")
    .matches(/^[0-9]{10}$/, "Mobile Number must be exactly 10 digits"),
  address: Yup.string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters"),
  notes: Yup.string(),
});

const ShippingInformation = () => {
  const { items, clearCart } = useCart();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      address: "",
      notes: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await api.enquiries.create({
          cart: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          customerDetails: {
            fullName: values.name,
            mobile: values.mobile,
            address: values.address,
            notes: values.notes,
          },
        });
        toast.success(
          "We have received your enquiry. Our team will contact you soon."
        );
        clearCart();
        formik.resetForm();
        router.replace("/");
      } catch (error) {
        handleError(error);
      }
    },
  });

  return (
    <div className="mt-8 pb-20">
      {" "}
      {/* Added padding-bottom to prevent content cutoff */}
      <h3 className="text-xl font-medium text-gray-700">
        Shipping Information
      </h3>
      <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
        <InputField
          label="Full Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
        />
        <InputField
          label="Mobile Number"
          name="mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.mobile && formik.errors.mobile}
          mobile
        />
        <InputField
          label="Address"
          name="address"
          type="textarea"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && formik.errors.address}
          rows={4}
        />
        <InputField
          label="Any Special Instructions?"
          name="notes"
          type="textarea"
          value={formik.values.notes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={4}
        />
      </form>
      {/* Sticky Button */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md border-t">
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200"
          onClick={formik.handleSubmit}
        >
          Send Enquiry
        </button>
      </div>
    </div>
  );
};

export default ShippingInformation;
