import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, ExternalLink, Loader2 } from 'lucide-react';
import { getEducation } from '../services/api';

export default function Education() {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      setLoading(true);
      const res = await getEducation();
      if (res.data.success) {
        setEducationList(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load education records:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!loading && educationList.length === 0) {
    return null; // Hide section if no published records exist
  }

  return (
    <section id="education" className="py-24 bg-[#0B1220] border-t border-[#26364D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111C2F] border border-[#26364D] text-[#60A5FA] text-xs font-medium">
            <GraduationCap className="w-3.5 h-3.5" />
            Academic Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
            Education & Qualifications
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg">
            Rigorous academic foundation in computer science, software engineering, and technical problem-solving.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto relative pl-6 sm:pl-8 border-l-2 border-[#26364D] space-y-12">
            {educationList.map((edu, index) => (
              <motion.div
                key={edu._id || index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Node Icon */}
                <div className="absolute -left-[33px] sm:-translate-x-0 sm:-left-[41px] top-1.5 w-10 h-10 rounded-xl bg-[#111C2F] border-2 border-[#2563EB] flex items-center justify-center text-[#2563EB] shadow-md">
                  <GraduationCap className="w-5 h-5" />
                </div>

                <div className="bg-[#111C2F] border border-[#26364D] rounded-2xl p-6 sm:p-8 hover:border-[#60A5FA] transition-colors space-y-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {edu.institutionLogo ? (
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#26364D] bg-[#0B1220] flex-shrink-0">
                          <img src={edu.institutionLogo} alt={edu.institutionName} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-[#1B2A41] border border-[#26364D] flex items-center justify-center text-[#2563EB] flex-shrink-0">
                          <GraduationCap className="w-7 h-7" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-[#F8FAFC]">{edu.degree} in {edu.fieldOfStudy}</h3>
                        <div className="text-sm font-semibold text-[#60A5FA] flex items-center gap-2 mt-0.5">
                          {edu.institutionName}
                          {edu.institutionWebsite && (
                            <a href={edu.institutionWebsite} target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-[#60A5FA]">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {edu.currentlyStudying ? (
                        <span className="px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E] text-[#22C55E] text-xs font-semibold">
                          Currently Studying
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B2A41] border border-[#26364D] text-[#94A3B8] text-xs font-mono">
                          <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
                          {edu.startDate} – {edu.endDate || 'Present'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#94A3B8] pt-1">
                    {edu.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                        {edu.location}
                      </div>
                    )}
                    {edu.gradeValue && (
                      <div className="flex items-center gap-1 font-mono">
                        <Award className="w-3.5 h-3.5 text-[#22C55E]" />
                        {edu.gradeType}: {edu.gradeValue}
                      </div>
                    )}
                  </div>

                  {edu.description && (
                    <p className="text-sm text-[#94A3B8] leading-relaxed pt-2 border-t border-[#26364D]">
                      {edu.description}
                    </p>
                  )}

                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#60A5FA]">Key Achievements & Coursework:</div>
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.map((ach, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-md bg-[#0B1220] border border-[#26364D] text-xs font-mono text-[#F8FAFC]">
                            • {ach}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
