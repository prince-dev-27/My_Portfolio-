import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Calendar, Tag } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#111C2F] border border-[#26364D] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-[#26364D] pb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-[#1B2A41] border border-[#26364D] text-[#60A5FA]">
              {project.category}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#0B1220] border border-[#26364D] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#60A5FA] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">{project.title}</h2>

            <div className="rounded-xl overflow-hidden border border-[#26364D] max-h-72">
              <img
                src={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-[#94A3B8] text-base leading-relaxed">
              {project.longDescription || project.description}
            </p>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-[#0B1220] border border-[#26364D] text-[#F8FAFC] text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-[#26364D] pt-6 flex items-center justify-end gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC] text-sm font-medium hover:border-[#60A5FA] transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4 text-[#2563EB]" />
                GitHub Repository
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-xl bg-[#2563EB] text-[#FFFFFF] text-sm font-semibold hover:bg-[#60A5FA] transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
