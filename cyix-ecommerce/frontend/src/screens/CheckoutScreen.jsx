import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext.jsx';

const CheckoutScreen = () => {
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    try {
      const { data } = await axios.post('/api/orders', {
        orderItems: cart,
        shippingAddress,
        paymentMethod: 'PayPal', // Hardcoded for now
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      dispatch({ type: 'CLEAR_CART' });
      navigate(`/order/${data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
      setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-white text-4xl font-bold tracking-tighter px-4 pb-6 pt-5">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <section>
            <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4">Shipping Information</h2>
            <div className="space-y-4 px-4">
              <label className="block">
                <p className="text-white text-sm font-medium leading-normal pb-2">Full Name</p>
                <input className="form-input w-full rounded-sm border border-[#3b4754] bg-[#1a1a1a] text-white placeholder:text-gray-500 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]" placeholder="Liam Carter" type="text" name="name" onChange={onChange} />
              </label>
              <label className="block">
                <p className="text-white text-sm font-medium leading-normal pb-2">Address</p>
                <input className="form-input w-full rounded-sm border border-[#3b4754] bg-[#1a1a1a] text-white placeholder:text-gray-500 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]" placeholder="123 Elm Street" type="text" name="address" onChange={onChange} />
              </label>
              <label className="block">
                <p className="text-white text-sm font-medium leading-normal pb-2">City</p>
                <input className="form-input w-full rounded-sm border border-[#3b4754] bg-[#1a1a1a] text-white placeholder:text-gray-500 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]" placeholder="Metropolis" type="text" name="city" onChange={onChange} />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <p className="text-white text-sm font-medium leading-normal pb-2">State</p>
                  <input className="form-input w-full rounded-sm border border-[#3b4754] bg-[#1a1a1a] text-white placeholder:text-gray-500 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]" placeholder="CA" type="text" name="state" onChange={onChange} />
                </label>
                <label className="block">
                  <p className="text-white text-sm font-medium leading-normal pb-2">Zip Code</p>
                  <input className="form-input w-full rounded-sm border border-[#3b4754] bg-[#1a1a1a] text-white placeholder:text-gray-500 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]" placeholder="90210" type="text" name="postalCode" onChange={onChange} />
                </label>
              </div>
              <label className="block">
                <p className="text-white text-sm font-medium leading-normal pb-2">Country</p>
                <input className="form-input w-full rounded-sm border border-[#3b4754] bg-[#1a1a1a] text-white placeholder:text-gray-500 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]" placeholder="United States" type="text" name="country" onChange={onChange} />
              </label>
            </div>
          </section>
          <section>
            <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4 pt-6">Payment Details</h2>
            <div className="space-y-4 px-4">
                <label className="block">
                    <p className="text-white text-sm font-medium leading-normal pb-2">Card Number</p>
                    <input className="form-input w-full rounded-sm border border-[#3b4754] bg-[#1a1a1a] text-white placeholder:text-gray-500 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]" placeholder="1234 5678 9012 3456" type="text" />
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                        <p className="text-white text-sm font-medium leading-normal pb-2">Expiry Date</p>
                        <input className="form-input w-full rounded-sm border border-[#3b4754] bg-[#1a1a1a] text-white placeholder:text-gray-500 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]" placeholder="MM/YY" type="text" />
                    </label>
                    <label className="block">
                        <p className="text-white text-sm font-medium leading-normal pb-2">CVV</p>
                        <input className="form-input w-full rounded-sm border border-[#3b4754] bg-[#1a1a1a] text-white placeholder:text-gray-500 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]" placeholder="123" type="text" />
                    </label>
                </div>
            </div>
          </section>
        </div>
        <div className="space-y-6">
          <section>
            <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4">Order Summary</h2>
            <div className="border border-[#283039] rounded-sm p-4 space-y-4">
                {cart.map(item => (
                    <div key={item._id} className="flex items-center gap-4">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-sm size-16" style={{backgroundImage: `url(${item.image})`}}></div>
                        <div className="flex-1">
                            <p className="text-white text-base font-medium leading-normal">{item.name}</p>
                            <p className="text-gray-400 text-sm">Qty: {item.qty}</p>
                        </div>
                        <p className="text-white font-medium">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                ))}
                <div className="border-t border-[#283039] pt-4 space-y-2">
                    <div className="flex justify-between">
                        <p className="text-gray-400">Subtotal</p>
                        <p className="text-white">${itemsPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-400">Shipping</p>
                        <p className="text-white">${shippingPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-400">Tax</p>
                        <p className="text-white">${taxPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-[#283039] pt-2 mt-2">
                        <p className="text-white">Total</p>
                        <p className="text-white">${totalPrice.toFixed(2)}</p>
                    </div>
                </div>
            </div>
          </section>
          <div className="px-4 py-3">
            <button onClick={placeOrderHandler} className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm h-12 px-5 bg-[var(--primary-color)] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[var(--primary-color)]/90 transition-colors">
              <span className="truncate">Place Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
