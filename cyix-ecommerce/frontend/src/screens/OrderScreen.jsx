import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderScreen = () => {
  const [order, setOrder] = useState(null);
  const { id: orderId } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${orderId}`);
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, [orderId]);

  return order ? (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-white text-4xl font-bold tracking-tighter px-4 pb-6 pt-5">Order {order._id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <section>
            <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4">Shipping</h2>
            <p className="text-white px-4">
              <strong>Name: </strong> {order.user.name}
            </p>
            <p className="text-white px-4">
              <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p className="text-white px-4">
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <div className="p-4 mt-4 bg-green-500 text-white">Delivered on {order.deliveredAt}</div>
            ) : (
              <div className="p-4 mt-4 bg-red-500 text-white">Not Delivered</div>
            )}
          </section>
          <section>
            <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4 pt-6">Payment Method</h2>
            <p className="text-white px-4">
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <div className="p-4 mt-4 bg-green-500 text-white">Paid on {order.paidAt}</div>
            ) : (
              <div className="p-4 mt-4 bg-red-500 text-white">Not Paid</div>
            )}
          </section>
        </div>
        <div className="space-y-6">
          <section>
            <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4">Order Items</h2>
            <div className="border border-[#283039] rounded-sm p-4 space-y-4">
                {order.orderItems.map(item => (
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
                        <p className="text-white">${order.itemsPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-400">Shipping</p>
                        <p className="text-white">${order.shippingPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-400">Tax</p>
                        <p className="text-white">${order.taxPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-[#283039] pt-2 mt-2">
                        <p className="text-white">Total</p>
                        <p className="text-white">${order.totalPrice.toFixed(2)}</p>
                    </div>
                </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-white">Loading...</p>
  );
};

export default OrderScreen;
