import React from "react";
import { Form , Formik } from 'formik';
import * as Yup from 'yup';
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Link } from 'react-router-dom';
import Input from "./Input";

const SignUp = () => {
  function onSubmit (values) {
    console.log("Sign Up Values:", values);

  }

 const  validationSchema =  Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900">
      <div className="text-white mb-8 text-9xl">
        <MdOutlineShoppingCartCheckout />
      </div>
      <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}

      > 
      <Form className="bg-blue-900 p-6 rounded-lg w-full max-w-md">

          <Input
            type="text"
            name="name"
            placeholder="NAME"
            id="name"
            label="Name"

          />

           <Input
            type="text"
            name='email'
            placeholder="EMAIL"
            label="EMAIL"
            id="EMAIL"
            required="required"
            autoComplete="autoComplete"
          />
          <Input
            type="password"
            name='password'
            placeholder="PASSWORD"
            required="required"
            id="password"
            label="password"
            autoComplete="autoComplete"
          />

          <Input
            type="password"
            name="confirmPassword"
            placeholder="CONFIRM PASSWORD"
            required="required"
            id="confirmPassword"
            label="password"
            autoComplete="autoComplete"

          />


        <button
          type="submit"
          className="w-full p-3 bg-white text-blue-900 rounded-lg hover:bg-gray-200 mt-4"
        >
          SIGN UP
        </button>
        <div className="mt-4 text-white">
          Already have an account? <Link to="/LoginPage" className="hover:underline">
            Login
          </Link>
        </div>
      </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
