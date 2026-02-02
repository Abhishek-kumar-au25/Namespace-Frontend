import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import LOCAL_LOGO from "@/assets/Free__2_-removebg-preview.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50" data-testid="nav">
      <div className="mx-auto px-4 sm:px-6 lg:px-10 pt-4 pb-2">
        <nav className="premium-header px-6 sm:px-10 lg:px-12 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src={LOCAL_LOGO}
                alt="Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                to="/solutions"
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
                <Button className="btn-primary rounded-full px-5 sm:px-6 py-2.5 text-sm font-medium" data-testid="explore-btn">
                  Explore Solutions
                </Button>
              </Link>
              <button
                className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-purple-500/10">
              <div className="flex flex-col gap-3">
                <Link to="/solutions" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-300 hover:text-white py-1.5 transition-colors">
                  Solutions
                </Link>

                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-300 hover:text-white py-1.5 transition-colors">
                  About Us
                </Link>

                <Link to="/case-studies" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-300 hover:text-white py-1.5 transition-colors">
                  Case Studies
                </Link>

                <Link to="/resources" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-300 hover:text-white py-1.5 transition-colors">
                  Resources
                </Link>

                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-sm text-purple-400 hover:text-purple-300 py-1.5 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
