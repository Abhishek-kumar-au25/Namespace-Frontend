import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Shield,
  LayoutDashboard,
  AlertTriangle,
  ClipboardList,
  BarChart3,
  FileText,
  GitBranch,
  Calendar,
  Menu,
  X
} from "lucide-react";



const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/risks", label: "Risk Assessment", icon: AlertTriangle },
  { path: "/audit", label: "Audit Workflow", icon: ClipboardList },
  { path: "/kpis", label: "KPIs & Metrics", icon: BarChart3 },
  { path: "/process-flows", label: "Process Flows", icon: GitBranch },
  { path: "/roadmap", label: "Roadmap", icon: Calendar },
  { path: "/reports", label: "Reports", icon: FileText },
];

const DashboardLayout = ({ children, title, subtitle }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Login/logout removed.

  return (
    <div className="min-h-screen">
      <Header />

      {/* Dashboard Navigation (compact bar under shared header) */}
      <header className="fixed top-[64px] left-0 right-0 z-40 glass border-b border-purple-500/10" data-testid="dashboard-header">
        <div className="flex items-center justify-between px-6 py-2 max-w-7xl mx-auto">
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-purple-500/15 text-purple-400"
                      : "text-zinc-400 hover:text-[var(--text-primary)] hover:bg-white/5"
                  }`}
                  data-testid={`nav-${item.path.slice(1)}`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* User auth menu removed */}
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-purple-500/10 p-4 space-y-1" data-testid="mobile-nav">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-purple-500/15 text-purple-400"
                      : "text-zinc-400 hover:text-[var(--text-primary)] hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-[88px] min-h-screen">
        <div className="p-6 lg:p-8">
          {/* Page Header */}
          {title && (
            <div className="mb-8" data-testid="page-header">
              <h1 className="font-heading font-bold text-2xl lg:text-3xl tracking-tight mb-2">{title}</h1>
              {subtitle && <p className="text-zinc-400">{subtitle}</p>}
            </div>
          )}

          {/* Page Content */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
