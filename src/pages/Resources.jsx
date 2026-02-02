import React from "react";
import { Link } from "react-router-dom";

const LOGO_URL="https://customer-assets.emergentagent.com/job_2e55a7fc-06f9-47db-b4a6-4600417bac65/artifacts/o8krn3xe_Free__2_-removebg-preview.png";

const Resources=()=>{

const resources=[
{title:"AI Risk Whitepaper"},
{title:"Automation Guide"},
{title:"AI Compliance eBook"},
];

return(
<div className="min-h-screen bg-[#0A0A0F] text-white">

<header className="fixed top-0 left-0 right-0 z-50">
<div className="mx-auto px-6 pt-4">
<nav className="premium-header px-10 py-3">
<Link to="/"><img src={LOGO_URL} className="h-12"/></Link>
</nav>
</div>
</header>

<section className="pt-32 text-center">
<h1 className="text-5xl font-bold">AI <span className="gradient-text">Resources</span></h1>
</section>

<section className="grid md:grid-cols-3 gap-8 py-20 px-6 max-w-6xl mx-auto">
{resources.map((r,i)=>(
<div key={i} className="glass-card p-8">
<h3>{r.title}</h3>
</div>
))}
</section>

<footer className="py-8 text-center bg-[#08080C] border-t border-white/5">
© 2024 NameSpace Consultants
</footer>

</div>
);
};

export default Resources;
