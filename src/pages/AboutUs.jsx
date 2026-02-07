import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Target,
  Eye,
  Lightbulb,
  Users,
  Award,
  Zap,
  Shield,
  TrendingUp,
  ChevronRight,
} from "lucide-react";



const AboutUs = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We continuously push boundaries to deliver cutting-edge AI solutions that transform businesses.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We maintain the highest ethical standards in all our engagements and recommendations.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We work closely with our clients, treating their challenges as our own.",
    },
    {
      icon: TrendingUp,
      title: "Excellence",
      description:
        "We strive for excellence in every project, ensuring measurable business impact.",
    },
  ];

  const stats = [
    { number: "50+", label: "Clients Served" },
    { number: "100+", label: "Projects Delivered" },
    { number: "95%", label: "Client Satisfaction" },
    { number: "5+", label: "Years Experience" },
  ];

  return (
    <div className="min-h-screen text-[var(--text-primary)]">


      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-space font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
            About <span className="gradient-text">NameSpace</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            We are a premier consulting firm specializing in AI-driven solutions
            for risk management, loss mitigation, and business process
            optimization. Our mission is to empower organizations with
            intelligent insights that drive growth and efficiency.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="liquid-glass p-8 sm:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="stat-number text-4xl sm:text-5xl mb-2">
                    {stat.number}
                  </div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="liquid-glass p-8 vision-card">
              <div className="feature-icon mb-6">
                <Eye className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed">
                To be the leading catalyst for AI-driven transformation in risk
                management and business optimization, empowering organizations
                worldwide to achieve operational excellence and sustainable
                growth through intelligent automation and data-driven insights.
              </p>
            </div>
            <div className="liquid-glass p-8 vision-card">
              <div className="feature-icon mb-6">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed">
                To deliver innovative, AI-powered solutions that help businesses
                identify risks, mitigate losses, and streamline operations. We
                are committed to providing actionable insights that drive
                measurable business impact while maintaining the highest
                standards of integrity and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-space font-bold text-3xl sm:text-4xl mb-4">
              Our Core <span className="gradient-text">Values</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These principles guide everything we do and define who we are as a
              company.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="glass-card p-6 text-center">
                <div className="feature-icon mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="liquid-glass p-8 sm:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-space font-bold text-3xl sm:text-4xl mb-6">
                  Why Choose <span className="gradient-text">NameSpace?</span>
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-gray-300">
                      Expertise in AI-powered risk management and loss
                      mitigation
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-gray-300">
                      Proven track record with 50+ satisfied clients
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-gray-300">
                      Customized solutions tailored to your business needs
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-gray-300">
                      End-to-end support from consultation to implementation
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-gray-300">
                      Commitment to delivering measurable ROI
                    </p>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center">
                    <Award className="w-24 h-24 text-purple-400" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-purple-400/30 to-transparent flex items-center justify-center">
                    <Zap className="w-8 h-8 text-purple-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="liquid-glass p-10">
            <h2 className="font-space font-bold text-3xl mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-400 mb-8">
              Let's discuss how our AI-powered solutions can help you achieve
              your business goals.
            </p>
            <Link to="/contact">
              <Button className="btn-primary rounded-full px-8 py-6 text-sm font-medium">
                Get in Touch <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>



    </div>
  );
};

export default AboutUs;
