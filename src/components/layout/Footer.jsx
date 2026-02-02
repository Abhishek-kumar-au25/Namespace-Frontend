import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import axios from "axios";
import { API } from "@/App";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import LOCAL_LOGO from "@/assets/Free__2_-removebg-preview.png";

const Footer = () => {
  const [newsletter, setNewsletter] = useState({ email: "", subscribe: false });
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletter.email) {
      toast.error("Please enter your email");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${API}/contact/send`, {
        name: "Newsletter Subscriber",
        email: newsletter.email,
        message: "Newsletter subscription",
      });
      toast.success("Thank you for subscribing!");
      setNewsletter({ email: "", subscribe: false });
    } catch (err) {
      toast.error("Subscription failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#08080C] border-t border-white/5 relative z-10" style={{ boxShadow: '0 -18px 40px rgba(79,70,229,0.06)' }} data-testid="footer-full">
      {/* Themed top shadow overlay */}
      <div
        aria-hidden="true"
        className="absolute -top-8 left-0 right-0 h-20 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(99,102,241,0.12), rgba(99,102,241,0.03) 40%, transparent)',
          filter: 'blur(18px)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* LOGO + CONTACT */}
          <div>
            <img src={LOCAL_LOGO} alt="Logo" className="h-32 md:h-44 mb-6 w-auto object-contain" />
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-500/20 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">+91 9625061596</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-500/20 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">kartikeya@namespaceconsultants.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="leading-relaxed text-sm text-gray-300">
                  PT-62/3, L.G.F., PT And DD Block,
                  <br />
                  Kalkaji, New Delhi, 110019
                </div>
              </div>
            </div>
          </div>

          {/* COMPANY LINKS */}
          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link to="/about" className="hover:text-purple-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#solutions" className="hover:text-purple-400">
                  Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* LEGAL LINKS */}
          <div>
            <h4 className="font-semibold mb-6">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link to="/terms" className="hover:text-purple-400">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-purple-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-purple-400">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Receive insights, reports and product updates.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={newsletter.email}
                onChange={(e) => setNewsletter({ ...newsletter, email: e.target.value })}
                className="bg-[#12121A] border-white/10 focus:border-purple-500 h-11"
              />

              <label className="flex items-center gap-2 text-xs text-gray-500">
                <input
                  type="checkbox"
                  checked={newsletter.subscribe}
                  onChange={(e) => setNewsletter({ ...newsletter, subscribe: e.target.checked })}
                  className="rounded border-gray-600 w-3 h-3"
                />
                Subscribe to updates
              </label>

              <div className="text-right">
                <Button type="submit" className="btn-primary rounded-full px-6" disabled={loading}>
                  {loading ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Follow us</span>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500/20"><Linkedin className="w-4 h-4 text-gray-400" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500/20"><Facebook className="w-4 h-4 text-gray-400" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500/20"><Instagram className="w-4 h-4 text-gray-400" /></a>
            </div>
          </div>

          <p className="text-sm text-gray-500 text-center md:text-right">© {new Date().getFullYear()} NameSpace Consultants. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
