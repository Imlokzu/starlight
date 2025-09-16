import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  console.log('Rendering product:', product.name);
  return (
    <div className="group flex h-full flex-col rounded-sm overflow-hidden border border-neutral-800 hover:border-[var(--primary-color)] transition-all duration-300">
      <Link to={`/product/${product._id}`}>
        <div
          className="w-full bg-center bg-no-repeat aspect-square bg-cover"
          style={{ backgroundImage: `url(${product.image})` }}
        ></div>
      </Link>
      <div className="p-5 flex-grow flex flex-col justify-between bg-neutral-900">
        <div>
          <Link to={`/product/${product._id}`}>
            <p className="text-white text-xl font-bold">{product.name}</p>
          </Link>
          <p className="text-neutral-400 text-sm mt-1">{product.description}</p>
        </div>
        <p className="text-white text-lg font-semibold mt-4">${product.price}</p>
      </div>
    </div>
  );
};

export default Product;
