import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ourWorkProjects } from "@/data/ourWork";

const OurWorkDetail = () => {
  const { slug } = useParams();
  const project = ourWorkProjects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen text-[var(--text-primary)]">
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="text-gray-400 mb-6">
              The project you’re looking for doesn’t exist or has been moved.
            </p>
            <Button asChild className="btn-primary rounded-full px-6">
              <Link to="/our-work">Back to Our Work</Link>
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
            <p className="text-sm text-gray-400 mb-2">{project.client}</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              {project.title}
            </h1>
            <p className="text-purple-400 font-semibold">{project.type}</p>
          </div>

          <div className="rounded-2xl overflow-hidden mb-10">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-72 md:h-96 object-cover"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="glass-card p-6 lg:col-span-2">
              <h2 className="font-semibold text-xl mb-3">Project Overview</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="mt-6">
                <h3 className="font-semibold mb-3">Services Provided</h3>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="text-xs text-gray-300 border border-white/10 rounded-full px-3 py-1"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-3">Platforms</h3>
                <div className="flex flex-wrap gap-3">
                  {project.platforms.map((platform) => (
                    <Button
                      key={platform}
                      asChild
                      variant="outline"
                      className="btn-outline rounded-full px-4"
                    >
                      <Link
                        to={`/contact?project=${encodeURIComponent(
                          project.slug,
                        )}&platform=${platform.toLowerCase()}`}
                      >
                        {platform}
                      </Link>
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Want a demo or project details? Choose a platform to connect with us.
                </p>
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-semibold text-lg mb-4">Quick Snapshot</h2>
              <div className="space-y-4 text-sm text-gray-300">
                <div>
                  <p className="text-gray-400">Client</p>
                  <p className="font-semibold">{project.client}</p>
                </div>
                <div>
                  <p className="text-gray-400">Project Type</p>
                  <p className="font-semibold">{project.type}</p>
                </div>
                <div>
                  <p className="text-gray-400">Platforms</p>
                  <p className="font-semibold">{project.platforms.join(", ")}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button asChild className="btn-primary rounded-full px-6">
                  <Link to="/contact">View More / Contact Us</Link>
                </Button>
                <Button asChild variant="outline" className="btn-outline rounded-full px-6">
                  <Link to="/our-work">All Projects</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurWorkDetail;
