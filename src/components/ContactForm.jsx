'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Mail, Phone, Building, Send } from 'lucide-react';
import { services } from '@/data/services';

export default function ContactForm({ defaultService }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: defaultService || 'Website Development',
    budget: '$5,000–$10,000',
    timeline: '1–2 months',
    projectDescription: ''
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.projectDescription.trim()) {
      setStatus({ loading: false, success: false, error: 'Please fill in all required fields (Name, Email, and Project Description).' });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: 'Website Development',
          budget: '$5,000–$10,000',
          timeline: '1–2 months',
          projectDescription: ''
        });
      } else {
        setStatus({ loading: false, success: false, error: data.error || 'Failed to submit inquiry. Please try again.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Network communication error. Please try again.' });
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10 border border-zinc-800 relative">
      {status.success ? (
        <div className="py-12 px-6 text-center space-y-4">
          <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-white">
            Thanks! Your project request has been received.
          </h3>
          <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
            Our engineering team will review your project details and contact you via email within 24 business hours to discuss the next step.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setStatus({ loading: false, success: false, error: null })}
              className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-700"
            >
              Send Another Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Smith"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@company.com"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Company */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Company Name
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Acme Innovations"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Service Selection */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Target Service
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                {services.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.shortTitle}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Budget Range
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="Under $1,000">Under $1,000</option>
                <option value="$1,000–$5,000">$1,000–$5,000</option>
                <option value="$5,000–$10,000">$5,000–$10,000</option>
                <option value="$10,000+">$10,000+</option>
                <option value="Custom Scope">Custom Scope</option>
              </select>
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Target Timeline
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="ASAP">ASAP</option>
                <option value="1–2 months">1–2 months</option>
                <option value="2–4 months">2–4 months</option>
                <option value="4+ months">4+ months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Project Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.projectDescription}
              onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
              placeholder="Briefly describe your project requirements, goals, or existing codebase..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          {/* Error Message */}
          {status.error && (
            <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-800/60 text-red-300 text-xs flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{status.error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status.loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50"
          >
            {status.loading ? (
              <span>Processing Request...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Project Request</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
