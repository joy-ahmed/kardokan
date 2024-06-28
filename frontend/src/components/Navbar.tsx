import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { RiCloseLine, RiMenuLine, RiShoppingCart2Line, RiUser2Line } from '@remixicon/react';

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <div>
              <Link to="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                <svg className="h-6 w-6 mr-1 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2-2-2M21 12l-2-2 2-2M3 12h18" />
                </svg>
                <span className="font-bold">Brand</span>
              </Link>
            </div>

            {/* Primary Nav */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</Link>
              <Link to="/shop" className="py-5 px-3 text-gray-700 hover:text-gray-900">Shop</Link>
              <Link to="/about" className="py-5 px-3 text-gray-700 hover:text-gray-900">About</Link>
              <Link to="/contact" className="py-5 px-3 text-gray-700 hover:text-gray-900">Contact</Link>
            </div>
          </div>

          {/* Secondary Nav */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/cart" className="py-5 px-3 text-gray-700 hover:text-gray-900">
              <RiShoppingCart2Line className="h-5 w-5" />
            </Link>
            <Link to="/login" className="py-5 px-3 text-gray-700 hover:text-gray-900">
              <RiUser2Line className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="mobile-menu-button">
              {isOpen ? <RiCloseLine className="h-6 w-6" /> : <RiMenuLine className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <Link to="/" className="block py-2 px-4 text-sm hover:bg-gray-200">Home</Link>
        <Link to="/shop" className="block py-2 px-4 text-sm hover:bg-gray-200">Shop</Link>
        <Link to="/about" className="block py-2 px-4 text-sm hover:bg-gray-200">About</Link>
        <Link to="/contact" className="block py-2 px-4 text-sm hover:bg-gray-200">Contact</Link>
        <Link to="/cart" className="block py-2 px-4 text-sm hover:bg-gray-200">Cart</Link>
        <Link to="/login" className="block py-2 px-4 text-sm hover:bg-gray-200">Login</Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
