import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/App";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Shield,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  FileText
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/dashboard/stats`);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  // Chart colors
  const COLORS = {
    blue: "#2563EB",
    green: "#10B981",
    amber: "#F59E0B",
    red: "#EF4444",
    purple: "#6366F1"
  };

  const riskCategoryData = stats?.risks?.by_category
    ? Object.entries(stats.risks.by_category).map(([name, value]) => ({ name, value }))
    : [];

  const taskPhaseData = stats?.audit_tasks?.by_phase
    ? Object.entries(stats.audit_tasks.by_phase).map(([name, value]) => ({ name, value }))
    : [];

  const riskTrendData = [
    { month: "Aug", high: 12, medium: 18, low: 25 },
    { month: "Sep", high: 10, medium: 20, low: 22 },
    { month: "Oct", high: 8, medium: 15, low: 28 },
    { month: "Nov", high: 6, medium: 12, low: 30 },
    { month: "Dec", high: 5, medium: 10, low: 32 },
    { month: "Jan", high: stats?.risks?.high || 3, medium: stats?.risks?.medium || 8, low: stats?.risks?.low || 35 }
  ];

  const PIE_COLORS = [COLORS.blue, COLORS.green, COLORS.amber, COLORS.red, COLORS.purple];

  if (loading) {
    return (
      <DashboardLayout title="Dashboard" subtitle="Executive Overview">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 skeleton rounded-xl"></div>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard" subtitle="Executive Overview">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8" data-testid="kpi-cards">
        <Card className="glass border-white/10 card-hover" data-testid="total-risks-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-400 uppercase tracking-wider mb-1">Total Risks</p>
                <p className="font-heading font-bold text-3xl">{stats?.risks?.total || 0}</p>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <TrendingDown className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">12%</span>
                  <span className="text-zinc-500">vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 card-hover" data-testid="high-risks-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-400 uppercase tracking-wider mb-1">High Priority</p>
                <p className="font-heading font-bold text-3xl text-red-500">{stats?.risks?.high || 0}</p>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <span className="text-zinc-500">Requires immediate action</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 card-hover" data-testid="mitigated-risks-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-400 uppercase tracking-wider mb-1">Mitigated</p>
                <p className="font-heading font-bold text-3xl text-green-500">{stats?.risks?.mitigated || 0}</p>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">8%</span>
                  <span className="text-zinc-500">improvement</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 card-hover" data-testid="audit-tasks-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-400 uppercase tracking-wider mb-1">Audit Tasks</p>
                <p className="font-heading font-bold text-3xl">{stats?.audit_tasks?.total || 0}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-green-500/20 text-green-500 text-xs">{stats?.audit_tasks?.completed || 0} Done</Badge>
                  <Badge className="bg-amber-500/20 text-amber-500 text-xs">{stats?.audit_tasks?.pending || 0} Pending</Badge>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {/* Risk Trend Chart */}
        <Card className="glass border-white/10 lg:col-span-2" data-testid="risk-trend-chart">
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Risk Trend Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={riskTrendData}>
                <defs>
                  <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.red} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={COLORS.red} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.amber} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={COLORS.amber} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.green} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={COLORS.green} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#A1A1AA" fontSize={11} />
                <YAxis stroke="#A1A1AA" fontSize={11} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#18181B', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Area type="monotone" dataKey="high" stroke={COLORS.red} fillOpacity={1} fill="url(#colorHigh)" />
                <Area type="monotone" dataKey="medium" stroke={COLORS.amber} fillOpacity={1} fill="url(#colorMedium)" />
                <Area type="monotone" dataKey="low" stroke={COLORS.green} fillOpacity={1} fill="url(#colorLow)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk by Category */}
        <Card className="glass border-white/10" data-testid="risk-category-chart">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Risk by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={riskCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {riskCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#18181B', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {riskCategoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2 text-xs">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                  ></div>
                  <span className="text-zinc-400">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Audit Tasks by Phase */}
        <Card className="glass border-white/10" data-testid="audit-phase-chart">
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-500" />
              Audit Tasks by Phase
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={taskPhaseData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="#A1A1AA" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#A1A1AA" fontSize={11} width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#18181B', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" fill={COLORS.purple} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* KPI Progress */}
        <Card className="glass border-white/10" data-testid="kpi-progress-card">
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              KPI Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-zinc-400">Risk Mitigation Rate</span>
                <span className="text-sm font-mono">62%</span>
              </div>
              <Progress value={62} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-zinc-400">Audit Completion</span>
                <span className="text-sm font-mono">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-zinc-400">Compliance Score</span>
                <span className="text-sm font-mono">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-zinc-400">Control Effectiveness</span>
                <span className="text-sm font-mono">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
