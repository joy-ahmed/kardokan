import {
  RiFacebookLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiTwitterLine,
} from "@remixicon/react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Company</h2>
          <p className="text-gray-400">
            We are a leading e-commerce platform providing a wide range of
            products to meet your needs.
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Useful Links</h2>
          <ul>
            <li className="mb-1">
              <a href="/" className="text-gray-400 hover:text-white">
                Home
              </a>
            </li>
            <li className="mb-1">
              <a href="/about" className="text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
            <li className="mb-1">
              <a href="/contact" className="text-gray-400 hover:text-white">
                Contact Us
              </a>
            </li>
            <li className="mb-1">
              <a href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-white"
            >
              <RiFacebookLine size={20} />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-white"
            >
              <RiTwitterLine size={20} />
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-400 hover:text-white"
            >
              <RiInstagramLine size={20} />
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-400 hover:text-white"
            >
              <RiLinkedinLine size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
        &copy; {new Date().getFullYear()} Company Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
