import React from 'react';

const FeatureStack = ({ features = [] }) => {
  return (
    <div className="relative h-full">
      <div className="grid grid-cols-1 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className={`glass-card feature-stack-card scroll-reveal-right stagger-${i + 1}`}
            style={{ transform: `translateY(${i * 28}px)`, zIndex: features.length - i }}
          >
            <div className="flex gap-4">
              <div className="feature-icon flex-shrink-0">
                <f.icon className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1 gradient-text">{f.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{f.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureStack;
