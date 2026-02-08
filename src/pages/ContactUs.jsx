import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import axios from "axios";
import { API } from "@/App";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { siteContact } from "@/config/site";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API}/contact/send`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message || "Contact via website",
        website: form.website,
      });
      toast.success("Thanks! We'll get back to you.");
      setForm({ name: "", email: "", phone: "", message: "", website: "" });
    } catch (err) {
      toast.error("Failed to send. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#08080C] p-6 rounded-lg liquid-glass"
    >
      <label className="text-xs text-gray-400">Name</label>
      <Input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="mb-3"
      />
      <label className="text-xs text-gray-400">Email</label>
      <Input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="mb-3"
      />
      <label className="text-xs text-gray-400">Phone</label>
      <Input
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="mb-3"
      />
      <label className="text-xs text-gray-400">Message</label>
      <Textarea
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="mb-4"
      />
      <div
        className="absolute left-[-10000px] top-auto w-1 h-1 overflow-hidden"
        aria-hidden="true"
      >
        <label className="text-xs text-gray-400" htmlFor="contact-website">
          Website
        </label>
        <Input
          id="contact-website"
          name="website"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading} className="rounded-full px-6">
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}

function DiscoveryCallForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    date: "",
    time: "",
    timezone: "IST (UTC+05:30)",
    agenda: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || !form.time || !form.timezone) {
      toast.error("Please fill required fields");
      return;
    }

    const message = [
      "Discovery call request",
      `Company: ${form.company || "N/A"}`,
      `Role: ${form.role || "N/A"}`,
      `Preferred date: ${form.date}`,
      `Preferred time: ${form.time}`,
      `Timezone: ${form.timezone}`,
      `Agenda: ${form.agenda || "N/A"}`,
    ].join("\n");

    try {
      setLoading(true);
      await axios.post(`${API}/contact/send`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message,
        website: form.website,
      });
      toast.success("Thanks! We'll confirm a time shortly.");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        role: "",
        date: "",
        time: "",
        timezone: "IST (UTC+05:30)",
        agenda: "",
        website: "",
      });
    } catch (err) {
      toast.error("Failed to schedule. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#08080C] p-6 rounded-lg liquid-glass">
      <label className="text-xs text-gray-400">Name *</label>
      <Input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="mb-3"
      />
      <label className="text-xs text-gray-400">Email *</label>
      <Input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="mb-3"
      />
      <label className="text-xs text-gray-400">Phone</label>
      <Input
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="mb-3"
      />
      <label className="text-xs text-gray-400">Company</label>
      <Input
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        className="mb-3"
      />
      <label className="text-xs text-gray-400">Role</label>
      <Input
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="mb-3"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-400">Preferred Date *</label>
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="mb-3"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400">Preferred Time *</label>
          <Input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="mb-3"
          />
        </div>
      </div>
      <label className="text-xs text-gray-400">Timezone *</label>
      <select
        value={form.timezone}
        onChange={(e) => setForm({ ...form, timezone: e.target.value })}
        className="mb-3 w-full rounded-md border border-white/10 bg-[#12121A] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-purple-500/40"
      >
        <option>IST (UTC+05:30)</option>
        <option>UTC</option>
        <option>PT (UTC-08:00)</option>
        <option>ET (UTC-05:00)</option>
        <option>GMT (UTC+00:00)</option>
        <option>CET (UTC+01:00)</option>
        <option>SGT (UTC+08:00)</option>
        <option>AEST (UTC+10:00)</option>
      </select>
      <label className="text-xs text-gray-400">Agenda</label>
      <Textarea
        value={form.agenda}
        onChange={(e) => setForm({ ...form, agenda: e.target.value })}
        className="mb-4"
      />
      <div
        className="absolute left-[-10000px] top-auto w-1 h-1 overflow-hidden"
        aria-hidden="true"
      >
        <label className="text-xs text-gray-400" htmlFor="discovery-website">
          Website
        </label>
        <Input
          id="discovery-website"
          name="website"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading} className="rounded-full px-6">
          {loading ? "Scheduling..." : "Request a Call"}
        </Button>
      </div>
    </form>
  );
}

const Contact = () => {
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsDiscoveryOpen(false);
      }
    };
    if (isDiscoveryOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDiscoveryOpen]);

  return (
  <div className="min-h-screen text-[var(--text-primary)]">
    {/* Hero */}
    <section className="pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contact <span className="gradient-text">Us</span>
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Ready to build practical AI that moves the needle? Whether you need a
          strategic roadmap, a pilot, or full production deployment — reach out
          and we'll connect you with the right team. Typical response time:{" "}
          <strong>within 24 hours</strong>.
        </p>
      </div>
    </section>

    {/* Contact Methods */}
    {/* Contact Methods */}
    <section className="px-6 pb-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4 sm:gap-6">
        {/* CARD 1 */}
        <div className="glass-card p-6 flex flex-col justify-between h-full">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-500/20 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-[var(--text-primary)]" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-gray-400">General Enquiries</p>
              <p className="font-semibold mt-1 break-words">
                {siteContact.email}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            We reply to emails within one business day.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="glass-card p-6 flex flex-col justify-between h-full">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-500/20 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-[var(--text-primary)]" />
            </div>

            <div>
              <p className="text-sm text-gray-400">Call Us</p>
              <p className="font-semibold mt-1">{siteContact.phone}</p>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Mon–Fri, 9:00 AM – 6:00 PM (IST)
          </p>
        </div>

        {/* CARD 3 */}
        <div className="glass-card p-6 flex flex-col justify-between h-full">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-500/20 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-[var(--text-primary)]" />
            </div>

            <div>
              <p className="text-sm text-gray-400">Schedule a Meeting</p>
              <p className="font-semibold mt-1">Book a Discovery Call</p>
            </div>
          </div>

          <div className="mt-4">
            <Button
              type="button"
              onClick={() => setIsDiscoveryOpen(true)}
              className="btn-primary rounded-full px-6 w-full"
            >
              Book a Discovery Call
            </Button>

            <p className="text-xs text-gray-500 mt-3">
              Pick a time that works and we'll prepare a tailored agenda.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Main Content */}
    <section className="px-6 pb-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <div className="glass-card p-6 mb-6">
            <h3 className="font-semibold text-lg">How we help</h3>
            <p className="text-gray-400 mt-3">
              We help teams adopt AI responsibly — from scoping and prototypes
              to model delivery and operationalization. Our experts bring domain
              knowledge, secure data engineering and production-grade ML
              pipelines to every engagement.
            </p>

            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="text-sm text-gray-300">
                AI Strategy & Roadmapping
              </li>
              <li className="text-sm text-gray-300">ML Engineering & MLOps</li>
              <li className="text-sm text-gray-300">
                Data Platforms & Analytics
              </li>
              <li className="text-sm text-gray-300">
                Generative & Conversational AI
              </li>
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
                  <p>
                    {siteContact.address.full}
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-4 rounded overflow-hidden">
              <img
                src="https://images.pexels.com/photos/259924/pexels-photo-259924.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Office map"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="p-6 rounded-lg liquid-glass">
            <h3 className="font-semibold text-lg mb-4">Send us a message</h3>
            <ContactForm />
          </div>

          <div className="mt-6 text-xs text-gray-400">
            <p>
              <strong>Privacy</strong>: We respect your privacy. Your data will
              only be used to respond to your request as described in our{" "}
              <Link to="/privacy" className="text-purple-400">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <h3 className="font-semibold text-lg mb-4">
          Frequently Asked Questions
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-card p-4">
            <p className="font-semibold">How quickly will I hear back?</p>
            <p className="text-sm text-gray-400 mt-2">
              We usually respond within 24 business hours to initial enquiries.
              If your request is time-sensitive, please call {siteContact.phone}.
            </p>
          </div>

          <div className="glass-card p-4">
            <p className="font-semibold">Do you sign NDAs?</p>
            <p className="text-sm text-gray-400 mt-2">
              Yes — we’re happy to sign mutual non-disclosure agreements before
              engaging with sensitive data.
            </p>
          </div>

          <div className="glass-card p-4">
            <p className="font-semibold">Can you work with regulated data?</p>
            <p className="text-sm text-gray-400 mt-2">
              Yes — we have experience building secure data platforms and
              governance for financial and healthcare clients.
            </p>
          </div>

          <div className="glass-card p-4">
            <p className="font-semibold">What industries do you serve?</p>
            <p className="text-sm text-gray-400 mt-2">
              We work with financial services, healthcare, retail, logistics and
              enterprise SaaS companies.
            </p>
          </div>
        </div>
      </div>
    </section>
    {isDiscoveryOpen && (
      <div
        className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-32 pb-6 sm:pt-36"
        role="dialog"
        aria-modal="true"
        aria-labelledby="discovery-call-title"
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsDiscoveryOpen(false)}
          aria-hidden="true"
        />
        <div className="relative w-full max-w-2xl max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-white/10 bg-[#0b0b12] p-6 shadow-2xl">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 id="discovery-call-title" className="font-semibold text-lg">
                Book a Discovery Call
              </h3>
              <p className="text-gray-400 text-sm">
                Share a few details and your preferred time. We’ll confirm a
                slot and send a calendar invite.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsDiscoveryOpen(false)}
              className="text-gray-400 hover:text-[var(--text-primary)]"
              aria-label="Close"
            >
              X
            </button>
          </div>
          <DiscoveryCallForm />
        </div>
      </div>
    )}
  </div>
  );
};

export default Contact;




