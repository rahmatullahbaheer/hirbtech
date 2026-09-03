'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Calculator, Sparkles, AlertCircle } from 'lucide-react';

export default function ProjectEstimator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: 'Web App',
    budget: '$5,000–$10,000',
    timeline: '1–2 months',
    features: ['Authentication', 'Database', 'Admin Dashboard'],
    projectDescription: '',
    name: '',
    email: '',
    company: ''
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const projectTypeOptions = [
    "Website", "Web App", "Mobile App", "Desktop App", "SaaS", "E-commerce", "Custom Software", "AI Application"
  ];

  const budgetOptions = [
    "Under $1,000", "$1,000–$5,000", "$5,000–$10,000", "$10,000+", "Custom"
  ];

  const timelineOptions = [
    "ASAP", "1–2 months", "2–4 months", "4+ months", "Flexible"
  ];

  const featureOptions = [
    "Authentication", "Payments", "Admin Dashboard", "API", "AI", "Real-time", "Notifications", "Database", "Cloud", "Analytics"
  ];

  const toggleFeature = (feat) => {
    if (formData.features.includes(feat)) {
      setFormData({ ...formData, features: formData.features.filter(f => f !== feat) });
    } else {
      setFormData({ ...formData, features: [...formData.features, feat] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setStatus({ loading: false, success: false, error: "Please enter your name and email address." });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          service: formData.projectType,
          budget: formData.budget,
          timeline: formData.timeline,
          projectDescription: `[ESTIMATOR REQUEST]\nFeatures: ${formData.features.join(', ')}\n\nDetails: ${formData.projectDescription}`
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({ loading: false, success: true, error: null });
      } else {
        setStatus({ loading: false, success: false, error: data.error || "Submission failed. Please try again." });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: "Network error occurred. Please try again." });
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10 border border-zinc-800 relative overflow-hidden">
      <div className="flex items-center space-x-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
        <Calculator className="w-4 h-4" />
        <span>Interactive Project Calculator</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
        Estimate Your Project Scope
      </h2>
      <p className="text-xs sm:text-sm text-zinc-400 mb-8 max-w-2xl">
        Select your project parameters below to submit a custom estimation request. Note: The estimator provides non-binding guidance only.
      </p>

      {/* Progress Step Bar */}
      <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4 overflow-x-auto">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`relative flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              step === i
                ? 'text-white'
                : step > i
                ? 'bg-blue-950 text-blue-400'
                : 'text-zinc-400 bg-zinc-900'
            }`}
          >
            {step === i && (
              <motion.div
                layoutId="activeStep"
                className="absolute inset-0 bg-blue-600 rounded-lg shadow-md"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">Step {i}</span>
          </button>
        ))}
      </div>

      {status.success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 text-center bg-blue-950/40 border border-blue-800/60 rounded-2xl space-y-4"
        >
          <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Project Request Received!</h3>
          <p className="text-sm text-zinc-300 max-w-md mx-auto">
            Thanks! Your project request has been received. Our software engineering team will review your scope requirements and respond shortly.
          </p>
          <button
            onClick={() => {
              setStep(1);
              setStatus({ loading: false, success: false, error: null });
            }}
            className="px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white"
          >
            Calculate Another Scope
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Project Type */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <label className="block text-sm font-bold text-white">
                  1. What do you want to build?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {projectTypeOptions.map((type) => (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      key={type}
                      onClick={() => setFormData({ ...formData, projectType: type })}
                      className={`p-3.5 rounded-xl text-xs font-semibold border text-left transition-all ${
                        formData.projectType === type
                          ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
                <div className="pt-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs flex items-center hover:bg-blue-500 shadow-lg shadow-blue-600/30"
                  >
                    <span>Next: Budget →</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Budget */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <label className="block text-sm font-bold text-white">
                  2. What is your target budget range?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {budgetOptions.map((b) => (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      key={b}
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`p-4 rounded-xl text-xs font-semibold border text-center transition-all ${
                        formData.budget === b
                          ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      {b}
                    </motion.button>
                  ))}
                </div>
                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-semibold"
                  >
                    ← Back
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs flex items-center hover:bg-blue-500 shadow-lg shadow-blue-600/30"
                  >
                    <span>Next: Timeline →</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Timeline */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <label className="block text-sm font-bold text-white">
                  3. What is your target timeline?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timelineOptions.map((t) => (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      key={t}
                      onClick={() => setFormData({ ...formData, timeline: t })}
                      className={`p-4 rounded-xl text-xs font-semibold border text-center transition-all ${
                        formData.timeline === t
                          ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      {t}
                    </motion.button>
                  ))}
                </div>
                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-semibold"
                  >
                    ← Back
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs flex items-center hover:bg-blue-500 shadow-lg shadow-blue-600/30"
                  >
                    <span>Next: Features →</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Features */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <label className="block text-sm font-bold text-white">
                  4. Select desired features & capabilities:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {featureOptions.map((feat) => {
                    const selected = formData.features.includes(feat);
                    return (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        key={feat}
                        onClick={() => toggleFeature(feat)}
                        className={`p-3 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                          selected
                            ? 'bg-blue-950/80 border-blue-500 text-blue-300'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <span>{feat}</span>
                        {selected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 ml-1" />}
                      </motion.button>
                    );
                  })}
                </div>
                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-semibold"
                  >
                    ← Back
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => setStep(5)}
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs flex items-center hover:bg-blue-500 shadow-lg shadow-blue-600/30"
                  >
                    <span>Next: Details →</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Contact Details */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <label className="block text-sm font-bold text-white">
                  5. Enter project details & submit estimate request:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Project Description</label>
                  <textarea
                    rows={3}
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    placeholder="Tell us a little about your goals or workflow requirements..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                {status.error && (
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 text-xs flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{status.error}</span>
                  </div>
                )}

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-semibold"
                  >
                    ← Back
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={status.loading}
                    className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center shadow-lg shadow-blue-600/30 disabled:opacity-50"
                  >
                    {status.loading ? 'Submitting...' : 'Request Project Estimate'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      )}
    </div>
  );
}
