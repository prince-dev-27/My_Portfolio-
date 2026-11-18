import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { getTestimonials, createTestimonial } from '../services/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', company: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await getTestimonials();
      if (res.data.success) {
        setTestimonials(res.data.data);
      }
    } catch (err) {
      setTestimonials([
        {
          _id: '1',
          name: 'Sarah Jenkins',
          role: 'Engineering Director',
          company: 'TechCorp Solutions',
          content: 'Prince is an exceptional full-stack developer. His deep understanding of React and Node.js architecture combined with his attention to detail resulted in a flawless product launch.'
        },
        {
          _id: '2',
          name: 'David Vance',
          role: 'CTO',
          company: 'Innovate Digital Labs',
          content: 'Working with Prince was a fantastic experience. He delivers clean, maintainable code on time and has great problem-solving skills when tackling complex backend challenges.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await createTestimonial(formData);
      if (res.data.success) {
        setSuccessMsg('Testimonial submitted successfully! Pending admin approval.');
        setFormData({ name: '', role: '', company: '', content: '' });
        setTimeout(() => {
          setShowModal(false);
          setSuccessMsg('');
        }, 3000);
      }
    } catch (err) {
      alert('Failed to submit testimonial.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-[#111C2F] border-t border-b border-[#26364D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B1220] border border-[#26364D] text-[#60A5FA] text-xs font-medium">
            <MessageSquare className="w-3.5 h-3.5" />
            Testimonials & Recommendations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
            What Colleagues Say
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg">
            Feedback from engineering leaders and collaborators who have worked with Prince.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-[#FFFFFF] font-semibold text-sm hover:bg-[#60A5FA] transition-colors"
            >
              Leave a Testimonial
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[#0B1220] border border-[#26364D] rounded-2xl p-8 space-y-6 hover:border-[#60A5FA] transition-colors flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-[#F59E0B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed italic">
                    "{item.content}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-[#26364D]">
                  <div className="w-12 h-12 rounded-full bg-[#1B2A41] border border-[#26364D] flex items-center justify-center text-[#F8FAFC] font-bold text-lg">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#F8FAFC]">{item.name}</h4>
                    <p className="text-xs text-[#60A5FA]">{item.role} at {item.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Testimonial Submission Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0B1220] border border-[#26364D] rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#26364D] pb-4">
              <h3 className="text-xl font-bold text-[#F8FAFC]">Submit a Testimonial</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#94A3B8] hover:text-[#F8FAFC]"
              >
                ✕
              </button>
            </div>

            {successMsg ? (
              <div className="p-4 rounded-xl bg-[#111C2F] border border-[#22C55E] text-[#22C55E] text-center text-sm font-medium">
                {successMsg}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#111C2F] border border-[#26364D] text-[#F8FAFC] focus:outline-none focus:border-[#60A5FA]"
                    placeholder="e.g. Alex Turner"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">Role</label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#111C2F] border border-[#26364D] text-[#F8FAFC] focus:outline-none focus:border-[#60A5FA]"
                      placeholder="e.g. Product Manager"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">Company</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#111C2F] border border-[#26364D] text-[#F8FAFC] focus:outline-none focus:border-[#60A5FA]"
                      placeholder="e.g. Acme Corp"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">Testimonial Content</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#111C2F] border border-[#26364D] text-[#F8FAFC] focus:outline-none focus:border-[#60A5FA]"
                    placeholder="Write your feedback about working with Prince..."
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl bg-[#111C2F] border border-[#26364D] text-[#F8FAFC] text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 rounded-xl bg-[#2563EB] text-[#FFFFFF] font-semibold text-sm hover:bg-[#60A5FA] flex items-center gap-2"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
