import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import axios from "axios";
import { API } from "@/App";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import LOCAL_LOGO from "@/assets/Free__2_-removebg-preview.png";
import { ReactComponent as PhoneIcon } from "@/assets/call.svg";
import { ReactComponent as MailIcon } from "@/assets/mail.svg";
import { ReactComponent as LocationIcon } from "@/assets/location.svg";
import { siteContact } from "@/config/site";

const Footer = () => {
  const [newsletter, setNewsletter] = useState({
    email: "",
    subscribe: false,
    website: "",
  });

  const [loading, setLoading] = useState(false);
  // ✅ Email Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // ✅ Handle Email Change
  const handleEmailChange = (e) => {
    const value = e.target.value;

    setNewsletter({
      ...newsletter,
      email: value,
    });
  };

  // ✅ Submit Handler with Regex Validation
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    // Required check
    if (!newsletter.email.trim()) {
      toast.error("Email is required");
      return;
    }

    // Regex validation
    if (!emailRegex.test(newsletter.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      setLoading(true);

      await axios.post(`${API}/contact/send`, {
        name: "Newsletter Subscriber",
        email: newsletter.email,
        message: "Newsletter subscription",
        website: newsletter.website,
      });

      toast.success("Thank you for subscribing!");

      setNewsletter({
        email: "",
        subscribe: false,
        website: "",
      });
    } catch (err) {
      toast.error("Subscription failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      className="bg-[#08080C] border-t border-white/5 relative z-10"
      style={{ boxShadow: "0 -18px 40px rgba(79,70,229,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* LOGO + CONTACT */}
          <div>
            <img
              src={LOCAL_LOGO}
              alt="Logo"
              className="h-36 md:h-52 mb-6 w-auto object-contain"
            />

            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex gap-4">
                <PhoneIcon className="w-4 h-4 text-[var(--text-primary)]" />
                <p className="text-[var(--text-primary)]">{siteContact.phone}</p>
              </div>

              {/* <div className="flex gap-4">
                <MailIcon className="w-4 h-4 text-[var(--text-primary)]" />
                <p className="text-[var(--text-primary)]">
                  {siteContact.email}
                </p>
              </div> */}

              <div className="flex gap-4">
                <LocationIcon className="w-4 h-4 text-[var(--text-primary)]" />
                <p className="text-gray-300">
                  {siteContact.address.line1}
                  <br />
                  {siteContact.address.line2}
                </p>
              </div>
              
            </div>
          </div>

          {/* COMPANY */}
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
                <Link to="/solutions" className="hover:text-purple-400">
                  Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
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

            <p className="text-gray-400 text-sm mb-4">
              Receive insights, reports and product updates.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={newsletter.email}
                onChange={handleEmailChange}
                required
                className="bg-[#12121A] border-white/10 focus:border-purple-500 h-11"
              />
              <div
                className="absolute left-[-10000px] top-auto w-1 h-1 overflow-hidden"
                aria-hidden="true"
              >
                <label className="text-xs text-gray-400" htmlFor="newsletter-website">
                  Website
                </label>
                <Input
                  id="newsletter-website"
                  name="website"
                  value={newsletter.website}
                  onChange={(e) =>
                    setNewsletter({ ...newsletter, website: e.target.value })
                  }
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-gray-500">
                <input
                  type="checkbox"
                  checked={newsletter.subscribe}
                  onChange={(e) =>
                    setNewsletter({
                      ...newsletter,
                      subscribe: e.target.checked,
                    })
                  }
                  className="rounded border-gray-600 w-3 h-3"
                />
                Subscribe to updates
              </label>

              <div className="text-right">
                <Button
                  type="submit"
                  disabled={loading}
                  className="btn-primary rounded-full px-6"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-3">
            <Linkedin className="w-4 h-4 text-gray-400" />
            <Facebook className="w-4 h-4 text-gray-400" />
            <Instagram className="w-4 h-4 text-gray-400" />
          </div>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} NameSpace Consultants. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;





