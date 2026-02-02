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

import VideoBackground from "@/components/layout/VideoBackground";
import HeroAnimated from "@/components/landing/HeroAnimated";
import FeatureStack from "@/components/landing/FeatureStack";
import StatsCounters from "@/components/landing/StatsCounters";
import PartnerStrip from "@/components/landing/PartnerStrip";

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
    { number: "200+", label: "Projects Delivered" },
    { number: "50+", label: "Models in Production" },
    { number: "500M+", label: "Records Processed" },
    { number: "99.9%", label: "Platform Uptime" },
    { number: "25+", label: "Enterprise Partners" },
  ];

  const visionMission = [
    {
      icon: Eye,
      title: "Strategy",
      description: "We align AI initiatives to measurable business outcomes with clear roadmaps and pilot-proof plans.",
    },
    {
      icon: Target,
      title: "Build",
      description: "We design production-grade models and data platforms with security, observability and explainability built-in.",
    },
    {
      icon: Rocket,
      title: "Operate",
      description: "We operationalize models with MLOps, monitoring and retraining workflows for reliable long-term value.",
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
    { icon: Lightbulb, title: "AI Strategy", desc: "Roadmaps, feasibility & pilots" },
    { icon: Code, title: "ML Engineering", desc: "Model development & MLOps" },
    { icon: Cpu, title: "Computer Vision", desc: "Image / video analytics" },
    { icon: Zap, title: "Generative AI", desc: "LLMs, agents & assistants" },
    { icon: Shield, title: "Data & Compliance", desc: "Secure data platforms & governance" },
  ];

  const partners = [
    { name: "MIKRON", icon: null },
    { name: "Patto Graphic", subtext: "sewing company" },
    { name: "Gargoosh", icon: null },
    { name: "VELO CITY", subtext: null },
  ];

  return (
    <div className="min-h-screen text-white">

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

      {/* Hero Section with Carousel */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden -mt-20 md:-mt-20"
        data-testid="hero"
      >
        {/* Carousel Background Images */}
        <div className="absolute inset-0">
          {/* Video background (large screens only) */}
          <div className="hidden lg:block">
            <VideoBackground src="/assets/138556-769988117.mp4" poster="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1600" />
          </div>

            {/* Particles / Mesh animation */}
            <HeroAnimated />

            {/* Fallback carousel images (still used and will layer above/below video depending on CSS stacking) */}
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
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-20 flex items-start md:items-center justify-center h-full pt-[10vh] md:pt-[30vh]">
          <div className="max-w-6xl text-center mx-auto">
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
                <p className="text-gray-400 text-base sm:text-lg mb-10 max-w-3xl mx-auto">
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
                onClick={() => navigate('/contact')}
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

            {/* Right - Feature Cards (stacked floating variant) */}
            <div className="space-y-4">
              <FeatureStack features={features} />
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
      <section className="py-12 relative" data-testid="partners">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="font-space font-bold text-lg">Trusted by enterprises & startups</h3>
            <p className="text-gray-400 text-sm">We deliver secure, reliable AI systems for regulated industries and fast-moving product teams.</p>
          </div>

          <AnimatedCard className="overflow-hidden">
            <PartnerStrip partners={partners} />
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
      <section id="programs" className="py-20 relative" data-testid="testimonials">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-space font-bold text-2xl mb-3 scroll-reveal">What Our <span className="gradient-text">Clients Say</span></h2>
            <p className="text-gray-400 text-sm">Real outcomes — faster time-to-value and measurable ROI from practical AI deployments.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimatedCard key={index} className={`testimonial-card scroll-reveal stagger-${index + 1}`} delay={index * 0.1}>
                <div className="flex items-center gap-3 mb-3 pt-2">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-xs font-semibold">
                    {testimonial.author.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.author}</p>
                    <p className="text-xs text-purple-400">{testimonial.role} — <span className="text-gray-400">{testimonial.company}</span></p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-3">
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-purple-400 text-purple-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed italic">"{testimonial.quote}"</p>
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
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              <div className="p-8 flex flex-col justify-center">
                <h3 className="font-space font-bold text-2xl mb-4">Ready to turn AI into measurable business value?</h3>
                <p className="text-gray-400 text-sm mb-6">Book a short discovery call and receive a tailored AI roadmap for your team.</p>
                <div className="flex gap-4">
                  <Link to="/contact"><Button className="btn-primary rounded-full px-6">Book a Call</Button></Link>
                  <Link to="/solutions"><Button variant="outline" className="btn-outline rounded-full px-6">See Solutions</Button></Link>
                </div>
              </div>

              <div className="relative h-56 lg:h-80 rounded-lg overflow-hidden">
                <img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="AI collaborative" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>


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
