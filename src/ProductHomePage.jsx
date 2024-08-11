import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ProductList from './productlist';
import Box from './box';
import { getProductList } from './api';
import Nomatching from './Nomatching';
import Loading from './Loading';
import withUser from './withUser';
import { useSearchParams, Link } from 'react-router-dom';
 

function ProductHomePage() {
   
  const [ProductListData, setProductListData] = useState([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState();
  const [pageNo , setPageNo]=useState();
  const [loading, setLoading] = useState(true);
  let [searchParams , setSearchParams] = useSearchParams();
  let skip= +searchParams.get("skip")|| 0;
  console.log("skip" , skip);
  

  useEffect(() => { 
    getProductList({sort , query,pageNo}).then((body)=>{
      setProductListData(body);
      setLoading(false);
     })
     console.log("useEffect is runnig..");
     
    
  }, [query,sort,pageNo,skip]);


  const handleChange = useCallback((event) => {
    setQuery(event.target.value);
  }, []);

   
  const handleSortChange = useCallback((event) => {
    setSort(event.target.value);
  }, []);

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
            value={sort}
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
        {
          ProductListData.total>0 &&  ProductListData.limit && [...Array(Math.floor(ProductListData.total/ProductListData.limit)).keys()].map((item)=>{
           return <button
            className={'px-2 py-1 border border-primary-dark hover:bg-primary-default hover:text-white mr-2 mt-5'+ ( skip === item*30 ? " bg-primary-default": " bg=white")}
            onClick={()=>{
              setSearchParams({skip:item*30});
              setPageNo(item*30);
            }}
            >{item+1}</button>
          })
        }
      
      </div>
    </div>
  );
}

export default withUser( ProductHomePage);