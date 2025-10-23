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
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiArrowLeft,
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
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@src/redux/reducers/authSlice";

const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(2);
  const cartItems = useSelector(selectCartItems);
  const totalofcart = useSelector(selectCartTotal);

  // Coupon states
  const [promoCode, setPromoCode] = useState("");
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Checkout states
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");

  // Static user ID
  const STATIC_USER_ID = "89c03353-6c44-443a-80fa-cf79da22d2db";

  // Suggested products
  const suggestedProducts = [
    {
      id: 4,
      name: "Organic Avocados",
      description: "1kg pack • Ripe & ready",
      price: 3.99 * 83,
      weightPerUnit: 1,
      image:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      unit: "kg",
      selectedSize: "1kg",
    },
    {
      id: 5,
      name: "Organic Oranges",
      description: "1kg bag • Sweet & juicy",
      price: 4.49 * 83,
      weightPerUnit: 1,
      image:
        "https://images.unsplash.com/photo-1606787366850-de6ba06f296c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      unit: "kg",
      selectedSize: "1kg",
    },
    {
      id: 6,
      name: "Fresh Blueberries",
      description: "0.25kg container • Antioxidant rich",
      price: 6.99 * 83,
      weightPerUnit: 0.25,
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      unit: "kg",
      selectedSize: "0.25kg",
    },
    {
      id: 7,
      name: "Organic Carrots",
      description: "0.5kg bunch • Crunchy & sweet",
      price: 2.79 * 83,
      weightPerUnit: 0.5,
      image:
        "https://images.unsplash.com/photo-1589927986089-35812388d1f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      unit: "kg",
      selectedSize: "0.5kg",
    },
  ];

  // Calculate totals
  const calculateTotalWeight = () => {
    return cartItems.reduce(
      (total, item) => total + (item.weightPerUnit || 1) * item.quantity,
      0
    );
  };

  const subtotal = totalofcart;
  const shipping = 0;
  const tax = 0;
  const discountAmount = appliedCoupon?.discountAmount || 0;
  const totalBeforeDiscount = subtotal + shipping + tax;
  const total = appliedCoupon?.finalAmount
    ? appliedCoupon.finalAmount + tax
    : totalBeforeDiscount;
  const totalWeight = calculateTotalWeight();

  // Handle quantity change
  const updatequantity = (id, selectedSize, change) => {
    const item = cartItems.find(
      (item) => item.id === id && item.selectedSize === selectedSize
    );
    if (item) {
      dispatch(
        updateQuantity({
          id,
          selectedSize,
          quantity: item.quantity + change,
        })
      );
    }
  };

  // Remove item from cart
  const removeItem = (id, selectedSize) => {
    dispatch(removeFromCart({ id, selectedSize }));
  };

  // Add item to cart
  const addToCartHandler = (id) => {
    const product = suggestedProducts.find((p) => p.id === id);
    if (product) {
      dispatch(
        addToCart({
          ...product,
          quantity: 1,
          totalPrice: product.price,
          rating: 4.5,
          reviews: 50,
          inStock: true,
          limitedStock: false,
          description:
            product.description ||
            `${product.selectedSize} • Premium quality • Farm fresh`,
          weightPerUnit:
            product.weightPerUnit ||
            parseFloat(product.selectedSize?.replace(/[^0-9.]/g, "") || "1"),
        })
      );
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

  // Apply promocode with API validation
  const applyPromocode = async () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    setIsValidatingPromo(true);
    setPromoError("");

    try {
      const response = await fetch(
        `http://localhost:8030/api/cupon/${promoCode}/validate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderValue: subtotal,
            userId: STATIC_USER_ID,
          }),
        }
      );

      const data = await response.json();

      console.log("=== COUPON VALIDATION ===");
      console.log("Coupon Code:", promoCode);
      console.log("Order Value:", subtotal);
      console.log("User ID:", STATIC_USER_ID);
      console.log("API Response:", data);
      console.log("========================");

      if (response.ok && data.status === "success" && data.data) {
        setAppliedCoupon({
          code: promoCode,
          couponId: data.data.coupon?.id,
          type: data.data.coupon?.type,
          value: data.data.coupon?.value,
          description: data.data.coupon?.description,
          discountAmount: data.data.discountAmount,
          finalAmount: data.data.finalAmount,
        });
        setPromoError("");
        alert(
          `Coupon "${promoCode}" applied successfully! You saved ₹${data.data.discountAmount.toFixed(
            2
          )}`
        );
      } else {
        setPromoError(data.message || "Invalid or expired promo code");
        setAppliedCoupon(null);
      }
    } catch (error) {
      console.error("Coupon validation error:", error);
      setPromoError("Failed to validate coupon. Please try again.");
      setAppliedCoupon(null);
    } finally {
      setIsValidatingPromo(false);
    }
  };

  // Remove applied coupon
  const removeCoupon = () => {
    setPromoCode("");
    setAppliedCoupon(null);
    setPromoError("");
  };

  // Create Order and Redeem Coupon
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setOrderError("Your cart is empty");
      return;
    }

    setIsCreatingOrder(true);
    setOrderError("");

    const orderData = {
      user_id: 1,
      coupon_id: appliedCoupon?.couponId || null,
      totalAmount: subtotal,
      discount: discountAmount,
      shippingCost: shipping,
      grandTotal: total,
      items: cartItems.map((item) => ({
        product_id: item.id,
        variant_id: item.variant_id || "default",
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
    };

    console.log("=== ORDER CREATION ===");
    console.log("Order Data:", orderData);
    console.log("======================");

    try {
      const response = await fetch("http://localhost:8030/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      console.log("=== ORDER RESPONSE ===");
      console.log("Status:", response.status);
      console.log("Response:", data);
      console.log("======================");

      if (response.ok && (data.success || data.status === "success")) {
        const orderId =
          data.data?.order_id || data.data?.id || data.order_id || data.id;

        alert(`Order created successfully! Order ID: ${orderId || "N/A"}`);

        // Redeem coupon if one was applied
        if (appliedCoupon && appliedCoupon.code && orderId) {
          try {
            console.log("=== COUPON REDEMPTION ===");
            console.log("Redeeming coupon:", appliedCoupon.code);
            console.log("Order ID:", orderId);
            console.log("Order Value:", subtotal);
            console.log("User ID:", STATIC_USER_ID);

            const redeemResponse = await fetch(
              `http://localhost:8030/api/cupon/${appliedCoupon.code}/redeem`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  orderValue: subtotal,
                  userId: STATIC_USER_ID,
                  orderId: orderId,
                }),
              }
            );

            const redeemData = await redeemResponse.json();

            console.log("=== COUPON REDEMPTION RESPONSE ===");
            console.log("Status:", redeemResponse.status);
            console.log("Response:", redeemData);
            console.log("==================================");

            if (
              redeemResponse.ok &&
              (redeemData.success || redeemData.status === "success")
            ) {
              console.log("Coupon redeemed successfully!");
            } else {
              console.error("Failed to redeem coupon:", redeemData.message);
            }
          } catch (redeemError) {
            console.error("Coupon redemption error:", redeemError);
          }
        }

        // Clear cart and coupon after successful order
        dispatch(clearCart());
        setAppliedCoupon(null);
        setPromoCode("");
      } else {
        setOrderError(data.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      setOrderError("Failed to process checkout. Please try again.");
    } finally {
      setIsCreatingOrder(false);
    }
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
              </button>

              <div className="relative hidden sm:block">
                <button className="relative p-2 lg:p-3 rounded-xl hover:bg-red-50 text-gray-600 hover:text-red-500 transition-all duration-200 group">
                  <FiHeart className="text-lg group-hover:scale-110 transition-transform duration-200" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                    {wishlistCount}
                  </div>
                </button>
              </div>

              <div className="relative">
                <button className="relative p-2 lg:p-3 rounded-xl hover:bg-green-600/10 text-gray-600 hover:text-green-600 transition-all duration-200 group">
                  <FiShoppingCart className="text-lg group-hover:scale-110 transition-transform duration-200" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg">
                    {cartItems.length}
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
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
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
                  <span className="hidden lg:inline">Ahmadabad, India</span>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4 text-xs text-gray-500">
                <span>Free delivery on orders ₹4150+</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
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
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <IoLeafOutline className="text-white text-2xl" />
                  </div>
                  <div>
                    <h2 className="font-black text-xl">Fresh Harvest</h2>
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
            </div>

            <nav className="p-6">
              <div className="space-y-2">
                <a
                  href="/"
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-600/10 hover:text-green-600 font-semibold transition-all duration-200"
                >
                  <IoLeafOutline className="text-lg text-green-600" />
                  <span>Home</span>
                </a>
                <a
                  href="/shop"
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-600/10 hover:text-green-600 font-semibold transition-all duration-200"
                >
                  <FiShoppingCart className="text-lg text-blue-600" />
                  <span>Shop</span>
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
              <div>
                <h2 className="text-2xl lg:text-4xl font-black text-gray-900 mb-2">
                  Search Products
                </h2>
                <p className="text-gray-600 text-sm lg:text-base">
                  Find organic produce from 500+ products
                </p>
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 lg:p-3 rounded-xl hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all duration-200"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <div className="relative mb-6 lg:mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 lg:pl-6 flex items-center pointer-events-none">
                <FiSearch className="text-xl lg:text-2xl text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-12 lg:pl-16 pr-16 lg:pr-20 py-4 lg:py-5 text-lg lg:text-xl border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-0 focus:border-green-600 bg-gray-50/50 shadow-sm transition-all duration-300"
                placeholder="Search for organic fruits, vegetables..."
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-6 lg:p-8 mb-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,_#ffffff_2px,_transparent_2px)] bg-[length:50px_50px]"></div>
          </div>
          <div className="relative flex flex-col lg:flex-row items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Your Organic Cart Awaits!
              </h1>
              <p className="text-white/90 text-base lg:text-lg mb-6">
                Review your hand-picked organic produce. Enjoy free shipping on
                orders over ₹4150!
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleCheckout}
                  disabled={isCreatingOrder || cartItems.length === 0}
                  className="bg-white text-green-800 font-semibold py-2 px-6 rounded-lg hover:bg-green-100 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isCreatingOrder ? "Processing..." : "Proceed to Checkout"}
                </button>
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Shopping Cart
              </h2>
              <span className="text-sm text-gray-500">
                {cartItems.length} items
              </span>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-center">
                <TbTruckDelivery className="text-green-600 text-xl" />
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-green-800">
                    <IoCheckmarkCircle className="inline text-base mr-1" />
                    You qualify for free shipping!
                  </p>
                  <p className="text-sm text-green-600">
                    Orders over ₹4150 ship free
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.description ||
                          `${item.selectedSize} • Premium quality • Farm fresh`}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        {item.rating && (
                          <div className="flex items-center">
                            {renderStars(item.rating)}
                            <span className="text-sm text-gray-500 ml-1">
                              {item.rating} ({item.reviews})
                            </span>
                          </div>
                        )}
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
                              Limited Stock
                            </>
                          ) : (
                            <>
                              <IoCheckmarkCircle className="text-base mr-1" />
                              In Stock
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updatequantity(item.id, item.selectedSize, -1)
                              }
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <FiMinus className="text-base" />
                            </button>
                            <span className="px-4 py-2 text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updatequantity(item.id, item.selectedSize, 1)
                              }
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <FiPlus className="text-base" />
                            </button>
                          </div>
                          <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1 transition-colors">
                            <FiHeart className="text-base" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={() =>
                              removeItem(item.id, item.selectedSize)
                            }
                            className="text-sm text-gray-500 hover:text-red-600 flex items-center space-x-1 transition-colors"
                          >
                            <FiTrash2 className="text-base" />
                            <span>Remove</span>
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            ₹{item.price.toFixed(2)} per {item.unit || "kg"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                {appliedCoupon ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <IoCheckmarkCircle className="text-green-600 text-lg flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-green-800">
                            {appliedCoupon.code}
                          </p>
                          <p className="text-xs text-green-600">
                            {appliedCoupon.type === "FIXED"
                              ? `₹${appliedCoupon.value} off`
                              : `${appliedCoupon.value}% off`}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) =>
                          setPromoCode(e.target.value.toUpperCase())
                        }
                        onKeyPress={(e) =>
                          e.key === "Enter" && applyPromocode()
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 text-sm outline-none"
                        disabled={isValidatingPromo}
                      />
                      <button
                        onClick={applyPromocode}
                        disabled={isValidatingPromo || !promoCode.trim()}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        {isValidatingPromo ? "..." : "Apply"}
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-red-500 text-xs mt-2 flex items-center">
                        <IoAlertCircle className="mr-1 flex-shrink-0" />
                        {promoError}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Total Weight</span>
                  <span className="font-medium">
                    {totalWeight.toFixed(2)} kg
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600 bg-green-50 -mx-2 px-2 py-2 rounded-lg">
                    <span className="font-medium">
                      Discount ({appliedCoupon?.code})
                    </span>
                    <span className="font-bold">
                      -₹{discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total Amount
                    </span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-green-600">
                        ₹{total.toFixed(2)}
                      </span>
                      {discountAmount > 0 && (
                        <p className="text-xs text-gray-500 line-through mt-1">
                          ₹{totalBeforeDiscount.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                  {discountAmount > 0 && (
                    <div className="mt-2 bg-green-100 rounded-lg p-2">
                      <p className="text-sm text-green-700 font-semibold text-center">
                        You saved ₹{discountAmount.toFixed(2)}!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCreatingOrder || cartItems.length === 0}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg mb-4 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isCreatingOrder ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Proceed to Checkout"
                )}
              </button>

              {orderError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-600 text-sm flex items-center">
                    <IoAlertCircle className="mr-2 flex-shrink-0" />
                    {orderError}
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Why shop with us?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <IoLeafOutline className="text-green-600 text-base" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        100% Organic
                      </p>
                      <p className="text-xs text-gray-500">
                        USDA certified organic
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <IoShieldCheckmarkOutline className="text-blue-600 text-base" />
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
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <TbRefresh className="text-orange-600 text-base" />
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Products */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              You May Also Like
            </h2>
            <a
              href="/shop"
              className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <FiChevronRight className="text-base" />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {suggestedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-200"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCartHandler(product.id)}
                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                  >
                    <FiPlus className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center">
                  <IoLeafOutline className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">
                    Fresh Harvest
                  </h3>
                  <p className="text-green-600 text-sm font-bold">
                    Organic • Fresh • Premium
                  </p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Premium organic produce delivered fresh to your door.
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
                  FAQ
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
                  <span>hello@freshharvest.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8">
            <p className="text-gray-400 text-sm text-center">
              2025 Fresh Harvest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShoppingCartPage;
