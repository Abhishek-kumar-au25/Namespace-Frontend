import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";

const Resources = () => {
  const allResources = [
    {
      title: "AI Risk Whitepaper",
      type: "Whitepaper",
      date: "2024-10-01",
      desc: "Practical steps to identify and mitigate AI risks across the organization.",
      img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/assets/ai-risk-whitepaper.pdf",
    },
    {
      title: "Automation Guide",
      type: "Guide",
      date: "2023-08-12",
      desc: "A tactical handbook for intelligent process automation and RPA augmentation.",
      img: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/assets/automation-guide.pdf",
    },
    {
      title: "AI Compliance eBook",
      type: "eBook",
      date: "2024-02-15",
      desc: "Frameworks and checklists to keep AI initiatives compliant and auditable.",
      img: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/assets/ai-compliance-ebook.pdf",
    },
    {
      title: "Case Study: Audit Automation",
      type: "Case Study",
      date: "2023-03-20",
      desc: "How we helped a financial client reduce manual audit effort by 60%.",
      img: "https://images.pexels.com/photos/3183171/pexels-photo-3183171.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/assets/case-audit.pdf",
    },
  ];

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const filters = ["All", "Whitepaper", "Guide", "eBook", "Case Study"];

  const filtered = useMemo(() => {
    return allResources.filter((r) => {
      const matchesFilter = filter === "All" || r.type === filter;
      const matchesQuery =
        !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.desc.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [allResources, filter, query]);

  return (
    <div className="min-h-screen text-[var(--text-primary)]">
      {/* Hero */}
      <section className="pt-24 pb-8 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources & Insights</h1>
          <p className="text-gray-400 mb-6">Guides, whitepapers and playbooks to help you adopt AI responsibly and ship with confidence.</p>

          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search resources, topics or keywords" className="bg-[#12121A] border-white/10" />
            <Button className="btn-primary">Search</Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of resources */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.slice(0, visibleCount).map((r, i) => (
              <article key={i} className="glass-card overflow-hidden flex flex-col h-full">
                <div className="h-40 w-full overflow-hidden">
                  <img src={r.img} alt={r.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{r.type}</span>
                    <span className="text-xs text-gray-400">{new Date(r.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-semibold text-lg">{r.title}</h3>
                  <p className="text-gray-400 text-sm flex-1">{r.desc}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <Link to={r.link} className="text-sm text-purple-400">Preview</Link>
                    <a href={r.link} download className="inline-flex items-center gap-2 btn-primary rounded-full px-3 py-2 text-sm">
                      <Download className="w-4 h-4" /> Download
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center mt-6 text-gray-400">No resources found matching your search.</div>
          )}

          {visibleCount < filtered.length && (
            <div className="mt-8 text-center">
              <Button onClick={() => setVisibleCount((c) => c + 6)} className="btn-outline rounded-full px-6">Load more</Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured + subscribe */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4 sm:gap-6 items-center">
          <div className="liquid-glass p-6">
            <h4 className="font-semibold mb-2">Featured Resource</h4>
            <p className="text-gray-400 text-sm mb-4">AI Risk Whitepaper — practical steps to evaluate AI risk in your organization.</p>
            <div className="text-right">
              <a href="/assets/ai-risk-whitepaper.pdf" download className="btn-primary rounded-full px-4 inline-flex items-center gap-2"><Download className="w-4 h-4" /> Download</a>
            </div>
          </div>

          <div className="p-6 rounded-lg glass">
            <h4 className="font-semibold mb-2">Get resources directly in your inbox</h4>
            <p className="text-gray-400 text-sm">Subscribe for new guides, case studies and event updates.</p>
            <div className="mt-4 flex gap-3 max-w-md">
              <Input placeholder="Enter your email" className="bg-[#12121A] border-white/10" />
              <Button className="btn-primary">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Resources;
