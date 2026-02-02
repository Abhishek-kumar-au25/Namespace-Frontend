import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/App";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, TrendingUp, TrendingDown, Minus, Target, Pencil } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend
} from "recharts";

const KPI_CATEGORIES = [
  "Risk Management",
  "Audit",
  "Controls",
  "Compliance",
  "Fraud",
  "Operations"
];

const KPIMetrics = () => {
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingKpi, setEditingKpi] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    target: 100,
    current: 0,
    unit: "%"
  });

  useEffect(() => {
    fetchKpis();
  }, []);

  const fetchKpis = async () => {
    try {
      const response = await axios.get(`${API}/kpis`);
      setKpis(response.data);
    } catch (error) {
      toast.error("Failed to fetch KPIs");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingKpi) {
        await axios.put(`${API}/kpis/${editingKpi.kpi_id}`, formData);
        toast.success("KPI updated successfully");
      } else {
        await axios.post(`${API}/kpis`, formData);
        toast.success("KPI created successfully");
      }
      setDialogOpen(false);
      setEditingKpi(null);
      resetForm();
      fetchKpis();
    } catch (error) {
      toast.error("Failed to save KPI");
    }
  };

  const handleEdit = (kpi) => {
    setEditingKpi(kpi);
    setFormData({
      name: kpi.name,
      category: kpi.category,
      target: kpi.target,
      current: kpi.current,
      unit: kpi.unit
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      target: 100,
      current: 0,
      unit: "%"
    });
  };

  const getTrendIcon = (kpi) => {
    const percentage = (kpi.current / kpi.target) * 100;
    if (percentage >= 90) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (percentage >= 70) return <Minus className="w-4 h-4 text-amber-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const getProgressColor = (kpi) => {
    const percentage = (kpi.current / kpi.target) * 100;
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 70) return "bg-amber-500";
    return "bg-red-500";
  };

  // Chart data
  const chartData = kpis.map((kpi) => ({
    name: kpi.name.length > 15 ? kpi.name.substring(0, 15) + "..." : kpi.name,
    current: kpi.current,
    target: kpi.target,
    fill: (kpi.current / kpi.target) >= 0.9 ? "#10B981" : 
          (kpi.current / kpi.target) >= 0.7 ? "#F59E0B" : "#EF4444"
  }));

  const radialData = kpis.slice(0, 6).map((kpi, index) => ({
    name: kpi.name,
    value: Math.round((kpi.current / kpi.target) * 100),
    fill: ["#2563EB", "#10B981", "#F59E0B", "#EF4444", "#6366F1", "#EC4899"][index % 6]
  }));

  // Summary stats
  const onTarget = kpis.filter((k) => k.current >= k.target).length;
  const avgPerformance = kpis.length > 0 
    ? Math.round(kpis.reduce((acc, k) => acc + (k.current / k.target) * 100, 0) / kpis.length) 
    : 0;

  return (
    <DashboardLayout 
      title="KPIs & Metrics" 
      subtitle="Track and measure success indicators"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-testid="kpi-summary">
        <Card className="glass border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400 uppercase tracking-wider mb-1">Total KPIs</p>
                <p className="font-heading font-bold text-3xl">{kpis.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400 uppercase tracking-wider mb-1">On Target</p>
                <p className="font-heading font-bold text-3xl text-green-500">{onTarget}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400 uppercase tracking-wider mb-1">Avg Performance</p>
                <p className="font-heading font-bold text-3xl">{avgPerformance}%</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="glass border-white/10" data-testid="kpi-bar-chart">
          <CardHeader>
            <CardTitle className="font-heading text-lg">KPI Performance vs Target</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="#A1A1AA" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#A1A1AA" fontSize={10} width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#18181B', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="current" fill="#2563EB" radius={[0, 4, 4, 0]} name="Current" />
                <Bar dataKey="target" fill="#27272A" radius={[0, 4, 4, 0]} name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass border-white/10" data-testid="kpi-radial-chart">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Achievement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="20%" 
                outerRadius="90%" 
                data={radialData}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar
                  minAngle={15}
                  background
                  clockWise
                  dataKey="value"
                  cornerRadius={4}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#18181B', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value}%`, 'Achievement']}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {radialData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.fill }}></div>
                  <span className="text-zinc-400">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading font-semibold text-xl">All KPIs</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="btn-primary" 
              onClick={() => { setEditingKpi(null); resetForm(); }}
              data-testid="add-kpi-btn"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add KPI
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-800 max-w-md">
            <DialogHeader>
              <DialogTitle className="font-heading">
                {editingKpi ? "Edit KPI" : "Add New KPI"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>KPI Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter KPI name"
                  required
                  className="bg-zinc-800 border-zinc-700"
                  data-testid="kpi-name-input"
                />
              </div>

              <div>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700" data-testid="kpi-category-select">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {KPI_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Target</Label>
                  <Input
                    type="number"
                    value={formData.target}
                    onChange={(e) => setFormData({ ...formData, target: parseFloat(e.target.value) })}
                    className="bg-zinc-800 border-zinc-700"
                    data-testid="kpi-target-input"
                  />
                </div>
                <div>
                  <Label>Current</Label>
                  <Input
                    type="number"
                    value={formData.current}
                    onChange={(e) => setFormData({ ...formData, current: parseFloat(e.target.value) })}
                    className="bg-zinc-800 border-zinc-700"
                    data-testid="kpi-current-input"
                  />
                </div>
              </div>

              <div>
                <Label>Unit</Label>
                <Select
                  value={formData.unit}
                  onValueChange={(value) => setFormData({ ...formData, unit: value })}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="%">Percentage (%)</SelectItem>
                    <SelectItem value="count">Count</SelectItem>
                    <SelectItem value="₹">Currency (₹)</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full btn-primary" data-testid="save-kpi-btn">
                {editingKpi ? "Update KPI" : "Create KPI"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="kpi-cards-grid">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-32 skeleton rounded-xl"></div>
          ))
        ) : kpis.length === 0 ? (
          <div className="col-span-full text-center py-12 text-zinc-400">
            No KPIs found. Add your first KPI to get started.
          </div>
        ) : (
          kpis.map((kpi) => {
            const percentage = Math.round((kpi.current / kpi.target) * 100);
            return (
              <Card 
                key={kpi.kpi_id} 
                className="glass border-white/10 card-hover"
                data-testid={`kpi-card-${kpi.kpi_id}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                        {kpi.category}
                      </p>
                      <h3 className="font-semibold">{kpi.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(kpi)}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleEdit(kpi)}
                      >
                        <Pencil className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-end gap-2 mb-3">
                    <span className="font-heading font-bold text-2xl">
                      {kpi.current}
                    </span>
                    <span className="text-zinc-400 text-sm mb-1">
                      / {kpi.target} {kpi.unit}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">Progress</span>
                      <span className={percentage >= 90 ? "text-green-500" : percentage >= 70 ? "text-amber-500" : "text-red-500"}>
                        {percentage}%
                      </span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${getProgressColor(kpi)}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
};

export default KPIMetrics;
