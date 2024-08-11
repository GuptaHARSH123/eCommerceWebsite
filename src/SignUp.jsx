import React from "react";
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Input from "./Input";
import withAlert from "./withAlert";
import withUser from "./withUser";
import axios from 'axios';

function callSignUpApi(values, bag) {
  axios.post("https://myeasykart.codeyogi.io/signup", {
    email: values.email,
    password: values.password,
    fullName: values.name,
  }).then((response) => {
    const { user, token } = response.data;
    localStorage.setItem("token", token);
    bag.props.setUser(user);
    bag.props.setAlert({ type: "success", message: "Sign Up Successful" });
  }).catch(() => {
    bag.props.setAlert({ type: "error", message: "Error during sign up" });
  });
}

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
});

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUpPage({ handleSubmit, values, handleBlur, handleChange }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900">
      <div className="text-white mb-8 text-9xl flex gap-2">
        <Link className="text-8xl hover:bg-white hover:rounded-3xl hover:text-blue-700 p-2" to="/">
          <IoIosArrowRoundBack />
        </Link>
        <MdOutlineShoppingCartCheckout />
      </div>

      <Form onSubmit={handleSubmit} className="bg-blue-900 p-6 rounded-lg w-full max-w-md">
        <Input
          type="text"
          name="name"
          placeholder="NAME"
          label="NAME"
          id="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          type="text"
          name="email"
          placeholder="EMAIL"
          label="EMAIL"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          type="password"
          name="password"
          placeholder="PASSWORD"
          label="PASSWORD"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="CONFIRM PASSWORD"
          label="CONFIRM PASSWORD"
          id="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button type="submit" className="w-full p-3 bg-white text-blue-900 rounded-lg hover:bg-gray-200 mt-4">
          SIGN UP
        </button>
        <div className="mt-4 text-white">
          Already have an account? <Link to="/login" className="hover:underline">Login</Link>
        </div>
      </Form>
    </div>
  );
}

const EnhancedSignUpPage = withFormik({
  validationSchema: schema,
  mapPropsToValues: () => initialValues,
  handleSubmit: callSignUpApi,
})(SignUpPage);

export default withAlert(withUser(EnhancedSignUpPage));
