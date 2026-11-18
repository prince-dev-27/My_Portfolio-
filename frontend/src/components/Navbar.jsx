import React, { useState, useEffect } from 'react';
import { Menu, X, User, Code, Briefcase, GraduationCap, Cpu, MessageSquare, Mail } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', icon: User },
    { name: 'Projects', href: '#projects', icon: Code },
    { name: 'Skills', href: '#skills', icon: Cpu },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Education', href: '#education', icon: GraduationCap },
    /* Temporarily disabled Testimonials link
    { name: 'Testimonials', href: '#testimonials', icon: MessageSquare },
    */
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 bg-[#0B1220] ${scrolled ? 'border-b border-[#26364D] shadow-lg shadow-black/20' : 'border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#111C2F] border border-[#26364D] flex items-center justify-center text-[#2563EB] font-bold text-xl group-hover:border-[#60A5FA] transition-colors">
              PU
            </div>
            <div>
              <span className="font-bold text-lg text-[#F8FAFC] tracking-wide block">Prince Undaviya</span>
              <span className="text-xs text-[#94A3B8] block">Full Stack Developer</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-[#111C2F] border border-[#26364D] text-[#F8FAFC]"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#111C2F] border-b border-[#26364D] px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium text-[#F8FAFC] hover:bg-[#1B2A41] transition-colors"
              >
                <Icon className="w-5 h-5 text-[#2563EB]" />
                {link.name}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
