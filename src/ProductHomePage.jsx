import React, { useState, useEffect } from 'react';
import ProductList from './productlist';
import Box from './box';
import allData from './DummyData'
import {getProductList} from './api';
import Nomatching from './Nomatching';
import Loading from './Loading';

function ProductHomePage() {
  const[ProductListData , setProductListData]=useState([]);
  const[query ,setQuery] = useState('');
  const[sort ,setSort] = useState('default');
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    const xyz = getProductList();
    xyz.then(function(products){
        let dataArray=products;
        setProductListData(dataArray);
        console.log(dataArray)
        setLoading(false);
    });
     
  }, []);
  let data =ProductListData.filter(function(item){
    return item.title.toLowerCase().indexOf(query.toLowerCase())!=-1 
  })
  if(sort === 'priceLow'){
      data.sort(function(a,b){
      let x=+a.price;
      let y=+b.price;
      return x-y;  
    })
  }
  else if(sort === 'name'){
    data.sort(function(a,b){
      return a.title<b.title?-1:1;
    })

  }
  else if(sort === 'priceHigh'){
    data.sort(function(a,b){
      let x=+a.price;
      let y=+b.price;
      return y-x;  
    })

  }

  function handlechange(event){
    const newQuery = event.target.value;
    console.log(data);
    setQuery(newQuery); 
  }
  function handleSortChange(event){
    console.log(event.target.value);
    setSort(event.target.value);
  }
  if(loading){
    return <><Loading/></>   
  }
  

  return (

      <div>

        <div className="max-w-5xl mx-auto bg-white px-9 py-[50px] my-16 shadow-lg "> 
        <div className="flex flex-wrap gap-2 mb-5"> 
        <input className="border-2 border-gray-500 rounded-md"
          type="text" 
          onChange={handlechange}
          placeholder="Search"
          />
        <select
        onChange={handleSortChange}
        className="border border-gray-700 rounded rounded-md"
        value={sort}>
        <option value="default">Default sort</option>
        <option value="name">Sort by name</option>
        <option value="priceLow">Sort by price: low to high</option>
          <option value="priceHigh">Sort by price: high to low</option>
        </select>
         </div>

          {data.length && <ProductList products={data} />}
          {data.length===0 && <Nomatching/>}
          <Box/>
         </div>


      </div>
  );
}

export default ProductHomePage;
