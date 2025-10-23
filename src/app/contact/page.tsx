"use client";
import React, { useState, useEffect, useRef } from "react";

const ContactPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [currentFaq, setCurrentFaq] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionsRef = useRef([]);

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
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const contactMethods = [
    {
      icon: "💬",
      title: "Live Chat",
      description: "Get instant help from our support team. Available 24/7 for immediate assistance.",
      action: "Start Chat",
      actionType: "primary",
      color: "blue",
      response: "Instant Response",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: "📞",
      title: "Phone Support",
      description: "Speak directly with our customer service representatives for personalized help.",
      action: "Call Now",
      actionType: "link",
      href: "tel:+919876543210",
      color: "green",
      response: "+91 98765 43210",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      buttonColor: "bg-green-600 hover:bg-green-700"
    },
    {
      icon: "✉️",
      title: "Email Support",
      description: "Send detailed inquiries and get comprehensive responses within 24 hours.",
      action: "Send Email",
      actionType: "link",
      href: "mailto:hello@freshbucket.com",
      color: "purple",
      response: "hello@freshbucket.com",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    },
    {
      icon: "📍",
      title: "Visit Our Store",
      description: "Stop by our flagship location to see our fresh produce selection in person.",
      action: "Get Directions",
      actionType: "button",
      color: "orange",
      response: "Mon-Sun: 8AM-10PM",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      buttonColor: "bg-orange-600 hover:bg-orange-700"
    }
  ];

  const faqs = [
    {
      question: "What are your delivery hours?",
      answer: "We deliver Monday through Sunday from 8 AM to 10 PM. Same-day delivery is available for orders placed before 6 PM, and we offer 30-minute delivery windows for your convenience."
    },
    {
      question: "Do you offer organic produce?",
      answer: "Yes! We specialize in fresh, organic produce sourced from local farms. All our organic products are certified and we clearly mark organic items on our website and app."
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 100% satisfaction guarantee. If you're not happy with any product, contact us within 48 hours of delivery for a full refund or replacement. Fresh produce quality is our top priority."
    },
    {
      question: "Is there a minimum order amount?",
      answer: "No minimum order required! However, orders over ₹500 qualify for free delivery. Orders under ₹500 have a ₹49 delivery fee. We want to make fresh groceries accessible regardless of order size."
    },
    {
      question: "Can I track my delivery?",
      answer: "Absolutely! Once your order is confirmed, you'll receive real-time tracking updates via SMS and email. You can also track your delivery live through our app or website."
    },
    {
      question: "Do you offer bulk or wholesale orders?",
      answer: "Yes, we offer special pricing for bulk orders and work with restaurants, cafes, and other businesses. Contact our wholesale team at wholesale@freshbucket.com for custom pricing and delivery options."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      showNotification(`Thank you ${formData.firstName}! Your message has been sent successfully. We'll get back to you within 24 hours.`);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const showNotification = (message:any) => {
    // Create and show notification
    alert(message); // Replace with proper notification system
  };

  const scrollToSection = (sectionId:any) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index) => {
    setCurrentFaq(currentFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Styles */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
          line-height: 1.6;
          color: #1f2937;
          scroll-behavior: smooth;
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .scale-in {
          animation: scaleIn 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -8px rgba(0, 0, 0, 0.15);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .section-padding {
          padding: 5rem 0;
        }

        @media (max-width: 768px) {
          .section-padding {
            padding: 3rem 0;
          }
          .container {
            padding: 0 1rem;
          }
        }

        .gradient-text {
          background: linear-gradient(135deg, #10b981, #059669);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn-primary {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px -8px rgba(16, 185, 129, 0.4);
        }

        .form-input {
          transition: all 0.3s ease;
        }

        .form-input:focus {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px -8px rgba(16, 185, 129, 0.3);
        }

        .contact-card {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px -12px rgba(16, 185, 129, 0.15);
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Hero Section */}
      <section
        id="hero"
        ref={(el) => (sectionsRef.current[0] = el)}
        className="section-padding bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white min-h-screen flex items-center relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full opacity-10 float-animation"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white rounded-full opacity-10 float-animation" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white rounded-full opacity-10 float-animation" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center ${isVisible.hero ? "fade-in-up" : ""}`}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/30">
              <span className="mr-2">💬</span>
              We're Here to Help
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              Get in Touch
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-12 leading-relaxed">
              Questions about your order? Need help choosing products? Our friendly team is ready to assist you 24/7.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button 
                onClick={() => scrollToSection('contact-form')}
                className="bg-white text-green-600 px-10 py-4 text-lg font-bold rounded-xl hover:bg-green-50 transition-all duration-300 hover-lift"
              >
                Send Message
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
              <button 
                onClick={() => alert('Live chat starting...')}
                className="border-2 border-white text-white px-10 py-4 text-lg font-bold rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300"
              >
                Live Chat Now
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
              <div>
                <div className="text-2xl font-black">24/7</div>
                <div className="text-sm text-green-200">Support Available</div>
              </div>
              <div>
                <div className="text-2xl font-black">< 2hrs</div>
                <div className="text-sm text-green-200">Average Response</div>
              </div>
              <div>
                <div className="text-2xl font-black">50K+</div>
                <div className="text-sm text-green-200">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <a href="#" className="hover:text-green-600 transition-colors">Home</a>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-medium text-gray-900">Contact Us</span>
          </nav>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section
        id="contact-methods"
        ref={(el) => (sectionsRef.current[1] = el)}
        className="section-padding bg-white"
      >
        <div className="container">
          <div className={`text-center mb-16 ${isVisible['contact-methods'] ? "fade-in-up" : ""}`}>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Choose How to <span className="gradient-text">Reach Us</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer multiple ways to get in touch. Pick the option that works best for you.
            </p>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 ${isVisible['contact-methods'] ? "fade-in-up" : ""}`}>
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="contact-card bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${method.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <span className="text-3xl">{method.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{method.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                  {method.description}
                </p>
                {method.actionType === 'link' ? (
                  <a
                    href={method.href}
                    className={`w-full ${method.buttonColor} text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 block text-center`}
                  >
                    {method.action}
                  </a>
                ) : (
                  <button
                    onClick={() => method.title === 'Live Chat' ? alert('Starting live chat...') : scrollToSection('location')}
                    className={`w-full ${method.buttonColor} text-white py-3 px-4 rounded-xl font-bold transition-all duration-300`}
                  >
                    {method.action}
                  </button>
                )}
                <p className={`text-sm ${method.iconColor} mt-3 font-semibold`}>
                  {method.title === 'Live Chat' && '⚡ '}{method.response}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact-form"
        ref={(el) => (sectionsRef.current[2] = el)}
        className="section-padding bg-gray-50"
      >
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className={`${isVisible['contact-form'] ? "fade-in-up" : ""}`}>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Send Us a <span className="gradient-text">Message</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Have a specific question or need detailed assistance? Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none bg-white"
                  >
                    <option value="">Choose a topic...</option>
                    <option value="order-inquiry">Order Inquiry</option>
                    <option value="product-question">Product Question</option>
                    <option value="delivery-issue">Delivery Issue</option>
                    <option value="account-support">Account Support</option>
                    <option value="bulk-order">Bulk/Wholesale Orders</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    required
                    placeholder="Tell us how we can help you..."
                    className="form-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none bg-white resize-none"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label className="text-sm text-gray-700">
                    I'd like to receive updates about new products and special offers via email.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </span>
                  )}
                </button>

                <p className="text-sm text-gray-600 text-center">
                  We typically respond within 24 hours. For urgent matters, please call us directly.
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div className={`space-y-8 ${isVisible['contact-form'] ? "fade-in-up" : ""}`} style={{animationDelay: '0.2s'}}>
              {/* Business Hours */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Business Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-900">Customer Support</span>
                    <span className="text-green-600 font-bold">24/7</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Monday - Friday</span>
                    <span className="text-gray-900">8:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Saturday - Sunday</span>
                    <span className="text-gray-900">9:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-700">Live Chat</span>
                    <span className="text-green-600 font-bold">Always Available</span>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <a href="tel:+919876543210" className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">+91 98765 43210</p>
                      <p className="text-sm text-gray-600">Call us anytime</p>
                    </div>
                  </a>

                  <a href="mailto:hello@freshbucket.com" className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">hello@freshbucket.com</p>
                      <p className="text-sm text-gray-600">Email support</p>
                    </div>
                  </a>

                  <button 
                    onClick={() => alert('Starting live chat...')} 
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group w-full text-left"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Live Chat</p>
                      <p className="text-sm text-green-600">⚡ Online now</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Response Times */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Average Response Times
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Live Chat:</span>
                    <span className="font-bold text-green-600">30 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-bold text-green-600">2-4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span className="font-bold text-green-600">Immediate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        ref={(el) => (sectionsRef.current[3] = el)}
        className="section-padding bg-white"
      >
        <div className="container">
          <div className={`text-center mb-16 ${isVisible.faq ? "fade-in-up" : ""}`}>
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions. Can't find what you're looking for? Contact us directly!
            </p>
          </div>

          <div className={`grid lg:grid-cols-2 gap-8 ${isVisible.faq ? "fade-in-up" : ""}`}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="contact-card bg-gray-50 rounded-xl overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <h4 className="font-bold text-gray-900 flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {faq.question}
                  </h4>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${currentFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {currentFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed pl-8">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => scrollToSection('contact-form')}
              className="btn-primary text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Still Have Questions? Contact Us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section
        id="location"
        ref={(el) => (sectionsRef.current[4] = el)}
        className="section-padding bg-gray-50"
      >
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Location Info */}
            <div className={`${isVisible.location ? "fade-in-up" : ""}`}>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Visit Our <span className="gradient-text">Flagship Store</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Experience our fresh produce selection in person at our flagship location in the heart of Ahmedabad. Our knowledgeable staff is ready to help you find exactly what you need.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-700">123 Fresh Street<br />Organic District<br />Ahmedabad, Gujarat 380001</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Store Hours</h4>
                    <p className="text-gray-700">Monday - Sunday<br />8:00 AM - 10:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M5 3l7-1 7 1M4 10l1-7 14 7M2 21l1-1v-1" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Parking</h4>
                    <p className="text-gray-700">Free parking available<br />Street parking & garage</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => window.open('https://maps.google.com?q=123+Fresh+Street+Ahmedabad+Gujarat+380001', '_blank')}
                  className="btn-primary text-lg mr-4 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Get Directions
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </button>
                <a
                  href="tel:+919876543210"
                  className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-green-600 hover:text-white transition-all duration-300 inline-flex items-center gap-2"
                >
                  Call Store
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className={`${isVisible.location ? "fade-in-up" : ""}`} style={{animationDelay: '0.2s'}}>
              <div className="aspect-video bg-gray-200 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <p className="text-lg font-bold text-green-600 mb-2">Interactive Map</p>
                    <p className="text-gray-600 mb-4">123 Fresh Street, Ahmedabad</p>
                    <button
                      onClick={() => window.open('https://maps.google.com?q=123+Fresh+Street+Ahmedabad+Gujarat+380001', '_blank')}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      View on Google Maps
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white">
        <div className="container text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-8">
              Ready to Experience<br />
              <span className="text-green-200">Fresh Bucket?</span>
            </h2>
            <p className="text-xl text-green-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust us for their fresh grocery needs. Start your fresh journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-green-600 px-10 py-4 text-lg font-bold rounded-xl hover:bg-green-50 transition-all duration-300 hover-lift">
                Start Shopping Now
                <span className="block text-sm font-normal">Free delivery on first order</span>
              </button>
              <button className="border-2 border-green-200 text-green-100 px-10 py-4 text-lg font-bold rounded-xl hover:bg-green-200 hover:text-green-700 transition-all duration-300">
                Download Mobile App
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
