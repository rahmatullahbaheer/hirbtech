'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  distance = 30,
  className = '',
  once = true
}) {
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 }
  };

  const initialVal = directions[direction] || directions.up;

  return (
    <motion.div
      initial={{ opacity: 0, ...initialVal }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
