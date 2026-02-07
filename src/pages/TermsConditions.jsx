import React from "react";
import { siteContact } from "@/config/site";
import { Link } from "react-router-dom";

import { FileText } from "lucide-react";



const TermsConditions = () => {
  return (
    <div className="min-h-screen text-[var(--text-primary)]">


      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="feature-icon mx-auto mb-6">
            <FileText className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="font-space font-bold text-4xl sm:text-5xl mb-4">
            Terms & <span className="gradient-text">Conditions</span>
          </h1>
          <p className="text-gray-400">Last updated: January 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="liquid-glass p-8 sm:p-12 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using the services provided by NameSpace Consultants ("Company", "we", "us", or "our"), 
                you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to 
                abide by these terms, please do not use our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">2. Services Description</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                NameSpace Consultants provides AI-powered risk management, loss mitigation, and business consulting services. 
                Our services include but are not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Risk assessment and analysis</li>
                <li>Loss mitigation strategies</li>
                <li>Business process optimization</li>
                <li>AI-driven insights and recommendations</li>
                <li>Audit workflow management</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">3. User Obligations</h2>
              <p className="text-gray-300 leading-relaxed">
                You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-4">
                <li>Use our services in any way that violates any applicable law or regulation</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Interfere with or disrupt the integrity or performance of our services</li>
                <li>Transmit any malicious code or harmful content</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">4. Intellectual Property</h2>
              <p className="text-gray-300 leading-relaxed">
                All content, features, and functionality of our services, including but not limited to text, graphics, 
                logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive 
                property of NameSpace Consultants and are protected by international copyright, trademark, patent, trade 
                secret, and other intellectual property laws.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">5. Confidentiality</h2>
              <p className="text-gray-300 leading-relaxed">
                We understand the sensitive nature of business information shared with us. We commit to maintaining 
                strict confidentiality of all client data and will not disclose any confidential information to third 
                parties without your express written consent, except as required by law.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">6. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                To the fullest extent permitted by applicable law, NameSpace Consultants shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, 
                whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">7. Indemnification</h2>
              <p className="text-gray-300 leading-relaxed">
                You agree to defend, indemnify, and hold harmless NameSpace Consultants and its officers, directors, 
                employees, contractors, agents, licensors, and suppliers from and against any claims, liabilities, 
                damages, judgments, awards, losses, costs, expenses, or fees arising out of your violation of these 
                Terms or your use of our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">8. Governing Law</h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes 
                arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in 
                New Delhi, India.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">9. Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will 
                provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material 
                change will be determined at our sole discretion.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">10. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about these Terms, please contact us at:
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

export default TermsConditions;
