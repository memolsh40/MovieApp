import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const productID = searchParams.get('productID'); 


  const sampleProducts = [
    { id: 1, name: 'Product 1', category: productID },
    { id: 2, name: 'Product 2', category: productID },
  ];

  return (
    <div>
      <h1>Products in Category: {productID}</h1>
      <ul>
        {sampleProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};
