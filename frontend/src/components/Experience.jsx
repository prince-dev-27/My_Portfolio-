import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Loader2 } from 'lucide-react';
import { getExperience } from '../services/api';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExp();
  }, []);

  const fetchExp = async () => {
    try {
      setLoading(true);
      const res = await getExperience();
      if (res.data.success) {
        setExperiences(res.data.data);
      }
    } catch (err) {
      setExperiences([
        {
          _id: '1',
          title: 'Senior Full Stack Developer',
          company: 'TechCorp Solutions',
          location: 'Remote',
          period: '2023 - Present',
          description: [
            'Architected and deployed scalable full-stack applications using React, Node.js, and MongoDB.',
            'Optimized database queries and API response times by 40% using indexing and Redis caching.'
          ],
          type: 'Work'
        },
        {
          _id: '2',
          title: 'Full Stack Web Developer',
          company: 'Innovate Digital Labs',
          location: 'Ahmedabad, India',
          period: '2021 - 2023',
          description: [
            'Developed responsive frontend interfaces with React and Tailwind CSS.',
            'Built robust RESTful backend services and integrated secure payment gateways.'
          ],
          type: 'Work'
        },
        {
          _id: '3',
          title: 'Bachelor of Technology in Computer Engineering',
          company: 'Gujarat Technological University',
          location: 'Gujarat, India',
          period: '2017 - 2021',
          description: [
            'Graduated with honors focusing on Software Engineering, Data Structures, and Database Management Systems.'
          ],
          type: 'Education'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="experience" className="py-24 bg-[#0B1220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111C2F] border border-[#26364D] text-[#60A5FA] text-xs font-medium">
            <Briefcase className="w-3.5 h-3.5" />
            Career & Education
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
            Professional Experience
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg">
            My professional journey in software engineering and academic background.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[#111C2F] border border-[#26364D] rounded-2xl p-6 sm:p-8 space-y-4 hover:border-[#60A5FA] transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#26364D] pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#F8FAFC]">{exp.title}</h3>
                    <div className="text-[#60A5FA] font-medium text-sm">{exp.company}</div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 pt-2">
                  {exp.description?.map((point, i) => (
                    <li key={i} className="text-sm text-[#94A3B8] flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
