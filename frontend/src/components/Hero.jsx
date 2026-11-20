import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, Terminal, Code2, Database, ShieldCheck } from 'lucide-react';
import myPhoto from '../assets/my_photo.jpg';

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center bg-[#0B1220] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111C2F] border border-[#26364D] text-[#60A5FA] text-xs font-medium">
              <Terminal className="w-3.5 h-3.5" />
              Full Stack Software Engineer & Architect
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight">
              Hi, I'm <span className="text-[#2563EB]">Prince Undaviya</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#94A3B8] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Building robust, high-performance full-stack applications with React, Node.js, and MongoDB. Passionate about clean architecture, secure APIs, and responsive user interfaces.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-[#2563EB] text-[#FFFFFF] font-semibold text-sm hover:bg-[#60A5FA] transition-colors flex items-center gap-2 shadow-sm"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3 rounded-xl bg-[#111C2F] border border-[#26364D] text-[#F8FAFC] font-semibold text-sm hover:border-[#60A5FA] transition-colors flex items-center gap-2"
              >
                Let's Talk
                <Mail className="w-4 h-4 text-[#2563EB]" />
              </a>
            </div>

            <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 text-[#94A3B8]">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#94A3B8]">Connect:</span>
              <a href="https://github.com/Prince-2702" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111C2F] border border-[#26364D] text-[#F8FAFC] hover:border-[#60A5FA] hover:text-[#2563EB] transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/prince-undaviya" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111C2F] border border-[#26364D] text-[#F8FAFC] hover:border-[#60A5FA] hover:text-[#2563EB] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:princeundaviya@gmail.com" className="p-2 rounded-lg bg-[#111C2F] border border-[#26364D] text-[#F8FAFC] hover:border-[#60A5FA] hover:text-[#2563EB] transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Right Visual Photo Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-full max-w-md"
            >
              <div className="bg-[#111C2F] border-2 border-[#2563EB] rounded-3xl p-5 shadow-2xl relative space-y-4 group">

                {/* Header bar */}
                <div className="flex items-center justify-between pb-3 px-2 border-b border-[#26364D]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                    <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                    <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                  </div>
                  <span className="text-xs font-mono text-[#60A5FA]">prince-undaviya.profile</span>
                  <div className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-lg bg-[#1B2A41] text-[#22C55E] border border-[#26364D] font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </div>
                </div>

                {/* Profile Image Frame */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#0B1220] border border-[#26364D]">
                  <motion.img
                    src={myPhoto}
                    alt="Prince Undaviya - Full Stack Engineer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                  />
                  {/* Overlay badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0B1220]/95 border border-[#26364D] flex items-center justify-between shadow-lg">
                    <div>
                      <div className="text-sm font-bold text-[#F8FAFC]">Prince Undaviya</div>
                      <div className="text-xs text-[#60A5FA]">Full Stack Software Engineer</div>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                  </div>
                </div>

                {/* Tech stack highlights */}
                <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono text-xs">
                  <div className="p-2 rounded-xl bg-[#1B2A41] border border-[#26364D] text-[#F8FAFC]">
                    React
                  </div>
                  <div className="p-2 rounded-xl bg-[#1B2A41] border border-[#26364D] text-[#F8FAFC]">
                    Node.js
                  </div>
                  <div className="p-2 rounded-xl bg-[#1B2A41] border border-[#26364D] text-[#F8FAFC]">
                    MongoDB
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
