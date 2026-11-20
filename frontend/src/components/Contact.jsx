import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Loader2, CheckCircle2, MapPin, Phone } from 'lucide-react';
import { sendMessage } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: false, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setStatus({ success: false, message: '' });
      const res = await sendMessage(formData);
      if (res.data.success) {
        setStatus({ success: true, message: res.data.message || 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      setStatus({ success: false, message: err.response?.data?.message || 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0B1220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111C2F] border border-[#26364D] text-[#60A5FA] text-xs font-medium">
            <Mail className="w-3.5 h-3.5" />
            Get in Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
            Let's Build Something Together
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg">
            Have a project in mind or want to discuss full-stack opportunities? Drop a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#111C2F] border border-[#26364D] rounded-2xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-[#F8FAFC]">Contact Information</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Feel free to reach out via email, phone, or by submitting the contact form. I respond within 24 hours.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#26364D]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1220] border border-[#26364D] flex items-center justify-center text-[#2563EB]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#94A3B8] uppercase">Email</div>
                    <a href="mailto:princeundaviya@gmail.com" className="text-sm font-medium text-[#F8FAFC] hover:text-[#60A5FA]">
                      princeundaviya@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1220] border border-[#26364D] flex items-center justify-center text-[#2563EB]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#94A3B8] uppercase">Phone</div>
                    <span className="text-sm font-medium text-[#F8FAFC]">+91 96388 40520</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1220] border border-[#26364D] flex items-center justify-center text-[#2563EB]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#94A3B8] uppercase">Location</div>
                    <span className="text-sm font-medium text-[#F8FAFC]">Surat, Gujarat, India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-[#111C2F] border border-[#26364D] rounded-2xl p-8 sm:p-10 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {status.message && (
                  <div className={`p-4 rounded-xl border text-sm font-medium ${
                    status.success ? 'bg-[#0B1220] border-[#22C55E] text-[#22C55E]' : 'bg-[#0B1220] border-[#EF4444] text-[#EF4444]'
                  }`}>
                    {status.message}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC] focus:outline-none focus:border-[#60A5FA] text-sm"
                      placeholder="Prince Undaviya"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC] focus:outline-none focus:border-[#60A5FA] text-sm"
                      placeholder="prince@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC] focus:outline-none focus:border-[#60A5FA] text-sm"
                    placeholder="Project Collaboration / Full Stack Role"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC] focus:outline-none focus:border-[#60A5FA] text-sm"
                    placeholder="Tell me about your project requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-[#2563EB] text-[#FFFFFF] font-semibold text-sm hover:bg-[#60A5FA] transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
