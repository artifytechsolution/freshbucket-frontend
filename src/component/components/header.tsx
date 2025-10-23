"use client";
import React, { useState, useEffect } from "react";

const Header = () => {
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
      description:
        "Sweet, juicy organic strawberries perfect for desserts and snacking",
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
      description:
        "Creamy, nutrient-rich avocados perfect for toast, salads, and guacamole",
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
      description:
        "Farm-fresh eggs from pasture-raised chickens, perfect for any meal",
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
      description:
        "Sweet, ripe organic bananas, great for smoothies and snacking",
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
      description:
        "Crisp, nutrient-packed spinach leaves perfect for salads and cooking",
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
      description:
        "Rich, creamy whole milk from local farms, perfect for family needs",
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
      {/* Enhanced CSS Styles */}
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
      <header className="glass-effect shadow-lg border-b border-gray-200/50 sticky top-0 z-50 transition-all duration-300">
        {/* Main Navigation */}
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

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <a
                href="#home"
                className="nav-link relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300"
              >
                Home
              </a>
              <a
                href="#products"
                className="nav-link relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300"
              >
                Products
              </a>
              <a
                href="#categories"
                className="nav-link relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300 flex items-center"
              >
                Offers
                <span className="ml-1 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full font-bold">
                  HOT
                </span>
              </a>
              <a
                href="#about"
                className="nav-link relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300"
              >
                About
              </a>
              <a
                href="#contact"
                className="nav-link relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300"
              >
                Contact
              </a>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-1 lg:space-x-2">
              {/* Search Button */}
              <div className="relative">
                <button
                  onClick={openSearch}
                  className="relative p-2 lg:p-3 rounded-xl hover:bg-green-100 text-gray-600 hover:text-green-600 transition-all duration-200 group"
                >
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
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-600 rounded-full animate-pulse hidden lg:block"></div>
                </button>
              </div>

              {/* Wishlist Button */}
              <div className="relative hidden sm:block">
                <button className="relative p-2 lg:p-3 rounded-xl hover:bg-red-50 text-gray-600 hover:text-red-500 transition-all duration-200 group">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                    2
                  </div>
                </button>
              </div>

              {/* Cart Button */}
              <div className="relative">
                <button
                  onClick={toggleCart}
                  className="relative p-2 lg:p-3 rounded-xl hover:bg-green-100 text-gray-600 hover:text-green-600 transition-all duration-200 group"
                >
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
                    {getTotalItems()}
                  </div>
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-xl hover:bg-green-100 text-gray-600 hover:text-green-600 transition-all duration-200 group"
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
                  <span className="hidden lg:inline">Ahmedabad, India</span>
                  <span className="lg:hidden">AHM 380001</span>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4 text-xs text-gray-500">
                <span>🔥 Free delivery on orders ₹999+</span>
                <span className="hidden lg:inline">|</span>
                <span className="hidden lg:inline">
                  💰 Best prices guaranteed
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

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
                {[
                  {
                    href: "#home",
                    icon: "🏠",
                    label: "Home",
                    color: "bg-green-100",
                  },
                  {
                    href: "#products",
                    icon: "📦",
                    label: "Products",
                    color: "bg-blue-100",
                  },
                  {
                    href: "#about",
                    icon: "ℹ️",
                    label: "About",
                    color: "bg-purple-100",
                  },
                  {
                    href: "#offers",
                    icon: "💰",
                    label: "Special Offers",
                    color: "bg-red-100",
                    badge: "HOT",
                  },
                  {
                    href: "#contact",
                    icon: "📞",
                    label: "Contact Us",
                    color: "bg-orange-100",
                  },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-100 hover:text-green-600 font-semibold transition-all duration-200 group"
                  >
                    <div
                      className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-all duration-200`}
                    >
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <div className="flex items-center justify-between flex-1">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
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
                  Search Fresh Bucket
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
                {[
                  {
                    emoji: "🍎",
                    name: "Fresh Fruits",
                    count: "500+ items",
                    category: "fruits",
                    gradient:
                      "from-red-50 to-red-100 hover:from-red-100 hover:to-red-200",
                  },
                  {
                    emoji: "🥬",
                    name: "Vegetables",
                    count: "400+ items",
                    category: "vegetables",
                    gradient:
                      "from-green-50 to-green-100 hover:from-green-100 hover:to-green-200",
                  },
                  {
                    emoji: "🥛",
                    name: "Dairy & Eggs",
                    count: "150+ items",
                    category: "dairy",
                    gradient:
                      "from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200",
                  },
                  {
                    emoji: "🥩",
                    name: "Meat & Seafood",
                    count: "200+ items",
                    category: "meat",
                    gradient:
                      "from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200",
                  },
                  {
                    emoji: "🍞",
                    name: "Bakery",
                    count: "100+ items",
                    category: "bakery",
                    gradient:
                      "from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200",
                  },
                  {
                    emoji: "🥫",
                    name: "Pantry Staples",
                    count: "300+ items",
                    category: "pantry",
                    gradient:
                      "from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200",
                  },
                  {
                    emoji: "🍿",
                    name: "Snacks",
                    count: "250+ items",
                    category: "snacks",
                    gradient:
                      "from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200",
                  },
                  {
                    emoji: "🧃",
                    name: "Beverages",
                    count: "180+ items",
                    category: "beverages",
                    gradient:
                      "from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200",
                  },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => searchCategory(item.category)}
                    className={`flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br ${item.gradient} rounded-2xl transition-all duration-300`}
                  >
                    <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">
                      {item.emoji}
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
                        {item.name}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-600">
                        {item.count}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Searches */}
            <div className="mb-6 lg:mb-8 animate-fade-in">
              <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4">
                Trending Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "organic apples",
                  "fresh milk",
                  "chicken breast",
                  "avocado",
                  "whole wheat bread",
                ].map((term, index) => (
                  <button
                    key={index}
                    onClick={() => searchTerm_func(term)}
                    className="px-3 lg:px-4 py-2 bg-gray-100 hover:bg-green-600 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
                  >
                    {term.charAt(0).toUpperCase() + term.slice(1)}
                  </button>
                ))}
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
                        <button className="lg:hidden w-full add-to-cart-btn text-white py-2 rounded-lg font-bold text-sm mt-3">
                          View Product
                        </button>
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
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                      <svg
                        className="w-16 h-16 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 font-medium">
                      Your cart is empty
                    </p>
                    <button
                      onClick={() => {
                        toggleCart();
                        openSearch();
                      }}
                      className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
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
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cartItems.length > 0 && (
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
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
