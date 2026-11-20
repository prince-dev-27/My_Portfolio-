import React from 'react';
import { Github, Linkedin, Mail, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#111C2F] border-t border-[#26364D] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0B1220] border border-[#26364D] flex items-center justify-center text-[#2563EB] font-bold text-xl">
              PU
            </div>
            <div>
              <span className="font-bold text-lg text-[#F8FAFC] tracking-wide block">Prince Undaviya</span>
              <span className="text-xs text-[#94A3B8] block">Full Stack Developer & Engineer</span>
            </div>
          </div>

          <div className="text-center md:text-right text-xs text-[#94A3B8] space-y-1">
            <p>© {new Date().getFullYear()} Prince Undaviya. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
