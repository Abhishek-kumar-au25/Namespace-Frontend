import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Target, Calendar, Flag, ArrowRight } from "lucide-react";

const Roadmap = () => {
  const phases = [
    {
      name: "Phase 1: Foundation",
      duration: "Days 1-30",
      status: "completed",
      progress: 100,
      objectives: [
        "Establish risk assessment framework",
        "Identify key operational risks",
        "Set up audit governance structure",
        "Define KPIs and success metrics"
      ],
      deliverables: [
        { name: "Risk Register", status: "completed" },
        { name: "Audit Charter", status: "completed" },
        { name: "KPI Framework", status: "completed" },
        { name: "Stakeholder Map", status: "completed" }
      ],
      milestones: [
        { week: 1, task: "Kickoff & Planning", done: true },
        { week: 2, task: "Risk Identification Workshops", done: true },
        { week: 3, task: "Control Assessment", done: true },
        { week: 4, task: "Framework Documentation", done: true }
      ]
    },
    {
      name: "Phase 2: Implementation",
      duration: "Days 31-60",
      status: "in_progress",
      progress: 45,
      objectives: [
        "Deploy preventive controls",
        "Implement detective mechanisms",
        "Launch audit workflow system",
        "Begin continuous monitoring"
      ],
      deliverables: [
        { name: "Control Matrix", status: "completed" },
        { name: "Audit Procedures", status: "in_progress" },
        { name: "Monitoring Dashboard", status: "in_progress" },
        { name: "Training Materials", status: "pending" }
      ],
      milestones: [
        { week: 5, task: "Control Design & Testing", done: true },
        { week: 6, task: "System Configuration", done: true },
        { week: 7, task: "User Training", done: false },
        { week: 8, task: "Go-Live Preparation", done: false }
      ]
    },
    {
      name: "Phase 3: Optimization",
      duration: "Days 61-90",
      status: "pending",
      progress: 0,
      objectives: [
        "Optimize control effectiveness",
        "Refine audit processes",
        "Automate routine tasks",
        "Scale operations"
      ],
      deliverables: [
        { name: "Automation Scripts", status: "pending" },
        { name: "Performance Report", status: "pending" },
        { name: "Process Improvements", status: "pending" },
        { name: "ROI Analysis", status: "pending" }
      ],
      milestones: [
        { week: 9, task: "Performance Review", done: false },
        { week: 10, task: "Process Optimization", done: false },
        { week: 11, task: "Automation Deployment", done: false },
        { week: 12, task: "Final Assessment", done: false }
      ]
    }
  ];

  const businessImpact = [
    {
      metric: "Risk Reduction",
      target: "30%",
      current: "22%",
      description: "Decrease in identified high-risk areas"
    },
    {
      metric: "Cost Savings",
      target: "₹2.5 Cr",
      current: "₹1.8 Cr",
      description: "Annual savings from loss prevention"
    },
    {
      metric: "Audit Efficiency",
      target: "45%",
      current: "35%",
      description: "Improvement in audit cycle time"
    },
    {
      metric: "Compliance Score",
      target: "95%",
      current: "88%",
      description: "Regulatory compliance achievement"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-500">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500/20 text-blue-500">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-zinc-500/20 text-zinc-400">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout 
      title="Implementation Roadmap" 
      subtitle="30-60-90 days execution plan"
    >
      {/* Timeline Progress */}
      <Card className="glass border-white/10 mb-8" data-testid="timeline-progress">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold">Overall Progress</h3>
            <span className="font-mono text-blue-500">48% Complete</span>
          </div>
          <Progress value={48} className="h-3 mb-4" />
          <div className="flex justify-between text-sm text-zinc-400">
            <span>Day 0</span>
            <span className="text-blue-500">Day 45 (Current)</span>
            <span>Day 90</span>
          </div>
        </CardContent>
      </Card>

      {/* Phases */}
      <div className="space-y-6 mb-8" data-testid="roadmap-phases">
        {phases.map((phase, index) => (
          <Card 
            key={phase.name} 
            className={`glass border-white/10 ${
              phase.status === "in_progress" ? "ring-2 ring-blue-500/30" : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="font-heading text-xl">{phase.name}</CardTitle>
                    {getStatusBadge(phase.status)}
                  </div>
                  <p className="text-sm text-zinc-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {phase.duration}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono">{phase.progress}%</span>
                  <p className="text-xs text-zinc-400">Complete</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Objectives */}
                <div>
                  <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    Objectives
                  </h4>
                  <ul className="space-y-2">
                    {phase.objectives.map((obj, i) => (
                      <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Flag className="w-4 h-4 text-purple-500" />
                    Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {phase.deliverables.map((del, i) => (
                      <li key={i} className="flex items-center justify-between text-sm">
                        <span className="text-zinc-400">{del.name}</span>
                        {del.status === "completed" ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : del.status === "in_progress" ? (
                          <Clock className="w-4 h-4 text-blue-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-zinc-600" />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Milestones */}
                <div>
                  <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    Weekly Milestones
                  </h4>
                  <ul className="space-y-2">
                    {phase.milestones.map((milestone, i) => (
                      <li 
                        key={i} 
                        className={`flex items-center gap-2 text-sm ${
                          milestone.done ? "text-zinc-400" : "text-zinc-500"
                        }`}
                      >
                        {milestone.done ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-zinc-600" />
                        )}
                        <span className="text-xs text-zinc-500">W{milestone.week}</span>
                        <span className={milestone.done ? "line-through" : ""}>
                          {milestone.task}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Expected Business Impact */}
      <Card className="glass border-white/10" data-testid="business-impact">
        <CardHeader>
          <CardTitle className="font-heading text-xl">Expected Business Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessImpact.map((impact) => (
              <div key={impact.metric} className="p-4 bg-zinc-800/50 rounded-lg">
                <p className="text-sm text-zinc-400 mb-2">{impact.metric}</p>
                <div className="flex items-end gap-2 mb-2">
                  <span className="font-heading font-bold text-2xl">{impact.current}</span>
                  <span className="text-zinc-500 text-sm mb-1">/ {impact.target}</span>
                </div>
                <p className="text-xs text-zinc-500">{impact.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Roadmap;
