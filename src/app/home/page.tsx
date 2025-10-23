"use client";
import Header from "@src/component/components/header";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const FreshMartApp = () => {
  // State management
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([
    {
      id: "strawberries",
      name: "Organic Strawberries",
      price: 2.99,
      unit: "1 lb",
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
    },
    {
      id: "avocados",
      name: "Hass Avocados",
      price: 1.79,
      unit: "each",
      quantity: 3,
      image:
        "https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
    },
  ]);
  const [searchResults, setSearchResults] = useState([]);

  // Sample products data
  const products = [
    {
      id: 1,
      name: "Organic Strawberries",
      
      price: 2.99,
      unit: "per lb",
      image:
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Fresh",
      badgeColor: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      id: 2,
      name: "Hass Avocados",
      price: 1.79,
      unit: "each",
      image:
        "https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Premium",
      badgeColor: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    },
    {
      id: 3,
      name: "Free-Range Eggs",
      price: 4.99,
      unit: "dozen",
      image:
        "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Farm Fresh",
      badgeColor: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      id: 4,
      name: "Organic Bananas",
      price: 1.49,
      unit: "2 lbs",
      image:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Organic",
      badgeColor: "bg-gradient-to-r from-yellow-500 to-yellow-600",
    },
    {
      id: 5,
      name: "Fresh Spinach",
      price: 2.49,
      unit: "5 oz bag",
      image:
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Super Fresh",
      badgeColor: "bg-gradient-to-r from-green-600 to-green-700",
    },
    {
      id: 6,
      name: "Whole Milk",
      price: 3.99,
      unit: "1 gallon",
      image:
        "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Local Farm",
      badgeColor: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
  ];

  // Functions
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm("");
    setSearchResults([]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const performSearch = (query) => {
    if (query.length > 0) {
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const searchCategory = (category) => {
    setSearchTerm(category);
    performSearch(category);
  };

  const searchTerm_func = (term) => {
    setSearchTerm(term);
    performSearch(term);
  };

  const updateQuantity = (itemId, change) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isSearchOpen) closeSearch();
        if (isMobileMenuOpen) closeMobileMenu();
        if (isCartOpen) setIsCartOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, isMobileMenuOpen, isCartOpen]);

  useEffect(() => {
    performSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div className="bg-gray-50 font-sans">
      {/* Tailwind Config */}
      <style jsx global>{`
        :root {
          --primary: #16a34a;
          --primary-dark: #15803d;
          --primary-light: #22c55e;
        }

        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95);
        }

        .product-card {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: 1px solid transparent;
        }

        .product-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px -12px rgba(22, 163, 74, 0.15);
          border-color: rgba(22, 163, 74, 0.2);
        }

        @media (max-width: 768px) {
          .product-card:hover {
            transform: translateY(-4px) scale(1.01);
          }
        }

        .gradient-green {
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
        }

        .add-to-cart-btn {
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .add-to-cart-btn:hover {
          background: linear-gradient(135deg, #15803d 0%, #16a34a 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(22, 163, 74, 0.3);
        }

        @media (max-width: 768px) {
          .add-to-cart-btn:hover {
            transform: translateY(-1px);
          }
        }

        .category-hover {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .category-hover:hover {
          transform: translateY(-8px) scale(1.05);
        }

        @media (max-width: 768px) {
          .category-hover:hover {
            transform: translateY(-4px) scale(1.02);
          }
        }

        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 50%;
          background: linear-gradient(90deg, #16a34a, #22c55e);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.4s ease-out forwards;
        }

        .animate-slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          0% {
            transform: translateY(10px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideDown {
          0% {
            transform: translateY(-10px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      {/* Enhanced Header */}
      <Header />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
          onClick={toggleMobileMenu}
        >
          <div
            className="fixed inset-y-0 left-0 w-80 max-w-full bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out"
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
                    <h2 className="font-black text-xl">FreshMart</h2>
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

              {/* User Info */}
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">J</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">John Doe</p>
                    <p className="text-white/70 text-sm">
                      john.doe@example.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="p-6">
              <div className="space-y-2">
                <a
                  href="#home"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-100 hover:text-green-600 font-semibold transition-all duration-200 group"
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
                  href="#products"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-100 hover:text-green-600 font-semibold transition-all duration-200 group"
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
                  href="#about"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-100 hover:text-green-600 font-semibold transition-all duration-200 group"
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
                        d="M19 11H5m14-4H9M7 11v8a2 2 0 002 2h6a2 2 0 002-2v-8"
                      />
                    </svg>
                  </div>
                  <span>About</span>
                </a>

                <a
                  href="#offers"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-100 hover:text-green-600 font-semibold transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-all duration-200">
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between flex-1">
                    <span>Special Offers</span>
                    <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full font-bold">
                      HOT
                    </span>
                  </div>
                </a>

                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-100 hover:text-green-600 font-semibold transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-all duration-200">
                    <svg
                      className="w-5 h-5 text-orange-600"
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
                  </div>
                  <span>Contact Us</span>
                </a>
              </div>

              {/* Mobile Menu Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200 space-y-2">
                <button
                  onClick={() => {
                    openSearch();
                    closeMobileMenu();
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5"
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
                  <span className="font-medium">Search Products</span>
                </button>

                <button
                  onClick={() => {
                    toggleCart();
                    closeMobileMenu();
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5"
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
                  <span className="font-medium">
                    View Cart ({getTotalItems()} items)
                  </span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Full Page Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 h-full overflow-y-auto">
            {/* Search Header */}
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <div className="animate-slide-down">
                <h2 className="text-2xl lg:text-4xl font-black text-gray-900 mb-2">
                  Search FreshMart
                </h2>
                <p className="text-gray-600 text-sm lg:text-base">
                  Find fresh groceries and daily essentials from 1000+ products
                </p>
              </div>
              <button
                onClick={closeSearch}
                className="p-2 lg:p-3 rounded-xl hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all duration-200 group"
              >
                <svg
                  className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200"
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

            {/* Search Input */}
            <div className="relative mb-6 lg:mb-8 animate-slide-up">
              <div className="absolute inset-y-0 left-0 pl-4 lg:pl-6 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400"
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
              </div>
              <input
                type="text"
                className="w-full pl-12 lg:pl-16 pr-16 lg:pr-20 py-4 lg:py-5 text-lg lg:text-xl border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-0 focus:border-green-600 bg-gray-50/50 shadow-sm transition-all duration-300"
                placeholder="Search for fruits, vegetables, dairy..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <div className="absolute inset-y-0 right-0 pr-4 lg:pr-6 flex items-center space-x-2">
                <kbd className="px-2 lg:px-3 py-1 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg">
                  ESC
                </kbd>
              </div>
            </div>

            {/* Quick Search Categories */}
            <div className="mb-8 lg:mb-10 animate-fade-in">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6">
                Popular Categories
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                <button
                  onClick={() => searchCategory("fruits")}
                  className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 rounded-2xl transition-all duration-300"
                >
                  <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🍎</div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
                      Fresh Fruits
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600">
                      500+ items
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => searchCategory("vegetables")}
                  className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-2xl transition-all duration-300"
                >
                  <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🥬</div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
                      Vegetables
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600">
                      400+ items
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => searchCategory("dairy")}
                  className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-2xl transition-all duration-300"
                >
                  <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🥛</div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
                      Dairy & Eggs
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600">
                      150+ items
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => searchCategory("meat")}
                  className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-2xl transition-all duration-300"
                >
                  <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🥩</div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
                      Meat & Seafood
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600">
                      200+ items
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => searchCategory("bakery")}
                  className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-2xl transition-all duration-300"
                >
                  <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🍞</div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
                      Bakery
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600">
                      100+ items
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => searchCategory("pantry")}
                  className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 rounded-2xl transition-all duration-300"
                >
                  <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🥫</div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
                      Pantry Staples
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600">
                      300+ items
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => searchCategory("snacks")}
                  className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 rounded-2xl transition-all duration-300"
                >
                  <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🍿</div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
                      Snacks
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600">
                      250+ items
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => searchCategory("beverages")}
                  className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 rounded-2xl transition-all duration-300"
                >
                  <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🧃</div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
                      Beverages
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600">
                      180+ items
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Trending Searches */}
            <div className="mb-6 lg:mb-8 animate-fade-in">
              <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4">
                Trending Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => searchTerm_func("organic apples")}
                  className="px-3 lg:px-4 py-2 bg-gray-100 hover:bg-green-600 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
                >
                  Organic Apples
                </button>
                <button
                  onClick={() => searchTerm_func("fresh milk")}
                  className="px-3 lg:px-4 py-2 bg-gray-100 hover:bg-green-600 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
                >
                  Fresh Milk
                </button>
                <button
                  onClick={() => searchTerm_func("chicken breast")}
                  className="px-3 lg:px-4 py-2 bg-gray-100 hover:bg-green-600 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
                >
                  Chicken Breast
                </button>
                <button
                  onClick={() => searchTerm_func("avocado")}
                  className="px-3 lg:px-4 py-2 bg-gray-100 hover:bg-green-600 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
                >
                  Avocado
                </button>
                <button
                  onClick={() => searchTerm_func("whole wheat bread")}
                  className="px-3 lg:px-4 py-2 bg-gray-100 hover:bg-green-600 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
                >
                  Whole Wheat Bread
                </button>
              </div>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="animate-slide-up">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900">
                    Search Results
                  </h3>
                  <span className="text-gray-600 text-sm lg:text-base">
                    {searchResults.length} results found
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-300 transition-all duration-300 hover:-translate-y-2 relative product-card"
                    >
                      <div className="absolute top-3 lg:top-4 left-3 lg:left-4 z-20">
                        <div
                          className={`${product.badgeColor} text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-full text-xs font-bold shadow-lg`}
                        >
                          {product.badge}
                        </div>
                      </div>

                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-4 lg:p-6">
                        <h3 className="font-bold text-gray-900 mb-2 text-base lg:text-lg leading-tight group-hover:text-green-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 lg:mb-4">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mb-3 lg:mb-0">
                          <span className="text-xl lg:text-2xl font-black text-green-600">
                            ₹{product.price}
                          </span>
                          <span className="text-sm text-gray-500 font-medium">
                            {product.unit}
                          </span>
                        </div>
                        <Link href='/product'>
                        <button className="lg:hidden w-full add-to-cart-btn text-white py-2 rounded-lg font-bold text-sm mt-3">
                          View Product
                        </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleCart}
          ></div>
          <div className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
                <div>
                  <h2 className="text-lg lg:text-xl font-black text-gray-900">
                    Your Cart
                  </h2>
                  <p className="text-sm text-gray-600">
                    {getTotalItems()} items
                  </p>
                </div>
                <button
                  onClick={toggleCart}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
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

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3 lg:space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 p-3 lg:p-4 bg-green-50 rounded-xl border border-green-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-sm lg:text-base">
                        {item.name}
                      </h4>
                      <p className="text-xs lg:text-sm text-gray-600">
                        {item.unit}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center text-sm font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base lg:text-lg font-bold text-green-600">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="border-t border-gray-200 p-4 lg:p-6 space-y-4 bg-gradient-to-r from-white to-gray-50">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Subtotal</span>
                    <span className="font-bold">
                      ₹{getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Delivery</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                  <div className="flex items-center justify-between text-base lg:text-lg font-black border-t pt-2">
                    <span>Total</span>
                    <span className="text-green-600">
                      ₹{getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
                <button className="w-full add-to-cart-btn text-white py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg transition-all duration-300">
                  Proceed to Checkout
                </button>
                <p className="text-xs text-center text-gray-500">
                  Free delivery on orders over ₹999
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 lg:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left animate-fade-in">
                {/* Delivery Badge */}
                <div className="inline-flex items-center px-3 lg:px-4 py-2 rounded-full bg-green-600/10 text-green-600 font-bold text-xs lg:text-sm mb-4 lg:mb-6">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
                  Free delivery in 30 minutes
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 lg:mb-6 leading-tight">
                  Fresh Groceries
                  <span className="block text-green-600 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                    Delivered Fast
                  </span>
                </h1>

                <p className="text-base lg:text-lg text-gray-600 mb-6 lg:mb-8 leading-relaxed">
                  Premium quality organic produce, farm-fresh items, and
                  everyday essentials delivered to your doorstep.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-6 lg:mb-8">
                  <button className="gradient-green text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                    Start Shopping
                  </button>
                  <button
                    onClick={openSearch}
                    className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                  >
                    Browse Products
                  </button>
                </div>
              </div>

              <div className="relative animate-fade-in">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Fresh groceries basket"
                  className="rounded-2xl shadow-2xl w-full"
                />

                {/* Floating Cards */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl p-3 lg:p-4 shadow-xl animate-float hidden lg:block">
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <span className="text-lg lg:text-2xl">🥬</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-xs lg:text-sm">
                        Fresh Today
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        Organic Spinach
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 lg:p-4 shadow-xl animate-float hidden lg:block"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <span className="text-lg lg:text-2xl">🍎</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-xs lg:text-sm">
                        35% Off
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        Premium Apples
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section
          id="categories"
          className="py-12 lg:py-20 bg-white relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2316A34A" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
            }}
          ></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center px-3 lg:px-4 py-2 bg-green-600/10 rounded-full text-green-600 font-semibold text-xs lg:text-sm mb-4 lg:mb-6">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14-7l2 7-2 7M5 4l2 7-2 7"
                  />
                </svg>
                Shop by Category
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 lg:mb-6 leading-tight">
                Fresh{" "}
                <span className="text-green-600 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  Categories
                </span>
              </h2>
              <p className="text-base lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Explore our wide selection of fresh, organic products across all
                categories
              </p>
            </div>

            {/* Categories Grid */}
            <div className="flex justify-center flex-wrap gap-4 lg:gap-6">
              {/* Fresh Fruits */}
              <div className="group bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-4 lg:p-6 text-center hover:from-red-100 hover:to-red-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-lg category-hover">
                <div className="text-3xl lg:text-4xl mb-3 lg:mb-4 group-hover:animate-bounce">
                  🍎
                </div>
                <h3 className="font-bold text-gray-900 mb-1 lg:mb-2 text-sm lg:text-base">
                  Fresh Fruits
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 mb-2 lg:mb-3">
                  Organic & seasonal fruits
                </p>
                <div className="text-xs text-green-600 font-medium">
                  500+ products
                </div>
              </div>

              {/* Vegetables */}
              <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 lg:p-6 text-center hover:from-green-100 hover:to-green-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-lg category-hover">
                <div className="text-3xl lg:text-4xl mb-3 lg:mb-4 group-hover:animate-bounce">
                  🥬
                </div>
                <h3 className="font-bold text-gray-900 mb-1 lg:mb-2 text-sm lg:text-base">
                  Vegetables
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 mb-2 lg:mb-3">
                  Fresh garden vegetables
                </p>
                <div className="text-xs text-green-600 font-medium">
                  400+ products
                </div>
              </div>

              {/* Dairy & Eggs */}
              <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 lg:p-6 text-center hover:from-blue-100 hover:to-blue-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-lg category-hover">
                <div className="text-3xl lg:text-4xl mb-3 lg:mb-4 group-hover:animate-bounce">
                  🥛
                </div>
                <h3 className="font-bold text-gray-900 mb-1 lg:mb-2 text-sm lg:text-base">
                  Dairy & Eggs
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 mb-2 lg:mb-3">
                  Farm fresh dairy products
                </p>
                <div className="text-xs text-green-600 font-medium">
                  150+ products
                </div>
              </div>

              {/* Bakery */}
              <div className="group bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 lg:p-6 text-center hover:from-orange-100 hover:to-orange-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-lg category-hover">
                <div className="text-3xl lg:text-4xl mb-3 lg:mb-4 group-hover:animate-bounce">
                  🍞
                </div>
                <h3 className="font-bold text-gray-900 mb-1 lg:mb-2 text-sm lg:text-base">
                  Bakery
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 mb-2 lg:mb-3">
                  Fresh baked goods daily
                </p>
                <div className="text-xs text-green-600 font-medium">
                  100+ products
                </div>
              </div>

              {/* Pantry */}
              <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-4 lg:p-6 text-center hover:from-yellow-100 hover:to-yellow-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-lg category-hover">
                <div className="text-3xl lg:text-4xl mb-3 lg:mb-4 group-hover:animate-bounce">
                  🥫
                </div>
                <h3 className="font-bold text-gray-900 mb-1 lg:mb-2 text-sm lg:text-base">
                  Pantry
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 mb-2 lg:mb-3">
                  Essential food items
                </p>
                <div className="text-xs text-green-600 font-medium">
                  300+ products
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section
          id="products"
          className="py-12 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2316A34A" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
            }}
          ></div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center px-3 lg:px-4 py-2 bg-green-600/10 rounded-full text-green-600 font-semibold text-xs lg:text-sm mb-4 lg:mb-6">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                Premium Selection
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 lg:mb-6 leading-tight">
                Featured{" "}
                <span className="text-green-600 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  Products
                </span>
              </h2>
              <p className="text-base lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Hand-picked premium products that our customers love the most
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-300 transition-all duration-300 hover:-translate-y-2 relative product-card"
                >
                  {/* Badge */}
                  <div className="absolute top-3 lg:top-4 left-3 lg:left-4 z-20">
                    <div
                      className={`${product.badgeColor} text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-full text-xs font-bold shadow-lg`}
                    >
                      {product.badge}
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Quick Add on Hover (Hidden on Mobile) */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hidden lg:flex">
                       <Link href='/product'>
                      <button className="add-to-cart-btn text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-bold text-sm transition-all shadow-lg transform hover:scale-105">
                        View Product
                      </button>
                      </Link>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 lg:p-6">
                    <h3 className="font-bold text-gray-900 mb-2 text-base lg:text-lg leading-tight group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 lg:mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-3 lg:mb-0">
                      <span className="text-xl lg:text-2xl font-black text-green-600">
                        ₹{product.price}
                      </span>
                      <span className="text-sm text-gray-500 font-medium">
                        {product.unit}
                      </span>
                    </div>
                    {/* Mobile Add to Cart Button */}
                      <Link href='/product'>
                    <button className="lg:hidden w-full add-to-cart-btn text-white py-2 rounded-lg font-bold text-sm mt-3">
                      View Product
                    </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-8 lg:mt-12">
              <button className="inline-flex items-center px-6 lg:px-8 py-3 lg:py-4 bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold text-base lg:text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span>View All Products</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 lg:py-20 bg-white relative overflow-hidden">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2316A34A" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
            }}
          ></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center px-3 lg:px-4 py-2 bg-green-600/10 rounded-full text-green-600 font-semibold text-xs lg:text-sm mb-4 lg:mb-6">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Why Choose Us
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 lg:mb-6 leading-tight">
                Premium{" "}
                <span className="text-green-600 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  Features
                </span>
              </h2>
              <p className="text-base lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Experience the best grocery shopping with our premium features
                and unmatched service quality
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Feature 1 */}
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 lg:w-10 lg:h-10 text-green-600"
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
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">
                  30 Min Delivery
                </h3>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                  Lightning-fast delivery to your doorstep in just 30 minutes
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">
                  Fresh Guarantee
                </h3>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                  100% fresh products or full money back guarantee
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 lg:w-10 lg:h-10 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">
                  Best Prices
                </h3>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                  Competitive prices with regular discounts and offers
                </p>
              </div>

              {/* Feature 4 */}
              <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 lg:w-10 lg:h-10 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">
                  24/7 Support
                </h3>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                  Round-the-clock customer support for all your needs
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center">
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
                  <h3 className="text-2xl font-black text-white">
                    Fresh Bucket
                  </h3>
                  <p className="text-green-400 text-sm font-bold">
                    Fresh • Fast • Quality
                  </p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Your trusted partner for fresh, organic groceries delivered fast
                to your doorstep. Quality guaranteed, satisfaction assured.
              </p>

              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-xl flex items-center justify-center transition-all duration-200 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-xl flex items-center justify-center transition-all duration-200 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-xl flex items-center justify-center transition-all duration-200 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.141.662-1.992 1.488-1.992.219 0 .518.219.518.219 0 .518-.359 1.297-.359 1.297-.518.219-.937.518-1.297.937-.518.518-1.297.937-1.297 1.855 0 .937.518 1.574 1.297 1.574.937 0 1.574-.518 1.574-1.297 0-.219 0-.518-.219-.518-.219 0-.518 0-.518-.219 0-.219.219-.518.518-.518.518 0 .937.219.937.518 0 .937-.518 1.574-1.297 1.574-.937 0-1.574-.518-1.574-1.297 0-.219 0-.518.219-.518.219 0 .518 0 .518.219 0 .219-.219.518-.518.518-.518 0-.937-.219-.937-.518 0-.937.518-1.574 1.297-1.574z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-xl flex items-center justify-center transition-all duration-200 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
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
              <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <svg
                      className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <svg
                      className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    All Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <svg
                      className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Special Offers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <svg
                      className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Bulk Orders
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <svg
                      className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Corporate Solutions
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Categories</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <svg
                      className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Fresh Fruits
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <svg
                      className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Vegetables
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <svg
                      className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Dairy & Eggs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <svg
                      className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Meat & Seafood
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <svg
                      className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Bakery Items
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">
                Contact & Support
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-green-400 mt-1 flex-shrink-0"
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
                  <div>
                    <p className="text-white font-medium">Customer Care</p>
                    <p className="text-gray-400 text-sm">
                      +91 (0) 79 2345 6789
                    </p>
                    <p className="text-gray-400 text-sm">Available 24/7</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-green-400 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-white font-medium">Email Support</p>
                    <p className="text-gray-400 text-sm">
                      help@freshbucket.com
                    </p>
                    <p className="text-gray-400 text-sm">
                      Response within 2 hours
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-green-400 mt-1 flex-shrink-0"
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
                  <div>
                    <p className="text-white font-medium">Our Location</p>
                    <p className="text-gray-400 text-sm">
                      123 Fresh Street, Ahmedabad
                    </p>
                    <p className="text-gray-400 text-sm">
                      Gujarat, India 380001
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="border-t border-gray-800 pt-8 lg:pt-12 mb-8 lg:mb-12">
            <div className="text-center mb-6 lg:mb-8">
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-400">
                Get the latest offers and fresh product updates directly to your
                inbox
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-green-600 transition-colors"
              />
              <button className="gradient-green text-white px-6 py-3 rounded-lg font-bold whitespace-nowrap hover:shadow-lg transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8 lg:pt-12">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6">
                <p className="text-gray-400 text-sm text-center lg:text-left">
                  © 2025 Fresh Bucket. All rights reserved.
                </p>
                <div className="flex items-center space-x-4 lg:space-x-6 text-sm">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    Cookie Policy
                  </a>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm font-medium">
                  We Accept:
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-5 bg-white rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-800">
                      VISA
                    </span>
                  </div>
                  <div className="w-8 h-5 bg-white rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-800">MC</span>
                  </div>
                  <div className="w-8 h-5 bg-white rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-800">UPI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile App Banner */}
      <div className="fixed bottom-4 left-4 right-4 lg:hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-4 rounded-2xl shadow-2xl border border-green-500/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
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
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-sm">Download Our App</p>
                <p className="text-white/80 text-xs">
                  Get exclusive mobile offers
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">
                Install
              </button>
              <button className="text-white/80 hover:text-white p-1.5 rounded-lg transition-all">
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreshMartApp;
