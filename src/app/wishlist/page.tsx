"use client";
import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiArrowLeft,
  FiTrash2,
} from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  IoLeafOutline,
  IoShieldCheckmarkOutline,
  IoCheckmarkCircle,
  IoAlertCircle,
} from "react-icons/io5";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useAppSelector } from "@src/redux/store";
import { selectUser } from "@src/redux/reducers/authSlice";

const WishlistPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(0);

  // API state management
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useAppSelector(selectUser);

  console.log("user is commingggggg-------->");
  console.log(user);
  // User ID - Replace with actual user ID from authentication
  const userId = 1;

  // Fetch wishlist data from API
  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:8030/api/products/wishlist/${user.user.id}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch wishlist: ${response.status}`);
        }

        const result = await response.json();

        // Extract wishlist data from nested response structure
        if (result.status === "success" && result.data.success) {
          const transformedData = result.data.data.map((item) => ({
            id: item.product.product_id,
            uuid: item.uuid,
            wishlistId: item.wishlist_id,
            name: item.product.name,
            description:
              item.product.description || "Premium quality organic product",
            price: item.product.price,
            weightPerUnit: 1,
            image:
              item.product.images && item.product.images.length > 0
                ? item.product.images[0].url
                : "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            rating: 4.5,
            reviews: 100,
            inStock: item.product.inStock === "AVILABLE",
            limitedStock: item.product.stock < 10,
            unit: "kg",
            stock: item.product.stock,
            sku: item.product.sku,
            addedAt: item.addedAt,
          }));

          setWishlistItems(transformedData);
          setWishlistCount(result.data.count || transformedData.length);
        } else {
          throw new Error(result.data.message || "Failed to load wishlist");
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setError(err.message || "Failed to load wishlist. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistData();
  }, [userId]);

  // Add item to cart
  const addToCart = async (id) => {
    try {
      const product = wishlistItems.find((p) => p.id === id);
      if (product) {
        // TODO: Call your add to cart API here
        // const response = await fetch('http://localhost:8030/api/cart/add', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ userId, productId: id, quantity: 1 })
        // });

        setCartCount((prev) => prev + 1);
        await removeFromWishlist(id);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  // Remove item from wishlist
  // Remove item from wishlist
  const removeFromWishlist = async (id) => {
    try {
      console.log("id is hetrererere----->");
      console.log(id);
      const item = wishlistItems.find((p) => p.uuid === id);
      console.log(wishlistItems);
      console.log("item is herere-1222----->>>");
      console.log(item);
      if (!item) return;

      // Call the remove from wishlist API
      const response = await fetch(
        `http://localhost:8030/api/products/wishlist/remove/${item?.uuid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.user.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove from wishlist");
      }

      const result = await response.json();

      // Update local state only if API call was successful
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
      setWishlistCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      alert("Failed to remove item from wishlist. Please try again.");
    }
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    return (
      <div className="flex text-yellow-400 text-sm">
        {[...Array(5)].map((_, i) =>
          i < fullStars ? (
            <AiFillStar key={i} className="text-sm" />
          ) : (
            <AiOutlineStar key={i} className="text-sm" />
          )
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50 sticky top-0 z-50 transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-2 lg:space-x-3 group cursor-pointer">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <FiShoppingCart className="text-base lg:text-xl text-white transform group-hover:rotate-12 transition-transform duration-300" />
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
            <div className="hidden lg:flex items-center space-x-8">
              <a
                href="/"
                className="relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300"
              >
                Home
              </a>
              <a
                href="/products"
                className="relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300"
              >
                Products
              </a>
              <a
                href="/offers"
                className="relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300 flex items-center"
              >
                Offers
                <span className="ml-1 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full font-bold">
                  HOT
                </span>
              </a>
              <a
                href="/about"
                className="relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300"
              >
                About
              </a>
              <a
                href="/contact"
                className="relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300"
              >
                Contact
              </a>
            </div>
            <div className="flex items-center space-x-1 lg:space-x-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="relative p-2 lg:p-3 rounded-xl hover:bg-green-600/10 text-gray-600 hover:text-green-600 transition-all duration-200 group"
              >
                <FiSearch className="text-lg group-hover:scale-110 transition-transform duration-200" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-600 rounded-full animate-pulse hidden lg:block"></div>
              </button>
              <div className="relative hidden sm:block">
                <button className="relative p-2 lg:p-3 rounded-xl hover:bg-red-50 text-gray-600 hover:text-red-500 transition-all duration-200 group">
                  <FiHeart className="text-lg group-hover:scale-110 transition-transform duration-200" />
                  {wishlistCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                      {wishlistCount}
                    </div>
                  )}
                </button>
              </div>
              <div className="relative">
                <button className="relative p-2 lg:p-3 rounded-xl hover:bg-green-600/10 text-gray-600 hover:text-green-600 transition-all duration-200 group">
                  <FiShoppingCart className="text-lg group-hover:scale-110 transition-transform duration-200" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg">
                    {cartCount}
                  </div>
                </button>
              </div>
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-3 rounded-xl hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-200 group"
                >
                  <FiUser className="text-lg group-hover:scale-110 transition-transform duration-200" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-slide-down">
                    <a
                      href="#profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors duration-200"
                    >
                      My Profile
                    </a>
                    <a
                      href="#orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors duration-200"
                    >
                      My Orders
                    </a>
                    <a
                      href="#settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors duration-200"
                    >
                      Settings
                    </a>
                    <hr className="my-2 border-gray-200" />
                    <a
                      href="#logout"
                      className="block px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-green-600/10 text-gray-600 hover:text-green-600 transition-all duration-200 group"
              >
                <FiMenu className="text-xl group-hover:scale-110 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </nav>
        <div className="bg-green-600/5 border-t border-green-600/10 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-3 lg:space-x-6">
                <div className="flex items-center space-x-1 text-green-600 font-medium">
                  <FiClock className="text-base" />
                  <span className="hidden sm:inline">Delivery in 30 mins</span>
                  <span className="sm:hidden">30 min delivery</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600 hidden sm:flex">
                  <FiMapPin className="text-base" />
                  <span className="hidden lg:inline">Ahmedabad, India</span>
                  <span className="lg:hidden">Ahmedabad</span>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4 text-xs text-gray-500">
                <span>🔥 Free delivery on orders ₹4150+</span>
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
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-80 max-w-full bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <IoLeafOutline className="text-white text-2xl" />
                  </div>
                  <div>
                    <h2 className="font-black text-xl">Fresh Bucket</h2>
                    <p className="text-white/80 text-sm">
                      Organic • Fresh • Premium
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/20 transition-all duration-200"
                >
                  <FiX className="text-xl text-white" />
                </button>
              </div>
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
            <nav className="p-6">
              <div className="space-y-2">
                <a
                  href="/"
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-600/10 hover:text-green-600 font-semibold transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-600/20 transition-all duration-200">
                    <IoLeafOutline className="text-lg text-green-600" />
                  </div>
                  <span>Home</span>
                </a>
                <a
                  href="/shop"
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-600/10 hover:text-green-600 font-semibold transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-green-600/20 transition-all duration-200">
                    <FiShoppingCart className="text-lg text-blue-600" />
                  </div>
                  <span>Shop</span>
                </a>
                <a
                  href="/wishlist"
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-green-600 bg-green-600/10 font-semibold transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center group-hover:bg-green-600/30 transition-all duration-200">
                    <FiHeart className="text-green-600" />
                  </div>
                  <span>Wishlist</span>
                </a>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200 space-y-2">
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <FiSearch className="text-lg" />
                  <span className="font-medium">Search Products</span>
                </button>
                <a
                  href="/cart"
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <FiShoppingCart className="text-lg" />
                  <span className="font-medium">Cart ({cartCount} items)</span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <div className="animate-slide-down">
                <h2 className="text-2xl lg:text-4xl font-black text-gray-900 mb-2">
                  Search Products
                </h2>
                <p className="text-gray-600 text-sm lg:text-base">
                  Find organic produce from 500+ products
                </p>
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 lg:p-3 rounded-xl hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all duration-200 group"
              >
                <FiX className="text-xl group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>
            <div className="relative mb-6 lg:mb-8 animate-slide-up">
              <div className="absolute inset-y-0 left-0 pl-4 lg:pl-6 flex items-center pointer-events-none">
                <FiSearch className="text-xl lg:text-2xl text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-12 lg:pl-16 pr-16 lg:pr-20 py-4 lg:py-5 text-lg lg:text-xl border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-0 focus:border-green-600 bg-gray-50/50 shadow-sm transition-all duration-300"
                placeholder="Search for organic fruits, vegetables..."
                autoFocus
              />
              <div className="absolute inset-y-0 right-0 pr-4 lg:pr-6 flex items-center space-x-2">
                <kbd className="px-2 lg:px-3 py-1 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg">
                  ESC
                </kbd>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-6 lg:p-8 mb-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,_#ffffff_2px,_transparent_2px),_radial-gradient(circle_at_75%_75%,_#ffffff_2px,_transparent_2px)] bg-[length:50px_50px]"></div>
          </div>
          <div className="relative flex flex-col lg:flex-row items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Your Wishlist Favorites!
              </h1>
              <p className="text-white/90 text-base lg:text-lg mb-6">
                Explore your saved organic produce. Add them to your cart or
                continue shopping!
              </p>
              <div className="flex items-center space-x-4">
                <a
                  href="/shop"
                  className="bg-white text-green-800 font-semibold py-2 px-6 rounded-lg hover:bg-green-100 transition-colors duration-200"
                >
                  Shop Now
                </a>
                <a
                  href="/shop"
                  className="text-white/80 hover:text-white font-medium flex items-center space-x-2"
                >
                  <FiArrowLeft className="text-base" />
                  <span>Add More Items</span>
                </a>
              </div>
            </div>
            <div className="hidden lg:block flex-shrink-0 mt-6 lg:mt-0 lg:ml-8">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                alt="Organic produce"
                className="w-48 h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Wishlist Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Wishlist Items */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Wishlist
              </h2>
              {!loading && (
                <span className="text-sm text-gray-500">
                  {wishlistItems.length} items
                </span>
              )}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600 text-lg font-medium">
                    Loading your wishlist...
                  </p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <IoAlertCircle className="text-red-500 text-5xl" />
                  <div>
                    <p className="text-red-800 text-lg font-semibold mb-2">
                      Oops! Something went wrong
                    </p>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && wishlistItems.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <FiHeart className="text-gray-300 text-6xl" />
                  <div>
                    <p className="text-gray-900 text-xl font-semibold mb-2">
                      Your wishlist is empty
                    </p>
                    <p className="text-gray-500 text-sm">
                      Start adding products you love!
                    </p>
                  </div>
                  <a
                    href="/shop"
                    className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    <FiArrowLeft className="text-base" />
                    <span>Start Shopping</span>
                  </a>
                </div>
              </div>
            )}

            {/* Wishlist Items List */}
            {!loading && !error && wishlistItems.length > 0 && (
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-xl object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.description}
                        </p>
                        {item.sku && (
                          <p className="text-xs text-gray-400 mt-1">
                            SKU: {item.sku}
                          </p>
                        )}
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center">
                            {renderStars(item.rating)}
                            <span className="text-sm text-gray-500 ml-1">
                              {item.rating} ({item.reviews})
                            </span>
                          </div>
                          <div
                            className={`flex items-center text-sm ${
                              item.limitedStock
                                ? "text-orange-600"
                                : "text-green-600"
                            }`}
                          >
                            {item.limitedStock ? (
                              <>
                                <IoAlertCircle className="text-base mr-1" />
                                Limited Stock ({item.stock} left)
                              </>
                            ) : item.inStock ? (
                              <>
                                <IoCheckmarkCircle className="text-base mr-1" />
                                In Stock
                              </>
                            ) : (
                              <>
                                <IoAlertCircle className="text-base mr-1 text-red-600" />
                                <span className="text-red-600">
                                  Out of Stock
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => addToCart(item.id)}
                              disabled={!item.inStock}
                              className={`${
                                item.inStock
                                  ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                                  : "bg-gray-300 cursor-not-allowed"
                              } text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200`}
                            >
                              {item.inStock ? "Add to Cart" : "Out of Stock"}
                            </button>
                            <button
                              onClick={() => removeFromWishlist(item.uuid)}
                              className="text-sm text-gray-500 hover:text-red-600 flex items-center space-x-1 transition-colors"
                            >
                              <FiTrash2 className="text-base" />
                              <span>Remove</span>
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              ₹{item.price.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              per {item.unit}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && !error && wishlistItems.length > 0 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <a
                  href="/shop"
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <FiArrowLeft className="text-base" />
                  <span className="font-medium">Continue Shopping</span>
                </a>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <IoShieldCheckmarkOutline className="text-base text-green-600" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TbTruckDelivery className="text-base text-green-600" />
                    <span>Free Shipping</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Why Shop With Us Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Why Shop With Us?
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <IoLeafOutline className="text-green-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      100% Organic
                    </p>
                    <p className="text-xs text-gray-500">
                      Certified organic products
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <IoShieldCheckmarkOutline className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Secure Payment
                    </p>
                    <p className="text-xs text-gray-500">
                      SSL encrypted checkout
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TbRefresh className="text-orange-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Easy Returns
                    </p>
                    <p className="text-xs text-gray-500">
                      30-day return policy
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TbTruckDelivery className="text-green-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Fast Delivery
                    </p>
                    <p className="text-xs text-gray-500">
                      Free shipping on ₹4150+
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Desktop */}
      <footer className="hidden md:block bg-gray-900 text-white mt-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center shadow-lg">
                  <IoLeafOutline className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">
                    Fresh Bucket
                  </h3>
                  <p className="text-green-600 text-sm font-bold">
                    Organic • Fresh • Premium
                  </p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Premium organic produce delivered fresh to your door. Quality
                you can trust, freshness you can taste.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <FaFacebookF className="text-sm" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <FaTwitter className="text-sm" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <FaInstagram className="text-sm" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <FaLinkedinIn className="text-sm" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Fruits
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Vegetables
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Organic
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Seasonal
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Bundles
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  New Arrivals
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Shipping Info
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Returns & Refunds
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Track Your Order
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  FAQ
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Live Chat
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <FiPhone className="text-base text-green-600" />
                  <span>1-800-HARVEST</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMail className="text-base text-green-600" />
                  <span>hello@freshbucket.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMapPin className="text-base text-green-600" />
                  <span>Ahmedabad, Gujarat, India</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiClock className="text-base text-green-600" />
                  <span>Available 24/7</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 lg:mb-0">
                <p>
                  &copy; 2025 Fresh Bucket. All rights reserved. Made with ❤️
                  for organic food lovers.
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-500">
                  VISA
                </div>
                <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-500">
                  MC
                </div>
                <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-500">
                  PYPL
                </div>
                <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-500">
                  APAY
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer - Mobile */}
      <footer className="md:hidden bg-gray-900 text-white py-8">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center">
              <IoLeafOutline className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Fresh Bucket</h3>
              <p className="text-green-600 text-xs font-bold">
                Organic • Fresh • Premium
              </p>
            </div>
          </div>
          <div className="space-y-3 mb-6">
            <a
              href="tel:1-800-HARVEST"
              className="flex items-center justify-center space-x-3 text-gray-300 hover:text-green-600 transition-colors"
            >
              <FiPhone className="text-lg" />
              <span className="font-medium">1-800-HARVEST</span>
            </a>
            <a
              href="mailto:hello@freshbucket.com"
              className="flex items-center justify-center space-x-3 text-gray-300 hover:text-green-600 transition-colors"
            >
              <FiMail className="text-lg" />
              <span className="font-medium">hello@freshbucket.com</span>
            </a>
            <div className="flex items-center justify-center space-x-3 text-gray-300">
              <FiMapPin className="text-lg" />
              <span className="font-medium text-sm">
                Ahmedabad, Gujarat, India
              </span>
            </div>
          </div>
          <div className="flex justify-center space-x-4 mb-6">
            <a
              href="#"
              className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
            >
              <FaFacebookF className="text-sm" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
            >
              <FaTwitter className="text-sm" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
            >
              <FaInstagram className="text-sm" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-y-2 text-sm mb-6">
            <a
              href="/"
              className="text-gray-400 hover:text-green-600 transition-colors"
            >
              Home
            </a>
            <a
              href="/shop"
              className="text-gray-400 hover:text-green-600 transition-colors"
            >
              Shop
            </a>
            <a
              href="/about"
              className="text-gray-400 hover:text-green-600 transition-colors"
            >
              About
            </a>
            <a href="/wishlist" className="text-green-600 transition-colors">
              Wishlist
            </a>
            <a
              href="/support"
              className="text-gray-400 hover:text-green-600 transition-colors"
            >
              Support
            </a>
            <a
              href="/faq"
              className="text-gray-400 hover:text-green-600 transition-colors"
            >
              FAQ
            </a>
          </div>
          <div className="flex justify-center items-center space-x-3 mb-6">
            <div className="text-xs text-gray-400 font-medium">
              Secure payments:
            </div>
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-gray-700 rounded opacity-70"></div>
              <div className="w-8 h-5 bg-gray-700 rounded opacity-70"></div>
              <div className="w-8 h-5 bg-gray-700 rounded opacity-70"></div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-4">
            <p className="text-gray-400 text-xs leading-relaxed">
              &copy; 2025 Fresh Bucket. All rights reserved.
              <br />
              Made with ❤️ for organic food lovers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WishlistPage;
