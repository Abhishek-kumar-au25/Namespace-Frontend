import React from "react";
import { Link } from "react-router-dom";

import { Shield } from "lucide-react";



const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen text-white">


      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="feature-icon mx-auto mb-6">
            <Shield className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="font-space font-bold text-4xl sm:text-5xl mb-4">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-gray-400">Last updated: January 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="liquid-glass p-8 sm:p-12 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">1. Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                NameSpace Consultants ("we", "our", or "us") respects your privacy and is committed to protecting 
                your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your 
                information when you use our services or visit our website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">2. Information We Collect</h2>
              <p className="text-gray-300 leading-relaxed mb-4">We may collect the following types of information:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li><strong>Personal Information:</strong> Name, email address, phone number, company name, job title</li>
                <li><strong>Business Information:</strong> Company details, industry, business requirements</li>
                <li><strong>Technical Information:</strong> IP address, browser type, device information, cookies</li>
                <li><strong>Usage Data:</strong> How you interact with our website and services</li>
                <li><strong>Communication Data:</strong> Records of correspondence with us</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">3. How We Use Your Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">We use your personal data for the following purposes:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>To provide and maintain our services</li>
                <li>To communicate with you about our services</li>
                <li>To send you marketing communications (with your consent)</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">4. Data Sharing and Disclosure</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell your personal data. We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li><strong>Service Providers:</strong> Third parties who perform services on our behalf</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
                <li><strong>With Your Consent:</strong> For any other purpose with your explicit consent</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">5. Data Security</h2>
              <p className="text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal data 
                against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, 
                secure servers, access controls, and regular security assessments. However, no method of transmission 
                over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">6. Data Retention</h2>
              <p className="text-gray-300 leading-relaxed">
                We retain your personal data only for as long as necessary to fulfill the purposes for which it was 
                collected, including satisfying legal, accounting, or reporting requirements. The retention period 
                may vary depending on the context of our relationship and our legal obligations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">7. Your Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Under applicable data protection laws, you have the following rights:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li><strong>Access:</strong> Request access to your personal data</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
                <li><strong>Portability:</strong> Request transfer of your data</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">8. Children's Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect 
                personal information from children. If you become aware that a child has provided us with personal 
                data, please contact us immediately.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">9. International Data Transfers</h2>
              <p className="text-gray-300 leading-relaxed">
                Your information may be transferred to and processed in countries other than India. We ensure that 
                appropriate safeguards are in place to protect your data in accordance with this privacy policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">10. Changes to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting 
                the new policy on this page and updating the "Last updated" date. We encourage you to review this 
                policy periodically.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">11. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="mt-4 p-4 bg-white/5 rounded-lg">
                <p className="text-gray-300"><strong>NameSpace Consultants</strong></p>
                <p className="text-gray-400">PT-62/3, L.G.F., PT And DD Block, Kalkaji, New Delhi, 110019</p>
                <p className="text-gray-400">Email: kartikeya@namespaceconsultants.com</p>
                <p className="text-gray-400">Phone: +91 9625061596</p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default PrivacyPolicy;
