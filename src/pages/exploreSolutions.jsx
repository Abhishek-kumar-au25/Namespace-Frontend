import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const solutions = [
  {
    title: "Intelligent QA & Test Automation",
    description:
      "Deliver faster releases with confidence. Our automation-first QA approach ensures high-quality software with minimal risk.",
    deliverables: [
      "End-to-end test automation using Playwright, Selenium & Cypress",
      "CI/CD-integrated testing pipelines",
      "API & performance testing",
      "Cross-browser and mobile automation",
      "AI-assisted test case generation",
    ],
    impact: "Reduce regression time by up to 40% and catch defects early.",
    cta: "Optimize Your Testing",
  },
  {
    title: "AI & Intelligent Automation",
    description:
      "Turn AI into a real business advantage. We build smart solutions that automate workflows and improve decision-making.",
    deliverables: [
      "Custom AI chatbots & virtual assistants",
      "Generative AI integrations",
      "AI-powered workflow automation",
      "NLP-based document processing",
      "AI-driven customer support tools",
    ],
    impact: "Cut operational workload by 30-50% with intelligent automation.",
    cta: "Explore AI Solutions",
  },
  {
    title: "UI/UX & Product Engineering",
    description:
      "Create intuitive, high-performing digital experiences that users love. We combine design thinking with engineering to build impactful products.",
    deliverables: [
      "User-centric UI/UX design",
      "Responsive web & mobile interfaces",
      "Design systems & component libraries",
      "Usability testing & optimization",
      "Frontend development with modern frameworks",
    ],
    impact: "Improve user engagement and conversions by up to 35%.",
    cta: "Enhance User Experience",
  },
  {
    title: "Custom Software Development",
    description:
      "We design and develop scalable, secure, and future-ready applications tailored to your business.",
    deliverables: [
      "Web & mobile application development",
      "SaaS product engineering",
      "API-first architecture",
      "Cloud-native development",
      "Secure and scalable solutions",
    ],
    impact: "Launch products faster with high performance and scalability.",
    cta: "Build Your Solution",
  },
  {
    title: "Cloud & DevOps Solutions",
    description:
      "Accelerate deployment and improve reliability with modern DevOps practices.",
    deliverables: [
      "CI/CD pipeline setup",
      "Cloud deployment (AWS, Azure, GCP)",
      "Infrastructure as Code (IaC)",
      "Monitoring & performance optimization",
      "Cloud cost optimization",
    ],
    impact: "Deploy up to 5x faster with improved system stability.",
    cta: "Modernize Your Infrastructure",
  },
  {
    title: "Data & Analytics Solutions",
    description:
      "Transform raw data into actionable insights that drive growth.",
    deliverables: [
      "Business intelligence dashboards",
      "Real-time analytics solutions",
      "Data pipeline automation",
      "Predictive analytics",
      "Data warehousing",
    ],
    impact: "Enable smarter decisions with real-time data visibility.",
    cta: "Unlock Your Data",
  },
];

const ExploreSolutions = () => (
  <div className="min-h-screen text-[var(--text-primary)]">
    <section className="pt-32 text-center px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Explore Our Solutions
        </h1>
        <p className="text-gray-400 mb-6">
          Clear, outcome-focused offerings built to modernize delivery, automate
          operations, and accelerate growth.
        </p>
      </div>
    </section>

    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {solutions.map((solution) => (
          <div key={solution.title} className="glass-card p-6 flex flex-col">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">{solution.title}</h3>
              <p className="text-gray-400 text-sm mb-4">
                {solution.description}
              </p>

              <p className="text-sm font-semibold mb-2">What we deliver:</p>
              <ul className="text-gray-400 text-sm list-disc list-inside mb-4 space-y-1">
                {solution.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className="text-sm text-gray-300">
                <span className="font-semibold text-gray-200">Impact:</span>{" "}
                {solution.impact}
              </p>
            </div>

            <div className="text-right mt-6">
              <Button asChild size="sm" className="rounded-full px-4">
                <Link to="/contact">{solution.cta}</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default ExploreSolutions;
