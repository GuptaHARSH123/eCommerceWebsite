import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import Input from "./Input";

function ForgotPassword() {
  const onSubmit = (values) => {
    console.log("Reset Password Values:", values);
  };

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900">
      <div className="text-white mb-8 text-9xl">
        <MdOutlineShoppingCartCheckout />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-blue-900 p-6 rounded-lg w-full max-w-md">
            <Input type="text" name="email" placeholder="EMAIL" label="EMAIL" id="email" />
            <button
              type="submit"
              className="w-full p-3 bg-white text-blue-900 rounded-lg hover:bg-gray-200"
              disabled={isSubmitting}
            >
              Reset Password
            </button>
            <div className="mt-4 text-white">
              <Link to="/LoginPage" className="hover:underline">Back to Login</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ForgotPassword;
