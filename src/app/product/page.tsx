"use client";
import Header from "@src/component/components/header";
import { useProductList, useAddWishList } from "@src/hooks/apiHooks";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const EcommerceProductListing3x3 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [processingWishlist, setProcessingWishlist] = useState(false);

  // Wishlist state - stores product IDs that have been added to wishlist
  const [wishlistItems, setWishlistItems] = useState([]);
  const [userId, setUserId] = useState(null);

  const itemsPerPage = 9;

  // API Hooks
  const {
    isError,
    isLoading,
    data: productData,
    error,
    mutate: fetchProducts,
  } = useProductList();

  const { mutate: addToWishlistAPI, isLoading: isAddingToWishlist } = useAddWishList();

  // Initialize user and wishlist on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // Get user_id from localStorage or your auth system
        const storedUserId = localStorage.getItem("user_id");
        
        if (!storedUserId) {
          console.warn("No user_id found in localStorage. Setting default user_id.");
          localStorage.setItem("user_id", "1"); // Set default for demo
          setUserId("1");
        } else {
          setUserId(storedUserId);
        }
        
        // Load wishlist from localStorage as fallback
        try {
          const savedWishlist = localStorage.getItem("wishlist");
          if (savedWishlist) {
            const parsedWishlist = JSON.parse(savedWishlist);
            if (Array.isArray(parsedWishlist)) {
              setWishlistItems(parsedWishlist);
            } else {
              console.error("Invalid wishlist format in localStorage");
              localStorage.removeItem("wishlist");
            }
          }
        } catch (parseError) {
          console.error("Error parsing wishlist from localStorage:", parseError);
          localStorage.removeItem("wishlist");
        }
      }
    } catch (error) {
      console.error("Error initializing user and wishlist:", error);
      toast.error("Failed to initialize user session");
    }
  }, []);

  // Fetch products on mount
  useEffect(() => {
    try {
      fetchProducts({});
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  }, [fetchProducts]);

  // Success/Error handling for product fetch
  useEffect(() => {
    try {
      if (productData && !isLoading) {
        const message = productData?.message || "Products loaded successfully!";
        toast.success(`🎉 ${message}`);
      }
      if (isError) {
        const errorMessage = error?.message || error || "Failed to load products. Please try again.";
        console.error("Product fetch error:", errorMessage);
        toast.error(`🔒 ${errorMessage}`);
      }
    } catch (err) {
      console.error("Error in product data handling:", err);
    }
  }, [productData, isLoading, error, isError]);

  // Persist wishlist to localStorage
  useEffect(() => {
    try {
      if (wishlistItems && wishlistItems.length >= 0) {
        localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
      }
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
    }
  }, [wishlistItems]);

  // Map fetched products to component format
  const products = React.useMemo(() => {
    try {
      if (!productData?.data?.data || !Array.isArray(productData.data.data)) {
        return [];
      }

      return productData.data.data.map((p) => {
        try {
          return {
            id: p.product_id,
            name: p.name || "Unnamed Product",
            price: parseFloat(p.price) || 0,
            originalPrice: parseFloat(p.price) * 1.15 || 0,
            category: p.category?.name || "Uncategorized",
            image: p.images?.[0]?.url || "https://via.placeholder.com/400?text=No+Image",
            rating: p.reviews?.length > 0 
              ? (p.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / p.reviews.length) 
              : 4.5,
            reviews: p.reviews?.length || 0,
            inStock: p.stock > 0 && p.inStock === "AVILABLE",
            unit: "1 unit",
            badge: p.isPerishable ? "Perishable" : p.isFeatured ? "Featured" : "Organic",
            badgeColor: p.isPerishable ? "bg-orange-600" : p.isFeatured ? "bg-blue-600" : "bg-green-600",
            description: p.description || "",
          };
        } catch (err) {
          console.error("Error mapping product:", p, err);
          return null;
        }
      }).filter(Boolean);
    } catch (error) {
      console.error("Error processing products:", error);
      return [];
    }
  }, [productData]);

  // Dynamically generate categories
  const categories = React.useMemo(() => {
    try {
      return ["All", ...new Set(products.map((p) => p.category))];
    } catch (error) {
      console.error("Error generating categories:", error);
      return ["All"];
    }
  }, [products]);

  // Check if product is in wishlist (permanently added)
  const isInWishlist = (productId) => {
    try {
      if (!productId || !Array.isArray(wishlistItems)) return false;
      return wishlistItems.includes(productId);
    } catch (error) {
      console.error("Error checking wishlist status:", error);
      return false;
    }
  };

  // Add to wishlist - once added, button is removed permanently
  const handleAddToWishlist = async (productId) => {
    // Validation checks
    if (!productId) {
      toast.error("Invalid product. Please try again.");
      console.error("handleAddToWishlist called with invalid productId:", productId);
      return;
    }

    if (!userId) {
      toast.error("Please login to manage your wishlist");
      console.warn("No user_id available for wishlist operation");
      return;
    }

    if (processingWishlist || isAddingToWishlist) {
      toast.error("Please wait for the current operation to complete");
      return;
    }

    // Check if already in wishlist
    if (isInWishlist(productId)) {
      toast.info("Already added to wishlist!");
      return;
    }

    const toastId = toast.loading("Adding to wishlist...");
    
    try {
      setProcessingWishlist(true);

      // Call API
      await new Promise((resolve, reject) => {
        addToWishlistAPI(
          {
    "user_id": "89c03353-6c44-443a-80fa-cf79da22d2db",
    "product_id": "f5b8fae7-3873-4835-a5ef-8330cd0440c6"
},
          {
            onSuccess: (response) => {
              try {
                // Add product ID to wishlist state
                setWishlistItems((prev) => {
                  // Prevent duplicates
                  if (prev.includes(productId)) return prev;
                  return [...prev, productId];
                });

                toast.success("💚 Added to wishlist successfully!", { id: toastId });
                resolve(response);
              } catch (err) {
                console.error("Error processing add wishlist response:", err);
                reject(err);
              }
            },
            onError: (error) => {
              console.error("API Error adding to wishlist:", error);
              reject(error);
            },
          }
        );
      });
    } catch (error) {
      // Handle different error types
      let errorMessage = "Failed to add to wishlist";
      
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      console.error("Error in handleAddToWishlist:", {
        error,
        productId,
        userId,
        errorMessage,
      });

      toast.error(errorMessage, { id: toastId });
      throw error;
    } finally {
      setProcessingWishlist(false);
    }
  };

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    try {
      return products
        .filter((product) => {
          try {
            const matchesSearch =
              product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory =
              selectedCategory === "All" || product.category === selectedCategory;
            const matchesPrice =
              priceFilter === "all" ||
              (priceFilter === "under-100" && product.price < 100) ||
              (priceFilter === "100-300" && product.price >= 100 && product.price <= 300) ||
              (priceFilter === "over-300" && product.price > 300);
            return matchesSearch && matchesCategory && matchesPrice;
          } catch (err) {
            console.error("Error filtering product:", product, err);
            return false;
          }
        })
        .sort((a, b) => {
          try {
            switch (sortBy) {
              case "price-low":
                return a.price - b.price;
              case "price-high":
                return b.price - a.price;
              case "rating":
                return b.rating - a.rating;
              case "name":
                return a.name.localeCompare(b.name);
              case "newest":
                return b.id - a.id;
              default:
                return 0;
            }
          } catch (err) {
            console.error("Error sorting products:", err);
            return 0;
          }
        });
    } catch (error) {
      console.error("Error in filteredProducts:", error);
      return [];
    }
  }, [products, searchTerm, selectedCategory, priceFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, priceFilter, sortBy]);

  // Mobile Search Component
  const MobileSearch = () => (
    <div className="lg:hidden p-3 sm:p-4 bg-white border-b border-gray-200">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5"
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
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );

  // Enhanced Sidebar Component
  const Sidebar = () => (
    <aside className={`
      ${isFilterOpen ? "fixed inset-0 z-50 bg-black/50 lg:relative lg:bg-transparent" : "hidden"}
      lg:block lg:w-64 lg:flex-shrink-0
    `}>
      <div className={`
        ${isFilterOpen ? "fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] overflow-y-auto" : ""}
        lg:relative lg:w-full
        bg-white rounded-none lg:rounded-2xl p-4 sm:p-6 border-0 lg:border border-gray-200 lg:sticky lg:top-24 shadow-xl lg:shadow-sm
      `}>
        {/* Close button for mobile */}
        {isFilterOpen && (
          <button
            onClick={() => setIsFilterOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsFilterOpen(false);
                }}
                className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-200 text-sm sm:text-base ${
                  selectedCategory === category
                    ? "bg-green-100 text-green-800 font-semibold border-2 border-green-200"
                    : "text-gray-600 hover:bg-gray-50 border-2 border-transparent"
                }`}
              >
                <span className="flex items-center justify-between">
                  <span className="truncate pr-2">{category}</span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded-full flex-shrink-0">
                    {products.filter((p) => category === "All" || p.category === category).length}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Price Range</h3>
          <div className="space-y-2">
            {[
              { value: "all", label: "All Prices" },
              { value: "under-100", label: "Under ₹100" },
              { value: "100-300", label: "₹100 - ₹300" },
              { value: "over-300", label: "Over ₹300" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center cursor-pointer p-2.5 sm:p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <input
                  type="radio"
                  name="price"
                  value={option.value}
                  checked={priceFilter === option.value}
                  onChange={(e) => {
                    setPriceFilter(e.target.value);
                    setIsFilterOpen(false);
                  }}
                  className="text-green-600 focus:ring-green-500 w-4 h-4"
                />
                <span className="text-gray-700 ml-3 font-medium text-sm sm:text-base">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Wishlist Summary */}
        <div className="mb-6 p-3 sm:p-4 bg-red-50 rounded-xl border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-800 font-semibold text-sm sm:text-base">My Wishlist</span>
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {wishlistItems.length}
            </span>
          </div>
          <p className="text-xs text-red-700">
            {wishlistItems.length > 0 ? "Items saved for later" : "No items yet"}
          </p>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 sm:p-4 border border-green-200">
          <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{products.length}</div>
          <div className="text-xs sm:text-sm text-green-800 font-semibold">Total Products</div>
          <div className="text-xs text-green-700 mt-2 flex flex-wrap items-center gap-2">
            <span>✓ Fresh</span>
            <span>✓ Organic</span>
            <span>✓ Quality</span>
          </div>
        </div>
      </div>
    </aside>
  );

  // Enhanced Toolbar Component
  const Toolbar = () => (
    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 border border-gray-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0 gap-3">
        <div className="flex items-center space-x-3 flex-wrap">
          <span className="text-gray-600 font-medium text-sm sm:text-base">
            <span className="font-bold text-gray-900 text-lg sm:text-xl">{filteredProducts.length}</span>
            <span className="text-gray-500 ml-1">products</span>
          </span>
          {(searchTerm || selectedCategory !== "All" || priceFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setPriceFilter("all");
              }}
              className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Clear</span>
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
          <button
            className="lg:hidden flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            <span className="hidden sm:inline">Filters</span>
          </button>

          <div className="flex items-center space-x-2">
            <label className="text-xs sm:text-sm text-gray-600 font-medium hidden sm:inline">Sort:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg sm:rounded-xl px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            >
              <option value="featured">Featured</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div className="hidden sm:flex items-center bg-gray-100 rounded-xl p-1">
            {["grid", "list"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === mode
                    ? "bg-white shadow-sm text-green-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d={
                      mode === "grid"
                        ? "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        : "M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    }
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Product Card Component
  const ProductCard = ({ product }) => {
    const productInWishlist = isInWishlist(product.id);
    const isProcessing = isAddingToWishlist || processingWishlist;

    return (
      <div className="group bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl hover:border-green-300 transition-all duration-300 sm:hover:-translate-y-2">
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400?text=No+Image";
            }}
          />
          <div className={`absolute top-2 sm:top-4 left-2 sm:left-4 ${product.badgeColor} text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg`}>
            {product.badge}
          </div>
          {product.originalPrice > product.price && (
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-red-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg">
              Save ₹{(product.originalPrice - product.price).toFixed(0)}
            </div>
          )}
          
          {/* Heart button - only show if NOT in wishlist */}
          {!productInWishlist && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToWishlist(product.id);
              }}
              disabled={isProcessing}
              className={`absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 ${
                isProcessing ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              aria-label="Add to wishlist"
            >
              {isProcessing ? (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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
              )}
            </button>
          )}
        </div>

        <div className="p-3 sm:p-4 lg:p-5">
          <div className="mb-2 sm:mb-3">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight mb-1 group-hover:text-green-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">{product.unit}</p>
          </div>

          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs sm:text-sm text-gray-500 ml-1.5 sm:ml-2 font-medium">({product.reviews})</span>
            </div>
            {product.inStock && (
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1"></div>
                <span className="text-xs text-green-600 font-semibold">In Stock</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">₹{product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm sm:text-base text-gray-400 line-through font-medium">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.originalPrice > product.price && (
              <div className="bg-red-100 text-red-800 text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </div>
            )}
          </div>

          <Link href={`/productdetails/${product.id}`} className="block">
            <button
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2 sm:py-2.5 lg:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!product.inStock}
            >
              {product.inStock ? (
                <span className="flex items-center justify-center space-x-1.5 sm:space-x-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>View Details</span>
                </span>
              ) : (
                "Out of Stock"
              )}
            </button>
          </Link>
        </div>
      </div>
    );
  };

  // Enhanced Products Grid Component
  const ProductsGrid = () => (
    <div>
      {isLoading ? (
        <div className="text-center py-12 sm:py-16">
          <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-green-600 mb-4"></div>
          <p className="text-gray-600 text-base sm:text-lg">Loading products...</p>
        </div>
      ) : paginatedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 mt-8 sm:mt-12 px-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl disabled:opacity-50 hover:bg-gray-50 transition-colors flex items-center space-x-1 sm:space-x-2 font-medium text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex items-center space-x-1 sm:space-x-2">
                {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                  const page = currentPage <= 3 ? index + 1 : currentPage - 2 + index;
                  if (page > totalPages) return null;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl transition-all font-semibold text-sm sm:text-base ${
                        currentPage === page
                          ? "bg-green-600 text-white shadow-lg transform scale-110"
                          : "border border-gray-300 hover:bg-gray-50 hover:border-green-300"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl disabled:opacity-50 hover:bg-gray-50 transition-colors flex items-center space-x-1 sm:space-x-2 font-medium text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Next</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 sm:py-16 px-4">
          <div className="text-gray-400 mb-4 sm:mb-6">
            <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">No products found</h3>
          <p className="text-gray-500 text-base sm:text-lg mb-4 sm:mb-6">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setPriceFilter("all");
            }}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg sm:rounded-xl hover:bg-green-700 transition-colors font-semibold text-sm sm:text-base"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );

  // Enhanced Footer Component
  const Footer = () => (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 sm:py-16 mt-12 sm:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center mr-2 sm:mr-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-bold">FreshMarket</span>
            </div>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              Fresh groceries delivered straight to your door with quality guarantee
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {["facebook", "twitter", "instagram"].map((social) => (
                <div key={social} className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-current"></div>
                </div>
              ))}
            </div>
          </div>

          {[
            { title: "Shop", links: ["Fruits", "Vegetables", "Dairy", "All Products"] },
            { title: "Help", links: ["Contact Us", "FAQ", "Returns", "Shipping Info"] },
            { title: "Company", links: ["About Us", "Careers", "Press", "Blog"] },
          ].map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">{section.title}</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="hover:text-white transition-colors hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-6 sm:pt-8 mt-8 sm:mt-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">© 2025 FreshMarket. All rights reserved.</p>
          <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="fixed top-0 w-full z-50 shadow-sm">
        <Header />
      </div>

      <div className="pt-16 sm:pt-20">
        <MobileSearch />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
            Discover fresh, quality products delivered to your door
          </p>
        </div>

        <div className="flex gap-4 sm:gap-6 lg:gap-8">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <Toolbar />
            <ProductsGrid />
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default EcommerceProductListing3x3;
