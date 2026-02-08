import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

// IMPORT IMAGES (use placeholder hosted images)
const case1 = "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80";
const case2 = "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80";
const case3 = "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=800&q=80";

const CaseStudies = () => {

  // CASE DATA WITH IMAGES
  const cases = [
    {
      title: "Fraud Detection AI",
      result: "Reduced fraud by 80%",
      image: case1,
    },
    {
      title: "Audit Automation",
      result: "Saved 2000+ hours",
      image: case2,
    },
    {
      title: "Risk Prediction",
      result: "Prevented compliance failures",
      image: case3,
    },
  ];

  return (
    <div className="min-h-screen text-[var(--text-primary)]">



      {/* HERO */}
      <section className="pt-32 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Case Studies:{" "}
            <span className="gradient-text">Real Results</span>
          </h1>

          <p className="text-gray-400 mb-6">
            Learn how our AI solutions created measurable business impact
            across industry verticals.
          </p>
        </div>
      </section>

      {/* CASE CARDS */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-4 sm:gap-6">

          {cases.map((c, i) => (
            <div key={i} className="glass-card p-0 overflow-hidden">

              {/* IMAGE */}
              <div className="relative h-48">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div>
                    <h3 className="text-[var(--text-primary)] font-semibold">
                      {c.title}
                    </h3>
                    <p className="text-sm text-purple-400">
                      {c.result}
                    </p>
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <p className="text-gray-300 text-sm mb-4">
                  A concise summary of the challenge, our approach and the
                  outcome that demonstrates the value we delivered.
                </p>

                <div className="text-right">
                  <Button asChild size="sm" className="rounded-full px-4">
                    <Link to="/contact">Get the full case study</Link>
                  </Button>
                </div>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* DETAILED SUMMARIES */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">

          <h3 className="text-xl font-semibold mb-4">
            Case Study Deep Dives
          </h3>

          <p className="text-gray-400 mb-6">
            Explore selected deep-dive summaries that outline the challenge,
            approach, and measurable outcomes.
          </p>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">

            {cases.map((c, i) => (
              <div key={`d-${i}`} className="glass-card p-6">

                <h4 className="font-semibold mb-2">{c.title}</h4>

                <p className="text-gray-400 text-sm mb-3">
                  Challenge: Identify patterns of loss and reduce operational
                  overhead using AI-driven automation.
                </p>

                <p className="text-gray-400 text-sm mb-4">
                  Outcome:{" "}
                  <strong className="text-purple-400">
                    {c.result}
                  </strong>
                </p>

                <div className="text-right">
                  <Button asChild size="sm" className="rounded-full px-4">
                    <Link to="/contact">Request Full Report</Link>
                  </Button>
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>



    </div>
  );
};

export default CaseStudies;
