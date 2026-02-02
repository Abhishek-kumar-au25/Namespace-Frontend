import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/App";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Shield,
  LayoutDashboard,
  AlertTriangle,
  ClipboardList,
  BarChart3,
  FileText,
  GitBranch,
  Calendar,
  LogOut,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_2e55a7fc-06f9-47db-b4a6-4600417bac65/artifacts/o8krn3xe_Free__2_-removebg-preview.png";

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
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-purple-500/10" data-testid="dashboard-header">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-2" data-testid="logo-link">
              <img 
                src={LOGO_URL}
                alt="Logo"
                className="h-10 md:h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
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
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                    data-testid={`nav-${item.path.slice(1)}`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2" data-testid="user-menu-btn">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.picture} />
                    <AvatarFallback className="bg-purple-500 text-white text-sm">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block text-sm font-medium">{user?.name}</span>
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-zinc-400">{user?.email}</p>
                </div>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-red-400 cursor-pointer"
                  data-testid="logout-btn"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
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
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
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
      <main className="pt-16 min-h-screen">
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
