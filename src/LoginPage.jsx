import React from 'react';
import { withFormik } from 'formik';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link, Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import Input from './Input';
import axios from 'axios';
import withUser from './withUser';
import withAlert from './withAlert';

function callLoginApi(values, bag) {
  axios.post("https://myeasykart.codeyogi.io/login", {
    email: values.email,
    password: values.password,
  }).then((response) => {
    const { user, token } = response.data;
    localStorage.setItem("token", token);
    bag.props.setUser(user);
    bag.props.setAlert({ type: "success", message: "Login Successfull" });
  }).catch(() => {
     bag.props.setAlert({type:"error",
      message:"Invalid email or password"
     });
  });
}

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

function LoginPage({ handleSubmit, values, handleBlur, handleChange }) {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900">
      <div className="text-white mb-8 text-9xl flex gap-2">
        <Link className="text-8xl hover:bg-white hover:rounded-3xl hover:text-blue-700 p-2" to="/">
          <IoIosArrowRoundBack />
        </Link>
        <MdOutlineShoppingCartCheckout />
      </div>

      <form onSubmit={handleSubmit} className="bg-blue-900 p-6 rounded-lg w-full max-w-md">
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
        <button type="submit" className="w-full p-3 bg-white text-blue-900 rounded-lg hover:bg-gray-200 mt-4">
          LOGIN
        </button>
        <div className="mt-4">
          <Link to="/forgotPassword" className="text-white hover:underline">Forgot password?</Link>
        </div>
        <div className="mt-4 text-white">
          Don't have an account? <Link to="/SignUp" className="hover:underline">Sign up</Link>
        </div>
      </form>
    </div>
  );
}

const EnhancedLoginPage = withFormik({
  validationSchema: schema,
  mapPropsToValues: () => initialValues,
  handleSubmit: callLoginApi,
})(LoginPage);

export default withAlert(withUser(EnhancedLoginPage));
