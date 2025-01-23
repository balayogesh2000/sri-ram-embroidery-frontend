"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "./InputField"; // Import the reusable InputField component

const ShippingInformation = () => {
  // Form validation schema using Yup
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

  // Setting up Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      address: "",
      notes: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      alert("Shipping Information Submitted!");
      console.log(values);
    },
  });

  return (
    <div className="mt-8">
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

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Send Enquiry
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingInformation;
