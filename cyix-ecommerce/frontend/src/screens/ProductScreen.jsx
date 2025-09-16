import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext.jsx';

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  const addToCartHandler = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty,
      },
    });
    navigate('/cart');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-[#9dabb9]">
              <a className="hover:text-white" href="#">Products</a>
              <span>/</span>
              <a className="hover:text-white" href="#">{product.category}</a>
            </div>
            <h1 className="text-4xl font-bold text-white mt-2">{product.name}</h1>
            <p className="text-[#9dabb9] mt-2">{product.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full bg-center bg-no-repeat bg-cover aspect-square rounded-sm" style={{backgroundImage: `url(${product.image})`}}></div>
            {/* Add more images here if available */}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Specifications</h2>
            {/* Add specifications here */}
          </div>
        </div>
        <div className="space-y-12">
          <div className="p-8 bg-[#1a1e24] rounded-sm">
            <p className="text-3xl font-bold text-white">${product.price}</p>
            <p className="text-sm text-green-400 mt-1">{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
            {product.countInStock > 0 && (
                <div className="flex items-center gap-2 mt-4">
                    <span className="text-white">Qty:</span>
                    <select value={qty} onChange={(e) => setQty(Number(e.target.value))} className="form-select rounded-sm border-none bg-[#283039] h-10 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--primary-color)]">
                        {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                                {x + 1}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <button onClick={addToCartHandler} disabled={product.countInStock === 0} className="mt-6 flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-sm h-12 px-5 bg-[var(--primary-color)] text-white text-base font-bold tracking-wide uppercase hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <span className="truncate">Add to Cart</span>
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>
            {/* Add reviews here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
