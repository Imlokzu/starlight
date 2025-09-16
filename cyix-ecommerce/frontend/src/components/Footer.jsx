import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-neutral-800 text-neutral-400 py-12 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Shop</h4>
          <ul>
            <li className="mb-2">
              <Link className="hover:text-white transition-colors" to="/products">
                Gaming PCs
              </Link>
            </li>
            <li className="mb-2">
              <Link className="hover:text-white transition-colors" to="/products">
                Components
              </Link>
            </li>
            <li className="mb-2">
              <Link className="hover:text-white transition-colors" to="/products">
                Peripherals
              </Link>
            </li>
            <li className="mb-2">
              <Link className="hover:text-white transition-colors" to="/products">
                Accessories
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Support</h4>
          <ul>
            <li className="mb-2">
              <Link className="hover:text-white transition-colors" to="/support">
                Contact Us
              </Link>
            </li>
            <li className="mb-2">
              <Link className="hover:text-white transition-colors" to="/faq">
                FAQ
              </Link>
            </li>
            <li className="mb-2">
              <Link className="hover:text-white transition-colors" to="/warranty">
                Warranty
              </Link>
            </li>
            <li className="mb-2">
              <Link className="hover:text-white transition-colors" to="/shipping">
                Shipping
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Company</h4>
          <ul>
            <li className="mb-2">
              <Link className="hover:text-white transition-colors" to="/about">
                About Us
              </Link>
            </li>
            <li className="mb-2">
              <Link className="hover:text-white transition-colors" to="/careers">
                Careers
              </Link>
            </li>
            <li className="mb-2">
              <Link className="hover:text-white transition-colors" to="/blog">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            {/* Social media icons */}
          </div>
        </div>
      </div>
      <div className="mt-12 text-center text-sm border-t border-neutral-800 pt-8">
        <p>© {new Date().getFullYear()} Cyix. All Rights Reserved. Built for the bold.</p>
      </div>
    </footer>
  );
};

export default Footer;
