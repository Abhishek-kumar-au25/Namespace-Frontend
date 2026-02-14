import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Cloud,
  Cpu,
  Users,
  Lightbulb,
  BarChart3,
  Shield,
  Zap,
  Code,
  Settings,
  Eye,
  Target,
  Rocket,
  Star,
} from "lucide-react";

import VideoBackground from "@/components/layout/VideoBackground";
import HeroAnimated from "@/components/landing/HeroAnimated";
import FeatureStack from "@/components/landing/FeatureStack";
import { landingTestimonials } from "@/data/testimonials";

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

const computeAverageColor = (image) => {
  try {
    const canvas = document.createElement("canvas");
    const size = 32;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;

    ctx.drawImage(image, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);

    let r = 0;
    let g = 0;
    let b = 0;
    let count = 0;

    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha < 24) continue;
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count += 1;
    }

    if (!count) return null;

    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (luma > 220) {
      r = Math.round(r * 0.75);
      g = Math.round(g * 0.75);
      b = Math.round(b * 0.75);
    } else if (luma < 40) {
      const boost = 60 - luma;
      r = Math.min(255, Math.round(r + boost));
      g = Math.min(255, Math.round(g + boost));
      b = Math.min(255, Math.round(b + boost));
    }

    return { r, g, b };
  } catch (error) {
    return null;
  }
};

const LogoBadge = ({ src, name }) => {
  const [rgb, setRgb] = useState(null);

  const handleLoad = (event) => {
    const color = computeAverageColor(event.currentTarget);
    if (color) setRgb(color);
  };

  const badgeStyle = rgb
    ? {
        background: `radial-gradient(circle at 30% 30%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.45), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2) 60%, rgba(8, 8, 12, 0.2) 100%)`,
        boxShadow: `0 16px 40px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.28)`,
      }
    : undefined;

  return (
    <div
      className="
        w-24 h-24
        rounded-full
        bg-white/5
        border border-white/15
        backdrop-blur-sm
        flex items-center justify-center
        overflow-hidden
        transition duration-300
        group-hover:border-white/30
      "
      style={badgeStyle}
    >
      <img
        src={src}
        alt={name}
        className="
          h-full w-full object-cover
          opacity-90
          transition duration-300
          group-hover:opacity-100
        "
        loading="lazy"
        decoding="async"
        crossOrigin="anonymous"
        onLoad={handleLoad}
      />
    </div>
  );
};

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const autoPlayRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const heroRef = useRef(null);
  const testimonialsRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

  // Hero carousel slides with AI-related images (expanded collection)
  const heroSlides = [
    {
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920",
      title: "AI That Actually",
      highlight: "Drives Business Growth",
      subtitle:
        "We design and deploy AI solutions that increase revenue, reduce costs, and give you a real competitive edge.",
    },

    {
      image:
        "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?auto=format&fit=crop&w=1920&q=80",
      title: "Robotics + AI",
      highlight: "Working in Harmony",
      subtitle:
        "From intelligent automation to real-world robotics, we build systems that think, learn, and execute.",
    },

    {
      image:
        "https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=1920",
      title: "Automate 10x",
      highlight: "Operate Smarter",
      subtitle:
        "Replace manual workflows with AI-powered automation that scales with your business.",
    },

    {
      image:
        "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?auto=format&fit=crop&w=1920&q=80",
      title: "Human-Level",
      highlight: "AI Intelligence",
      subtitle:
        "Next-gen AI systems that understand context, predict outcomes, and assist decision-making.",
    },

    {
      image:
        "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1920",
      title: "Turn Data Into",
      highlight: "Decisions",
      subtitle:
        "Unlock insights from millions of records and act faster with AI-driven analytics.",
    },

    {
      image:
        "https://images.unsplash.com/photo-1660165458059-57cfb6cc87e5?auto=format&fit=crop&w=1920&q=80",
      title: "AI-Led",
      highlight: "Digital Transformation",
      subtitle:
        "Modernize your enterprise with scalable AI platforms built for the future.",
    },

    {
      image:
        "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1920",
      title: "Enterprise-Grade",
      highlight: "AI Infrastructure",
      subtitle:
        "Secure, scalable and compliant AI systems trusted by regulated industries.",
    },

    {
      image:
        "https://images.unsplash.com/photo-1750365919971-7dd273e7b317?auto=format&fit=crop&w=1920&q=80",
      title: "Machines That",
      highlight: "Think & Learn",
      subtitle:
        "Cognitive AI models inspired by the human brain for complex problem solving.",
    },

    {
      image:
        "https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=1920",
      title: "Deep Learning for",
      highlight: "Real Impact",
      subtitle:
        "Deploy advanced neural networks that create measurable business value.",
    },
  ];

  const observerRef = useRef(null);

  // Login/signup flow removed; no redirect on load.

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

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  // Carousel navigation functions
  const goToSlide = (index) => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    setCurrentSlide(index);
    // Pause auto-play briefly when user interacts
    setIsAutoPlaying(false);
    resumeTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleHeroTouchStart = (event) => {
    if (!event.touches || event.touches.length !== 1) return;
    const touch = event.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  };

  const handleHeroTouchEnd = (event) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) {
      return;
    }
    const touch = event.changedTouches?.[0];
    if (!touch) return;

    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX > 50 && absX > absY) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const scrollTestimonials = (direction) => {
    const container = testimonialsRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
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

    return () => clearTimeout(cookieTimer);
  }, []);

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
    { number: "20+", label: "Projects Delivered" },
    { number: "10+", label: "Models in Production" },
    { number: "50+", label: "Records Processed" },
    { number: "99.9%", label: "Platform Uptime" },
    { number: "20+", label: "Enterprise Partners" },
  ];

  const visionMission = [
    {
      icon: Eye,
      title: "Strategy",
      description:
        "We align AI initiatives to measurable business outcomes with clear roadmaps and pilot-proof plans.",
    },
    {
      icon: Target,
      title: "Build",
      description:
        "We design production-grade models and data platforms with security, observability and explainability built-in.",
    },
    {
      icon: Rocket,
      title: "Operate",
      description:
        "We operationalize models with MLOps, monitoring and retraining workflows for reliable long-term value.",
    },
  ];

  const testimonials = landingTestimonials;

  const services = [
    {
      icon: Lightbulb,
      title: "AI Strategy",
      desc: "Roadmaps, feasibility & pilots",
    },
    { icon: Code, title: "ML Engineering", desc: "Model development & MLOps" },
    { icon: Cpu, title: "Computer Vision", desc: "Image / video analytics" },
    { icon: Zap, title: "Generative AI", desc: "LLMs, agents & assistants" },
    {
      icon: Shield,
      title: "Data & Compliance",
      desc: "Secure data platforms & governance",
    },
  ];

  const partners = [
    { name: "2Edge", logo: "/assets/2edgelogo.png" },
    { name: "Alkatrading", logo: "/assets/Alkatrading.jpeg" },
    { name: "AVDMC", logo: "/assets/AVDMC.jpeg" },
    { name: "Bare Nexus", logo: "/assets/barenexus.jpeg" },
    { name: "Geetcare", logo: "/assets/Geetcare.jpeg" },
    { name: "IOTIVITY", logo: "/assets/IOTIVITY.jpeg" },
    { name: "JMF", logo: "/assets/JMF.jpeg" },
    { name: "SBC", logo: "/assets/sbc.jpeg" },
    { name: "Web", logo: "/assets/web.png" },
  ];

  return (
    <div className="min-h-screen text-[var(--text-primary)]">
      {/* Hero Section with Carousel */}

      <section
        ref={heroRef}
        className="
    relative
    h-[85vh] md:min-h-screen
    overflow-hidden
    flex items-center
    justify-center
    -mt-20 md:-mt-24 lg:-mt-28
  "
        data-testid="hero"
        onTouchStart={handleHeroTouchStart}
        onTouchEnd={handleHeroTouchEnd}
      >
        {/* Backgrounds */}
        <div className="absolute inset-0">
          {/* Video desktop only */}
          <div className="hidden lg:block">
            <VideoBackground
              src="/assets/138556-769988117.mp4"
              poster="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1600"
            />
          </div>

          <HeroAnimated />

          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
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

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        {/* Content */}
        <div
          className="
    relative z-10
    px-5
    text-center
    max-w-4xl
  "
        >
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index === currentSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 absolute"
              }`}
            >
              <h1
                className="
          font-space font-bold
          text-3xl sm:text-4xl md:text-6xl
          leading-tight mb-4
        "
              >
                {slide.title}
                <br />
                <span className="gradient-text">{slide.highlight}</span>
              </h1>

              <p
                className="
          text-gray-300
          text-sm sm:text-base md:text-lg
          mb-6
          max-w-xl mx-auto
        "
              >
                {slide.subtitle}
              </p>
            </div>
          ))}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/solutions"
              className="btn-primary rounded-full px-6 py-3 text-sm w-full sm:w-auto text-center"
            >
              Explore Solutions
            </Link>

            <Link
              to="/contact"
              className="rounded-full px-6 py-3 text-sm border border-white/20 w-full sm:w-auto text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Arrows (hide on mobile) */}
        <button
          onClick={prevSlide}
          className="
      hidden md:flex
      absolute left-6 top-1/2 -translate-y-1/2
      z-20 w-12 h-12 rounded-full
      bg-white/10 backdrop-blur-sm
      border border-white/20
      items-center justify-center
    "
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="
      hidden md:flex
      absolute right-6 top-1/2 -translate-y-1/2
      z-20 w-12 h-12 rounded-full
      bg-white/10 backdrop-blur-sm
      border border-white/20
      items-center justify-center
    "
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div
          className="
    absolute bottom-6 left-1/2 -translate-x-1/2
    flex gap-2 z-20
  "
        >
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all ${
                index === currentSlide
                  ? "w-6 h-2 bg-purple-500"
                  : "w-2 h-2 bg-white/40"
              }`}
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
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
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
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-4">
              {/* Circular Visual */}
              <div className="relative flex items-center justify-center py-12 lg:order-2">
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
              <div className="lg:order-1">
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  At Namespace Consultants, we offer cutting-edge AI solutions
                  that deliver unparalleled value and reliability. Our AI
                  services are designed to transform businesses and drive
                  success in the digital landscape.
                </p>
                <Button
                  asChild
                  className="btn-outline rounded-full px-5 py-2 text-sm"
                >
                  <Link to="/explore-solutions">
                    Explore Our Solutions{" "}
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
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

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
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
            <h3 className="font-space font-bold text-lg">
              Trusted by enterprises & startups
            </h3>
            <p className="text-gray-400 text-sm">
              We deliver secure, reliable AI systems for regulated industries
              and fast-moving product teams.
            </p>
          </div>

          <AnimatedCard className="overflow-hidden scroll-reveal">
            <div className="relative w-full overflow-hidden py-6">
              <div className="marquee flex items-center">
                {[...partners, ...partners].map((partner, i) => (
                  <div
                    key={i}
                    className="
            flex flex-col items-center justify-center
            mx-10 min-w-[150px]
            group
          "
                  >
                    <LogoBadge src={partner.logo} name={partner.name} />
                  </div>
                ))}
              </div>
            </div>
          </AnimatedCard>

          <div className="mt-8 flex justify-center">
            <Button asChild className="btn-outline rounded-full px-6">
              <Link to="/our-clients">See Our Clients</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Values */}
      <section
        id="vision"
        className="py-20 relative"
        data-testid="vision-mission"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
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
        className="py-20 relative overflow-hidden"
        data-testid="testimonials"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-space font-bold text-3xl mb-4">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>

            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Real outcomes — faster time-to-value and measurable ROI from
              practical AI deployments.
            </p>
          </div>

          {/* Carousel Wrapper */}
          <div className="relative overflow-x-hidden overflow-y-visible">
            {/* Gradient Fades */}
            <div className="absolute left-0 top-0 w-8 sm:w-14 h-full bg-gradient-to-r from-[#0A0A0F] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 w-8 sm:w-14 h-full bg-gradient-to-l from-[#0A0A0F] to-transparent z-10 pointer-events-none" />

            {/* Arrows */}
            <button
              type="button"
              onClick={() => scrollTestimonials("left")}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm absolute left-3 top-1/2 -translate-y-1/2 z-20"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollTestimonials("right")}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm absolute right-3 top-1/2 -translate-y-1/2 z-20"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Track */}
            <div
              ref={testimonialsRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 px-8 sm:px-12 scroll-px-8 sm:scroll-px-12 hide-scrollbar"
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="
              min-w-[260px] sm:min-w-[320px] lg:min-w-[360px]
              glass-card testimonial-card p-6
              rounded-xl
              snap-start
            "
                >
                  {/* Top */}
                  <div className="flex items-center gap-3 mb-4">
                    {testimonial.photo ? (
                      <img
                        src={testimonial.photo}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="
                  w-12 h-12 rounded-full
                  bg-gradient-to-br from-purple-600 to-indigo-600
                  flex items-center justify-center
                  text-sm font-semibold
                "
                      >
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                    )}

                    <div>
                      <p className="font-semibold text-sm text-[var(--text-primary)]">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-gray-400">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-purple-400">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-purple-400 text-purple-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-300 text-sm italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
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

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
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
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 items-center">
              <div className="p-8 flex flex-col justify-center">
                <h3 className="font-space font-bold text-2xl mb-4">
                  Ready to turn AI into measurable business value?
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Book a short discovery call and receive a tailored AI roadmap
                  for your team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="btn-primary rounded-full px-6">
                    <Link to="/contact">Book a Call</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="btn-outline rounded-full px-6"
                  >
                    <Link to="/solutions">See Solutions</Link>
                  </Button>
                </div>
              </div>

              <div className="relative h-56 lg:h-80 rounded-lg overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="AI collaborative"
                  className="w-full h-full object-cover"
                />
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
                  <Link
                    to="/privacy"
                    className="text-purple-400 ml-1 hover:underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  |
                  <Link
                    to="/cookies"
                    className="text-purple-400 ml-1 hover:underline"
                  >
                    Cookie Policy
                  </Link>
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
    </div>
  );
};

export default LandingPage;
