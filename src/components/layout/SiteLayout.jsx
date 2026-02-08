import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AIBackground from "./AIBackground";
import ParticleDots from "./ParticleDots";

const SiteLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] relative">
      <AIBackground />
      <ParticleDots />
      <Header />
      <main className="relative z-10 pt-[72px] sm:pt-[80px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
