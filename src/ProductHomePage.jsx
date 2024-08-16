import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ProductList from './productlist';
import { getProductList } from './api';
import Nomatching from './Nomatching';
import Loading from './Loading';
import withUser from './withUser';
import { useSearchParams, Link } from 'react-router-dom';
 

function ProductHomePage() {
   
  const [ProductListData, setProductListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams , setSearchParams] = useSearchParams();
  let params = Object.fromEntries([...searchParams]);
  let {q, sortBy ,skip, order }= params;
  q=q||""
  sortBy=sortBy||"default"
  skip=+skip||0
  order= order|| 'asc'
  useEffect(() => {
    getProductList({ q, sortBy, skip, order }).then((body) => {
      setProductListData(body);
      setLoading(false);
    });
    console.log("useEffect is running..");
  }, [sortBy, skip, q, order]);


  function handleChange(event) {
    setSearchParams(
    {...params , q:event.target.value, skip:0},
    {replace : false}
    );
  };

   
  function handleSortChange(event) {
    if(event.target.value =='priceHighToLow'){
      setSearchParams(
        {...params 
        , sortBy:"price",
        order : "desc"},
        {replace : false}
        );
    }
    else if(event.target.value =='price'){
      setSearchParams(
      {...params , sortBy:"price",  order : "asc"},
      {replace : false}
      );
    }
    else if(event.target.value=='title'){
      setSearchParams(
        {...params , sortBy:"title",  order : "asc"},
        {replace : false}
        );
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="max-w-5xl mx-auto bg-white px-9 py-[50px] my-16 shadow-lg">
        <div className="flex flex-wrap gap-2 mb-5">
          <input
            className="border-2 border-gray-500 rounded-md"
            type="text"
            onChange={handleChange}
            placeholder="Search"
          />
          <select
            onChange={handleSortChange}
            className="border border-gray-700  rounded-md"
          
          >
            <option value="default">Default sort</option>
            <option value="title">Sort by name</option>
            <option value="price">Sort by price: low to high</option>
            <option value="priceHighToLow">Sort by price: high to low</option>
          </select>
        </div>
        
        {ProductListData.products.length > 0 ? (
          <ProductList products={ProductListData.products} />
        ) : (
          <Nomatching />
        )}
        <div className='my-10'></div>
        {
          ProductListData.total>0 &&  ProductListData.limit && [...Array(Math.floor(ProductListData.total/ProductListData.limit)).keys()].map((item)=>{
           return <Link
            className={'px-2  py-1 border border-primary-dark hover:bg-primary-default hover:text-white mr-2 '+ ( skip === item*30 ? " bg-primary-default": " bg=white")}
             key={item}
             to={"?"+new URLSearchParams({...params , skip:item*30})}
            >{item+1}</Link>
          })
        }
      
      </div>
    </div>
  );
}

export default withUser( ProductHomePage);