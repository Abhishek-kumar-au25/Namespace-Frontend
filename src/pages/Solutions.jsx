import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cpu, Cloud, BarChart3, Shield, Zap } from "lucide-react";

const LOGO_URL="https://customer-assets.emergentagent.com/job_2e55a7fc-06f9-47db-b4a6-4600417bac65/artifacts/o8krn3xe_Free__2_-removebg-preview.png";

const Solutions=()=>{

const solutions=[
{icon:Cpu,title:"Custom AI Development",desc:"Tailored AI models for your business"},
{icon:Cloud,title:"AI Cloud Transformation",desc:"Scalable AI systems"},
{icon:BarChart3,title:"Data Intelligence",desc:"Insights from data"},
{icon:Shield,title:"Risk & Compliance AI",desc:"Predict risks early"},
{icon:Zap,title:"Process Automation",desc:"Automate workflows"},
];

return(
<div className="min-h-screen bg-[#0A0A0F] text-white">

{/* HEADER */}
<header className="fixed top-0 left-0 right-0 z-50">
<div className="mx-auto px-6 pt-4">
<nav className="premium-header px-10 py-3 flex justify-between">
<Link to="/"><img src={LOGO_URL} className="h-12"/></Link>
<div className="flex gap-6 text-gray-300">
<Link to="/">Home</Link>
<Link to="/about">About</Link>
<Link to="/contact">Contact</Link>
</div>
</nav>
</div>
</header>

{/* HERO */}
<section className="pt-32 text-center px-6">
<h1 className="text-5xl font-bold">Our <span className="gradient-text">Solutions</span></h1>
</section>

{/* GRID */}
<section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 py-20 px-6">
{solutions.map((s,i)=>(
<div key={i} className="glass-card p-8 text-center">
<s.icon className="w-8 h-8 text-purple-400 mx-auto mb-4"/>
<h3 className="font-semibold text-lg">{s.title}</h3>
<p className="text-gray-400 text-sm">{s.desc}</p>
</div>
))}
</section>

{/* FOOTER */}
<footer className="py-8 border-t border-white/5 bg-[#08080C] text-center">
<p className="text-gray-500">© 2024 NameSpace Consultants</p>
</footer>

</div>
);
};

export default Solutions;
