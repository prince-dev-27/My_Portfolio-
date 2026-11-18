import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { getAdminMe } from './services/api';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    verifyAuthOnLoad();
  }, [currentPath]);

  const verifyAuthOnLoad = async () => {
    const token = localStorage.getItem('prince_admin_token');
    if (!token) {
      setIsAdminLoggedIn(false);
      setAdminUser(null);
      setCheckingAuth(false);
      handleRouteGuards(false);
      return;
    }

    try {
      const res = await getAdminMe();
      if (res.data.success) {
        setIsAdminLoggedIn(true);
        setAdminUser(res.data.admin);
        handleRouteGuards(true);
      } else {
        throw new Error('Invalid token');
      }
    } catch (err) {
      localStorage.removeItem('prince_admin_token');
      setIsAdminLoggedIn(false);
      setAdminUser(null);
      handleRouteGuards(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleRouteGuards = (loggedIn) => {
    const path = window.location.pathname;

    if (path === '/admin') {
      const target = loggedIn ? '/admin/dashboard' : '/admin/login';
      window.history.pushState({}, '', target);
      setCurrentPath(target);
    } else if (path.startsWith('/admin') && path !== '/admin/login' && !loggedIn) {
      window.history.pushState({}, '', '/admin/login');
      setCurrentPath('/admin/login');
    } else if (path === '/admin/login' && loggedIn) {
      window.history.pushState({}, '', '/admin/dashboard');
      setCurrentPath('/admin/dashboard');
    }
  };

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const handleLoginSuccess = (admin) => {
    setIsAdminLoggedIn(true);
    setAdminUser(admin);
    navigate('/admin/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('prince_admin_token');
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    navigate('/admin/login');
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0B1220] flex items-center justify-center text-[#94A3B8]">
        Loading Prince Undaviya Portfolio...
      </div>
    );
  }

  // Routing logic for Admin
  if (currentPath.startsWith('/admin')) {
    if (currentPath === '/admin/login') {
      if (isAdminLoggedIn) {
        navigate('/admin/dashboard');
        return null;
      }
      return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
    }
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
      return null;
    }
    const initialTab = currentPath === '/admin/education' ? 'education' : 'projects';
    return (
      <AdminDashboard
        admin={adminUser}
        initialTab={initialTab}
        onLogout={handleLogout}
        onClose={() => navigate('/')}
      />
    );
  }

  // Default: Public Portfolio
  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F8FAFC] selection:bg-[#2563EB] selection:text-[#FFFFFF]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        {/* Temporarily disabled Testimonials section
        <Testimonials />
        */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
