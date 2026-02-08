import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Cpu, Cloud, BarChart3, Shield, Zap, Brain } from "lucide-react";

const Solutions = () => {
  const solutions = [
    {
      icon: Cpu,
      title: "Custom AI Development",
      desc: "Tailored AI models for your business",
    },
    {
      icon: Cloud,
      title: "AI Cloud Transformation",
      desc: "Scalable AI systems",
    },
    { icon: BarChart3, title: "Data Intelligence", desc: "Insights from data" },
    {
      icon: Shield,
      title: "Risk & Compliance AI",
      desc: "Predict risks early",
    },
    { icon: Zap, title: "Process Automation", desc: "Automate workflows" },
    {
      icon: Brain,
      title: "AI Strategy Consulting",
      desc: "Roadmaps to adopt AI effectively",
    },
  ];

  return (
    <div className="min-h-screen text-[var(--text-primary)]">
      {/* HERO */}
      <section className="pt-32 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Solutions for{" "}
            <span className="gradient-text">Enterprise Growth</span>
          </h1>
          <p className="text-gray-400 mb-6">
            Tailored AI products & platforms to automate processes, reduce risk,
            and enable data-driven decisions across your organization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="btn-primary rounded-full px-6 py-3">
              <Link to="/explore-solutions">Explore Solutions</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-6 py-3"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SOLUTIONS GRID */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-4 sm:gap-6">
          {solutions.map((s, i) => (
            <div
              key={i}
              className="glass-card p-8 hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-center mb-4">
                <s.icon className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="font-semibold text-lg text-center mb-2">
                {s.title}
              </h3>
              <p className="text-gray-400 text-sm text-center mb-4">{s.desc}</p>
              <div className="text-center">
                <Button asChild size="sm" className="rounded-full px-4">
                  <Link to="/contact">Request Demo</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="liquid-glass p-8 sm:p-12">
            <h2 className="text-2xl font-semibold mb-4">
              Why Our Solutions Matter
            </h2>
            <p className="text-gray-400 mb-6">
              We deliver measurable outcomes by combining domain expertise with
              scalable AI platforms — enabling faster decision-making, reduced
              operational costs and improved compliance.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-2">Faster Decisions</h3>
                <p className="text-gray-400 text-sm">
                  Automate insights to accelerate decision cycles across teams.
                </p>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-2">Lower Risk</h3>
                <p className="text-gray-400 text-sm">
                  Proactive risk detection to reduce losses and ensure
                  compliance.
                </p>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-2">Scale with Confidence</h3>
                <p className="text-gray-400 text-sm">
                  Cloud-native architectures for secure, scalable deployments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED OUTCOMES */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-semibold mb-6">Featured Outcomes</h3>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="glass-card p-6">
              <h4 className="font-semibold mb-2">Fraud Detection</h4>
              <p className="text-gray-400 text-sm mb-4">
                Delivered a machine learning model that reduced fraud by 80% and
                improved detection latency from hours to minutes.
              </p>
              <div className="text-right">
                <Button asChild size="sm" className="rounded-full px-4">
                  <Link to="/case-studies">Read Case Study</Link>
                </Button>
              </div>
            </div>

            <div className="glass-card p-6">
              <h4 className="font-semibold mb-2">Audit Automation</h4>
              <p className="text-gray-400 text-sm mb-4">
                Automated audit workflows that saved 2000+ analyst hours
                annually while improving coverage.
              </p>
              <div className="text-right">
                <Button asChild size="sm" className="rounded-full px-4">
                  <Link to="/case-studies">Read Case Study</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
