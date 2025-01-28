import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const CategoryProducts = () => {
  const [searchParams] = useSearchParams();
  const categoryID = searchParams.get('categoryID'); 


  const sampleProducts = [
    { id: 1, name: 'Product 1', category: categoryID },
    { id: 2, name: 'Product 2', category: categoryID },
  ];

  return (
    <div>
      <h1>Products in Category: {categoryID}</h1>
      <ul>
        {sampleProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};
