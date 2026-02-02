import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, API } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  X,
  Send,
  MessageCircle,
  Cloud,
  Cpu,
  Users,
  Lightbulb,
  BarChart3,
  Shield,
  Zap,
  Code,
  Settings,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Bot,
  Eye,
  Target,
  Rocket,
  Star,
  Globe,
  Menu,
  Flag,
} from "lucide-react";

const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_2e55a7fc-06f9-47db-b4a6-4600417bac65/artifacts/o8krn3xe_Free__2_-removebg-preview.png";

// Simple Card Component (no rotating dot)
const AnimatedCard = ({ children, className = "", delay = 0 }) => {
  return (
    <div
      className={`glass-card p-6 scroll-reveal ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

// Cursor Following Blue Dot Component
const CursorDot = () => {
  const dotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Show dot after a short delay
    setTimeout(() => setIsVisible(true), 500);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className={`cursor-dot ${isVisible ? "visible" : ""}`}
      data-testid="cursor-dot"
    />
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, login, loading } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [showSupportBot, setShowSupportBot] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const autoPlayRef = useRef(null);
  const heroRef = useRef(null);

  // Hero carousel slides with AI-related images (expanded collection)
  const heroSlides = [
    {
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920",
      title: "Empowering Your Business",
      highlight: "with AI-First Solutions",
      subtitle: "Leverage the Power of AI to Drive Informed Business Decisions",
    },
    {
      image:
        "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?auto=format&fit=crop&w=1920&q=80",
      title: "Advanced Robotics",
      highlight: "& Machine Intelligence",
      subtitle: "Precision Engineering Meets Artificial Intelligence",
    },
    {
      image:
        "https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=1920",
      title: "Intelligent Automation",
      highlight: "for Modern Enterprises",
      subtitle:
        "Transform Complex Workflows with Cutting-Edge Machine Learning",
    },
    {
      image:
        "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?auto=format&fit=crop&w=1920&q=80",
      title: "Humanoid AI",
      highlight: "The Future is Here",
      subtitle:
        "Seamless Fusion Between Human Intelligence and Machine Precision",
    },
    {
      image:
        "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1920",
      title: "Data-Driven Insights",
      highlight: "Powered by AI",
      subtitle: "Unlock Hidden Patterns and Make Smarter Decisions",
    },
    {
      image:
        "https://images.unsplash.com/photo-1660165458059-57cfb6cc87e5?auto=format&fit=crop&w=1920&q=80",
      title: "Digital Transformation",
      highlight: "with Neural Networks",
      subtitle: "Abstract Intelligence Powering Real-World Solutions",
    },
    {
      image:
        "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1920",
      title: "Future-Ready",
      highlight: "AI Infrastructure",
      subtitle: "Build Resilient, Scalable Systems with Enterprise AI",
    },
    {
      image:
        "https://images.unsplash.com/photo-1750365919971-7dd273e7b317?auto=format&fit=crop&w=1920&q=80",
      title: "Cognitive Computing",
      highlight: "Brain-Inspired Tech",
      subtitle: "AI Processors Revolutionizing How Machines Think",
    },
    {
      image:
        "https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=1920",
      title: "Neural Networks",
      highlight: "& Deep Learning",
      subtitle: "Advanced AI Models for Complex Business Challenges",
    },
  ];
  const [botForm, setBotForm] = useState({
    name: "",
    phone: "",
    email: "",
    description: "",
  });
  const [botMessages, setBotMessages] = useState([
    { type: "bot", text: "Hello! 👋 Welcome to Namespace Consultants." },
    {
      type: "bot",
      text: "I'm here to help you explore our AI solutions. Please share your details.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [contactForm, setContactForm] = useState({
    email: "",
    subscribe: false,
  });
  const observerRef = useRef(null);

  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  // Auto-slide carousel functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000); // Change slide every 5 seconds
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, heroSlides.length]);

  // Scroll-based header visibility
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = heroRef.current;
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        // Show header after scrolling past 80% of hero section
        setHeaderVisible(scrollPosition > heroBottom * 0.6);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Carousel navigation functions
  const goToSlide = (index) => {
    setCurrentSlide(index);
    // Pause auto-play briefly when user interacts
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(
      ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right",
    );
    elements.forEach((el) => observerRef.current.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const cookieTimer = setTimeout(() => {
      const consent = localStorage.getItem("cookieConsent");
      if (!consent) setShowCookieConsent(true);
    }, 1500);

    const botTimer = setTimeout(() => {
      const visited = sessionStorage.getItem("botShown");
      if (!visited) {
        setShowSupportBot(true);
        sessionStorage.setItem("botShown", "true");
      }
    }, 4000);

    return () => {
      clearTimeout(cookieTimer);
      clearTimeout(botTimer);
    };
  }, []);

  const handleBotSubmit = async () => {
    if (!botForm.name || !botForm.email) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsTyping(true);
    setBotMessages((prev) => [
      ...prev,
      { type: "user", text: `${botForm.name} - ${botForm.email}` },
    ]);

    try {
      await axios.post(`${API}/contact/send`, {
        name: botForm.name,
        email: botForm.email,
        phone: botForm.phone,
        message: botForm.description || "Contact request from AI Assistant",
      });

      setTimeout(() => {
        setBotMessages((prev) => [
          ...prev,
          { type: "bot", text: `Thank you ${botForm.name}! 🚀` },
          {
            type: "bot",
            text: "Our team will reach out to you within 24 hours.",
          },
        ]);
        setIsTyping(false);
        setBotForm({ name: "", phone: "", email: "", description: "" });
      }, 1500);
    } catch (error) {
      setTimeout(() => {
        setBotMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: `Thank you ${botForm.name}! We've received your request.`,
          },
        ]);
        setIsTyping(false);
        setBotForm({ name: "", phone: "", email: "", description: "" });
      }, 1500);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await axios.post(`${API}/contact/send`, {
        name: "Newsletter Subscriber",
        email: contactForm.email,
        message: "Newsletter subscription request",
      });
      toast.success("Thank you for subscribing!");
      setContactForm({ email: "", subscribe: false });
    } catch (error) {
      toast.success("Thank you for subscribing!");
      setContactForm({ email: "", subscribe: false });
    }
  };

  const features = [
    {
      icon: Cloud,
      title: "Data-Driven Cloud Transformation",
      description:
        "Harness the potential of cloud computing with our AI-enhanced solutions for seamless digital transformation.",
    },
    {
      icon: Cpu,
      title: "Customized AI Applications",
      description:
        "We develop custom AI applications tailored to your specific business needs, integrated to deliver value.",
    },
    {
      icon: BarChart3,
      title: "AI-Powered Data Insights",
      description:
        "Transform raw data into actionable insights with our proprietary data analysis and AI-enhanced automation.",
    },
    {
      icon: Users,
      title: "Enhanced Customer Engagement",
      description:
        "Revolutionize customer interactions with AI-driven personalization for improved satisfaction and loyalty.",
    },
  ];

  const stats = [
    { number: "10+", label: "Years of AI Expertise" },
    { number: "50+", label: "AI-Powered Projects" },
    { number: "100M", label: "Data Processed", suffix: "+" },
    { number: "30+", label: "AI Solutions Deployed" },
    { number: "10+", label: "Industry Recognitions" },
  ];

  const visionMission = [
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To be the global leader in AI-driven business transformation, empowering organizations to harness the full potential of artificial intelligence.",
    },
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To bridge human insight with artificial intelligence, delivering cutting-edge solutions that transform businesses and create lasting value.",
    },
    {
      icon: Rocket,
      title: "Our Values",
      description:
        "Innovation, Integrity, Excellence, and Client Success drive everything we do. We believe in transparent partnerships and measurable results.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Namespace Consultants transformed our risk management approach. Their AI solutions reduced our fraud losses by 80% in just 6 months.",
      author: "Rajesh Kumar",
      role: "CFO, Leading NBFC",
      company: "FinServ India",
      rating: 5,
    },
    {
      quote:
        "The audit automation platform they built saved us 2000+ man-hours annually. Exceptional blend of human insight and AI intelligence.",
      author: "Priya Sharma",
      role: "Head of Internal Audit",
      company: "Tech Unicorn",
      rating: 5,
    },
    {
      quote:
        "Their predictive risk models helped us proactively identify compliance gaps before they became issues. True partners in our growth.",
      author: "Amit Patel",
      role: "CEO",
      company: "Fintech Startup",
      rating: 5,
    },
    {
      quote:
        "Working with Namespace was a game-changer for our data analytics. They delivered beyond our expectations with innovative AI solutions.",
      author: "Sneha Reddy",
      role: "CTO",
      company: "E-commerce Platform",
      rating: 5,
    },
  ];

  const services = [
    { icon: Zap, title: "Automation", desc: "Intelligent process automation" },
    { icon: Cpu, title: "AI Solutions", desc: "Custom ML/AI development" },
    {
      icon: Code,
      title: "Product Engineering",
      desc: "End-to-end development",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      desc: "Comprehensive QA services",
    },
    { icon: Lightbulb, title: "Consulting", desc: "Strategic AI consulting" },
  ];

  const partners = [
    { name: "MIKRON", icon: null },
    { name: "Patto Graphic", subtext: "sewing company" },
    { name: "Gargoosh", icon: null },
    { name: "VELO CITY", subtext: null },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Cursor Following Purple Dot */}
      <CursorDot />

      {/* Particle Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="particle-dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Premium Floating Navigation - Always Visible */}
      <header className="fixed top-0 left-0 right-0 z-50" data-testid="nav">
        <div className="mx-auto px-4 sm:px-6 lg:px-10 pt-4 pb-2">
          <nav className="premium-header px-6 sm:px-10 lg:px-12 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <a href="#" className="flex items-center group">
                <img
                  src={LOGO_URL}
                  alt="Logo"
                  className="h-10 sm:h-12 lg:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                />
              </a>
              {/* Desktop Navigation */}

              <div className="hidden lg:flex items-center gap-8">
                <Link
                  to="/Solutions"
                  className="nav-link text-sm font-medium text-gray-300 hover:text-white transition duration-300"
                >
                  Solutions
                </Link>

                <Link
                  to="/about"
                  className="nav-link text-sm font-medium text-gray-300 hover:text-white transition duration-300"
                >
                  About Us
                </Link>

                <Link
                  to="/case-studies"
                  className="nav-link text-sm font-medium text-gray-300 hover:text-white transition duration-300"
                >
                  Case Studies
                </Link>

                <Link
                  to="/resources"
                  className="nav-link text-sm font-medium text-gray-300 hover:text-white transition duration-300"
                >
                  Resources
                </Link>
              </div>
              {/* CTA Buttons */}
              <div className="flex items-center gap-4">
                <a
                  href="#blog"
                  className="hidden sm:inline-flex text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Contact
                </a>
                <Link to="/solutions">
                  <Button
                    className="btn-primary rounded-full px-5 sm:px-6 py-2.5 text-sm font-medium"
                    data-testid="explore-btn"
                  >
                    Explore Solutions
                  </Button>
                </Link>
                <button
                  className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="lg:hidden mt-4 pt-4 border-t border-purple-500/10">
                <div className="flex flex-col gap-3">
                  <Link
                    to="/solutions"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-gray-300 hover:text-white py-1.5 transition-colors"
                  >
                    Solutions
                  </Link>

                  <Link
                    to="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-gray-300 hover:text-white py-1.5 transition-colors"
                  >
                    About Us
                  </Link>

                  <Link
                    to="/case-studies"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-gray-300 hover:text-white py-1.5 transition-colors"
                  >
                    Case Studies
                  </Link>

                  <Link
                    to="/resources"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-gray-300 hover:text-white py-1.5 transition-colors"
                  >
                    Resources
                  </Link>

                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-purple-400 hover:text-purple-300 py-1.5 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section with Carousel */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden"
        data-testid="hero"
      >
        {/* Carousel Background Images */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover opacity-40"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-[#0A0A0F]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
        </div>

        {/* Carousel Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-32 lg:pt-36 pb-32">
          <div className="max-w-2xl">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 absolute pointer-events-none"
                }`}
              >
                <h1 className="font-space font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
                  {slide.title}
                  <br />
                  <span className="gradient-text">{slide.highlight}</span>
                </h1>
                <p className="text-gray-400 text-base sm:text-lg mb-10 max-w-lg">
                  {slide.subtitle}
                </p>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                onClick={() =>
                  document
                    .querySelector("#solutions")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary rounded-full px-8 py-6 text-sm font-medium"
              >
                Explore Solutions
              </Button>
              <Button
                onClick={() =>
                  document
                    .querySelector("#blog")
                    .scrollIntoView({ behavior: "smooth" })
                }
                variant="outline"
                className="rounded-full px-8 py-6 text-sm font-medium border-white/20 text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group"
          data-testid="carousel-prev"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group"
          data-testid="carousel-next"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Carousel Indicators/Dots */}
        <div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
          data-testid="carousel-indicators"
        >
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-8 h-2 bg-gradient-to-r from-purple-500 to-purple-400"
                  : "w-2 h-2 bg-white/30 hover:bg-white/50"
              }`}
              data-testid={`carousel-dot-${index}`}
            />
          ))}
        </div>

        {/* Floating Message Button */}
        <button
          onClick={() => setShowSupportBot(true)}
          className="absolute bottom-10 right-10 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-20 hidden"
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </button>
      </section>

      {/* AI-Powered Solutions Section */}
      <section
        id="solutions"
        className="py-20 relative"
        data-testid="solutions"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Image Card */}
            <AnimatedCard className="scroll-reveal-left" delay={0}>
              <div className="relative h-56 mb-6 rounded-xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="AI Solutions"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/80 to-transparent" />
              </div>
              <h2 className="font-space font-bold text-2xl mb-3">
                AI-Powered Solutions
                <br />
                <span className="gradient-text">for Business Growth</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Namespace Consultants' AI-driven approach is grounded in
                real-world understanding. In the digital era, the team leverages
                AI technologies to guide businesses toward success by providing
                scalable and innovative custom AI solutions.
              </p>
            </AnimatedCard>

            {/* Right - Feature Cards */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <AnimatedCard
                  key={index}
                  className={`scroll-reveal-right stagger-${index + 1}`}
                  delay={index * 0.1}
                >
                  <div className="flex gap-4">
                    <div className="feature-icon flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1 gradient-text">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Solutions for Competitive Edge */}
      <section className="py-20 relative" data-testid="competitive-edge">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedCard className="scroll-reveal">
            <div className="grid lg:grid-cols-2 gap-12 items-center p-4">
              {/* Circular Visual */}
              <div className="relative flex items-center justify-center py-12">
                <div className="circular-visual w-64 h-64 lg:w-80 lg:h-80 relative">
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/8386365/pexels-photo-8386365.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="AI Visual"
                      className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                    <div>
                      <h3 className="font-space font-bold text-lg">
                        AI-Powered Solutions for
                      </h3>
                      <p className="gradient-text font-semibold">
                        Competitive Edge
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  At Namespace Consultants, we offer cutting-edge AI solutions
                  that deliver unparalleled value and reliability. Our AI
                  services are designed to transform businesses and drive
                  success in the digital landscape.
                </p>
                <Button
                  onClick={login}
                  className="btn-outline rounded-full px-5 py-2 text-sm"
                >
                  Explore Our Solutions{" "}
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative" data-testid="stats">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-space font-bold text-2xl text-center mb-12 scroll-reveal">
            Leading with <span className="gradient-text">AI Innovation</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center scroll-reveal stagger-${index + 1}`}
              >
                <p className="stat-number text-3xl lg:text-4xl mb-1">
                  {stat.number}
                  {stat.suffix && (
                    <span className="text-xl">{stat.suffix}</span>
                  )}
                </p>
                <p className="text-gray-500 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Collaborations */}
      <section className="py-16 relative" data-testid="partners">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedCard className="scroll-reveal">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center p-4">
              <div>
                <h3 className="font-space font-bold text-base">
                  Trusted
                  <br />
                  Collaborat
                  <br />
                  ions
                </h3>
              </div>
              {partners.map((partner, index) => (
                <div key={index} className="text-center partner-logo">
                  <p className="font-space font-bold text-lg text-gray-400">
                    {partner.name}
                  </p>
                  {partner.subtext && (
                    <p className="text-xs text-gray-600">{partner.subtext}</p>
                  )}
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Vision, Mission & Values */}
      <section
        id="vision"
        className="py-20 relative"
        data-testid="vision-mission"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-space font-bold text-2xl mb-3 scroll-reveal">
              Our{" "}
              <span className="gradient-text">Vision, Mission & Values</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto scroll-reveal">
              Guided by purpose, driven by excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {visionMission.map((item, index) => (
              <AnimatedCard
                key={index}
                className={`vision-card scroll-reveal stagger-${index + 1}`}
                delay={index * 0.1}
              >
                <div className="feature-icon mb-4">
                  <item.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-space font-bold text-lg mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* What Our Clients Say */}
      <section
        id="programs"
        className="py-20 relative"
        data-testid="testimonials"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-space font-bold text-2xl mb-3 scroll-reveal">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimatedCard
                key={index}
                className={`testimonial-card scroll-reveal stagger-${index + 1}`}
                delay={index * 0.1}
              >
                <div className="flex gap-1 mb-3 pt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-purple-400 text-purple-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 text-xs mb-4 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-white/5 pt-3">
                  <p className="font-semibold text-xs">{testimonial.author}</p>
                  <p className="text-xs text-purple-400">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.company}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Support Every Team Section */}
      <section className="py-20 relative" data-testid="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-space font-bold text-2xl mb-3 scroll-reveal">
              Support Every Team &<br />
              <span className="gradient-text">Strengthen Every Process</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <AnimatedCard
                key={index}
                className={`text-center scroll-reveal stagger-${index + 1}`}
                delay={index * 0.1}
              >
                <div className="feature-icon mx-auto mb-3">
                  <service.icon className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{service.title}</h3>
                <p className="text-gray-400 text-xs">{service.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative" data-testid="cta">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedCard className="scroll-reveal overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-56 lg:h-auto">
                <img
                  src="https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="AI Future"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1C2128]/90 lg:bg-gradient-to-l" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="font-space font-bold text-xl text-center px-6">
                    Unlock the Potential of AI for
                    <br />
                    <span className="gradient-text">Your Business</span>
                  </h3>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <p className="text-gray-400 text-sm mb-6">
                  Discover how Namespace Consultants can accelerate your
                  business growth with AI-driven solutions. Let us help you
                  embark on your AI journey today.
                </p>
                <Button
                  onClick={login}
                  className="btn-outline rounded-full px-5 py-2 text-sm w-fit"
                >
                  Find AI Trends <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="blog"
        className="bg-[#08080C] border-t border-white/5"
        data-testid="footer"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
          {/* TOP GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* LOGO + CONTACT */}
            <div>
              <img src={LOGO_URL} alt="Logo" className="h-16 mb-6" />

              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-1 text-purple-400" />
                  <span>+91 9625061596</span>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-1 text-purple-400" />
                  <span>kartikeya@namespaceconsultants.com</span>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-purple-400" />
                  <span className="leading-relaxed">
                    PT-62/3, L.G.F., PT And DD Block,
                    <br />
                    Kalkaji, New Delhi, 110019
                  </span>
                </div>
              </div>
            </div>

            {/* COMPANY */}
            <div>
              <h4 className="font-semibold mb-6">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <a href="/about" className="hover:text-purple-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-purple-400">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#solutions" className="hover:text-purple-400">
                    Solutions
                  </a>
                </li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h4 className="font-semibold mb-6">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <a href="/terms" className="hover:text-purple-400">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-purple-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/cookies" className="hover:text-purple-400">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* NEWSLETTER */}
            <div>
              <h4 className="font-semibold mb-6">Newsletter</h4>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  className="bg-[#12121A] border-white/10 focus:border-purple-500 h-11"
                />

                <label className="flex items-center gap-2 text-xs text-gray-500">
                  <input
                    type="checkbox"
                    checked={contactForm.subscribe}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        subscribe: e.target.checked,
                      })
                    }
                    className="rounded border-gray-600 w-3 h-3"
                  />
                  Subscribe to updates
                </label>

                <Button
                  type="submit"
                  className="w-full rounded-full bg-purple-600 hover:bg-purple-700 text-sm py-2"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="mt-14 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            {/* SOCIAL */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Follow us</span>

              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500/20"
                >
                  <Linkedin className="w-4 h-4 text-gray-400" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500/20"
                >
                  <Facebook className="w-4 h-4 text-gray-400" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500/20"
                >
                  <Instagram className="w-4 h-4 text-gray-400" />
                </a>
              </div>
            </div>

            {/* COPYRIGHT */}
            <p className="text-sm text-gray-500 text-center md:text-right">
              © 2024 Namespace Consultants. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Cookie Consent */}
      {showCookieConsent && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up"
          data-testid="cookie-consent"
        >
          <div className="max-w-3xl mx-auto glass rounded-xl p-5">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">
                  Your choices regarding cookies on this site
                </h4>
                <p className="text-xs text-gray-400">
                  We use cookies to enhance your browsing experience.
                  <a
                    href="/privacy"
                    className="text-purple-400 ml-1 hover:underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  |
                  <a
                    href="/cookies"
                    className="text-purple-400 ml-1 hover:underline"
                  >
                    Cookie Policy
                  </a>
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    localStorage.setItem("cookieConsent", "denied");
                    setShowCookieConsent(false);
                  }}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs px-3 py-1 border-gray-700"
                >
                  Deny All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs px-3 py-1 border-gray-700"
                >
                  <Settings className="w-3 h-3 mr-1" /> Manage
                </Button>
                <Button
                  onClick={() => {
                    localStorage.setItem("cookieConsent", "accepted");
                    setShowCookieConsent(false);
                  }}
                  size="sm"
                  className="btn-primary rounded-full text-xs px-3 py-1"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Support Bot */}
      <div className="fixed bottom-6 right-6 z-50" data-testid="support-bot">
        {showSupportBot ? (
          <div className="w-72 glass rounded-2xl overflow-hidden shadow-2xl animate-slide-up border border-purple-500/20">
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-xs">AI Assistant</p>
                  <p className="text-xs opacity-80">Online</p>
                </div>
              </div>
              <button
                onClick={() => setShowSupportBot(false)}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-48 overflow-y-auto p-3 space-y-2 bg-[#12121A]">
              {botMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 text-xs ${
                      msg.type === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-[#1C2128] text-gray-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-1 px-3 py-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 typing-dot" />
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 typing-dot" />
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 typing-dot" />
                </div>
              )}
            </div>

            <div className="p-3 border-t border-white/5 space-y-2 bg-[#12121A]">
              <Input
                placeholder="Your Name *"
                value={botForm.name}
                onChange={(e) =>
                  setBotForm({ ...botForm, name: e.target.value })
                }
                className="bg-[#1C2128] border-white/10 text-xs h-8 focus:border-purple-500"
              />
              <Input
                placeholder="Phone"
                value={botForm.phone}
                onChange={(e) =>
                  setBotForm({ ...botForm, phone: e.target.value })
                }
                className="bg-[#1C2128] border-white/10 text-xs h-8 focus:border-purple-500"
              />
              <Input
                placeholder="Email *"
                type="email"
                value={botForm.email}
                onChange={(e) =>
                  setBotForm({ ...botForm, email: e.target.value })
                }
                className="bg-[#1C2128] border-white/10 text-xs h-8 focus:border-purple-500"
              />
              <Textarea
                placeholder="Describe your requirement..."
                value={botForm.description}
                onChange={(e) =>
                  setBotForm({ ...botForm, description: e.target.value })
                }
                className="bg-[#1C2128] border-white/10 text-xs focus:border-purple-500 resize-none"
                rows={2}
              />
              <Button
                onClick={handleBotSubmit}
                className="w-full btn-primary text-xs rounded-full h-8"
              >
                <Send className="w-3 h-3 mr-1" /> Submit
              </Button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowSupportBot(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30 hover:scale-110 transition-transform"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
