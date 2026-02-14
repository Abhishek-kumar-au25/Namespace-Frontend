export const caseStudies = [
  {
    slug: "fraud-detection-ai",
    title: "Fraud Detection AI",
    result: "Reduced fraud by 80%",
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
    summary:
      "Built an AI-driven detection engine to surface anomalous activity in near real time across high-volume transactions.",
    clientBackground:
      "A fast-growing financial services provider processing high-volume transactions across multiple channels.",
    problemStatement:
      "The existing fraud detection approach was reactive and relied heavily on manual review, leading to delayed response times.",
    challenges: [
      "High false positives increased manual workload",
      "Delayed fraud detection led to preventable losses",
      "Limited explainability for audit and compliance teams",
    ],
    solutionApproach:
      "We combined supervised models with rules-based scoring, then added monitoring and feedback loops for continuous improvement.",
    toolsTech: ["Python", "Scikit-learn", "PostgreSQL", "Airflow", "Grafana"],
    results: [
      "Fraud losses reduced by 80%",
      "Investigation time decreased by 60%",
      "Alert precision improved through feedback loops",
    ],
    clientImpact:
      "The client built a proactive fraud operations model, reduced exposure, and improved trust with regulators and customers.",
    testimonial: {
      quote:
        "The new detection system helped our teams act faster with fewer false positives.",
      name: "Anand Joshi",
      title: "CFO, Leading NBFC",
    },
  },
  {
    slug: "audit-automation",
    title: "Audit Automation",
    result: "Saved 2000+ hours",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
    summary:
      "Automated audit sampling and evidence collection to improve coverage without increasing headcount.",
    clientBackground:
      "A multi-entity enterprise with distributed audit teams and complex reporting requirements.",
    problemStatement:
      "Manual audit workflows caused long cycle times and limited coverage across business units.",
    challenges: [
      "High manual effort for evidence collection",
      "Inconsistent audit coverage between teams",
      "Slow reporting and limited real-time visibility",
    ],
    solutionApproach:
      "We deployed automated workflows, anomaly detection, and evidence capture with structured reporting.",
    toolsTech: ["Node.js", "Python", "SQL", "Power BI", "Airflow"],
    results: [
      "Saved 2000+ analyst hours annually",
      "Improved audit coverage across business units",
      "Faster reporting with structured evidence packs",
    ],
    clientImpact:
      "Audit teams shifted from manual evidence gathering to higher-value analysis, accelerating governance decisions.",
    testimonial: {
      quote:
        "Audit throughput improved dramatically while our team focused on higher-value reviews.",
      name: "Madhav",
      title: "Head of Internal Audit",
    },
  },
  {
    slug: "risk-prediction",
    title: "Risk Prediction",
    result: "Prevented compliance failures",
    image:
      "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=800&q=80",
    summary:
      "Deployed predictive models to flag compliance risks early and improve governance visibility.",
    clientBackground:
      "A regulated financial firm managing high compliance exposure across multiple regions.",
    problemStatement:
      "There were no reliable early-warning indicators to detect policy deviations before escalation.",
    challenges: [
      "Siloed compliance data across teams",
      "Reactive remediation instead of proactive control",
      "Limited visibility for leadership oversight",
    ],
    solutionApproach:
      "We built predictive risk models using historical audits and operational signals with automated alerts.",
    toolsTech: ["Python", "XGBoost", "Snowflake", "Tableau", "Docker"],
    results: [
      "Early warning signals reduced compliance incidents",
      "Improved governance reporting for leadership",
      "Faster intervention through automated alerts",
    ],
    clientImpact:
      "Leadership gained continuous risk visibility, enabling proactive compliance and stronger operational resilience.",
    testimonial: {
      quote:
        "The early-warning model gave us the visibility we needed to act before issues escalated.",
      name: "Nitish Garg",
      title: "CEO, Fintech Startup",
    },
  },
];
