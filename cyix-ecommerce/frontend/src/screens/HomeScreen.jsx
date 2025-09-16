import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import { motion } from 'framer-motion';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section
        className="relative flex min-h-[60vh] md:min-h-screen items-end justify-start bg-cover bg-center bg-no-repeat p-8 md:p-16"
        style={{
          backgroundImage:
            'linear-gradient(to top, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAuIvjupn8LwlFYvYMFKR7bFN2VvmCQZCvzYlNl2PoSuN6WZ7qReGdnNuDLv4nVttFDLHTdrJ5566M_APH8Off7tKxSXOAw7NzFvLN0NtFuwSDJwjDt72mpbbUGTtdTKEi0vpn6qGAV4gDK9o8Mg0kzMWeh04k3D27rL4Bf6B_kqf5akU20q-obggzfjsP9aLOC_ZjCLMbAzYj1yaHT1bWkoLA8Bk6q6-HCeMtv_-L2NhDg785kvWO_xi1WE_x6ZywhNLc_gX30KEU8")',
        }}
      >
        <div className="max-w-2xl text-left text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
          >
            Unleash Brutal Power
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 max-w-lg text-base text-neutral-300"
          >
            Experience the apex of gaming performance. Our rigs are engineered
            for dominance, crafted for the unconquerable.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-sm h-12 px-6 bg-[var(--primary-color)] text-white text-base font-bold tracking-wider hover:bg-sky-600 transition-colors"
          >
            <span className="truncate">EXPLORE BUILDS</span>
          </motion.button>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-16 md:py-24 px-8 md:px-16"
      >
        <div className="flex justify-between items-center mb-12">
          <h3 className="text-white text-5xl md:text-6xl tracking-tighter">
            Featured Rigs
          </h3>
          {/* ... */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default HomeScreen;
