import React from 'react';
import Product from './Product';

function ProductList({ products }) {
  return (
    <div className="sm:grid grid-cols-3 sm:gap-2 space-y-2 mx-auto  ">
      {
        products.map(function(item) {
          return <Product key={item.id} {...item}></Product>
        })
      }
    </div>
  );
}

export default ProductList;
