import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import LOCAL_LOGO from "@/assets/Free__2_-removebg-preview.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[999]" data-testid="nav">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-3.5 pb-1.5">
        <nav className="bg-[var(--page-bg)] border border-[color:var(--border-subtle)] rounded-full px-4 sm:px-8 lg:px-12 py-2.5 shadow-md relative">

          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={LOCAL_LOGO}
                alt="Logo"
                className="h-12 sm:h-[72px] w-auto max-w-[160px] sm:max-w-none object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex gap-8">
              <Link to="/solutions" className="nav-link">Solutions</Link>
              <Link to="/about" className="nav-link">About Us</Link>
              <Link to="/case-studies" className="nav-link">Case Studies</Link>
              <Link to="/resources" className="nav-link">Resources</Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">

              <Link to="/contact" className="hidden lg:block text-[var(--text-secondary)]">
                Contact
              </Link>

              <Button
                asChild
                className="btn-primary rounded-full px-5 hidden lg:inline-flex"
              >
                <Link to="/solutions">Explore Solutions</Link>
              </Button>

              {/* Hamburger */}
              <button
                className="lg:hidden text-[var(--text-primary)]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* ✅ FIXED MOBILE MENU */}
          {mobileMenuOpen && (
            <div className="
              lg:hidden
              absolute top-full left-0 w-full
              mt-3
              rounded-xl
              bg-[var(--menu-bg)]
              backdrop-blur-2xl
              border border-[color:var(--menu-border)]
              shadow-2xl
              z-[999]
            ">
              <div className="flex flex-col gap-5 p-6 text-[var(--text-primary)]">

                <Link to="/solutions" onClick={()=>setMobileMenuOpen(false)}>
                  Solutions
                </Link>

                <Link to="/about" onClick={()=>setMobileMenuOpen(false)}>
                  About Us
                </Link>

                <Link to="/case-studies" onClick={()=>setMobileMenuOpen(false)}>
                  Case Studies
                </Link>

                <Link to="/resources" onClick={()=>setMobileMenuOpen(false)}>
                  Resources
                </Link>

                <Link to="/contact" onClick={()=>setMobileMenuOpen(false)}>
                  Contact
                </Link>

                <Button
                  asChild
                  className="btn-primary w-full rounded-full mt-2"
                >
                  <Link to="/solutions" onClick={()=>setMobileMenuOpen(false)}>
                    Explore Solutions
                  </Link>
                </Button>

              </div>
            </div>
          )}

        </nav>
      </div>
    </header>
  );
};

export default Header;
