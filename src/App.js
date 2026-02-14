import React from "react";
import "@/App.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/jetbrains-mono/400.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

// Pages
import LandingPage from "./pages/LandingPage";
import Solutions from "./pages/Solutions";
import Dashboard from "./pages/Dashboard";
import RiskAssessment from "./pages/RiskAssessment";
import AuditWorkflow from "./pages/AuditWorkflow";
import KPIMetrics from "./pages/KPIMetrics";
import Reports from "./pages/Reports";
import ProcessFlows from "./pages/ProcessFlows";
import Roadmap from "./pages/Roadmap";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Resources from "./pages/Resources";
import ExploreSolutions from "./pages/exploreSolutions";
import OurClients from "./pages/OurClients";
import OurWork from "./pages/OurWork";
import OurWorkDetail from "./pages/OurWorkDetail";
import CursorDot from "@/components/layout/CursorDot";
import { ThemeProvider, useTheme } from "@/components/layout/ThemeProvider";
import ThemeToggle from "@/components/layout/ThemeToggle";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SupportBot from "@/components/layout/SupportBot";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

// Auth / login flows are currently disabled.
// The following blocks were commented out per request.
// - Auth Context
// - Axios auth interceptor
// - ProtectedRoute
// - AuthCallback
// - AuthProvider

// App Router Component
import SiteLayout from "@/components/layout/SiteLayout";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public pages wrapped by SiteLayout to provide identical header/footer */}
      <Route element={<SiteLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/our-clients" element={<OurClients />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/our-work/:slug" element={<OurWorkDetail />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/services" element={<Solutions />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/explore-solutions" element={<ExploreSolutions />} />
      </Route>

      {/* Dashboard style routes (no auth gating) */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/risks" element={<RiskAssessment />} />
      <Route path="/audit" element={<AuditWorkflow />} />
      <Route path="/kpis" element={<KPIMetrics />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/process-flows" element={<ProcessFlows />} />
      <Route path="/roadmap" element={<Roadmap />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppShell />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

const AppShell = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="App min-h-screen bg-[var(--page-bg-alt)] text-[var(--text-primary)]">
      <ScrollToTop />
      <AppRouter />
      <CursorDot />
      <ThemeToggle />
      <SupportBot />
      <Toaster position="top-right" theme={resolvedTheme} />
    </div>
  );
};

