import React, { useState } from 'react';
import { Shield, Lock, User, Loader2, Eye, EyeOff } from 'lucide-react';
import { adminLogin } from '../services/api';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const res = await adminLogin({ username, password });
      if (res.data.success) {
        localStorage.setItem('prince_admin_token', res.data.token);
        onLoginSuccess(res.data.admin);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid administrator credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-4">
      <div className="bg-[#111C2F] border border-[#26364D] rounded-2xl max-w-md w-full p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2 border-b border-[#26364D] pb-6">
          <div className="w-12 h-12 rounded-xl bg-[#0B1220] border border-[#26364D] flex items-center justify-center text-[#2563EB] mx-auto">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#F8FAFC]">Admin Portal</h1>
          <p className="text-xs text-[#94A3B8]">Prince Undaviya — Secure Management Console</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-[#0B1220] border border-[#EF4444] text-[#EF4444] text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">Username or Email</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC] focus:outline-none focus:border-[#60A5FA] text-sm"
                placeholder="Enter username (e.g. prince)"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#94A3B8]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC] focus:outline-none focus:border-[#60A5FA] text-sm"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-[#94A3B8] hover:text-[#F8FAFC]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#2563EB] text-[#FFFFFF] font-semibold text-sm hover:bg-[#60A5FA] transition-colors flex items-center justify-center gap-2 mt-4"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
            Login to Dashboard
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#26364D]">
          <a href="/" className="text-xs text-[#94A3B8] hover:text-[#60A5FA] transition-colors">
            ← Return to Public Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
