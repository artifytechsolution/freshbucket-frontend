"use client";
import Header from "@src/component/components/header";
import { useProductById } from "@src/hooks/apiHooks";
import {
  addToCart,
  selectCartItems,
  selectCartTotal,
} from "@src/redux/reducers/authSlice";
import { AppDispatch } from "@src/redux/store";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const ProductDetailPage = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("1kg");
  const [selectvariant_id, setSelectvariant_id] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [scrollY, setScrollY] = useState(0);

  // Review Modal States
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    name: "",
    email: "",
    title: "",
    comment: "",
    recommend: true,
  });
  const [reviewErrors, setReviewErrors] = useState({});
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const dispatch = useDispatch<any>();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  // Product details API call
  const {
    isError,
    isLoading,
    data: productData,
    error,
    mutate: fetchProducts,
  } = useProductById();

  useEffect(() => {
    fetchProducts({
      id: "215cb8bb-1f54-4812-8390-5f05c7b121d4",
    });
  }, [fetchProducts]);

  useEffect(() => {
    if (productData && !isLoading) {
      toast.success(productData?.message ?? "🎉 Product loaded successfully!");
    }
    if (isError) {
      toast.error(`🔒 ${error || "Failed to load product. Please try again."}`);
    }
  }, [productData, isLoading, error, isError]);

  // Track scroll for header effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Map API response to product structure
  const product = productData?.data?.data
    ? {
        id: productData.data.data.id,
        name: productData.data.data.name,
        tagline: "Freshly harvested organic mangoes",
        price: productData.data.data.price,
        originalPrice: productData.data.data.price * 1.2,
        discount: 17,
        rating: 4.8,
        reviewCount: 0,
        inStock: productData.data.data.stock,
        category: productData.data.data.category.name,
        sku: productData.data.data.sku,
        brand: "Organic Farm Fresh",
        weight: productData.data.data.variants[0]?.name || "1kg",
        origin: "Organic Farms, India",
        harvestDate: "September 25, 2025",
        shelfLife: `${productData.data.data.expiryDays} days`,
        certifications: ["India Organic", "FSSAI Approved"],
        images: productData.data.data.images
          .sort((a, b) => (b.isPrimary ? 1 : -1))
          .map((img) => img.url),
        sizes: productData.data.data.variants.map((variant) => ({
          id: variant.id,
          weight: variant.name,
          price: variant.price,
          originalPrice: variant.price * 1.2,
        })),
        description: productData.data.data.description,
        detailedDescription:
          "These organic tarbuch mangoes are grown with care in sustainable farms, free from synthetic pesticides and fertilizers. Hand-picked at peak ripeness, they offer a perfect balance of sweetness and juiciness, ideal for every occasion.",
        features: [
          "✓ 100% Certified Organic",
          "✓ Hand-picked at peak ripeness",
          "✓ Rich in flavor and nutrients",
          "✓ Perfect for desserts & snacking",
          "✓ Fresh daily delivery",
          "✓ FSSAI Approved",
        ],
        nutrition: {
          calories: 60,
          carbs: "15g",
          sugar: "13.7g",
          fiber: "1.6g",
          vitaminC: "36.4mg",
          potassium: "168mg",
          folate: "43mcg",
          manganese: "0.1mg",
          servingSize: "100g (about 1/2 mango)",
        },
        storage: {
          temperature: "10-13°C",
          humidity: "85-90%",
          tips: [
            "Store in a cool, dry place",
            "Refrigerate to extend freshness",
            "Do not wash until ready to eat",
            `Use within ${productData.data.data.expiryDays} days for best quality`,
          ],
        },
        uses: [
          "Fresh eating and snacking",
          "Smoothies and juice blends",
          "Desserts and salads",
          "Jam and preserve making",
          "Baby food preparation",
        ],
        badges: ["Fresh Today", "Organic"],
      }
    : {};

  const relatedProducts = [
    {
      id: 2,
      name: "Organic Alphonso Mangoes",
      price: 350,
      originalPrice: 420,
      discount: 17,
      rating: 4.7,
      weight: "1kg",
      image:
        "https://images.unsplash.com/photo-1591070486843-7a6d6b6835b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Fresh Kesar Mangoes",
      price: 300,
      originalPrice: 360,
      discount: 17,
      rating: 4.6,
      weight: "1kg",
      image:
        "https://images.unsplash.com/photo-1592993638609-6b35a7da496f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Organic Banganapalli Mangoes",
      price: 280,
      originalPrice: 336,
      discount: 17,
      rating: 4.8,
      weight: "1kg",
      image:
        "https://images.unsplash.com/photo-1591070487530-8a6d6b6835b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  const reviews = [
    {
      name: "Priya Sharma",
      rating: 5,
      title: "Delicious Mangoes!",
      comment:
        "These tarbuch mangoes are incredibly sweet and juicy. Perfect for smoothies and desserts. Fresh delivery!",
      date: "2 days ago",
      verified: true,
      helpful: 10,
    },
    {
      name: "Rajesh Kumar",
      rating: 5,
      title: "Best Quality",
      comment:
        "The best mangoes I've bought online. Really fresh and flavorful. Will order again!",
      date: "1 week ago",
      verified: true,
      helpful: 8,
    },
    {
      name: "Sneha Patel",
      rating: 4,
      title: "Great Taste",
      comment:
        "Very fresh and tasty mangoes. Slightly expensive but worth the quality. Good packaging.",
      date: "2 weeks ago",
      verified: true,
      helpful: 5,
    },
  ];

  const selectedSizeDetails =
    product.sizes?.find((size) => size.weight === selectedSize) ||
    product.sizes?.[0] ||
    {};

  const openReviewModal = () => {
    setShowReviewModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    document.body.style.overflow = "unset";
    setReviewForm({
      rating: 0,
      name: "",
      email: "",
      title: "",
      comment: "",
      recommend: true,
    });
    setReviewErrors({});
  };

  const handleReviewFormChange = (field, value) => {
    setReviewForm((prev) => ({ ...prev, [field]: value }));
    if (reviewErrors[field]) {
      setReviewErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateReviewForm = () => {
    const errors = {};
    if (reviewForm.rating === 0) errors.rating = "Please select a rating";
    if (!reviewForm.name.trim()) errors.name = "Name is required";
    if (!reviewForm.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(reviewForm.email))
      errors.email = "Please enter a valid email";
    if (!reviewForm.title.trim()) errors.title = "Review title is required";
    if (!reviewForm.comment.trim())
      errors.comment = "Review comment is required";
    else if (reviewForm.comment.length < 10)
      errors.comment = "Comment must be at least 10 characters long";
    return errors;
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const errors = validateReviewForm();
    if (Object.keys(errors).length > 0) {
      setReviewErrors(errors);
      return;
    }
    setIsSubmittingReview(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Review submitted successfully! Thank you for your feedback.");
      closeReviewModal();
    } catch (error) {
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // ENHANCED ADD TO CART FUNCTION WITH MINIMAL REQUIRED DATA
  const addtoCart = () => {
    // Create minimal cart item with only required data for cart page
    const item = {
      id: product.id,
      name: product.name,
      variant_id: selectvariant_id,
      image: product.images?.[0], // Only first image
      selectedSize,
      quantity,
      price: selectedSizeDetails.price,
      totalPrice: selectedSizeDetails.price * quantity,
    };

    console.log("item is here 929--------->");
    console.log(item);

    dispatch(addToCart(item));

    // Console log minimal required data
    console.log("=== CART ITEM DATA ===");
    console.log("Product ID:", item.id);
    console.log("Product Name:", item.name);
    console.log("Product Image:", item.image);
    console.log("Selected Size:", item.selectedSize);
    console.log("Quantity:", item.quantity);
    console.log("Price:", item.price);
    console.log("Total Price:", item.totalPrice);
    console.log("Cart Item Object:", item);
    console.log("=====================");

    setCartItems([...cartItems, item]);
    alert(
      `Added ${quantity} × ${selectedSize} ${product.name} to cart! Total: ₹${
        selectedSizeDetails.price * quantity
      }`
    );
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">
          Error loading product: {error?.message || "Please try again."}
        </p>
      </div>
    );
  }

  console.log("item is here123--------->");
  console.log(items);
  console.log(total);
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="fixed top-0 w-full z-50 shadow">
        <Header />
      </div>

      {/* Main Content */}
      <main className="pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex text-sm text-gray-500 mb-8">
            <a href="#" className="hover:text-green-600">
              Home
            </a>
            <span className="mx-2">/</span>
            <a href="#" className="hover:text-green-600">
              {product.category}
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>

          {/* Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 relative group">
                <img
                  src={
                    product.images?.[selectedImageIndex] ||
                    "/placeholder-image.jpg"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {product.badges?.map((badge, index) => (
                    <span
                      key={index}
                      className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  -{product.discount}% OFF
                </div>
                {/* Image Navigation Arrows */}
                {product.images?.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImageIndex((prev) =>
                          prev > 0 ? prev - 1 : product.images.length - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg
                        className="w-5 h-5 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImageIndex((prev) =>
                          prev < product.images.length - 1 ? prev + 1 : 0
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg
                        className="w-5 h-5 text-gray-800"
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
                    </button>
                  </>
                )}
              </div>

              {/* Image Thumbnails */}
              {product.images?.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                        selectedImageIndex === index
                          ? "border-green-500 shadow-lg"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header Info */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                      {product.name}
                    </h1>
                    <p className="text-lg text-gray-600 font-medium mt-2">
                      {product.tagline}
                    </p>
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                      <span>
                        Brand:{" "}
                        <span className="text-gray-900 font-medium">
                          {product.brand}
                        </span>
                      </span>
                      <span>
                        SKU:{" "}
                        <span className="text-gray-900 font-medium">
                          {product.sku}
                        </span>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={toggleWishlist}
                    className={`p-3 rounded-full transition-all duration-300 ${
                      isWishlisted
                        ? "bg-red-50 text-red-500"
                        : "bg-gray-100 text-gray-400 hover:text-red-500"
                    }`}
                  >
                    <svg
                      className="w-6 h-6"
                      fill={isWishlisted ? "currentColor" : "none"}
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
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {product.rating}
                  </span>
                  <span className="text-gray-500">
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-black text-green-600">
                    ₹{selectedSizeDetails.price}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ₹{selectedSizeDetails.originalPrice?.toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                    Save ₹
                    {(
                      selectedSizeDetails.originalPrice -
                      selectedSizeDetails.price
                    )?.toFixed(2)}
                  </span>
                </div>

                {/* Stock Status */}
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-semibold">
                    In Stock ({product.inStock} available)
                  </span>
                </div>

                {/* Product Details Quick Info */}
                <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Origin:</span>{" "}
                      <span className="font-medium">{product.origin}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Harvest:</span>{" "}
                      <span className="font-medium">{product.harvestDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Shelf Life:</span>{" "}
                      <span className="font-medium">{product.shelfLife}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Weight:</span>{" "}
                      <span className="font-medium">{selectedSize}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <label className="text-lg font-bold text-gray-900">
                  Weight
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes?.map((size) => (
                    <button
                      key={size.weight}
                      onClick={() => {
                        setSelectedSize(size.weight),
                          setSelectvariant_id(size.id);
                      }}
                      className={`px-6 py-3 rounded-2xl border-2 font-semibold transition-all duration-200 ${
                        selectedSize === size.weight
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-center">
                        {/* <div>{size.id}</div> */}
                        <div className="font-bold">{size.weight}</div>
                        <div className="text-xs">₹{size.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <label className="text-lg font-bold text-gray-900">
                      Qty
                    </label>
                    <div className="flex items-center border-2 border-gray-200 rounded-2xl overflow-hidden">
                      <button
                        onClick={decrementQuantity}
                        className="p-3 hover:bg-gray-100 transition-colors duration-200"
                      >
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
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <span className="px-6 py-3 font-bold text-lg min-w-[60px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={incrementQuantity}
                        className="p-3 hover:bg-gray-100 transition-colors duration-200"
                      >
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
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-gray-600">
                    Total:{" "}
                    <span className="text-green-600">
                      ₹
                      {(selectedSizeDetails.price * quantity).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={addtoCart}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                >
                  Add to Cart • ₹
                  {(selectedSizeDetails.price * quantity).toLocaleString(
                    "en-IN"
                  )}
                </button>
              </div>

              {/* Product Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-2xl">
                  <div className="flex items-center space-x-2 mb-2">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-bold text-green-800">
                      Fast Delivery
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    Same day delivery available
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <div className="flex items-center space-x-2 mb-2">
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-bold text-blue-800">
                      Quality Guaranteed
                    </span>
                  </div>
                  <p className="text-sm text-blue-700">
                    100% satisfaction guarantee
                  </p>
                </div>
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-2">
                {product.certifications?.map((cert, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden mb-16">
            <div className="border-b border-gray-200 p-6">
              <div className="flex space-x-8 overflow-x-auto">
                {["description", "nutrition", "storage", "uses", "reviews"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`font-semibold text-lg capitalize whitespace-nowrap pb-2 transition-colors duration-200 ${
                        activeTab === tab
                          ? "text-green-600 border-b-2 border-green-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab === "uses" ? "How to Use" : tab}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="p-6">
              {activeTab === "description" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      About This Product
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {product.detailedDescription}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      Key Features
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.features?.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl"
                        >
                          <span className="text-lg text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-black text-green-600">
                        100%
                      </div>
                      <div className="text-sm text-gray-600">Organic</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-green-600">
                        {product.inStock}
                      </div>
                      <div className="text-sm text-gray-600">In Stock</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-green-600">
                        {product.rating}
                      </div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-green-600">
                        {product.reviewCount}
                      </div>
                      <div className="text-sm text-gray-600">Reviews</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "nutrition" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Nutrition Facts
                  </h3>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="text-lg font-bold mb-4">
                      Per {product.nutrition?.servingSize}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div>
                        <div className="text-2xl font-black text-gray-900">
                          {product.nutrition?.calories}
                        </div>
                        <div className="text-sm text-gray-600">Calories</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-gray-900">
                          {product.nutrition?.carbs}
                        </div>
                        <div className="text-sm text-gray-600">
                          Carbohydrates
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-gray-900">
                          {product.nutrition?.sugar}
                        </div>
                        <div className="text-sm text-gray-600">Sugar</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-gray-900">
                          {product.nutrition?.fiber}
                        </div>
                        <div className="text-sm text-gray-600">Fiber</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-gray-900">
                          {product.nutrition?.vitaminC}
                        </div>
                        <div className="text-sm text-gray-600">Vitamin C</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-gray-900">
                          {product.nutrition?.potassium}
                        </div>
                        <div className="text-sm text-gray-600">Potassium</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-gray-900">
                          {product.nutrition?.folate}
                        </div>
                        <div className="text-sm text-gray-600">Folate</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-gray-900">
                          {product.nutrition?.manganese}
                        </div>
                        <div className="text-sm text-gray-600">Manganese</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "storage" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Storage & Handling
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-2xl p-6">
                      <h4 className="text-xl font-bold text-blue-900 mb-4">
                        Optimal Storage Conditions
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <span className="text-blue-800 font-semibold">
                            Temperature:
                          </span>
                          <span className="text-blue-700 ml-2">
                            {product.storage?.temperature}
                          </span>
                        </div>
                        <div>
                          <span className="text-blue-800 font-semibold">
                            Humidity:
                          </span>
                          <span className="text-blue-700 ml-2">
                            {product.storage?.humidity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-2xl p-6">
                      <h4 className="text-xl font-bold text-green-900 mb-4">
                        Storage Tips
                      </h4>
                      <ul className="space-y-2">
                        {product.storage?.tips.map((tip, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <svg
                              className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
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
                            <span className="text-green-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "uses" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    How to Use & Enjoy
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.uses?.map((use, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center"
                      >
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <svg
                            className="w-6 h-6 text-green-600"
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
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                          {use}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Customer Reviews
                    </h3>
                    <button
                      onClick={openReviewModal}
                      className="bg-green-600 text-white px-6 py-2 rounded-2xl font-semibold hover:bg-green-700 transition-colors duration-200"
                    >
                      Write Review
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-50 rounded-2xl p-6 text-center">
                      <div className="text-4xl font-black text-gray-900 mb-2">
                        {product.rating}
                      </div>
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        Based on {product.reviewCount} reviews
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <div className="h-80 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {reviews.length > 0 ? (
                          reviews.map((review, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 rounded-2xl p-6"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <div className="font-bold text-gray-900">
                                    {review.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {review.date}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center">
                                    {[...Array(review.rating)].map((_, i) => (
                                      <svg
                                        key={i}
                                        className="w-4 h-4 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                  {review.verified && (
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                                      Verified
                                    </span>
                                  )}
                                </div>
                              </div>
                              <h4 className="font-bold text-gray-900 mb-2">
                                {review.title}
                              </h4>
                              <p className="text-gray-700 mb-3">
                                {review.comment}
                              </p>
                              <div className="flex items-center justify-between">
                                <button className="text-gray-500 hover:text-green-600 text-sm flex items-center space-x-1">
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
                                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                    />
                                  </svg>
                                  <span>Helpful ({review.helpful})</span>
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-600">
                            No reviews yet. Be the first to share your
                            experience!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-gray-900">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{item.discount}% OFF
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <div className="text-sm text-gray-500 mb-2">
                      {item.weight}
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(item.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.720c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({item.rating})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl font-black text-green-600">
                        ₹{item.price}
                      </div>
                      <div className="text-sm text-gray-400 line-through">
                        ₹{item.originalPrice}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Write a Review
              </h2>
              <button
                onClick={closeReviewModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6 text-gray-500"
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

            <form onSubmit={submitReview} className="p-6 space-y-6">
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Rating *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleReviewFormChange("rating", star)}
                      className="p-1 transition-colors duration-200"
                    >
                      <svg
                        className={`w-8 h-8 ${
                          star <= reviewForm.rating
                            ? "text-yellow-400"
                            : "text-gray-300 hover:text-yellow-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                  <span className="ml-3 text-gray-600">
                    {reviewForm.rating === 0
                      ? "Select rating"
                      : reviewForm.rating === 1
                      ? "Poor"
                      : reviewForm.rating === 2
                      ? "Fair"
                      : reviewForm.rating === 3
                      ? "Good"
                      : reviewForm.rating === 4
                      ? "Very Good"
                      : "Excellent"}
                  </span>
                </div>
                {reviewErrors.rating && (
                  <p className="text-red-500 text-sm mt-1">
                    {reviewErrors.rating}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={reviewForm.name}
                    onChange={(e) =>
                      handleReviewFormChange("name", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                  {reviewErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {reviewErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={reviewForm.email}
                    onChange={(e) =>
                      handleReviewFormChange("email", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                  {reviewErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {reviewErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-2">
                  Review Title *
                </label>
                <input
                  type="text"
                  value={reviewForm.title}
                  onChange={(e) =>
                    handleReviewFormChange("title", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Give your review a title"
                />
                {reviewErrors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {reviewErrors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-2">
                  Your Review *
                </label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) =>
                    handleReviewFormChange("comment", e.target.value)
                  }
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Share your experience with this product..."
                />
                <div className="flex justify-between items-center mt-1">
                  {reviewErrors.comment && (
                    <p className="text-red-500 text-sm">
                      {reviewErrors.comment}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 ml-auto">
                    {reviewForm.comment.length} characters
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="recommend"
                  checked={reviewForm.recommend}
                  onChange={(e) =>
                    handleReviewFormChange("recommend", e.target.checked)
                  }
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label
                  htmlFor="recommend"
                  className="text-gray-700 font-medium"
                >
                  I would recommend this product to others
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={closeReviewModal}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:border-gray-400 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className={`flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-2xl transition-all duration-200 ${
                    isSubmittingReview
                      ? "opacity-75 cursor-not-allowed"
                      : "hover:bg-green-700 hover:shadow-lg"
                  }`}
                >
                  {isSubmittingReview ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
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
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <span className="text-xl font-black">Fresh Market</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Premium organic groceries delivered fresh to your doorstep
                across India.
              </p>
            </div>
            {[
              {
                title: "Shop",
                links: ["All Products", "Fruits", "Vegetables", "Dairy"],
              },
              {
                title: "Support",
                links: ["Contact", "FAQ", "Returns", "Shipping"],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Press", "Blog"],
              },
            ].map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-bold text-lg">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Fresh Market. All rights reserved. Made in India 🇮🇳
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;
