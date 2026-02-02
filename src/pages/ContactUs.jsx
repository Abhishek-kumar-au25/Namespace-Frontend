import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

import { useState } from "react";
import axios from "axios";
import { API } from "@/App";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function ContactForm(){
  const [form,setForm] = useState({name:"",email:"",phone:"",message:""});
  const [loading,setLoading] = useState(false);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!form.name || !form.email){
      toast.error("Please fill required fields");
      return;
    }
    try{
      setLoading(true);
      await axios.post(`${API}/contact/send`,{
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message || "Contact via website"
      });
      toast.success("Thanks! We'll get back to you.");
      setForm({name:"",email:"",phone:"",message:""});
    }catch(err){
      toast.error("Failed to send. Please try again later.");
    }finally{setLoading(false)}
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#08080C] p-6 rounded-lg liquid-glass">
      <label className="text-xs text-gray-400">Name</label>
      <Input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="mb-3" />
      <label className="text-xs text-gray-400">Email</label>
      <Input value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} className="mb-3" />
      <label className="text-xs text-gray-400">Phone</label>
      <Input value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} className="mb-3" />
      <label className="text-xs text-gray-400">Message</label>
      <Textarea value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} className="mb-4" />
      <div className="flex justify-end">
        <Button type="submit" disabled={loading} className="rounded-full px-6">{loading? 'Sending...' : 'Send Message'}</Button>
      </div>
    </form>
  )
}



const Contact = () => (
  <div className="min-h-screen text-white">
    {/* Hero */}
    <section className="pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact <span className="gradient-text">Us</span></h1>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Ready to build practical AI that moves the needle? Whether you need a strategic roadmap, a pilot, or full production deployment — reach out and we'll connect you with the right team. Typical response time: <strong>within 24 hours</strong>.
        </p>
      </div>
    </section>

    {/* Contact Methods */}
    <section className="px-6 pb-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-500/20 flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">General Enquiries</p>
              <p className="font-semibold mt-2">kartikeya@namespaceconsultants.com</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">We reply to emails within one business day.</p>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-500/20 flex items-center justify-center">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Call Us</p>
              <p className="font-semibold mt-2">+91 9625061596</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Mon–Fri, 9:00 AM – 6:00 PM (IST)</p>
        </div> 

        <div className="glass-card p-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-500/20 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Schedule a Meeting</p>
              <p className="font-semibold mt-2">Book a Discovery Call</p>
            </div>
          </div>
          <Link to="/contact" className="inline-block mt-1">
            <Button className="btn-primary rounded-full px-6">Book a Discovery Call</Button>
          </Link>
          <p className="text-xs text-gray-500 mt-2">Pick a time that works and we'll prepare a tailored agenda.</p>
        </div> 
      </div>
    </section>

    {/* Main Content */}
    <section className="px-6 pb-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <div className="glass-card p-6 mb-6">
            <h3 className="font-semibold text-lg">How we help</h3>
            <p className="text-gray-400 mt-3">We help teams adopt AI responsibly — from scoping and prototypes to model delivery and operationalization. Our experts bring domain knowledge, secure data engineering and production-grade ML pipelines to every engagement.</p>

            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="text-sm text-gray-300">AI Strategy & Roadmapping</li>
              <li className="text-sm text-gray-300">ML Engineering & MLOps</li>
              <li className="text-sm text-gray-300">Data Platforms & Analytics</li>
              <li className="text-sm text-gray-300">Generative & Conversational AI</li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold text-lg">Office Locations</h3>
            <div className="mt-3 text-sm text-gray-300 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#111217] flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold">Head Office</p>
                  <p>PT-62/3, L.G.F., PT And DD Block, Kalkaji, New Delhi, 110019</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#111217] flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold">India Office</p>
                  <p>Bangalore, India</p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded overflow-hidden">
              <img src="https://images.pexels.com/photos/259924/pexels-photo-259924.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Office map" className="w-full h-48 object-cover" />
            </div>
          </div>
        </div>

        <div>
          <div className="p-6 rounded-lg liquid-glass">
            <h3 className="font-semibold text-lg mb-4">Send us a message</h3>
            <ContactForm />
          </div>

          <div className="mt-6 text-xs text-gray-400">
            <p><strong>Privacy</strong>: We respect your privacy. Your data will only be used to respond to your request as described in our <Link to="/privacy" className="text-purple-400">Privacy Policy</Link>.</p>
          </div>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <h3 className="font-semibold text-lg mb-4">Frequently Asked Questions</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-card p-4">
            <p className="font-semibold">How quickly will I hear back?</p>
            <p className="text-sm text-gray-400 mt-2">We usually respond within 24 business hours to initial enquiries. If your request is time-sensitive, please call +91 9625061596.</p>
          </div>

          <div className="glass-card p-4">
            <p className="font-semibold">Do you sign NDAs?</p>
            <p className="text-sm text-gray-400 mt-2">Yes — we’re happy to sign mutual non-disclosure agreements before engaging with sensitive data.</p>
          </div>

          <div className="glass-card p-4">
            <p className="font-semibold">Can you work with regulated data?</p>
            <p className="text-sm text-gray-400 mt-2">Yes — we have experience building secure data platforms and governance for financial and healthcare clients.</p>
          </div>

          <div className="glass-card p-4">
            <p className="font-semibold">What industries do you serve?</p>
            <p className="text-sm text-gray-400 mt-2">We work with financial services, healthcare, retail, logistics and enterprise SaaS companies.</p>
          </div>
        </div>
      </div>
    </section>

  </div>
);

export default Contact;
