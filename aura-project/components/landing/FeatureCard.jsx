import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ feature, index }) {
  const { icon: Icon, title, description } = feature;

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };
  
  return (
    <motion.div 
      variants={cardVariants}
      className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/80 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-2"
      style={{ perspective: '1000px' }}
    >
      <div className="w-16 h-16 mb-6 bg-slate-700 rounded-xl flex items-center justify-center aura-gradient-light-bg">
        <Icon className="w-8 h-8 text-indigo-300" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}