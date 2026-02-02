import React from "react";
import axios from "axios";
import { API } from "@/App";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileText, Download, Table, Loader2 } from "lucide-react";

const Reports = () => {
  const [pdfLoading, setPdfLoading] = React.useState(false);
  const [excelLoading, setExcelLoading] = React.useState(false);

  const downloadPDF = async () => {
    setPdfLoading(true);
    try {
      const response = await axios.get(`${API}/reports/pdf`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `audit_report_${new Date().toISOString().split('T')[0]}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success("PDF report downloaded successfully");
    } catch (error) {
      toast.error("Failed to download PDF report");
    } finally {
      setPdfLoading(false);
    }
  };

  const downloadExcel = async () => {
    setExcelLoading(true);
    try {
      const response = await axios.get(`${API}/reports/excel`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `audit_report_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success("Excel report downloaded successfully");
    } catch (error) {
      toast.error("Failed to download Excel report");
    } finally {
      setExcelLoading(false);
    }
  };

  const reportTypes = [
    {
      title: "Executive Summary Report",
      description: "Comprehensive PDF report including risk assessment, audit tasks, and KPI summary. Ideal for board presentations and stakeholder meetings.",
      icon: FileText,
      format: "PDF",
      action: downloadPDF,
      loading: pdfLoading,
      color: "red"
    },
    {
      title: "Data Export",
      description: "Full data export in Excel format with separate sheets for Risks, Audit Tasks, and KPIs. Perfect for detailed analysis and custom reporting.",
      icon: Table,
      format: "Excel",
      action: downloadExcel,
      loading: excelLoading,
      color: "green"
    }
  ];

  return (
    <DashboardLayout 
      title="Reports" 
      subtitle="Generate and download comprehensive reports"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="report-cards">
        {reportTypes.map((report, index) => (
          <Card 
            key={index} 
            className="glass border-white/10 card-hover"
            data-testid={`report-card-${report.format.toLowerCase()}`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  report.color === "red" ? "bg-red-500/20" : "bg-green-500/20"
                }`}>
                  <report.icon className={`w-6 h-6 ${
                    report.color === "red" ? "text-red-500" : "text-green-500"
                  }`} />
                </div>
                <span className={`text-xs font-mono px-2 py-1 rounded ${
                  report.color === "red" ? "bg-red-500/20 text-red-500" : "bg-green-500/20 text-green-500"
                }`}>
                  {report.format}
                </span>
              </div>
              <CardTitle className="font-heading text-xl mt-4">{report.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400 mb-6">{report.description}</p>
              <Button 
                onClick={report.action} 
                disabled={report.loading}
                className="w-full btn-primary"
                data-testid={`download-${report.format.toLowerCase()}-btn`}
              >
                {report.loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download {report.format}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Preview Section */}
      <Card className="glass border-white/10 mt-8" data-testid="report-preview">
        <CardHeader>
          <CardTitle className="font-heading text-xl">Report Contents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-blue-500">Executive Summary</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Overview of objectives and value
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Key operational challenges
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Risk assessment summary
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-green-500">Risk Assessment</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Risk identification & scoring
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Mitigation strategies
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Priority classification
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-purple-500">Audit Tasks</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Task status overview
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Phase-wise breakdown
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Completion metrics
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Reports;
