import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/App";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Sparkles, AlertTriangle, Shield, Loader2 } from "lucide-react";

const CATEGORIES = [
  "Fraud",
  "Financial Leakage",
  "Operational Errors",
  "Compliance Failures",
  "Cyber Risks"
];

const STATUSES = ["Open", "Mitigated", "Accepted", "Closed"];

const RiskAssessment = () => {
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [editingRisk, setEditingRisk] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    likelihood: 3,
    impact: 3,
    mitigation_strategy: "",
    owner: ""
  });

  useEffect(() => {
    fetchRisks();
  }, []);

  const fetchRisks = async () => {
    try {
      const response = await axios.get(`${API}/risks`);
      setRisks(response.data);
    } catch (error) {
      toast.error("Failed to fetch risks");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRisk) {
        await axios.put(`${API}/risks/${editingRisk.risk_id}`, formData);
        toast.success("Risk updated successfully");
      } else {
        await axios.post(`${API}/risks`, formData);
        toast.success("Risk created successfully");
      }
      setDialogOpen(false);
      setEditingRisk(null);
      resetForm();
      fetchRisks();
    } catch (error) {
      toast.error("Failed to save risk");
    }
  };

  const handleDelete = async (riskId) => {
    if (!window.confirm("Are you sure you want to delete this risk?")) return;
    try {
      await axios.delete(`${API}/risks/${riskId}`);
      toast.success("Risk deleted successfully");
      fetchRisks();
    } catch (error) {
      toast.error("Failed to delete risk");
    }
  };

  const handleEdit = (risk) => {
    setEditingRisk(risk);
    setFormData({
      name: risk.name,
      category: risk.category,
      description: risk.description,
      likelihood: risk.likelihood,
      impact: risk.impact,
      mitigation_strategy: risk.mitigation_strategy || "",
      owner: risk.owner || ""
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      likelihood: 3,
      impact: 3,
      mitigation_strategy: "",
      owner: ""
    });
  };

  const handleAIAnalysis = async (risk, type) => {
    setSelectedRisk(risk);
    setAiDialogOpen(true);
    setAiLoading(true);
    setAiAnalysis("");

    try {
      const context = `
Risk: ${risk.name}
Category: ${risk.category}
Description: ${risk.description}
Current Score: ${risk.risk_score} (Likelihood: ${risk.likelihood}, Impact: ${risk.impact})
Status: ${risk.status}
${risk.mitigation_strategy ? `Current Mitigation: ${risk.mitigation_strategy}` : ''}
      `.trim();

      const response = await axios.post(`${API}/ai/analyze`, {
        context,
        analysis_type: type
      });

      setAiAnalysis(response.data.analysis);
    } catch (error) {
      toast.error("Failed to get AI analysis");
      setAiDialogOpen(false);
    } finally {
      setAiLoading(false);
    }
  };

  const getRiskScoreColor = (score) => {
    if (score >= 15) return "text-red-500 bg-red-500/10";
    if (score >= 8) return "text-amber-500 bg-amber-500/10";
    return "text-green-500 bg-green-500/10";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open": return "bg-amber-500/20 text-amber-500";
      case "Mitigated": return "bg-green-500/20 text-green-500";
      case "Closed": return "bg-blue-500/20 text-blue-500";
      case "Accepted": return "bg-purple-500/20 text-purple-500";
      default: return "bg-zinc-500/20 text-zinc-500";
    }
  };

  return (
    <DashboardLayout 
      title="Risk Assessment" 
      subtitle="Identify, score, and prioritize organizational risks"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" data-testid="risk-summary">
        <Card className="glass border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{risks.length}</p>
                <p className="text-sm text-zinc-400">Total Risks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-500">
                  {risks.filter(r => r.risk_score >= 15).length}
                </p>
                <p className="text-sm text-zinc-400">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-500">
                  {risks.filter(r => r.risk_score >= 8 && r.risk_score < 15).length}
                </p>
                <p className="text-sm text-zinc-400">Medium</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-500">
                  {risks.filter(r => r.status === "Mitigated").length}
                </p>
                <p className="text-sm text-zinc-400">Mitigated</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading font-semibold text-xl">Risk Register</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="btn-primary" 
              onClick={() => { setEditingRisk(null); resetForm(); }}
              data-testid="add-risk-btn"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Risk
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-800 max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-heading">
                {editingRisk ? "Edit Risk" : "Add New Risk"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Risk Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter risk name"
                  required
                  className="bg-zinc-800 border-zinc-700"
                  data-testid="risk-name-input"
                />
              </div>

              <div>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700" data-testid="risk-category-select">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the risk"
                  required
                  className="bg-zinc-800 border-zinc-700"
                  data-testid="risk-description-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Likelihood (1-5)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={formData.likelihood}
                    onChange={(e) => setFormData({ ...formData, likelihood: parseInt(e.target.value) })}
                    className="bg-zinc-800 border-zinc-700"
                    data-testid="risk-likelihood-input"
                  />
                </div>
                <div>
                  <Label>Impact (1-5)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={formData.impact}
                    onChange={(e) => setFormData({ ...formData, impact: parseInt(e.target.value) })}
                    className="bg-zinc-800 border-zinc-700"
                    data-testid="risk-impact-input"
                  />
                </div>
              </div>

              <div>
                <Label>Risk Score Preview</Label>
                <div className={`text-2xl font-bold font-mono p-3 rounded-lg text-center ${getRiskScoreColor(formData.likelihood * formData.impact)}`}>
                  {formData.likelihood * formData.impact}
                </div>
              </div>

              <div>
                <Label>Owner (Optional)</Label>
                <Input
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  placeholder="Risk owner name"
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div>
                <Label>Mitigation Strategy (Optional)</Label>
                <Textarea
                  value={formData.mitigation_strategy}
                  onChange={(e) => setFormData({ ...formData, mitigation_strategy: e.target.value })}
                  placeholder="Describe mitigation approach"
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <Button type="submit" className="w-full btn-primary" data-testid="save-risk-btn">
                {editingRisk ? "Update Risk" : "Create Risk"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Risk Table */}
      <Card className="glass border-white/10" data-testid="risk-table-card">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : risks.length === 0 ? (
            <div className="p-8 text-center text-zinc-400">
              No risks found. Add your first risk to get started.
            </div>
          ) : (
            <Table className="audit-table">
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead>Risk Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {risks.map((risk) => (
                  <TableRow key={risk.risk_id} className="border-zinc-800">
                    <TableCell>
                      <div>
                        <p className="font-medium">{risk.name}</p>
                        <p className="text-xs text-zinc-500 truncate max-w-xs">{risk.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-zinc-700">
                        {risk.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`font-mono font-bold px-2 py-1 rounded ${getRiskScoreColor(risk.risk_score)}`}>
                        {risk.risk_score}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(risk.status)}>
                        {risk.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      {risk.owner || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleAIAnalysis(risk, "risk_assessment")}
                          title="AI Analysis"
                          data-testid={`ai-analyze-${risk.risk_id}`}
                        >
                          <Sparkles className="w-4 h-4 text-blue-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(risk)}
                          data-testid={`edit-${risk.risk_id}`}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(risk.risk_id)}
                          data-testid={`delete-${risk.risk_id}`}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* AI Analysis Dialog */}
      <Dialog open={aiDialogOpen} onOpenChange={setAiDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              AI Risk Analysis
            </DialogTitle>
          </DialogHeader>
          {selectedRisk && (
            <div className="space-y-4">
              <div className="p-4 bg-zinc-800 rounded-lg">
                <h3 className="font-semibold mb-1">{selectedRisk.name}</h3>
                <p className="text-sm text-zinc-400">{selectedRisk.category} • Score: {selectedRisk.risk_score}</p>
              </div>
              
              {aiLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  <span className="ml-3 text-zinc-400">Analyzing risk...</span>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {aiAnalysis}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-zinc-800">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAIAnalysis(selectedRisk, "risk_assessment")}
                  disabled={aiLoading}
                  className="border-zinc-700"
                >
                  Risk Assessment
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAIAnalysis(selectedRisk, "mitigation_strategy")}
                  disabled={aiLoading}
                  className="border-zinc-700"
                >
                  Mitigation Strategy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAIAnalysis(selectedRisk, "audit_recommendation")}
                  disabled={aiLoading}
                  className="border-zinc-700"
                >
                  Audit Recommendation
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default RiskAssessment;
