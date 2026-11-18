import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, Server, Database, Award, CheckCircle2 } from 'lucide-react';
import myPhoto from '../assets/my_photo.jpg';

export default function About() {
  const highlights = [
    { title: 'Full Stack Expertise', desc: 'Proficient in building end-to-end web applications with React and Node.js.', icon: Code },
    { title: 'Database Architecture', desc: 'Expertise in MongoDB schema design, indexing, and high-performance querying.', icon: Database },
    { title: 'Secure & Scalable', desc: 'Implementing robust JWT authentication, role-based access, and clean RESTful APIs.', icon: Server },
    { title: 'Responsive & Accessible', desc: 'Crafting pixel-perfect, mobile-first interfaces following strict design systems.', icon: Award },
  ];

  return (
    <section id="about" className="py-24 bg-[#111C2F] border-t border-b border-[#26364D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B1220] border border-[#26364D] text-[#60A5FA] text-xs font-medium">
            <User className="w-3.5 h-3.5" />
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
            Engineering Digital Excellence from Frontend to Database
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg">
            I am Prince Undaviya, a dedicated Full Stack Software Engineer with a passion for building scalable, high-performance web applications that solve real-world problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[#0B1220] border border-[#26364D] rounded-2xl p-6 hover:border-[#60A5FA] transition-colors space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1B2A41] border border-[#26364D] flex items-center justify-center text-[#2563EB]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC]">{item.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bio Details Box */}
        <div className="mt-16 bg-[#0B1220] border border-[#26364D] rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#F8FAFC]">Background & Philosophy</h3>
              <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                With a strong foundation in Computer Engineering and extensive hands-on experience in modern JavaScript ecosystems, I bridge the gap between complex backend logic and intuitive, lightning-fast user interfaces.
              </p>
              <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                Every project I build adheres to strict design systems, robust security standards, and comprehensive testing practices to ensure production-grade reliability.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-[#F8FAFC]">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  Clean Code Architecture
                </div>
                <div className="flex items-center gap-2 text-sm text-[#F8FAFC]">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  RESTful API Design
                </div>
                <div className="flex items-center gap-2 text-sm text-[#F8FAFC]">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  MongoDB Integration
                </div>
              </div>
            </div>

            <div className="bg-[#111C2F] border-2 border-[#2563EB] rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#26364D] bg-[#0B1220] flex-shrink-0">
                  <img
                    src={myPhoto}
                    alt="Prince Undaviya - Full Stack Engineer"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="text-base font-bold text-[#F8FAFC]">Prince Undaviya</div>
                  <div className="text-xs text-[#60A5FA]">Full Stack Software Engineer</div>
                  <div className="text-xs text-[#94A3B8] mt-1">MERN Stack Specialist & Architect</div>
                </div>
              </div>
              <div className="space-y-2 font-mono text-xs text-[#94A3B8] pt-2 border-t border-[#26364D]">
                <div className="flex justify-between border-b border-[#26364D] pb-1.5">
                  <span className="text-[#F8FAFC]">Name:</span>
                  <span>Prince Undaviya</span>
                </div>
                <div className="flex justify-between border-b border-[#26364D] pb-1.5">
                  <span className="text-[#F8FAFC]">Role:</span>
                  <span>Full Stack Developer</span>
                </div>
                <div className="flex justify-between border-b border-[#26364D] pb-1.5">
                  <span className="text-[#F8FAFC]">Location:</span>
                  <span>India / Remote</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F8FAFC]">Experience:</span>
                  <span>3+ Years Professional</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
