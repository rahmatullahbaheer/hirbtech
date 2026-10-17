'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, ArrowRight, Code, Smartphone, Monitor, Cpu, Layers, ShoppingBag, Bot, ShieldCheck, Globe, Download } from 'lucide-react';
import { services } from '@/data/services';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceIconMap = {
    Globe: Globe,
    Layout: Code,
    Smartphone: Smartphone,
    Monitor: Monitor,
    Cpu: Cpu,
    Layers: Layers,
    ShoppingBag: ShoppingBag,
    Bot: Bot,
    Code: Code,
    Cloud: ShieldCheck,
    ShieldCheck: ShieldCheck
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/40 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with Image and Motion Animation */}
          <Link href="/" className="flex items-center space-x-3 group">
            {/* <motion.div
              whileHover={{ scale: 1.08, rotate: [0, -5, 5, 0] }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-11 h-11 rounded-xl bg-purple-950/50 p-1.5 border border-purple-500/30 flex items-center justify-center shadow-lg shadow-purple-950/50"
            > */}
            <div className='rounded-lg w-10 h-10 rounded-lg '>
              <Image
                src="/logo.png"
                alt="RB-Tech Logo"
                width={100}
                height={100}
               className=" rounded-lg"
                priority
              />
            {/* </motion.div> */}
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">
                RB-Tech
              </span>
              <span className="text-[10px] tracking-widest text-purple-300 uppercase font-medium">
                Build. Scale. Succeed.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-zinc-300">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                pathname === '/' ? 'text-blue-400 bg-blue-500/10' : 'hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/services"
                className={`inline-flex items-center px-3.5 py-2 rounded-lg transition-colors ${
                  pathname.startsWith('/services') ? 'text-blue-400 bg-blue-500/10' : 'hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-blue-400' : 'text-zinc-400'}`} />
              </Link>

              {/* Mega Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-[540px] pt-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-2xl p-4 shadow-2xl shadow-black/80 grid grid-cols-2 gap-2">
                    {services.map((item) => {
                      const IconComp = serviceIconMap[item.icon] || Code;
                      return (
                        <Link
                          key={item.slug}
                          href={`/services/${item.slug}`}
                          className="flex items-start p-2.5 rounded-xl hover:bg-zinc-800/70 transition-colors group/item"
                        >
                          <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-800/30 text-blue-400 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors mr-3 flex-shrink-0 mt-0.5">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-zinc-100 group-hover/item:text-blue-400 transition-colors">
                              {item.shortTitle}
                            </div>
                            <div className="text-[11px] text-zinc-400 line-clamp-1">
                              {item.seoTitle.split('|')[0].trim()}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                    <div className="col-span-2 pt-2 mt-2 border-t border-zinc-800/80 flex items-center justify-between px-2 text-xs">
                      <span className="text-zinc-400">Need custom software engineering?</span>
                      <Link href="/services" className="font-semibold text-blue-400 hover:text-blue-300">
                        View All Services →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/portfolio"
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                pathname.startsWith('/portfolio') ? 'text-blue-400 bg-blue-500/10' : 'hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              Portfolio
            </Link>

            {/* Projects Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProjectsDropdownOpen(true)}
              onMouseLeave={() => setProjectsDropdownOpen(false)}
            >
              <Link
                href="/projects"
                className={`inline-flex items-center px-3.5 py-2 rounded-lg transition-colors ${
                  pathname.startsWith('/projects') ? 'text-blue-400 bg-blue-500/10' : 'hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <span>Projects</span>
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${projectsDropdownOpen ? 'rotate-180 text-blue-400' : 'text-zinc-400'}`} />
              </Link>

              {projectsDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-2xl p-3 shadow-2xl shadow-black/80 flex flex-col gap-1.5">
                    <Link
                      href="/projects?tab=web"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-800/70 transition-colors group/item"
                    >
                      <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-800/30 text-blue-400 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors flex-shrink-0">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-100 group-hover/item:text-blue-400 transition-colors">Web Projects</div>
                        <div className="text-[11px] text-zinc-400">Websites & web platforms</div>
                      </div>
                    </Link>
                    <Link
                      href="/projects?tab=mobile"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-800/70 transition-colors group/item"
                    >
                      <div className="p-2 rounded-lg bg-purple-950/60 border border-purple-800/30 text-purple-400 group-hover/item:bg-purple-600 group-hover/item:text-white transition-colors flex-shrink-0">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-100 group-hover/item:text-purple-400 transition-colors">Mobile Apps</div>
                        <div className="text-[11px] text-zinc-400">Android & iOS applications</div>
                      </div>
                    </Link>
                    <div className="pt-1.5 mt-1 border-t border-zinc-800/80 flex items-center gap-1.5 px-2 text-[11px] text-zinc-500">
                      <Download className="w-3 h-3" />
                      PDF downloads available on each project
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/process"
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                pathname === '/process' ? 'text-blue-400 bg-blue-500/10' : 'hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              Process
            </Link>
            <Link
              href="/pricing"
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                pathname === '/pricing' ? 'text-blue-400 bg-blue-500/10' : 'hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                pathname === '/about' ? 'text-blue-400 bg-blue-500/10' : 'hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              About
            </Link>
            <Link
              href="/blog"
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                pathname.startsWith('/blog') ? 'text-blue-400 bg-blue-500/10' : 'hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              Blog
            </Link>
          </nav>

          {/* Right CTA Button & Mobile Trigger */}
          <div className="flex items-center space-x-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wide text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-md shadow-blue-600/25 hover:shadow-blue-600/40 active:scale-95"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
              aria-label="Open Mobile Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
