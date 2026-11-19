import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_URL || '/api';

// Ensures baseURL doesn't have trailing slash and appends '/api' if missing on absolute URLs
const getNormalizedBaseURL = (url) => {
  if (!url) return '/api';
  let clean = url.trim().replace(/\/$/, '');
  if (clean.startsWith('http') && !clean.endsWith('/api')) {
    clean = `${clean}/api`;
  }
  return clean;
};

const API = axios.create({
  baseURL: getNormalizedBaseURL(rawBaseURL),
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('prince_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getProjects = () => API.get('/projects');
export const getProject = (id) => API.get(`/projects/${id}`);
export const createProject = (data) => API.post('/projects', data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

export const getSkills = () => API.get('/skills');
export const createSkill = (data) => API.post('/skills', data);
export const updateSkill = (id, data) => API.put(`/skills/${id}`, data);
export const deleteSkill = (id) => API.delete(`/skills/${id}`);

export const getExperience = () => API.get('/experience');
export const createExperience = (data) => API.post('/experience', data);
export const updateExperience = (id, data) => API.put(`/experience/${id}`, data);
export const deleteExperience = (id) => API.delete(`/experience/${id}`);

export const getEducation = (all = false) => API.get(`/education${all ? '?all=true' : ''}`);
export const createEducation = (data) => API.post('/education', data);
export const updateEducation = (id, data) => API.put(`/education/${id}`, data);
export const deleteEducation = (id) => API.delete(`/education/${id}`);

export const getTestimonials = (all = false) => API.get(`/testimonials${all ? '?all=true' : ''}`);
export const createTestimonial = (data) => API.post('/testimonials', data);
export const updateTestimonial = (id, data) => API.put(`/testimonials/${id}`, data);
export const deleteTestimonial = (id) => API.delete(`/testimonials/${id}`);

export const getMessages = () => API.get('/contact');
export const sendMessage = (data) => API.post('/contact', data);
export const updateMessage = (id, data) => API.put(`/contact/${id}`, data);
export const deleteMessage = (id) => API.delete(`/contact/${id}`);

export const adminLogin = (credentials) => API.post('/auth/login', credentials);
export const getAdminMe = () => API.get('/auth/me');
export const updateAdminProfile = (data) => API.put('/auth/update', data);

export default API;
