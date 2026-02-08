import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  AlertTriangle, 
  Shield, 
  FileSearch, 
  CheckCircle,
  BarChart3,
  FileText,
  Users,
  Database
} from "lucide-react";

const ProcessFlows = () => {
  const riskManagementFlow = [
    {
      step: 1,
      title: "Risk Identification",
      description: "Identify potential risks across all business operations",
      icon: AlertTriangle,
      tasks: ["Conduct risk workshops", "Review historical incidents", "Analyze industry trends"]
    },
    {
      step: 2,
      title: "Risk Assessment",
      description: "Evaluate likelihood and impact of identified risks",
      icon: BarChart3,
      tasks: ["Score likelihood (1-5)", "Score impact (1-5)", "Calculate risk score"]
    },
    {
      step: 3,
      title: "Risk Prioritization",
      description: "Rank risks based on score and strategic importance",
      icon: Database,
      tasks: ["Categorize by severity", "Align with business objectives", "Resource allocation"]
    },
    {
      step: 4,
      title: "Mitigation Planning",
      description: "Develop and implement control measures",
      icon: Shield,
      tasks: ["Design preventive controls", "Implement detective controls", "Plan corrective actions"]
    },
    {
      step: 5,
      title: "Monitoring & Review",
      description: "Continuous monitoring and periodic review",
      icon: CheckCircle,
      tasks: ["Track KPIs", "Review effectiveness", "Update risk register"]
    }
  ];

  const auditWorkflow = [
    {
      phase: "Planning",
      duration: "Week 1-2",
      activities: [
        "Define audit scope and objectives",
        "Review prior audit findings",
        "Identify key risk areas",
        "Develop audit program"
      ],
      deliverables: ["Audit Charter", "Risk Assessment Matrix", "Audit Schedule"]
    },
    {
      phase: "Fieldwork",
      duration: "Week 3-6",
      activities: [
        "Conduct interviews with process owners",
        "Test internal controls",
        "Review documentation",
        "Perform data analytics"
      ],
      deliverables: ["Working Papers", "Test Results", "Evidence Documentation"]
    },
    {
      phase: "Reporting",
      duration: "Week 7-8",
      activities: [
        "Document findings and observations",
        "Develop recommendations",
        "Draft audit report",
        "Present to management"
      ],
      deliverables: ["Draft Report", "Final Report", "Executive Summary"]
    },
    {
      phase: "Follow-up",
      duration: "Ongoing",
      activities: [
        "Track management action plans",
        "Verify implementation",
        "Update risk ratings",
        "Close audit findings"
      ],
      deliverables: ["Action Tracking Report", "Closure Evidence", "Status Updates"]
    }
  ];

  const controlFramework = [
    {
      type: "Preventive Controls",
      color: "blue",
      description: "Controls designed to prevent errors or irregularities from occurring",
      examples: [
        "Segregation of duties",
        "Authorization requirements",
        "Access controls",
        "Training programs"
      ]
    },
    {
      type: "Detective Controls",
      color: "amber",
      description: "Controls designed to detect errors or irregularities that have occurred",
      examples: [
        "Reconciliations",
        "Exception reports",
        "Physical inventory counts",
        "Internal audits"
      ]
    },
    {
      type: "Corrective Controls",
      color: "green",
      description: "Controls designed to correct errors or irregularities that have been detected",
      examples: [
        "Backup and recovery procedures",
        "Incident response plans",
        "Error correction processes",
        "Management review"
      ]
    }
  ];

  return (
    <DashboardLayout 
      title="Process Flows" 
      subtitle="Operational workflow diagrams and process documentation"
    >
      {/* Risk Management Process */}
      <Card className="glass border-white/10 mb-8" data-testid="risk-management-flow">
        <CardHeader>
          <CardTitle className="font-heading text-xl flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Risk Management Process Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {riskManagementFlow.map((step, index) => (
              <React.Fragment key={step.step}>
                <div className="flex-1 min-w-[200px] p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-500">Step {step.step}</Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-400 mb-3">{step.description}</p>
                  <ul className="space-y-1">
                    {step.tasks.map((task, i) => (
                      <li key={i} className="text-xs text-zinc-500 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
                {index < riskManagementFlow.length - 1 && (
                  <div className="hidden lg:flex items-center">
                    <ArrowRight className="w-6 h-6 text-zinc-600" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audit Workflow */}
      <Card className="glass border-white/10 mb-8" data-testid="audit-workflow-flow">
        <CardHeader>
          <CardTitle className="font-heading text-xl flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-purple-500" />
            Audit Workflow Architecture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {auditWorkflow.map((phase, index) => (
              <div 
                key={phase.phase} 
                className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700 relative"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-purple-400">{phase.phase}</h3>
                  <Badge variant="outline" className="border-zinc-600 text-xs">
                    {phase.duration}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Activities</p>
                  <ul className="space-y-1">
                    {phase.activities.map((activity, i) => (
                      <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Deliverables</p>
                  <div className="flex flex-wrap gap-1">
                    {phase.deliverables.map((deliverable, i) => (
                      <Badge 
                        key={i} 
                        className="bg-purple-500/10 text-purple-400 text-xs"
                      >
                        {deliverable}
                      </Badge>
                    ))}
                  </div>
                </div>

                {index < auditWorkflow.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-zinc-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Control Framework */}
      <Card className="glass border-white/10" data-testid="control-framework">
        <CardHeader>
          <CardTitle className="font-heading text-xl flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            Internal Control Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {controlFramework.map((control) => (
              <div 
                key={control.type}
                className={`p-6 rounded-lg border ${
                  control.color === "blue" 
                    ? "bg-blue-500/5 border-blue-500/20" 
                    : control.color === "amber"
                    ? "bg-amber-500/5 border-amber-500/20"
                    : "bg-green-500/5 border-green-500/20"
                }`}
              >
                <h3 className={`font-semibold mb-2 ${
                  control.color === "blue" 
                    ? "text-blue-500" 
                    : control.color === "amber"
                    ? "text-amber-500"
                    : "text-green-500"
                }`}>
                  {control.type}
                </h3>
                <p className="text-sm text-zinc-400 mb-4">{control.description}</p>
                <ul className="space-y-2">
                  {control.examples.map((example, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 ${
                        control.color === "blue" 
                          ? "text-blue-500" 
                          : control.color === "amber"
                          ? "text-amber-500"
                          : "text-green-500"
                      }`} />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ProcessFlows;
