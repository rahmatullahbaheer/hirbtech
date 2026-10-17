import React from 'react';
import ContactForm from '@/components/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Mail, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: "Contact RB-Tech | Start Your Software Project",
  description: "Tell RB-Tech about your idea, business challenge or software requirements. We'll use the information to understand what you need and determine the next step."
};

export default function ContactPage() {
  const breadcrumbItems = [
    { name: "Contact", path: "/contact" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Headlines & Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Get In Touch
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Let&apos;s Build Your Next Digital Product.
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Tell RB-Tech about your idea, business challenge or software requirements. We&apos;ll use the information to understand what you need and determine the next step.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <div className="flex items-start space-x-3 text-xs text-zinc-300">
              <Clock className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Response Time</strong>
                We review all project requests within 24 business hours.
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Confidentiality & Privacy</strong>
                All project details, ideas, and documents shared are protected under standard NDA principles.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form Component */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
