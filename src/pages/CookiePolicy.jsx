import React from "react";
import { siteContact } from "@/config/site";
import { Cookie } from "lucide-react";



const CookiePolicy = () => {
  return (
    <div className="min-h-screen text-[var(--text-primary)]">
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="feature-icon mx-auto mb-6">
            <Cookie className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="font-space font-bold text-4xl sm:text-5xl mb-4">
            Cookie <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-gray-400">Last updated: January 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="liquid-glass p-8 sm:p-12 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">1. What Are Cookies?</h2>
              <p className="text-gray-300 leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit a 
                website. They are widely used to make websites work more efficiently, provide information to the 
                owners of the site, and enhance user experience. Cookies allow websites to remember your preferences 
                and recognize you on subsequent visits.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">2. How We Use Cookies</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                NameSpace Consultants uses cookies for several purposes:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>To enable certain functions of our website</li>
                <li>To provide analytics and understand how visitors use our site</li>
                <li>To store your preferences and settings</li>
                <li>To improve site performance and user experience</li>
                <li>To remember your login information</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">3. Types of Cookies We Use</h2>
              
              <div className="space-y-6 mt-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h3 className="font-semibold text-purple-300 mb-2">Essential Cookies</h3>
                  <p className="text-gray-400 text-sm">
                    These cookies are necessary for the website to function properly. They enable basic features 
                    like page navigation, secure access, and session management. The website cannot function 
                    properly without these cookies.
                  </p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg">
                  <h3 className="font-semibold text-purple-300 mb-2">Performance Cookies</h3>
                  <p className="text-gray-400 text-sm">
                    These cookies help us understand how visitors interact with our website by collecting 
                    information anonymously. They help us improve our website's performance and user experience.
                  </p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg">
                  <h3 className="font-semibold text-purple-300 mb-2">Functional Cookies</h3>
                  <p className="text-gray-400 text-sm">
                    These cookies allow our website to remember choices you make (such as your language preference 
                    or region) and provide enhanced, personalized features.
                  </p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg">
                  <h3 className="font-semibold text-purple-300 mb-2">Analytics Cookies</h3>
                  <p className="text-gray-400 text-sm">
                    We use analytics cookies to track website traffic and understand visitor behavior. This helps 
                    us improve our content and services. The information collected is aggregated and anonymous.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">4. Cookie List</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-purple-300">Cookie Name</th>
                      <th className="text-left py-3 px-4 text-purple-300">Purpose</th>
                      <th className="text-left py-3 px-4 text-purple-300">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-400">
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4">session_id</td>
                      <td className="py-3 px-4">User authentication</td>
                      <td className="py-3 px-4">Session</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4">cookieConsent</td>
                      <td className="py-3 px-4">Stores cookie preferences</td>
                      <td className="py-3 px-4">1 year</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4">_ga</td>
                      <td className="py-3 px-4">Google Analytics tracking</td>
                      <td className="py-3 px-4">2 years</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4">_gid</td>
                      <td className="py-3 px-4">Google Analytics (user distinction)</td>
                      <td className="py-3 px-4">24 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">5. Third-Party Cookies</h2>
              <p className="text-gray-300 leading-relaxed">
                Some cookies are placed by third-party services that appear on our pages. We use trusted third-party 
                services like Google Analytics to help us understand how visitors use our website. These third parties 
                may also use cookies, and their use is governed by their own privacy policies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">6. Managing Your Cookie Preferences</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You have the right to decide whether to accept or reject cookies. You can manage your cookie 
                preferences in several ways:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li><strong>Cookie Banner:</strong> Use our cookie consent banner when you first visit our site</li>
                <li><strong>Browser Settings:</strong> Most browsers allow you to control cookies through their settings</li>
                <li><strong>Opt-Out Links:</strong> You can opt out of certain analytics cookies through third-party tools</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Please note that disabling certain cookies may affect the functionality of our website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">7. Browser Cookie Settings</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Here's how to manage cookies in popular browsers:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                <li><strong>Edge:</strong> Settings → Privacy & Security → Cookies</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">8. Changes to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, 
                or our data practices. Any changes will be posted on this page with an updated revision date. We 
                encourage you to check this page periodically for updates.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">9. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="mt-4 p-4 bg-white/5 rounded-lg">
                <p className="text-gray-300"><strong>NameSpace Consultants</strong></p>
                <p className="text-gray-400">{siteContact.address.full}</p>
                <p className="text-gray-400">Email: {siteContact.email}</p>
                <p className="text-gray-400">Phone: {siteContact.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CookiePolicy;
