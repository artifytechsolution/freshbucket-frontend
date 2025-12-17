"use client";
import Header from "@src/component/components/header";
import MobileBottomFooter from "@src/component/components/MobileFooter";
import React, { useState, useEffect, useRef } from "react";

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
    }, 5000);
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
      { threshold: 0.1, rootMargin: "-50px" }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      number: "75K+",
      label: "Happy Families",
      icon: "👨‍👩‍👧‍👦",
      color: "bg-green-100 text-green-800",
    },
    {
      number: "3000+",
      label: "Fresh Products",
      icon: "🥦",
      color: "bg-blue-100 text-blue-800",
    },
    {
      number: "850+",
      label: "Partner Farms",
      icon: "🚜",
      color: "bg-orange-100 text-orange-800",
    },
    {
      number: "4.9★",
      label: "Customer Rating",
      icon: "⭐",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      rating: 5,
      text: "FreshBucket has transformed our family's eating habits. The organic vegetables are always crisp and flavorful. Delivery is super fast!",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b1a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      orders: "180+ orders",
      duration: "Customer for 2 years",
      highlight: "Family health transformed",
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi, NCR",
      rating: 5,
      text: "As a health-conscious individual, I appreciate the quality of fruits from FreshBucket. They taste like they're straight from the farm!",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      orders: "120+ orders",
      duration: "Customer for 18 months",
      highlight: "Farm-fresh taste",
    },
    {
      name: "Sneha Gupta",
      location: "Bangalore, Karnataka",
      rating: 5,
      text: "The seasonal fruits selection is amazing! My kids love the sweet mangoes and crisp apples. Best quality produce I've found online.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      orders: "250+ orders",
      duration: "Customer for 3 years",
      highlight: "Kids love it!",
    },
    {
      name: "Vikram Patel",
      location: "Ahmedabad, Gujarat",
      rating: 5,
      text: "Perfect for working professionals! Fresh vegetables delivered at 7 AM before I leave for work. Saves me hours every week.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      orders: "95+ orders",
      duration: "Customer for 1 year",
      highlight: "Time-saving delivery",
    },
  ];

  const tabContent = {
    mission: {
      title: "Our Mission",
      subtitle: "Freshness Delivered in 60 minutes",
      content:
        "To revolutionize how India eats by delivering farm-fresh, 100% organic fruits and vegetables directly to urban households within 60 minutes. We make healthy eating convenient, affordable, and accessible for every Indian family.",
      points: [
        "30-minute delivery guarantee across metro cities",
        "Direct sourcing from certified organic farms",
        "Rigorous 7-point quality check for every product",
        "Supporting sustainable farming communities",
      ],
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      cta: "Shop Fresh Now",
    },
    vision: {
      title: "Our Vision",
      subtitle: "India's #1 Fresh Food Platform",
      content:
        "To become India's most trusted and largest fresh produce delivery platform, serving 1 million households daily while supporting 10,000+ farmers with sustainable livelihoods.",
      points: [
        "Carbon-neutral delivery by 2025",
        "Empowering 10,000+ small farmers",
        "Pan-India presence in 50+ cities",
        "Zero food waste commitment",
      ],
      image:
        "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      cta: "Join Our Journey",
    },
    values: [
      {
        title: "Freshness Guarantee",
        desc: "Delivered within 24 hours of harvest. No preservatives, no chemicals.",
        icon: "🍎",
        color: "bg-green-50",
      },
      {
        title: "Farm-to-Door",
        desc: "Direct from farmer to you. Eliminating middlemen, ensuring fair prices.",
        icon: "👨‍🌾",
        color: "bg-yellow-50",
      },
      {
        title: "Quality Certified",
        desc: "Every item undergoes strict quality checks. 100% satisfaction guarantee.",
        icon: "✅",
        color: "bg-blue-50",
      },
      {
        title: "Sustainable Future",
        desc: "Eco-friendly packaging. Supporting organic farming practices.",
        icon: "🌱",
        color: "bg-emerald-50",
      },
      {
        title: "Customer First",
        desc: "24/7 support. Easy returns. Your satisfaction is our priority.",
        icon: "❤️",
        color: "bg-red-50",
      },
      {
        title: "Transparent Pricing",
        desc: "No hidden charges. Farmers receive 30% more than traditional markets.",
        icon: "💰",
        color: "bg-purple-50",
      },
    ],
  };

  const features = [
    {
      title: "Farm Fresh Produce",
      description:
        "Hand-picked daily from certified organic farms across India",
      icon: "🚜",
      color: "text-green-600 bg-green-50",
      details: ["100% Organic", "No Chemicals", "Daily Harvest"],
    },
    {
      title: "30-Minute Delivery",
      description: "Fastest fresh produce delivery in India",
      icon: "⚡",
      color: "text-yellow-600 bg-yellow-50",
      details: ["Metro Cities", "Early Morning Delivery", "On-time Guarantee"],
    },
    {
      title: "Zero Chemicals",
      description: "Completely pesticide-free fruits & vegetables",
      icon: "🌿",
      color: "text-emerald-600 bg-emerald-50",
      details: ["Certified Organic", "Safe for Kids", "Health First"],
    },
    {
      title: "Easy Returns",
      description: "100% satisfaction or your money back",
      icon: "🔄",
      color: "text-blue-600 bg-blue-50",
      details: ["24-hour Returns", "No Questions Asked", "Instant Refunds"],
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Farm Selection",
      description: "Carefully selected certified organic farms",
      icon: "🌾",
      detail: "Partnered with 850+ farms across India",
    },
    {
      step: "2",
      title: "Quality Check",
      description: "7-point quality inspection",
      icon: "🔍",
      detail: "Size, Color, Freshness, Ripeness, Texture, Aroma, Taste",
    },
    {
      step: "3",
      title: "Fast Processing",
      description: "Order packed in 15 minutes",
      icon: "⚡",
      detail: "Temperature-controlled packing",
    },
    {
      step: "4",
      title: "Quick Delivery",
      description: "At your doorstep in 60 minutes",
      icon: "🚚",
      detail: "Real-time tracking available",
    },
  ];

  const categories = [
    {
      name: "Seasonal Fruits",
      items: ["Mangoes", "Apples", "Bananas", "Oranges", "Pomegranates"],
      icon: "🍓",
    },
    {
      name: "Fresh Vegetables",
      items: ["Tomatoes", "Potatoes", "Onions", "Spinach", "Carrots"],
      icon: "🥦",
    },
    {
      name: "Exotic Produce",
      items: ["Avocados", "Kiwis", "Broccoli", "Bell Peppers", "Zucchini"],
      icon: "🥑",
    },
    {
      name: "Leafy Greens",
      items: ["Spinach", "Lettuce", "Kale", "Coriander", "Mint"],
      icon: "🥬",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Enhanced CSS Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
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

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -8px rgba(0, 0, 0, 0.1);
        }

        .hero-gradient {
          background: linear-gradient(135deg, #16a34a 0%, #059669 100%);
        }

        .mobile-tap-highlight {
          -webkit-tap-highlight-color: transparent;
        }

        .text-balance {
          text-wrap: balance;
        }

        /* Mobile-specific styles */
        @media (max-width: 768px) {
          .mobile-padding {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .mobile-scroll {
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .mobile-scroll::-webkit-scrollbar {
            display: none;
          }

          .mobile-full-width {
            width: 100vw;
            position: relative;
            left: 50%;
            right: 50%;
            margin-left: -50vw;
            margin-right: -50vw;
          }

          .mobile-safe-bottom {
            padding-bottom: env(safe-area-inset-bottom, 1rem);
          }
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>

      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <main className="">
        {/* Hero Section - Enhanced for Mobile */}
        <section
          id="hero"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="hero-gradient text-white min-h-[90vh] md:min-h-screen flex items-center justify-center relative overflow-hidden text-center"
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10 w-full flex flex-col items-center">
            <div
              className={`${
                isVisible.hero ? "fade-in" : ""
              } w-full flex flex-col items-center`}
            >
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/30">
                <span className="mr-2 animate-pulse">🥇</span>
                <span>India's #1 Fresh Produce Delivery</span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight">
                Farm Fresh
                <br />
                <span className="text-green-200 block mt-2">To Your Table</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-2xl mb-10 leading-relaxed">
                We deliver the freshest organic fruits and vegetables directly
                from farms to your home in just 60 minutes. Experience real
                freshness.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full mb-12">
                <button className="bg-white text-green-600 px-8 py-4 text-base sm:text-lg font-bold hover:bg-green-50 transition-all duration-300 rounded-lg active:scale-95">
                  🛍️ Start Shopping Now
                </button>
                <button className="border-2 border-white text-white px-8 py-4 text-base sm:text-lg font-bold hover:bg-white hover:text-green-600 transition-all duration-300 rounded-lg active:scale-95">
                  📱 Download App
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-md w-full">
                <div className="p-3 bg-white/10 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold">4.9/5</div>
                  <div className="text-green-200 text-xs sm:text-sm">
                    ⭐ Rating
                  </div>
                </div>
                <div className="p-3 bg-white/10 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold">60 min</div>
                  <div className="text-green-200 text-xs sm:text-sm">
                    ⚡ Delivery
                  </div>
                </div>
                <div className="p-3 bg-white/10 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold">75K+</div>
                  <div className="text-green-200 text-xs sm:text-sm">
                    👪 Families
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
            </div>
          </div>
        </section>

        {/* Features Section - Enhanced for Mobile */}
        <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${
                    isVisible.hero ? "slide-up" : ""
                  } bg-white p-4 sm:p-6 rounded-xl shadow-sm hover-lift border border-gray-100 active:scale-95 mobile-tap-highlight`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${feature.color} flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3">
                    {feature.description}
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {feature.details.map((detail, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Categories - New Section for E-commerce */}
        <section className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
                Fresh <span className="text-green-600">Categories</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                Discover our wide range of fresh, organic produce
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 hover-lift border border-green-100 active:scale-95 mobile-tap-highlight"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center text-xl sm:text-2xl">
                      {category.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      {category.name}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-gray-700 text-sm sm:text-base"
                      >
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-4 sm:mt-6 w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 active:scale-95">
                    Shop Now →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values Section - Enhanced */}
        <section
          id="about"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="py-8 sm:py-12 md:py-20 bg-gray-50"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div
              className={`text-center mb-8 sm:mb-12 md:mb-16 ${
                isVisible.about ? "fade-in" : ""
              }`}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
                Why <span className="text-green-600">FreshBucket?</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                India's fastest fresh produce delivery, directly from farms
              </p>
            </div>

            {/* Mobile-optimized Tab Navigation */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <div className="flex overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4">
                <div className="flex gap-1 sm:gap-2 min-w-max">
                  {["mission", "vision", "values"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-300 rounded-lg whitespace-nowrap mobile-tap-highlight ${
                        activeTab === tab
                          ? "bg-green-600 text-white shadow-md"
                          : "bg-white text-gray-600 hover:text-green-600 border border-gray-200"
                      }`}
                    >
                      {tab === "values"
                        ? "Our Values"
                        : `Our ${tab.charAt(0).toUpperCase() + tab.slice(1)}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className={`${isVisible.about ? "slide-up" : ""}`}>
              {activeTab !== "values" ? (
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-lg border border-gray-100">
                  <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 items-center">
                    <div className="order-2 lg:order-1 lg:w-1/2">
                      <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-3 sm:mb-4">
                        {tabContent[activeTab].title}
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-3 sm:mb-4">
                        {tabContent[activeTab].subtitle}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                        {tabContent[activeTab].content}
                      </p>
                      <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                        {tabContent[activeTab].points.map((point, index) => (
                          <li
                            key={index}
                            className="flex items-start text-gray-700"
                          >
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 sm:mr-3 mt-0.5 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-sm sm:text-base">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors duration-200 active:scale-95 mobile-tap-highlight w-full sm:w-auto">
                        {tabContent[activeTab].cta} →
                      </button>
                    </div>
                    <div className="order-1 lg:order-2 lg:w-1/2 w-full">
                      <div className="relative">
                        <img
                          src={tabContent[activeTab].image}
                          alt={tabContent[activeTab].title}
                          className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg sm:rounded-xl shadow-lg"
                        />
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                          <span className="text-green-600 font-bold">
                            🥦 Fresh Produce
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {tabContent.values.map((value, index) => (
                    <div
                      key={index}
                      className={`${value.color} p-4 sm:p-6 rounded-xl border border-gray-100 hover-lift active:scale-95 mobile-tap-highlight`}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center text-xl sm:text-2xl shadow-sm">
                          {value.icon}
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                            {value.title}
                          </h4>
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                            {value.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Statistics Section - Enhanced */}
        <section
          id="stats"
          ref={(el) => (sectionsRef.current[2] = el)}
          className="py-8 sm:py-12 md:py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className={`${
                isVisible.stats ? "fade-in" : ""
              } mb-8 sm:mb-12 md:mb-16`}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4">
                Fresh Numbers
              </h2>
              <p className="text-green-100 text-sm sm:text-base md:text-lg">
                Making healthy eating accessible across India
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`${
                    isVisible.stats ? "scale-in" : ""
                  } bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 hover:bg-white/20 transition-colors duration-300 mobile-tap-highlight`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-black mb-1">
                    {stat.number}
                  </div>
                  <div className="text-green-100 font-medium text-xs sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Process Section - Enhanced */}
        <section className="py-8 sm:py-12 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
                From <span className="text-green-600">Farm to Home</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                Your fresh produce journey in just 4 steps
              </p>
            </div>

            <div className="relative">
              {/* Mobile process line */}
              <div className="hidden sm:block absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
                {processSteps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover-lift border border-gray-100 active:scale-95 mobile-tap-highlight h-full">
                      <div className="absolute -top-2 -left-2 sm:relative sm:top-0 sm:left-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold shadow-lg">
                          {step.step}
                        </div>
                      </div>
                      <div className="ml-8 sm:ml-0 sm:text-center">
                        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">
                          {step.icon}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm mb-2">
                          {step.description}
                        </p>
                        <div className="text-green-600 text-xs sm:text-sm font-medium">
                          {step.detail}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Enhanced */}

        {/* Call to Action Section - Enhanced */}
        <section
          id="cta"
          ref={(el) => (sectionsRef.current[4] = el)}
          className="py-8 sm:py-12 md:py-20 bg-gradient-to-r from-gray-900 to-green-900 text-white text-center"
        >
          <div
            className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 ${
              isVisible.cta ? "fade-in" : ""
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6">
              Start Your Fresh Journey
              <br />
              <span className="text-green-400">Today!</span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
              Join 75,000+ families who trust FreshBucket for daily fresh
              produce. Experience farm-fresh quality delivered to your doorstep.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="bg-green-600 text-white px-6 py-3 sm:py-4 text-base sm:text-lg font-bold hover:bg-green-700 transition-all duration-300 hover-lift rounded-lg active:scale-95 mobile-tap-highlight flex items-center justify-center gap-2 w-full sm:w-auto">
                <span>🛒</span>
                <span>Shop Fresh Now</span>
              </button>
              <button className="border-2 border-gray-600 text-gray-300 px-6 py-3 sm:py-4 text-base sm:text-lg font-bold hover:border-gray-400 hover:text-white transition-all duration-300 rounded-lg active:scale-95 mobile-tap-highlight flex items-center justify-center gap-2 w-full sm:w-auto">
                <span>📱</span>
                <span>Download App</span>
              </button>
            </div>

            {/* App Availability */}
            <div className="mt-6 sm:mt-8 md:mt-12">
              <p className="text-gray-400 text-xs sm:text-sm mb-3">
                Available on all platforms
              </p>
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>iOS & Android</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-gray-700"></div>
                <div className="flex items-center gap-2">
                  <span>⭐</span>
                  <span>4.9/5 Rating</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-gray-700"></div>
                <div className="flex items-center gap-2">
                  <span>⚡</span>
                  <span>30-min Delivery</span>
                </div>
              </div>
            </div>

            {/* Download Badges */}
          </div>
        </section>

        {/* Enhanced Footer with Better Mobile Support */}
        <footer className="bg-gray-900 text-white mobile-safe-bottom">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Company Info */}
              <div>
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-lg sm:text-xl">🥦</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black">
                      FreshBucket
                    </h3>
                    <p className="text-green-400 text-xs sm:text-sm font-bold">
                      Farm Fresh • Fast Delivery
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4 text-xs sm:text-sm">
                  Your trusted partner for fresh, organic fruits and vegetables
                  delivered daily across India.
                </p>
                <div className="flex gap-2">
                  <a
                    href="#"
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all duration-300 active:scale-95 mobile-tap-highlight"
                  >
                    <span className="text-gray-300">📱</span>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all duration-300 active:scale-95 mobile-tap-highlight"
                  >
                    <span className="text-gray-300">📷</span>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-base sm:text-lg font-black mb-3 sm:mb-4">
                  Quick Links
                </h4>
                <nav className="space-y-2">
                  <a
                    href="/"
                    className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm active:scale-95 mobile-tap-highlight"
                  >
                    🏠 Home
                  </a>
                  <a
                    href="/products/fruits"
                    className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm active:scale-95 mobile-tap-highlight"
                  >
                    🍎 Shop Fruits
                  </a>
                  <a
                    href="/products/vegetables"
                    className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm active:scale-95 mobile-tap-highlight"
                  >
                    🥦 Shop Vegetables
                  </a>
                  <a
                    href="/about"
                    className="block text-green-400 transition-colors duration-200 text-sm font-bold active:scale-95 mobile-tap-highlight"
                  >
                    ℹ️ About Us
                  </a>
                </nav>
              </div>

              {/* Fresh Categories */}
              <div>
                <h4 className="text-base sm:text-lg font-black mb-3 sm:mb-4">
                  Fresh Categories
                </h4>
                <nav className="space-y-2">
                  <a
                    href="/category/seasonal-fruits"
                    className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm active:scale-95 mobile-tap-highlight"
                  >
                    🍓 Seasonal Fruits
                  </a>
                  <a
                    href="/category/leafy-vegetables"
                    className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm active:scale-95 mobile-tap-highlight"
                  >
                    🥬 Leafy Vegetables
                  </a>
                  <a
                    href="/category/exotic-fruits"
                    className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm active:scale-95 mobile-tap-highlight"
                  >
                    🥑 Exotic Fruits
                  </a>
                  <a
                    href="/category/organic-vegetables"
                    className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm active:scale-95 mobile-tap-highlight"
                  >
                    🌱 Organic Vegetables
                  </a>
                </nav>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-base sm:text-lg font-black mb-3 sm:mb-4">
                  Contact Us
                </h4>
                <div className="space-y-2 sm:space-y-3">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm active:scale-95 mobile-tap-highlight"
                  >
                    <span className="text-green-400">📞</span>
                    <span>+91 98765 43210</span>
                  </a>
                  <a
                    href="mailto:hello@freshbucket.com"
                    className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm active:scale-95 mobile-tap-highlight"
                  >
                    <span className="text-green-400">📧</span>
                    <span>hello@freshbucket.com</span>
                  </a>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <span className="text-green-400">🕒</span>
                    <span>6 AM - 11 PM Daily</span>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="mt-4">
                  <p className="text-xs text-gray-400 mb-2">
                    Get fresh updates
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium active:scale-95 mobile-tap-highlight">
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
              <div className="flex flex-col lg:flex-row justify-between items-center">
                <div className="text-gray-400 text-xs mb-4 lg:mb-0 text-center lg:text-left">
                  © 2025 FreshBucket. All rights reserved. Made with ❤️ for
                  healthy Indian families.
                </div>
                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 active:scale-95 mobile-tap-highlight"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 active:scale-95 mobile-tap-highlight"
                  >
                    Terms of Service
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 active:scale-95 mobile-tap-highlight"
                  >
                    Refund Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden">
        <MobileBottomFooter />
      </div>
    </div>
  );
};

export default AboutPage;
