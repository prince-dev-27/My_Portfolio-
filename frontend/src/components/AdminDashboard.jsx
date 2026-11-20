import React, { useState, useEffect } from 'react';
import {
  Shield, Code, Cpu, Briefcase, GraduationCap, MessageSquare, Mail, User,
  LogOut, Plus, Trash2, Edit2, Check, X, Loader2, ArrowLeft, Search, Award, Calendar, MapPin, ExternalLink
} from 'lucide-react';
import {
  getProjects, createProject, updateProject, deleteProject,
  getSkills, createSkill, updateSkill, deleteSkill,
  getExperience, createExperience, updateExperience, deleteExperience,
  getEducation, createEducation, updateEducation, deleteEducation,
  getTestimonials, updateTestimonial, deleteTestimonial,
  getMessages, updateMessage, deleteMessage, updateAdminProfile
} from '../services/api';
import SkillIcon from './SkillIcon';
import CustomSelect from './CustomSelect';

export default function AdminDashboard({ admin, initialTab = 'projects', onLogout, onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search filter for education
  const [eduSearch, setEduSearch] = useState('');

  // Modal / Form state for item creation/editing
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'project', 'skill', 'experience', 'education'
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  // Profile update state
  const [profileData, setProfileData] = useState({ name: admin?.name || '', email: admin?.email || '', currentPassword: '', newPassword: '' });
  const [profileMsg, setProfileMsg] = useState('');

  useEffect(() => {
    fetchAllData();
    fetchSkillsList();
  }, [activeTab]);

  const fetchSkillsList = async () => {
    try {
      const res = await getSkills();
      if (res.data.success) {
        setAllSkills(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch skills:', err);
    }
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'projects') {
        const res = await getProjects();
        if (res.data.success) setProjects(res.data.data);
      } else if (activeTab === 'skills') {
        const res = await getSkills();
        if (res.data.success) setSkills(res.data.data);
      } else if (activeTab === 'experience') {
        const res = await getExperience();
        if (res.data.success) setExperiences(res.data.data);
      } else if (activeTab === 'education') {
        const res = await getEducation(true);
        if (res.data.success) setEducationList(res.data.data);
      } else if (activeTab === 'testimonials') {
        const res = await getTestimonials(true);
        if (res.data.success) setTestimonials(res.data.data);
      } else if (activeTab === 'messages') {
        const res = await getMessages();
        if (res.data.success) setMessages(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    try {
      if (type === 'project') await deleteProject(id);
      else if (type === 'skill') await deleteSkill(id);
      else if (type === 'experience') await deleteExperience(id);
      else if (type === 'education') await deleteEducation(id);
      else if (type === 'testimonial') await deleteTestimonial(id);
      else if (type === 'message') await deleteMessage(id);
      fetchAllData();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setEditItem(item);
    setImageFile(null);
    if (item) {
      setFormData(item);
    } else {
      if (type === 'project') {
        setFormData({ title: '', description: '', longDescription: '', category: 'Full Stack', technologies: ['React', 'Node.js', 'MongoDB'], imageUrl: '', githubUrl: '', liveUrl: '' });
      } else if (type === 'skill') {
        setFormData({ name: '', category: 'Frontend Development', icon: 'javascript' });
      } else if (type === 'experience') {
        setFormData({ title: '', company: '', location: 'Remote', period: '2023 - Present', description: [''], type: 'Work' });
      } else if (type === 'education') {
        setFormData({
          institutionName: '',
          degree: '',
          fieldOfStudy: '',
          location: 'India',
          startDate: '2020',
          endDate: '2024',
          currentlyStudying: false,
          gradeType: 'CGPA',
          gradeValue: '',
          description: '',
          achievements: [],
          institutionLogo: '',
          institutionWebsite: '',
          displayOrder: 0,
          isPublished: true
        });
      }
    }
    setShowModal(true);
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'project') {
        const data = new FormData();
        data.append('title', formData.title || '');
        data.append('description', formData.description || '');
        data.append('longDescription', formData.longDescription || '');
        data.append('category', formData.category || 'Full Stack');
        data.append('githubUrl', formData.githubUrl || '');
        data.append('liveUrl', formData.liveUrl || '');
        data.append('featured', formData.featured || false);
        data.append('order', formData.order || 0);
        data.append('technologies', JSON.stringify(formData.technologies || []));
        if (imageFile) {
          data.append('image', imageFile);
        } else if (formData.imageUrl && !formData.imageUrl.startsWith('blob:')) {
          data.append('imageUrl', formData.imageUrl);
        } else if (editItem && !imageFile && formData.imageUrl === '') {
          data.append('imageUrl', '');
        }

        if (editItem) await updateProject(editItem._id, data);
        else await createProject(data);
      } else if (modalType === 'skill') {
        if (editItem) await updateSkill(editItem._id, formData);
        else await createSkill(formData);
      } else if (modalType === 'experience') {
        if (editItem) await updateExperience(editItem._id, formData);
        else await createExperience(formData);
      } else if (modalType === 'education') {
        if (editItem) await updateEducation(editItem._id, formData);
        else await createEducation(formData);
      }
      setShowModal(false);
      fetchAllData();
    } catch (err) {
      alert('Save failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await updateAdminProfile(profileData);
      if (res.data.success) {
        setProfileMsg('Profile updated successfully!');
        setProfileData(prev => ({ ...prev, currentPassword: '', newPassword: '' }));
      }
    } catch (err) {
      setProfileMsg('Failed to update profile: ' + (err.response?.data?.message || err.message));
    }
  };

  const navTabs = [
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'profile', label: 'Admin Profile', icon: User },
  ];

  const filteredEducation = educationList.filter(edu =>
    edu.institutionName?.toLowerCase().includes(eduSearch.toLowerCase()) ||
    edu.degree?.toLowerCase().includes(eduSearch.toLowerCase()) ||
    edu.fieldOfStudy?.toLowerCase().includes(eduSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F8FAFC]">
      {/* Top Navbar */}
      <div className="bg-[#111C2F] border-b border-[#26364D] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 rounded-lg bg-[#0B1220] border border-[#26364D] text-[#94A3B8] hover:text-[#F8FAFC]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-xl bg-[#0B1220] border border-[#26364D] flex items-center justify-center text-[#2563EB]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-[#F8FAFC]">Admin Dashboard</h1>
            <p className="text-xs text-[#94A3B8]">Logged in as {admin?.name || 'Prince Undaviya'}</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#EF4444] text-sm font-medium hover:bg-[#EF4444]/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#26364D] pb-6 mb-8">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors border ${
                  activeTab === tab.id
                    ? 'bg-[#2563EB] text-[#FFFFFF] border-[#2563EB]'
                    : 'bg-[#111C2F] border-[#26364D] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#60A5FA]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
          </div>
        ) : (
          <div>
            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Manage Projects ({projects.length})</h2>
                  <button
                    onClick={() => handleOpenModal('project')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] text-[#FFFFFF] text-sm font-semibold hover:bg-[#60A5FA]"
                  >
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((p) => (
                    <div key={p._id} className="bg-[#111C2F] border border-[#26364D] rounded-2xl p-6 space-y-4">
                      <div className="h-36 rounded-xl overflow-hidden border border-[#26364D]">
                        <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-bold text-lg">{p.title}</h3>
                      <p className="text-xs text-[#94A3B8] line-clamp-2">{p.description}</p>
                      <div className="flex justify-end gap-2 pt-2 border-t border-[#26364D]">
                        <button onClick={() => handleOpenModal('project', p)} className="p-2 rounded-lg bg-[#0B1220] border border-[#26364D] text-[#60A5FA]">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete('project', p._id)} className="p-2 rounded-lg bg-[#0B1220] border border-[#26364D] text-[#EF4444]">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Manage Skills ({skills.length})</h2>
                  <button
                    onClick={() => handleOpenModal('skill')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] text-[#FFFFFF] text-sm font-semibold hover:bg-[#60A5FA]"
                  >
                    <Plus className="w-4 h-4" /> Add Skill
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {skills.map((s) => (
                    <div key={s._id} className="bg-[#111C2F] border border-[#26364D] rounded-2xl p-6 flex flex-col items-center text-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <SkillIcon name={s.icon || s.name} className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#F8FAFC]">{s.name}</h4>
                        <span className="text-xs text-[#60A5FA]">{s.category}</span>
                      </div>
                      <div className="flex gap-2 pt-2 border-t border-[#26364D] w-full justify-end">
                        <button onClick={() => handleOpenModal('skill', s)} className="p-2 rounded-lg bg-[#0B1220] border border-[#26364D] text-[#60A5FA]">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete('skill', s._id)} className="p-2 rounded-lg bg-[#0B1220] border border-[#26364D] text-[#EF4444]">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EXPERIENCE TAB */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Manage Experience ({experiences.length})</h2>
                  <button
                    onClick={() => handleOpenModal('experience')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] text-[#FFFFFF] text-sm font-semibold hover:bg-[#60A5FA]"
                  >
                    <Plus className="w-4 h-4" /> Add Experience
                  </button>
                </div>

                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp._id} className="bg-[#111C2F] border border-[#26364D] rounded-2xl p-6 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg">{exp.title} at {exp.company}</h3>
                        <p className="text-xs text-[#60A5FA]">{exp.period} | {exp.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleOpenModal('experience', exp)} className="p-2 rounded-lg bg-[#0B1220] border border-[#26364D] text-[#60A5FA]">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete('experience', exp._id)} className="p-2 rounded-lg bg-[#0B1220] border border-[#26364D] text-[#EF4444]">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EDUCATION TAB */}
            {activeTab === 'education' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-bold">Education Management ({educationList.length} Records)</h2>
                    <p className="text-xs text-[#94A3B8]">Manage your academic credentials and public portfolio display</p>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#94A3B8]" />
                      <input
                        type="text"
                        placeholder="Search education..."
                        value={eduSearch}
                        onChange={(e) => setEduSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#111C2F] border border-[#26364D] text-xs text-[#F8FAFC] focus:border-[#60A5FA]"
                      />
                    </div>
                    <button
                      onClick={() => handleOpenModal('education')}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] text-[#FFFFFF] text-sm font-semibold hover:bg-[#60A5FA] flex-shrink-0"
                    >
                      <Plus className="w-4 h-4" /> Add Education
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredEducation.map((edu) => (
                    <div key={edu._id} className="bg-[#111C2F] border border-[#26364D] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center gap-4">
                        {edu.institutionLogo ? (
                          <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#26364D] bg-[#0B1220] flex-shrink-0">
                            <img src={edu.institutionLogo} alt={edu.institutionName} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-[#1B2A41] border border-[#26364D] flex items-center justify-center text-[#2563EB] flex-shrink-0">
                            <GraduationCap className="w-6 h-6" />
                          </div>
                        )}
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-base text-[#F8FAFC]">{edu.degree} in {edu.fieldOfStudy}</h3>
                            <button
                              onClick={async () => {
                                await updateEducation(edu._id, { isPublished: !edu.isPublished });
                                fetchAllData();
                              }}
                              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${edu.isPublished ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#22C55E]' : 'bg-[#EF4444]/10 border-[#EF4444] text-[#EF4444]'}`}
                            >
                              {edu.isPublished ? 'Published' : 'Unpublished'}
                            </button>
                          </div>
                          <p className="text-xs text-[#60A5FA] font-medium">{edu.institutionName} • {edu.location}</p>
                          <p className="text-xs text-[#94A3B8]">
                            {edu.currentlyStudying ? 'Currently Studying' : `${edu.startDate} – ${edu.endDate || 'Present'}`} {edu.gradeValue ? `• ${edu.gradeType}: ${edu.gradeValue}` : ''}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-center">
                        <button onClick={() => handleOpenModal('education', edu)} className="p-2 rounded-lg bg-[#0B1220] border border-[#26364D] text-[#60A5FA] hover:bg-[#60A5FA]/10">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete('education', edu._id)} className="p-2 rounded-lg bg-[#0B1220] border border-[#26364D] text-[#EF4444] hover:bg-[#EF4444]/10">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {filteredEducation.length === 0 && (
                    <div className="text-center py-12 text-[#94A3B8] text-sm">No education records found.</div>
                  )}
                </div>
              </div>
            )}

            {/* TESTIMONIALS TAB */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Manage Testimonials ({testimonials.length})</h2>
                <div className="space-y-4">
                  {testimonials.map((t) => (
                    <div key={t._id} className="bg-[#111C2F] border border-[#26364D] rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold">{t.name}</h4>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full border ${t.approved ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#22C55E]' : 'bg-[#F59E0B]/10 border-[#F59E0B] text-[#F59E0B]'}`}>
                            {t.approved ? 'Approved' : 'Pending'}
                          </span>
                        </div>
                        <p className="text-xs text-[#60A5FA]">{t.role} at {t.company}</p>
                        <p className="text-sm text-[#94A3B8] italic">"{t.content}"</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={async () => {
                            await updateTestimonial(t._id, { approved: !t.approved });
                            fetchAllData();
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#0B1220] border border-[#26364D] text-xs font-semibold text-[#22C55E]"
                        >
                          {t.approved ? 'Unapprove' : 'Approve'}
                        </button>
                        <button onClick={() => handleDelete('testimonial', t._id)} className="p-2 rounded-lg bg-[#0B1220] border border-[#26364D] text-[#EF4444]">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MESSAGES TAB */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Contact Messages ({messages.length})</h2>
                <div className="space-y-4">
                  {messages.map((m) => (
                    <div key={m._id} className="bg-[#111C2F] border border-[#26364D] rounded-2xl p-6 space-y-3">
                      <div className="flex justify-between items-center border-b border-[#26364D] pb-3">
                        <div>
                          <h4 className="font-bold text-[#F8FAFC]">{m.name} ({m.email})</h4>
                          <span className="text-xs text-[#60A5FA]">Subject: {m.subject}</span>
                        </div>
                        <button onClick={() => handleDelete('message', m._id)} className="p-2 rounded-lg bg-[#0B1220] border border-[#26364D] text-[#EF4444]">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-[#94A3B8]">{m.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="max-w-xl bg-[#111C2F] border border-[#26364D] rounded-2xl p-8 space-y-6">
                <h2 className="text-xl font-bold">Update Admin Profile</h2>
                {profileMsg && <div className="p-3 rounded-xl bg-[#0B1220] border border-[#22C55E] text-[#22C55E] text-xs">{profileMsg}</div>}
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#94A3B8] uppercase mb-1">Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#94A3B8] uppercase mb-1">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#94A3B8] uppercase mb-1">Current Password (required for password change)</label>
                    <input
                      type="password"
                      value={profileData.currentPassword}
                      onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#94A3B8] uppercase mb-1">New Password</label>
                    <input
                      type="password"
                      value={profileData.newPassword}
                      onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                    />
                  </div>
                  <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-[#FFFFFF] font-semibold text-sm hover:bg-[#60A5FA]">
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111C2F] border border-[#26364D] rounded-2xl max-w-xl w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#26364D] pb-4">
              <h3 className="text-xl font-bold">{editItem ? 'Edit' : 'Add'} {modalType}</h3>
              <button onClick={() => setShowModal(false)} className="text-[#94A3B8]">✕</button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              {modalType === 'project' && (
                <>
                  <div>
                    <label className="block text-xs uppercase text-[#94A3B8] mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                      placeholder="e.g. Enterprise Full Stack Platform"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-[#94A3B8] mb-1">Category</label>
                      <select
                        value={formData.category || 'Full Stack'}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                      >
                        <option value="Full Stack">Full Stack</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Mobile">Mobile</option>
                        <option value="AI / ML">AI / ML</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-[#94A3B8] mb-1">Display Order</label>
                      <input
                        type="number"
                        value={formData.order || 0}
                        onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#94A3B8] mb-1">Short Description *</label>
                    <textarea
                      required
                      rows={2}
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                      placeholder="Brief summary of the application..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#94A3B8] mb-1">Full Description</label>
                    <textarea
                      rows={3}
                      value={formData.longDescription || ''}
                      onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                      placeholder="Detailed architecture and features..."
                    />
                  </div>

                  {/* Direct Image Upload from PC */}
                  <div>
                    <label className="block text-xs uppercase text-[#94A3B8] mb-1">Project Thumbnail / Image</label>

                    {formData.imageUrl ? (
                      <div className="relative rounded-xl overflow-hidden border border-[#26364D] bg-[#0B1220] h-48 mb-2 group">
                        <img src={formData.imageUrl} alt="Project Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <label className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-semibold cursor-pointer hover:bg-[#60A5FA]">
                            Replace Image
                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/jpg, image/webp"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                if (file.size > 5 * 1024 * 1024) {
                                  alert('File size exceeds 5MB limit.');
                                  return;
                                }
                                if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
                                  alert('Unsupported file format. Please upload JPG, PNG, or WEBP.');
                                  return;
                                }
                                setImageFile(file);
                                setFormData({ ...formData, imageUrl: URL.createObjectURL(file) });
                              }}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setFormData({ ...formData, imageUrl: '' });
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#EF4444] text-white text-xs font-semibold hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-[#26364D] rounded-xl p-6 text-center bg-[#0B1220] hover:border-[#60A5FA] transition-colors">
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/jpg, image/webp"
                          id="project-image-upload"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            if (file.size > 5 * 1024 * 1024) {
                              alert('File size exceeds 5MB limit.');
                              return;
                            }
                            if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
                              alert('Unsupported file format. Please upload JPG, PNG, or WEBP.');
                              return;
                            }
                            setImageFile(file);
                            setFormData({ ...formData, imageUrl: URL.createObjectURL(file) });
                          }}
                        />
                        <label htmlFor="project-image-upload" className="cursor-pointer space-y-2 block">
                          <div className="text-sm font-semibold text-[#F8FAFC]">Click to upload image or drag & drop</div>
                          <div className="text-xs text-[#94A3B8]">PNG, JPG, JPEG, WEBP (Max 5MB)</div>
                        </label>
                      </div>
                    )}

                    <div className="mt-2">
                      <input
                        type="text"
                        value={formData.imageUrl || ''}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        placeholder="Or paste image URL here..."
                        className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC] text-xs font-mono"
                      />
                    </div>
                  </div>

                  {/* Multiple Technologies Selection */}
                  <div>
                    <label className="block text-xs uppercase text-[#94A3B8] mb-1">Technologies Used (Select Multiple)</label>

                    <div className="flex flex-wrap gap-2 mb-3 p-3 rounded-xl bg-[#0B1220] border border-[#26364D] min-h-[48px] items-center">
                      {formData.technologies && formData.technologies.length > 0 ? (
                        formData.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1B2A41] border border-[#26364D] text-[#F8FAFC] text-xs font-mono"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  technologies: formData.technologies.filter(t => t !== tech)
                                });
                              }}
                              className="text-[#94A3B8] hover:text-[#EF4444]"
                            >
                              ✕
                            </button>
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-[#94A3B8] italic">No technologies selected. Choose from available skills below:</span>
                      )}
                    </div>

                    <div className="max-h-40 overflow-y-auto p-3 rounded-xl bg-[#0B1220] border border-[#26364D] space-y-2">
                      <div className="text-xs font-semibold text-[#60A5FA] mb-2">Available Skills from Database:</div>
                      <div className="flex flex-wrap gap-2">
                        {allSkills.map((skill) => {
                          const isSelected = formData.technologies?.includes(skill.name);
                          return (
                            <button
                              key={skill._id || skill.name}
                              type="button"
                              onClick={() => {
                                const current = formData.technologies || [];
                                if (isSelected) {
                                  setFormData({
                                    ...formData,
                                    technologies: current.filter(t => t !== skill.name)
                                  });
                                } else {
                                  setFormData({
                                    ...formData,
                                    technologies: [...current, skill.name]
                                  });
                                }
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                                isSelected
                                  ? 'bg-[#2563EB] text-[#FFFFFF] border-[#2563EB]'
                                  : 'bg-[#111C2F] border-[#26364D] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#60A5FA]'
                              }`}
                            >
                              {isSelected ? '✓ ' : '+ '} {skill.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-[#94A3B8] mb-1">GitHub URL</label>
                      <input
                        type="text"
                        value={formData.githubUrl || ''}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-[#94A3B8] mb-1">Live URL</label>
                      <input
                        type="text"
                        value={formData.liveUrl || ''}
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="featured-checkbox"
                      checked={formData.featured || false}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded bg-[#0B1220] border-[#26364D] text-[#2563EB]"
                    />
                    <label htmlFor="featured-checkbox" className="text-sm font-medium text-[#F8FAFC] cursor-pointer">
                      Featured Project (Display prominently)
                    </label>
                  </div>
                </>
              )}

              {modalType === 'skill' && (
                <>
                  <div>
                    <label className="block text-xs uppercase text-[#94A3B8] mb-1">Skill Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-[#94A3B8] mb-1">Category</label>
                    <select
                      value={formData.category || 'Frontend Development'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                    >
                      <option value="Frontend Development">Frontend Development</option>
                      <option value="Backend Development">Backend Development</option>
                      <option value="Database">Database</option>
                      <option value="Development Tools & Platforms">Development Tools & Platforms</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-[#94A3B8] mb-1">Icon Identifier (e.g. html5, react, nodejs)</label>
                    <input
                      type="text"
                      value={formData.icon || ''}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                    />
                  </div>
                </>
              )}

              {modalType === 'experience' && (
                <>
                  <div>
                    <label className="block text-xs uppercase text-[#94A3B8] mb-1">Title / Role</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-[#94A3B8] mb-1">Company / Institution</label>
                    <input
                      type="text"
                      required
                      value={formData.company || ''}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-[#94A3B8] mb-1">Period</label>
                      <input
                        type="text"
                        required
                        value={formData.period || ''}
                        onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-[#94A3B8] mb-1">Location</label>
                      <input
                        type="text"
                        required
                        value={formData.location || ''}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                      />
                    </div>
                  </div>
                </>
              )}

              {modalType === 'education' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-[#94A3B8] mb-1">Institution / College Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.institutionName || ''}
                        onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                        placeholder="e.g. Gujarat Technological University"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-[#94A3B8] mb-1">Location</label>
                      <input
                        type="text"
                        value={formData.location || ''}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                        placeholder="e.g. Ahmedabad, India"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-[#94A3B8] mb-1">Degree / Qualification *</label>
                      <input
                        type="text"
                        required
                        value={formData.degree || ''}
                        onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                        placeholder="e.g. Bachelor of Engineering"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-[#94A3B8] mb-1">Field of Study *</label>
                      <input
                        type="text"
                        required
                        value={formData.fieldOfStudy || ''}
                        onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                        placeholder="e.g. Computer Engineering"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-[#94A3B8] mb-1">Start Date / Year *</label>
                      <input
                        type="text"
                        required
                        value={formData.startDate || ''}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                        placeholder="e.g. 2020"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-[#94A3B8] mb-1">End Date / Year</label>
                      <input
                        type="text"
                        disabled={formData.currentlyStudying}
                        value={formData.currentlyStudying ? '' : (formData.endDate || '')}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC] ${formData.currentlyStudying ? 'opacity-50 cursor-not-allowed' : ''}`}
                        placeholder={formData.currentlyStudying ? 'Currently Studying' : 'e.g. 2024'}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="currently-studying-checkbox"
                      checked={formData.currentlyStudying || false}
                      onChange={(e) => setFormData({ ...formData, currentlyStudying: e.target.checked, endDate: e.target.checked ? '' : formData.endDate })}
                      className="w-4 h-4 rounded bg-[#0B1220] border-[#26364D] text-[#2563EB]"
                    />
                    <label htmlFor="currently-studying-checkbox" className="text-sm font-medium text-[#F8FAFC] cursor-pointer">
                      Currently Studying Here
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-[#94A3B8] mb-1">Grade Type</label>
                      <select
                        value={formData.gradeType || 'CGPA'}
                        onChange={(e) => setFormData({ ...formData, gradeType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                      >
                        <option value="CGPA">CGPA</option>
                        <option value="Percentage">Percentage</option>
                        <option value="Grade">Grade</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-[#94A3B8] mb-1">Grade Value</label>
                      <input
                        type="text"
                        value={formData.gradeValue || ''}
                        onChange={(e) => setFormData({ ...formData, gradeValue: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                        placeholder="e.g. 8.9 / 10 or 92%"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#94A3B8] mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                      placeholder="Relevant coursework, focus areas..."
                    />
                  </div>

                  {/* Institution Logo Upload */}
                  <div>
                    <label className="block text-xs uppercase text-[#94A3B8] mb-1">Institution Logo</label>

                    {formData.institutionLogo ? (
                      <div className="relative rounded-xl overflow-hidden border border-[#26364D] bg-[#0B1220] h-32 mb-2 group">
                        <img src={formData.institutionLogo} alt="Logo Preview" className="w-full h-full object-contain p-2" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <label className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-semibold cursor-pointer hover:bg-[#60A5FA]">
                            Replace Logo
                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/jpg, image/webp"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                if (file.size > 5 * 1024 * 1024) {
                                  alert('File size exceeds 5MB limit.');
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onload = () => {
                                  setFormData({ ...formData, institutionLogo: reader.result });
                                };
                                reader.readAsDataURL(file);
                              }}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, institutionLogo: '' })}
                            className="px-3 py-1.5 rounded-lg bg-[#EF4444] text-white text-xs font-semibold hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-[#26364D] rounded-xl p-4 text-center bg-[#0B1220] hover:border-[#60A5FA] transition-colors">
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/jpg, image/webp"
                          id="edu-logo-upload"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            if (file.size > 5 * 1024 * 1024) {
                              alert('File size exceeds 5MB limit.');
                              return;
                            }
                            const reader = new FileReader();
                            reader.onload = () => {
                              setFormData({ ...formData, institutionLogo: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                        <label htmlFor="edu-logo-upload" className="cursor-pointer space-y-1 block">
                          <div className="text-xs font-semibold text-[#F8FAFC]">Click to upload logo or drag & drop</div>
                          <div className="text-[10px] text-[#94A3B8]">PNG, JPG, WEBP (Max 5MB)</div>
                        </label>
                      </div>
                    )}
                    <input
                      type="text"
                      value={formData.institutionLogo || ''}
                      onChange={(e) => setFormData({ ...formData, institutionLogo: e.target.value })}
                      placeholder="Or paste logo image URL..."
                      className="w-full mt-2 px-3 py-2 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC] text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-[#94A3B8] mb-1">Institution Website URL</label>
                      <input
                        type="text"
                        value={formData.institutionWebsite || ''}
                        onChange={(e) => setFormData({ ...formData, institutionWebsite: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-[#94A3B8] mb-1">Display Order</label>
                      <input
                        type="number"
                        value={formData.displayOrder || 0}
                        onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="is-published-checkbox"
                      checked={formData.isPublished ?? true}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="w-4 h-4 rounded bg-[#0B1220] border-[#26364D] text-[#2563EB]"
                    />
                    <label htmlFor="is-published-checkbox" className="text-sm font-medium text-[#F8FAFC] cursor-pointer">
                      Publish on Public Portfolio
                    </label>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-[#26364D]">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl bg-[#0B1220] border border-[#26364D] text-sm">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-[#2563EB] text-[#FFFFFF] text-sm font-semibold">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
