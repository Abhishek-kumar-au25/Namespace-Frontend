import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/data/caseStudies";

const CaseStudies = () => {
  const cases = caseStudies;

  return (
    <div className="min-h-screen text-[var(--text-primary)]">
      {/* HERO */}
      <section className="pt-32 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Case Studies: <span className="gradient-text">Real Results</span>
          </h1>
          <p className="text-gray-400 mb-6">
            Detailed success stories that show how we solve real problems and
            deliver measurable business outcomes.
          </p>
        </div>
      </section>

      {/* DETAILED CASE STUDIES */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {cases.map((c) => (
            <article key={c.slug} className="glass-card overflow-hidden">
              <div className="grid lg:grid-cols-5">
                <div className="relative lg:col-span-2">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-5">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-300">
                        Case Study
                      </p>
                      <h3 className="text-lg font-semibold">{c.title}</h3>
                      <p className="text-sm text-purple-400">{c.result}</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3 p-6 space-y-5">
                  <p className="text-gray-300 text-sm">{c.summary}</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold">Problem</p>
                      <p className="text-gray-400 text-sm">
                        {c.problemStatement}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Solution</p>
                      <p className="text-gray-400 text-sm">
                        {c.solutionApproach}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Results</p>
                    <ul className="mt-2 space-y-1 text-gray-400 text-sm">
                      {c.results.slice(0, 2).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Tools & Tech</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {c.toolsTech.slice(0, 4).map((tool) => (
                        <span
                          key={tool}
                          className="text-xs text-gray-300 border border-white/10 rounded-full px-3 py-1"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="btn-outline rounded-full px-4"
                    >
                      <Link to={`/case-studies/${c.slug}`}>View Article</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
