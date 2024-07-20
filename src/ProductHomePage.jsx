import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ProductList from './productlist';
import Box from './box';
import { getProductList } from './api';
import Nomatching from './Nomatching';
import Loading from './Loading';

function ProductHomePage() {
  const [ProductListData, setProductListData] = useState([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProductList();
      setProductListData(products);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredAndSortedData = useMemo(() => {
    let data = ProductListData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

    if (sort === 'priceLow') {
      data.sort((a, b) => a.price - b.price);
    } else if (sort === 'name') {
      data.sort((a, b) => (a.title < b.title ? -1 : 1));
    } else if (sort === 'priceHigh') {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [ProductListData, query, sort]);

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
            className="border border-gray-700 rounded rounded-md"
            value={sort}
          >
            <option value="default">Default sort</option>
            <option value="name">Sort by name</option>
            <option value="priceLow">Sort by price: low to high</option>
            <option value="priceHigh">Sort by price: high to low</option>
          </select>
        </div>

        {filteredAndSortedData.length > 0 ? (
          <ProductList products={filteredAndSortedData} />
        ) : (
          <Nomatching />
        )}
        <Box />
      </div>
    </div>
  );
}

export default ProductHomePage;
