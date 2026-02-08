import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";



const ExploreSolutions=()=>(
<div className="min-h-screen text-[var(--text-primary)]">



<section className="pt-32 text-center px-6">
  <div className="max-w-3xl mx-auto">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Solutions in Depth</h1>
    <p className="text-gray-400 mb-6">Select a solution to see detailed capabilities, example use-cases, and suggested architectures.</p>
  </div>
</section>

<section className="py-20 px-6">
  <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
    {Array.from({length:6}).map((_,i)=> (
      <div key={i} className="glass-card p-6">
        <div className="h-40 bg-zinc-900 rounded-md mb-4 flex items-center justify-center">Image / Visual
        </div>
        <h3 className="font-semibold mb-2">Solution Deep Dive {i+1}</h3>
        <p className="text-gray-400 text-sm mb-3">Short summary of capabilities and business value.</p>
        <ul className="text-gray-400 text-sm list-disc list-inside mb-4">
          <li>Key capability A</li>
          <li>Integration examples with existing systems</li>
          <li>Estimated time-to-value: 8-12 weeks</li>
        </ul>
        <div className="text-right">
          <Button asChild size="sm" className="rounded-full px-4">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    ))}
  </div>
</section>



</div>
);

export default ExploreSolutions;
