import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Smartphone, BrainCircuit, Cloud, ShieldCheck, Rocket } from "lucide-react";
import { ourWorkProjects } from "@/data/ourWork";

const OurWork = () => {
  const pillars = [
    {
      icon: Smartphone,
      title: "Mobile Experiences",
      desc: "iOS and Android apps built for performance, security, and scale.",
    },
    {
      icon: BrainCircuit,
      title: "AI-Integrated Products",
      desc: "Production-grade AI features embedded into real workflows.",
    },
    {
      icon: Cloud,
      title: "Cloud & Data Platforms",
      desc: "Reliable data infrastructure and analytics that power smarter decisions.",
    },
    {
      icon: ShieldCheck,
      title: "Risk & Compliance",
      desc: "Governed AI with auditability, explainability, and controls.",
    },
    {
      icon: Code2,
      title: "Custom Software",
      desc: "Tailored systems built around your operating model.",
    },
    {
      icon: Rocket,
      title: "Automation at Scale",
      desc: "Workflows that reduce cycle times and boost team output.",
    },
  ];

  return (
    <div className="min-h-screen text-[var(--text-primary)]">
      {/* HERO */}
      <section className="pt-32 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Work{" "}
            <span className="gradient-text">Showcase & Portfolio</span>
          </h1>
          <p className="text-gray-400 mb-6">
            A high-level look at the products, platforms, and experiences we’ve
            built — focused on outcomes, delivery, and credibility.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="btn-primary rounded-full px-6 py-3">
              <Link to="/case-studies">View Case Studies</Link>
            </Button>
            <Button asChild variant="outline" className="btn-outline rounded-full px-6 py-3">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Portfolio Highlights</h2>
              <p className="text-gray-400 text-sm">
                Quick snapshots of applications, websites, and AI platforms we’ve delivered.
              </p>
            </div>
            <Button asChild variant="outline" className="btn-outline rounded-full px-5">
              <Link to="/contact">Start a Project</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {ourWorkProjects.map((project) => (
              <div key={project.slug} className="glass-card p-0 overflow-hidden">
                <div className="relative h-44">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-300">
                        {project.client}
                      </p>
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <p className="text-sm text-purple-400">{project.type}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-300 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="text-xs text-gray-300 border border-white/10 rounded-full px-3 py-1"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  <div className="text-right">
                    <Button asChild size="sm" className="btn-primary rounded-full px-4">
                      <Link to={`/our-work/${project.slug}`}>View Project</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">What We Deliver</h2>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="glass-card p-6">
                <div className="feature-icon mb-4">
                  <pillar.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">{pillar.title}</h3>
                <p className="text-gray-400 text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="liquid-glass p-8 sm:p-12">
            <h2 className="text-2xl font-semibold mb-3">Expert Team</h2>
            <p className="text-gray-400 mb-6">
              We have a 50+ member delivery team with expert iOS developers,
              Android developers, and AI-integrated engineers who build
              production-ready mobile apps and intelligent systems.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-2">iOS Developers</h3>
                <p className="text-gray-400 text-sm">
                  Swift and SwiftUI specialists focused on secure, polished
                  mobile experiences.
                </p>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-2">Android Developers</h3>
                <p className="text-gray-400 text-sm">
                  Kotlin-first engineering for scalable Android apps with fast
                  iteration cycles.
                </p>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-2">AI-Integrated Developers</h3>
                <p className="text-gray-400 text-sm">
                  AI features embedded into products with reliable model
                  integration and monitoring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center liquid-glass p-10">
          <h3 className="font-space font-semibold text-2xl mb-3">
            Ready to build something impactful?
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Tell us about your goals and we’ll align the right team for your
            product roadmap.
          </p>
          <Button asChild className="btn-primary rounded-full px-6">
            <Link to="/contact">Start a Project</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default OurWork;
