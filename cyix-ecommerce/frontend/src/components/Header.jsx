import React from 'react';
import { Link } from 'react-router-dom';

const logo = '/assets/logo.png';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-solid border-neutral-800 px-10 py-4 bg-black/80 backdrop-blur-sm">
      <div className="flex items-center gap-3 text-white">
        <Link to="/">
          <img src={logo} alt="Cyix Logo" className="h-8" />
        </Link>
        <Link to="/">
          <h1 className="text-white text-3xl tracking-wider">Cyix</h1>
        </Link>
      </div>
      <nav className="hidden md:flex items-center gap-8">
        <Link
          className="text-neutral-400 hover:text-white transition-colors text-sm font-medium"
          to="/products"
        >
          Products
        </Link>
        <Link
          className="text-neutral-400 hover:text-white transition-colors text-sm font-medium"
          to="/builds"
        >
          Builds
        </Link>
        <Link
          className="text-neutral-400 hover:text-white transition-colors text-sm font-medium"
          to="/support"
        >
          Support
        </Link>
        <Link
          className="text-neutral-400 hover:text-white transition-colors text-sm font-medium"
          to="/about"
        >
          About
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <button className="text-white hover:bg-neutral-800 p-2 rounded-sm transition-colors">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
          </svg>
        </button>
        <button className="text-white hover:bg-neutral-800 p-2 rounded-sm transition-colors">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
