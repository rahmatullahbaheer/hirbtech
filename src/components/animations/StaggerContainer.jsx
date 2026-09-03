'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function StaggerContainer({
  children,
  staggerChildren = 0.08,
  delayChildren = 0.1,
  className = ''
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
