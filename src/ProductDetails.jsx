import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsDetails } from './api';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import Loading from './Loading';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import Notfound from './Notfound';

function ProductDetails({ onAddToCart }) {
  const params = useParams();
  const id = +params.id;
  console.log(id);

  const [ProductDetailsData, setProductDetailsData] = useState();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const p = getProductsDetails(id);
    p.then((response) => {
      setProductDetailsData(response);
      console.log(response.data);
      setLoading(false);
    }).catch(() => {
      console.log("data is not found");
      setLoading(false);
    });
    setCount(1);
  }, [id]);

  const handleCountChange = useCallback((event) => {
    setCount(+event.target.value);
  }, []);

  const handleButtonClick = useCallback(() => {
    onAddToCart(id, count);
  }, [onAddToCart, id, count]);

  if (loading) {
    return <Loading />;
  } else if (!ProductDetailsData) {
    return <Notfound />;
  }

  return (
    <div className="max-w-5xl mx-auto bg-white my-12">
      <div className="flex items-center gap-4">
        <Link className="text-6xl font-black" to="/">
          <IoIosArrowRoundBack />
        </Link>
        <span>Back</span>
      </div>
      <div className="mx-5 shadow-lg rounded-md">
        <div className="flex gap-5 p-4">
          <div className="w-2/5 md:w-1/5">
            <img
              className="h-full w-full object-cover"
              src={ProductDetailsData.thumbnail}
              alt={ProductDetailsData.title}
            />
          </div>
          <div className="w-3/5 text-gray-700 flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">
              {ProductDetailsData.title}
            </h1>
            <p className="text-xl font-bold">
              {ProductDetailsData.price}
            </p>
            <p>
              {ProductDetailsData.description}
            </p>
            <div className="flex gap-8">
              <input
                value={count}
                onChange={handleCountChange}
                type="number"
                min="1"
                className="w-12 pt-1 pb-1 text-center text-xl rounded-md border-2 border-gray-200"
              />
              <button
                onClick={handleButtonClick}
                className="px-6 py-2 rounded-md bg-primary-default hover:bg-primary-dark text-white">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between px-5">
        <div>
          {id > 1 && (
            <Link className="text-2xl flex items-center" to={"/ProductDetails/" + (id - 1)}>
              <GrLinkPrevious /> Previous
            </Link>
          )}
        </div>
        <div>
          <Link className="text-2xl flex items-center" to={"/ProductDetails/" + (id + 1)}>
            <GrLinkNext /> Next
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
