import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Sparkles, Building2, Handshake, TrendingUp } from "lucide-react";
import { ourClientsTestimonials } from "@/data/testimonials";

const OurClients = () => {
  const clients = [
    { name: "FinServ India", industry: "NBFC & Lending", highlight: "80% fraud loss reduction" },
    { name: "Tech Unicorn", industry: "SaaS & Platforms", highlight: "2,000+ hours saved" },
    { name: "RetailScale", industry: "Commerce", highlight: "15% margin lift" },
    { name: "InsureEdge", industry: "Insurance", highlight: "30% faster claims triage" },
    { name: "LogiCore", industry: "Logistics", highlight: "18% route efficiency gain" },
    { name: "HealthAxis", industry: "Healthcare", highlight: "Better patient risk scoring" },
  ];

  const metrics = [
    { value: "50+", label: "Enterprise engagements" },
    { value: "99.9%", label: "Platform uptime delivered" },
    { value: "10+", label: "Models in production" },
    { value: "24 hrs", label: "Avg. response time" },
  ];

  const testimonials = ourClientsTestimonials;

  return (
    <div className="min-h-screen text-[var(--text-primary)]">
      {/* Hero */}
      <section className="pt-32 pb-14 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-3">
            Our Clients
          </p>
          <h1 className="font-space font-bold text-4xl sm:text-5xl lg:text-6xl mb-4">
            Trusted by teams who ship{" "}
            <span className="gradient-text">AI with impact</span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            From regulated financial institutions to fast-moving product teams,
            we partner on strategy, data platforms, and production-grade AI
            deployments that deliver measurable business outcomes.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild className="btn-primary rounded-full px-6">
              <Link to="/contact">Start a Conversation</Link>
            </Button>
            <Button asChild variant="outline" className="btn-outline rounded-full px-6">
              <Link to="/case-studies">See Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto liquid-glass p-8 sm:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="stat-number text-3xl sm:text-4xl">{m.value}</div>
                <p className="text-gray-400 text-sm">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Grid */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="font-space font-semibold text-2xl">
              Client Highlights
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {clients.map((client) => (
              <div key={client.name} className="glass-card p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="feature-icon">
                    <Building2 className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{client.name}</h3>
                    <p className="text-gray-400 text-xs">{client.industry}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{client.highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          <div className="liquid-glass p-8">
            <div className="flex items-center gap-3 mb-3">
              <Handshake className="w-5 h-5 text-purple-400" />
              <h3 className="font-space font-semibold text-xl">Partnership Model</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              We embed with your teams, align on measurable outcomes, and deliver
              systems that are secure, explainable, and operationally reliable.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card p-4">
                <p className="text-sm font-semibold">Discovery to Delivery</p>
                <p className="text-xs text-gray-400">
                  Strategy, pilots, and production in one continuous track.
                </p>
              </div>
              <div className="glass-card p-4">
                <p className="text-sm font-semibold">Governed AI</p>
                <p className="text-xs text-gray-400">
                  Compliance-ready data pipelines and audit trails.
                </p>
              </div>
              <div className="glass-card p-4">
                <p className="text-sm font-semibold">Operational Uplift</p>
                <p className="text-xs text-gray-400">
                  Automations that keep improving with feedback loops.
                </p>
              </div>
              <div className="glass-card p-4">
                <p className="text-sm font-semibold">Outcome Metrics</p>
                <p className="text-xs text-gray-400">
                  Clear KPIs with business impact tracking.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <h3 className="font-space font-semibold text-xl">Results at a Glance</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Star className="w-4 h-4 text-purple-400 mt-1" />
                <p className="text-gray-300 text-sm">
                  Fraud detection pipelines that cut investigation time by 60%.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-4 h-4 text-purple-400 mt-1" />
                <p className="text-gray-300 text-sm">
                  Automated audit workflows with improved coverage and accuracy.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-4 h-4 text-purple-400 mt-1" />
                <p className="text-gray-300 text-sm">
                  Real-time decision systems for faster approvals and lower risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-space font-semibold text-2xl mb-6">
            What our clients say
          </h3>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="glass-card p-6">
                <p className="text-gray-300 text-sm mb-4">"{t.quote}"</p>
                <p className="text-sm font-semibold">{t.author}</p>
                <p className="text-xs text-gray-400">{t.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto text-center liquid-glass p-10">
          <h3 className="font-space font-semibold text-2xl mb-3">
            Ready to build your success story?
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Tell us about your goals and we will propose a clear, measurable AI
            roadmap tailored to your business.
          </p>
          <Button asChild className="btn-primary rounded-full px-6">
            <Link to="/contact">Talk to Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default OurClients;
