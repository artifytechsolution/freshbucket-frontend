"use client";
import React, { useState, useEffect, useRef } from "react";

// Header Component
const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "";
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-2 lg:space-x-3 group cursor-pointer">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <svg
                  className="w-4 h-4 lg:w-6 lg:h-6 text-white transform group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-lg lg:text-xl font-black text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                  Fresh Bucket
                </h1>
                <p className="text-xs text-green-600 font-bold leading-tight opacity-80 hidden sm:block">
                  Fresh • Fast • Quality
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a
                href="#"
                className="relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300"
              >
                Home
              </a>
              <a
                href="#"
                className="relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300"
              >
                Products
              </a>
              <a
                href="#"
                className="relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300"
              >
                Offers
              </a>
              <a
                href="#"
                className="relative text-green-600 bg-green-50 px-4 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                About Us
              </a>
              <a
                href="#"
                className="relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300"
              >
                Contact
              </a>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-1 lg:space-x-2">
              <button className="relative p-2 lg:p-3 rounded-xl hover:bg-green-50 text-gray-600 hover:text-green-600 transition-all duration-200 group">
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              <button className="relative p-2 lg:p-3 rounded-xl hover:bg-green-50 text-gray-600 hover:text-green-600 transition-all duration-200 group">
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <div className="absolute -top-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg">
                  3
                </div>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-xl hover:bg-green-50 text-gray-600 hover:text-green-600 transition-all duration-200 group"
              >
                <svg
                  className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Quick Action Bar */}
        <div className="bg-green-50 border-t border-green-100 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-3 lg:space-x-6">
                <div className="flex items-center space-x-1 text-green-600 font-medium">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Delivery in 30 mins</span>
                  <span className="sm:hidden">30 min delivery</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600 hidden sm:flex">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  <span className="hidden lg:inline">Mumbai, India</span>
                  <span className="lg:hidden">Mumbai</span>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4 text-xs text-gray-500">
                <span>Free delivery on orders ₹500+</span>
                <span className="hidden lg:inline">•</span>
                <span className="hidden lg:inline">Best prices guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleMobileMenu}
        >
          <div
            className="fixed inset-y-0 left-0 w-80 max-w-full bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-black text-xl">Fresh Bucket</h2>
                    <p className="text-white/80 text-sm">
                      Fresh • Fast • Quality
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg hover:bg-white/20 transition-all duration-200"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="p-6">
              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 font-semibold transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-all duration-200">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <span>Home</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 font-semibold transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-all duration-200">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <span>Products</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-green-600 bg-green-50 font-semibold transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-green-200 rounded-xl flex items-center justify-center group-hover:bg-green-300 transition-all duration-200">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span>About Us</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 font-semibold transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-all duration-200">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span>Contact</span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-0 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #16A34A 2px, transparent 2px), radial-gradient(circle at 75% 75%, #22C55E 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">Fresh Bucket</h3>
                <p className="text-green-400 text-sm font-bold">
                  Fresh • Fast • Quality
                </p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Your trusted partner for fresh, organic groceries delivered with
              care. Making healthy eating convenient and accessible for
              everyone.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-12 h-12 bg-gray-800 hover:bg-green-600 rounded-xl flex items-center justify-center transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-800 hover:bg-green-600 rounded-xl flex items-center justify-center transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-black text-white mb-4">Quick Links</h4>
            <nav className="space-y-3">
              <a
                href="#"
                className="block text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium"
              >
                Products
              </a>
              <a
                href="#"
                className="block text-green-400 transition-colors duration-200 font-medium"
              >
                About Us
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xl font-black text-white mb-4">Categories</h4>
            <nav className="space-y-3">
              <a
                href="#"
                className="block text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium"
              >
                Fresh Fruits
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium"
              >
                Vegetables
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium"
              >
                Dairy & Eggs
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium"
              >
                Meat & Seafood
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-black text-white mb-4">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-300">hello@freshbucket.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 lg:mb-0">
              © 2025 Fresh Bucket. All rights reserved. Made with ❤️ for healthy
              living.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main About Page Component
const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const sectionsRef = useRef([]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      name: "Rajesh Kumar",
      position: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "15+ years in organic farming and sustainable agriculture. Leading Fresh Bucket's mission to transform grocery shopping.",
      expertise: ["Leadership", "Agriculture", "Strategy"],
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Priya Sharma",
      position: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b1a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Supply chain expert ensuring quality and freshness from farm to doorstep with 12+ years experience.",
      expertise: ["Operations", "Logistics", "Quality"],
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Amit Patel",
      position: "Head of Technology",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Tech innovator building seamless digital experiences for modern grocery shopping with cutting-edge solutions.",
      expertise: ["Technology", "Innovation", "Development"],
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Sneha Gupta",
      position: "Quality Manager",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Quality control specialist ensuring every product meets our premium standards before reaching customers.",
      expertise: ["Quality Control", "Standards", "Testing"],
      linkedin: "#",
      twitter: "#",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: "👥" },
    { number: "2K+", label: "Fresh Products", icon: "🛒" },
    { number: "500+", label: "Partner Farms", icon: "🚜" },
    { number: "24/7", label: "Customer Support", icon: "🤝" },
  ];

  const testimonials = [
    {
      name: "Meera Singh",
      location: "Ahmedabad, Gujarat",
      rating: 5,
      text: "Fresh Bucket has completely transformed how I shop for groceries. The quality is exceptional and delivery is always on time!",
      avatar:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      orders: "200+",
    },
    {
      name: "Vikram Joshi",
      location: "Mumbai, Maharashtra",
      rating: 5,
      text: "Amazing organic produce! My family loves the freshness and quality. The mobile app makes ordering so convenient.",
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      orders: "150+",
    },
    {
      name: "Kavita Reddy",
      location: "Bangalore, Karnataka",
      rating: 5,
      text: "Best grocery delivery service! The fruits and vegetables are always fresh, and customer service is outstanding.",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      orders: "300+",
    },
  ];

  const tabContent = {
    mission: {
      title: "Our Mission",
      subtitle: "Transforming Grocery Shopping",
      content:
        "To make fresh, organic, and premium quality groceries accessible to every household in India through innovative technology and sustainable farming practices.",
      points: [
        "30-minute delivery guarantee",
        "100% organic certification",
        "Support local farmers",
        "Transparent pricing",
      ],
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    vision: {
      title: "Our Vision",
      subtitle: "India's Most Trusted Platform",
      content:
        "To become India's most trusted and sustainable grocery platform, revolutionizing food distribution while promoting environmental responsibility.",
      points: [
        "Carbon-neutral delivery by 2026",
        "Supporting 10,000+ local farmers",
        "AI-powered personalized shopping",
        "Promoting healthier lifestyle choices",
      ],
      image:
        "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    values: [
      {
        title: "Sustainability",
        desc: "Eco-friendly practices and sustainable farming methods",
      },
      { title: "Quality", desc: "Rigorous quality checks for every product" },
      { title: "Trust", desc: "Transparent and honest business practices" },
      { title: "Innovation", desc: "Constantly improving our technology" },
      { title: "Customer First", desc: "Your satisfaction is our success" },
      { title: "Integrity", desc: "Ethical practices in all dealings" },
    ],
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* CSS Styles */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #1a1a1a;
        }

        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .slide-up {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .scale-in {
          animation: scaleIn 0.5s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
          from {
            opacity: 0;
            transform: translateY(20px);
          }
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
          from {
            opacity: 0;
            transform: translateY(30px);
          }
        }

        @keyframes scaleIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
          from {
            opacity: 0;
            transform: scale(0.95);
          }
        }

        .hover-lift {
          transition: all 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -8px rgba(0, 0, 0, 0.1);
        }

        .hero-gradient {
          background: linear-gradient(
            135deg,
            #16a34a 0%,
            #059669 50%,
            #047857 100%
          );
        }

        .section-padding {
          padding: 5rem 1.5rem;
        }

        @media (max-width: 768px) {
          .section-padding {
            padding: 3rem 1rem;
          }
        }
      `}</style>
      {/* Header Component */}
      <Header />
      {/* Main Content with proper spacing for fixed header */}
      <main className="pt-32">
        {/* Hero Section */}
        <section
          id="hero"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="hero-gradient text-white section-padding min-h-screen flex items-center relative overflow-hidden"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white rounded-full"></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white rounded-full"></div>
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className={`${isVisible.hero ? "fade-in" : ""}`}>
              {/* Badge */}
              <div className="inline-flex items-center px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/30">
                <span className="mr-2">🌱</span>
                India's Premier Grocery Platform
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
                Fresh Food,
                <br />
                <span className="text-green-200">Fresh Future</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-12 leading-relaxed">
                We deliver the freshest organic produce and premium quality food
                directly to your doorstep in 30 minutes.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-white text-green-600 px-10 py-4 text-lg font-bold hover:bg-green-50 transition-all duration-300 hover-lift rounded-xl">
                  Start Shopping Now
                </button>
                <button className="border-2 border-white text-white px-10 py-4 text-lg font-bold hover:bg-white hover:text-green-600 transition-all duration-300 rounded-xl">
                  Download App
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-16 text-center">
                <p className="text-green-200 text-sm mb-4">
                  Trusted by 50,000+ families across India
                </p>
                <div className="flex justify-center items-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span>4.9/5 Rating</span>
                  </div>
                  <div className="w-px h-4 bg-white/30"></div>
                  <div>30-min Delivery</div>
                  <div className="w-px h-4 bg-white/30"></div>
                  <div>100% Organic</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values Section */}
        <section
          id="about"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="section-padding bg-gray-50"
        >
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div
              className={`text-center mb-16 ${
                isVisible.about ? "fade-in" : ""
              }`}
            >
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                What Drives <span className="text-green-600">Us</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our mission, vision, and values guide everything we do
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-16">
              <div className="flex bg-white rounded-lg p-2 shadow-sm border">
                {Object.keys(tabContent)
                  .slice(0, 2)
                  .map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-3 font-semibold transition-all duration-300 rounded-md ${
                        activeTab === tab
                          ? "bg-green-600 text-white shadow-md"
                          : "text-gray-600 hover:text-green-600"
                      }`}
                    >
                      {tabContent[tab].title}
                    </button>
                  ))}
                <button
                  onClick={() => setActiveTab("values")}
                  className={`px-8 py-3 font-semibold transition-all duration-300 rounded-md ${
                    activeTab === "values"
                      ? "bg-green-600 text-white shadow-md"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  Our Values
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className={`${isVisible.about ? "slide-up" : ""}`}>
              {activeTab !== "values" ? (
                <div className="bg-white rounded-2xl p-8 md:p-16 shadow-lg">
                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                        {tabContent[activeTab].subtitle}
                      </h3>
                      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        {tabContent[activeTab].content}
                      </p>
                      <ul className="space-y-4">
                        {tabContent[activeTab].points.map((point, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-700"
                          >
                            <svg
                              className="w-5 h-5 text-green-600 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <img
                        src={tabContent[activeTab].image}
                        alt={tabContent[activeTab].title}
                        className="w-full h-96 object-cover rounded-xl shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {tabContent.values.map((value, index) => (
                    <div
                      key={index}
                      className="bg-white p-8 rounded-xl shadow-md hover-lift text-center"
                    >
                      <h4 className="text-xl font-bold text-gray-900 mb-4">
                        {value.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {value.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section
          id="stats"
          ref={(el) => (sectionsRef.current[2] = el)}
          className="section-padding bg-green-600 text-white"
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className={`${isVisible.stats ? "fade-in" : ""} mb-16`}>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Our Impact
              </h2>
              <p className="text-xl text-green-100">
                Making a difference across India
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`${isVisible.stats ? "scale-in" : ""} text-center`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-black mb-2">
                    {stat.number}
                  </div>
                  <div className="text-green-100 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section
          id="team"
          ref={(el) => (sectionsRef.current[3] = el)}
          className="section-padding bg-white"
        >
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-16 ${isVisible.team ? "fade-in" : ""}`}
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Our <span className="text-green-600">Team</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The passionate people behind Fresh Bucket
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`bg-white border border-gray-200 rounded-xl overflow-hidden hover-lift ${
                    isVisible.team ? "slide-up" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg">{member.name}</h3>
                      <p className="text-green-200 text-sm">
                        {member.position}
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4"></div>
                    <div className="flex space-x-3">
                      <a
                        href={member.linkedin}
                        className="text-gray-400 hover:text-green-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      <a
                        href={member.twitter}
                        className="text-gray-400 hover:text-green-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          ref={(el) => (sectionsRef.current[4] = el)}
          className="section-padding bg-gray-50"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className={`mb-16 ${isVisible.testimonials ? "fade-in" : ""}`}>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Customer <span className="text-green-600">Stories</span>
              </h2>
              <p className="text-xl text-gray-600">
                Real experiences from real customers
              </p>
            </div>

            <div
              className={`bg-white rounded-2xl p-8 md:p-16 shadow-lg relative ${
                isVisible.testimonials ? "scale-in" : ""
              }`}
            >
              <div className="absolute top-8 left-8">
                <svg
                  className="w-12 h-12 text-green-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
                </svg>
              </div>

              <img
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].name}
                className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-green-100"
              />

              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  )
                )}
              </div>

              <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              <div className="space-y-2">
                <div className="font-bold text-gray-900 text-lg">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-green-600 font-medium">
                  {testimonials[currentTestimonial].location}
                </div>
                <div className="text-sm text-gray-500">
                  {testimonials[currentTestimonial].orders} orders
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index
                      ? "bg-green-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section
          id="cta"
          ref={(el) => (sectionsRef.current[5] = el)}
          className="section-padding bg-gray-900 text-white text-center"
        >
          <div
            className={`max-w-3xl mx-auto ${isVisible.cta ? "fade-in" : ""}`}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8">
              Ready to Start Your
              <br />
              <span className="text-green-400">Fresh Journey?</span>
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of families who trust Fresh Bucket for their daily
              grocery needs. Experience the difference today.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-green-600 text-white px-10 py-4 text-lg font-bold hover:bg-green-700 transition-all duration-300 hover-lift rounded-xl">
                Start Shopping Now
              </button>
              <button className="border-2 border-gray-600 text-gray-300 px-10 py-4 text-lg font-bold hover:border-gray-400 hover:text-white transition-all duration-300 rounded-xl">
                Download Mobile App
              </button>
            </div>

            {/* App Availability */}
            <div className="mt-12 text-center">
              <p className="text-gray-400 text-sm mb-4">
                Available on all platforms
              </p>
              <div className="flex justify-center items-center gap-8 text-sm text-gray-400">
                <div>📱 iOS & Android</div>
                <div>⭐ 4.9/5 Rating</div>
                <div>🚚 30min Delivery</div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
      {/* Footer Component */}
    </div>
  );
};

export default AboutPage;
