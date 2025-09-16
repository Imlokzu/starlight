import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderScreen from './screens/OrderScreen';
import AIChat from './components/AIChat.jsx';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const location = useLocation();
  return (
    <>
      <Header />
      <main className="pt-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/checkout" element={<CheckoutScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <AIChat />
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
