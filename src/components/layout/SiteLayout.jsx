import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AIBackground from "./AIBackground";

const SiteLayout = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white relative">
      <AIBackground />
      <Header />
      <main className="relative z-10 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
