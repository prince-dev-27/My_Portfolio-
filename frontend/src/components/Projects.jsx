import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink, Github, Loader2 } from 'lucide-react';
import { getProjects } from '../services/api';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await getProjects();
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      setError('Failed to load projects. Make sure backend is running.');
      // Fallback sample data if API fails
      setProjects([
        {
          _id: '1',
          title: 'Full Stack E-Commerce Platform',
          description: 'Enterprise-grade e-commerce application with secure payment gateway, real-time inventory tracking, and admin analytics dashboard.',
          category: 'Full Stack',
          technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
          imageUrl: 'https://images.unsplash.com/photo-1557821552-1710517667fc?auto=format&fit=crop&w=800&q=80',
          githubUrl: 'https://github.com/princeundaviya/ecommerce-platform',
          liveUrl: 'https://ecommerce-demo.undaviya.dev'
        },
        {
          _id: '2',
          title: 'AI Code Assistant & Reviewer',
          description: 'Intelligent developer tool that analyzes codebases, detects security vulnerabilities, and suggests optimized refactoring patterns.',
          category: 'AI / ML',
          technologies: ['React', 'Python', 'FastAPI', 'MongoDB', 'OpenAI'],
          imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=800&q=80',
          githubUrl: 'https://github.com/princeundaviya/ai-code-reviewer',
          liveUrl: 'https://aireview.undaviya.dev'
        },
        {
          _id: '3',
          title: 'Real-Time Project Management Suite',
          description: 'Collaborative workspace platform featuring Kanban boards, live chat, task dependencies, and automated sprint reporting.',
          category: 'Full Stack',
          technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
          imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
          githubUrl: 'https://github.com/princeundaviya/project-suite',
          liveUrl: 'https://pm.undaviya.dev'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'AI / ML'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-[#0B1220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111C2F] border border-[#26364D] text-[#60A5FA] text-xs font-medium">
            <Code className="w-3.5 h-3.5" />
            Portfolio Projects
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
            Featured Full Stack Applications
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg">
            Explore production-grade applications built with React, Node.js, Express, and MongoDB.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors border ${
                selectedCategory === cat
                  ? 'bg-[#2563EB] text-[#FFFFFF] border-[#2563EB]'
                  : 'bg-[#111C2F] border-[#26364D] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#60A5FA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[#111C2F] border border-[#26364D] rounded-2xl overflow-hidden hover:border-[#60A5FA] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="h-48 overflow-hidden relative border-b border-[#26364D]">
                    <img
                      src={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full bg-[#0B1220]/90 border border-[#26364D] text-[#60A5FA] text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-[#F8FAFC] group-hover:text-[#60A5FA] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#94A3B8] line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies?.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-[#0B1220] border border-[#26364D] text-[#94A3B8] text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-[#26364D] mt-4">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="text-xs font-semibold text-[#60A5FA] hover:underline pt-4"
                  >
                    View Details →
                  </button>

                  <div className="flex items-center gap-3 pt-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#0B1220] border border-[#26364D] text-[#F8FAFC] hover:border-[#60A5FA]"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4 text-[#2563EB]" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#0B1220] border border-[#26364D] text-[#F8FAFC] hover:border-[#60A5FA]"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4 text-[#2563EB]" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
