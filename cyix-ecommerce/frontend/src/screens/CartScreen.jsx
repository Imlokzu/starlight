import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';

const CartScreen = () => {
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;

  const removeFromCartHandler = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const changeQtyHandler = (id, qty) => {
    dispatch({ type: 'CHANGE_QTY', payload: { id, qty } });
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-10 md:px-20 lg:px-40">
      <h1 className="mb-8 text-4xl font-bold tracking-tighter text-white">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-white">Your cart is empty. <Link to="/" className="text-[var(--primary-color)]">Go Shopping</Link></p>
      ) : (
        <div className="rounded-sm border-2 border-[#283039] bg-[#1a1f24]">
          <div className="hidden border-b-2 border-[#283039] p-4 text-sm font-medium uppercase text-[#9dabb9] md:grid md:grid-cols-12 md:gap-4">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Subtotal</div>
          </div>
          {cart.map(item => (
            <div key={item._id} className="grid grid-cols-12 items-center gap-4 border-b-2 border-[#283039] p-4">
              <div className="col-span-10 flex items-center gap-4 md:col-span-6">
                <div className="h-16 w-16 flex-shrink-0 rounded-sm bg-[#283039]">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-medium text-white">{item.name}</p>
                  <button onClick={() => removeFromCartHandler(item._id)} className="text-xs text-[#9dabb9] hover:text-[var(--primary-color)]">Remove</button>
                </div>
              </div>
              <div className="col-span-2 text-right text-white md:col-span-2">${item.price}</div>
              <div className="col-span-12 flex items-center justify-between md:col-span-2 md:justify-center">
                <span className="text-sm font-medium uppercase text-[#9dabb9] md:hidden">Quantity</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => changeQtyHandler(item._id, item.qty - 1)} disabled={item.qty === 1} className="flex h-8 w-8 items-center justify-center rounded-sm border-2 border-[#283039] bg-[#111418] text-white hover:bg-[#283039] disabled:opacity-50 disabled:cursor-not-allowed">-</button>
                  <span className="w-8 text-center text-white">{item.qty}</span>
                  <button onClick={() => changeQtyHandler(item._id, item.qty + 1)} disabled={item.qty === item.countInStock} className="flex h-8 w-8 items-center justify-center rounded-sm border-2 border-[#283039] bg-[#111418] text-white hover:bg-[#283039] disabled:opacity-50 disabled:cursor-not-allowed">+</button>
                </div>
              </div>
              <div className="col-span-12 text-right font-medium text-white md:col-span-2">${(item.price * item.qty).toFixed(2)}</div>
            </div>
          ))}
          <div className="mt-8 flex flex-col items-end gap-4 p-4">
            <div className="text-right">
              <p className="text-lg text-[#9dabb9]">Subtotal</p>
              <p className="text-3xl font-bold text-white">${subtotal}</p>
            </div>
            <Link to="/checkout" className="brutal-border w-full rounded-sm bg-[var(--primary-color)] py-3 px-6 text-center text-lg font-bold text-white sm:w-auto">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
