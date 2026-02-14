import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/data/caseStudies";

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    return (
      <div className="min-h-screen text-[var(--text-primary)]">
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Case Study Not Found</h1>
            <p className="text-gray-400 mb-6">
              The case study you’re looking for doesn’t exist or has been moved.
            </p>
            <Button asChild className="btn-primary rounded-full px-6">
              <Link to="/case-studies">Back to Case Studies</Link>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[var(--text-primary)]">
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <p className="text-sm text-gray-400 mb-2">Case Study</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              {study.title}
            </h1>
            <p className="text-purple-400 font-semibold">{study.result}</p>
          </div>

          <div className="rounded-2xl overflow-hidden mb-10">
            <img
              src={study.image}
              alt={study.title}
              className="w-full h-72 md:h-96 object-cover"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="glass-card p-6 lg:col-span-2">
              <div className="space-y-6">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {study.summary}
                </p>

                <div>
                  <h3 className="font-semibold">Client Background</h3>
                  <p className="text-gray-400 text-sm">
                    {study.clientBackground}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Problem Statement</h3>
                  <p className="text-gray-400 text-sm">
                    {study.problemStatement}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Key Challenges</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-400">
                    {study.challenges.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold">Solution Approach</h3>
                  <p className="text-gray-400 text-sm">
                    {study.solutionApproach}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Tools and Technologies Used</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {study.toolsTech.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs text-gray-300 border border-white/10 rounded-full px-3 py-1"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">
                    Measurable Results and Outcomes
                  </h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-400">
                    {study.results.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold">Client Impact</h3>
                  <p className="text-gray-400 text-sm">{study.clientImpact}</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-semibold text-lg mb-4">Client Testimonial</h2>
              <p className="text-gray-300 text-sm italic leading-relaxed">
                "{study.testimonial.quote}"
              </p>
              <div className="mt-4 text-sm">
                <p className="font-semibold">{study.testimonial.name}</p>
                <p className="text-gray-400">{study.testimonial.title}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button asChild className="btn-primary rounded-full px-6">
                  <Link to="/contact">View More / Contact Us</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="btn-outline rounded-full px-6"
                >
                  <Link to="/case-studies">All Case Studies</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyDetail;
