import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Loader2 } from 'lucide-react';
import { getSkills } from '../services/api';
import SkillIcon from './SkillIcon';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await getSkills();
      if (res.data.success) {
        setSkills(res.data.data);
      }
    } catch (err) {
      setSkills([
        { name: 'HTML5', category: 'Frontend Development', icon: 'html5' },
        { name: 'CSS3', category: 'Frontend Development', icon: 'css3' },
        { name: 'JavaScript', category: 'Frontend Development', icon: 'javascript' },
        { name: 'TypeScript', category: 'Frontend Development', icon: 'typescript' },
        { name: 'React.js', category: 'Frontend Development', icon: 'react' },
        { name: 'Tailwind CSS', category: 'Frontend Development', icon: 'tailwind' },
        { name: 'Node.js', category: 'Backend Development', icon: 'nodejs' },
        { name: 'Express.js', category: 'Backend Development', icon: 'express' },
        { name: 'MongoDB', category: 'Database', icon: 'mongodb' },
        { name: 'PostgreSQL', category: 'Database', icon: 'postgresql' },
        { name: 'Git', category: 'Development Tools & Platforms', icon: 'git' },
        { name: 'GitHub', category: 'Development Tools & Platforms', icon: 'github' },
        { name: 'Vercel', category: 'Development Tools & Platforms', icon: 'vercel' },
        { name: 'Postman', category: 'Development Tools & Platforms', icon: 'postman' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Frontend Development',
    'Backend Development',
    'Database',
    'Development Tools & Platforms'
  ];

  return (
    <section id="skills" className="py-24 bg-[#0B1220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111C2F] border border-[#26364D] text-[#60A5FA] text-xs font-medium">
            <Cpu className="w-3.5 h-3.5" />
            Technology Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
            Skills & Technologies
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg">
            A comprehensive overview of frontend frameworks, backend engines, databases, and developer tools I utilize.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.map((cat, catIdx) => {
              const catSkills = skills.filter(s => s.category === cat);
              if (catSkills.length === 0) return null;

              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: catIdx * 0.1 }}
                  className="bg-[#111C2F] border border-[#26364D] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl"
                >
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-[#F8FAFC] tracking-wide">{cat}</h3>
                    <div className="w-full h-px bg-[#26364D]" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {catSkills.map((skill, index) => (
                      <motion.div
                        key={skill._id || skill.name}
                        whileHover={{ y: -2 }}
                        className="h-16 px-4 rounded-full bg-[#0B1220] border border-[#26364D] hover:border-[#60A5FA] transition-colors flex items-center justify-between group shadow-sm"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                            <SkillIcon name={skill.icon || skill.name} className="w-7 h-7" />
                          </div>
                          <span className="text-sm font-semibold text-[#F8FAFC] group-hover:text-[#60A5FA] transition-colors">
                            {skill.name}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
