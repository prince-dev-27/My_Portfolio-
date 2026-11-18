import React from 'react';

export default function SkillIcon({ name, className = "w-8 h-8" }) {
  const n = (name || '').toLowerCase().trim();

  if (n.includes('html')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path fill="#E34F26" d="M3 2l2.2 14.8L12 21l6.8-4.2L21 2H3z"/>
        <path fill="#EF652A" d="M12 4v15.2l5.6-3.4L19.4 5H12z"/>
        <path fill="#FFF" d="M12 8H7.4L7.2 6H17l-.2 2H12zm0 4.8v2l3.4-1 .3-3.8H12v1.8h3.1l-.2 2.2-2.9.8z"/>
      </svg>
    );
  }

  if (n.includes('css')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path fill="#1572B6" d="M3 2l2.2 14.8L12 21l6.8-4.2L21 2H3z"/>
        <path fill="#3392CC" d="M12 4v15.2l5.6-3.4L19.4 5H12z"/>
        <path fill="#FFF" d="M12 8H7.4L7.2 6H17l-.2 2H12zm0 4.8v2l3.4-1 .3-3.8H12v1.8h3.1l-.2 2.2-2.9.8z"/>
      </svg>
    );
  }

  if (n.includes('javascript') || n.includes('js')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" fill="#F7DF1E" rx="4"/>
        <path fill="#000" d="M11.5 15.5c.3.5.7.9 1.4.9.7 0 1.2-.3 1.2-.9 0-.6-.5-.9-1.4-1.3l-.5-.2c-1.2-.5-2-1.2-2-2.6 0-1.3 1-2.3 2.7-2.3 1.1 0 1.9.4 2.4 1.1l-1 1c-.3-.4-.7-.7-1.4-.7-.6 0-1 .3-1 .7 0 .5.4.7 1.1 1l.5.2c1.4.6 2.3 1.3 2.3 2.8 0 1.5-1.1 2.5-2.9 2.5-1.4 0-2.3-.5-2.9-1.3l1-1zM7 9.5h1.8v6.7H7V9.5z"/>
      </svg>
    );
  }

  if (n.includes('typescript') || n.includes('ts')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" fill="#3178C6" rx="4"/>
        <path fill="#FFF" d="M7 14.5c0 .8.3 1.4 1 1.8.6.4 1.4.6 2.3.6 1 0 1.8-.2 2.4-.6.6-.4.9-1 .9-1.8 0-.7-.3-1.3-.9-1.6-.6-.3-1.5-.6-2.7-.9-1.3-.3-2.2-.7-2.7-1.1-.6-.4-.9-1.1-.9-1.9 0-1.2.5-2.1 1.4-2.7.9-.6 2.1-.9 3.6-.9 1.4 0 2.5.3 3.4.9.9.6 1.4 1.4 1.5 2.5h-2c-.1-.7-.4-1.2-1-1.5-.6-.3-1.3-.5-2-.5-.9 0-1.6.2-2.1.5-.5.3-.7.7-.7 1.3 0 .5.2.9.7 1.2.5.3 1.4.6 2.7.9 1.3.3 2.2.7 2.8 1.1.6.4.9 1.1.9 1.9 0 1.3-.5 2.3-1.5 2.9-.9.7-2.2 1-3.8 1-1.6 0-2.9-.3-3.8-1-.9-.7-1.4-1.6-1.5-2.8h2zm10.5-6.5h2.5v9.5h-2.5V8z"/>
      </svg>
    );
  }

  if (n.includes('react')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="3.5" ry="9" transform="rotate(30 12 12)" stroke="#61DAFB" strokeWidth="1.5"/>
        <ellipse cx="12" cy="12" rx="3.5" ry="9" transform="rotate(90 12 12)" stroke="#61DAFB" strokeWidth="1.5"/>
        <ellipse cx="12" cy="12" rx="3.5" ry="9" transform="rotate(150 12 12)" stroke="#61DAFB" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="1.5" fill="#61DAFB"/>
      </svg>
    );
  }

  if (n.includes('tailwind')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path fill="#38BDF8" d="M12 6c-3.3 0-5.3 1.7-6 5 1.3-2 3-2.7 5-2.1 1.1.3 1.9 1.1 2.8 2 .3.3.6.6 1 1 1.7 1.7 4 2.6 7.2.1-1.3 2-3 2.7-5 2.1-1.1-.3-1.9-1.1-2.8-2-.3-.3-.6-.6-1-1-1.7-1.7-4-2.6-7.2-.1zM5 12c-3.3 0-5.3 1.7-6 5 1.3-2 3-2.7 5-2.1 1.1.3 1.9 1.1 2.8 2 .3.3.6.6 1 1 1.7 1.7 4 2.6 7.2.1-1.3 2-3 2.7-5 2.1-1.1-.3-1.9-1.1-2.8-2-.3-.3-.6-.6-1-1-1.7-1.7-4-2.6-7.2-.1z"/>
      </svg>
    );
  }

  if (n.includes('node')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path fill="#5FA04E" d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2zm0 2.3L5 8.2v7.6l7 4 7-4V8.2l-7-3.9z"/>
        <path fill="#5FA04E" d="M10 9.5l4 2.3v4.6l-4-2.3V9.5z"/>
      </svg>
    );
  }

  if (n.includes('express')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#000" stroke="#F8FAFC" strokeWidth="1.5"/>
        <text x="12" y="15.5" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold" fontSize="9" fill="#F8FAFC">ex</text>
      </svg>
    );
  }

  if (n.includes('mongo')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path fill="#47A248" d="M12 2s-4 2.5-4 7.5c0 3.2 2 6 4 10.5 2-4.5 4-7.3 4-10.5C16 4.5 12 2 12 2zm0 13c-1.4 0-2.5-2-2.5-4.5S10.6 6 12 6s2.5 2 2.5 4.5S13.4 15 12 15z"/>
      </svg>
    );
  }

  if (n.includes('postgres')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path fill="#4169E1" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1 15v-3H9v-2h2V9H9V7h2V5h2v2h2v2h-2v2h2v2h-2v3h-2z"/>
      </svg>
    );
  }

  if (n.includes('git')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path fill="#F05032" d="M22 11.5l-10-10c-.4-.4-1-.4-1.4 0l-2.9 2.9 2.5 2.5c.6-.2 1.3 0 1.8.4.5.5.7 1.2.4 1.8l2.4 2.4c.6-.3 1.4-.2 1.8.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.5-.5-.6-1.2-.4-1.8l-2.3-2.3v3.7c.2.3.3.7.3 1.1 0 1.2-1 2.2-2.2 2.2s-2.2-1-2.2-2.2c0-.4.1-.8.3-1.1V12c-.2-.3-.3-.7-.3-1.1 0-.8.5-1.5 1.2-1.9L7.2 6.5 2.5 11.2c-.4.4-.4 1 0 1.4l10 10c.4.4 1 .4 1.4 0l8.1-8.1c.4-.4.4-1 0-1.4z"/>
      </svg>
    );
  }

  if (n.includes('github')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path fill="#F8FAFC" d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2 1.1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 3 1.1.9-.3 1.9-.4 2.9-.4 1 0 2 .1 2.9.4 2.1-1.4 3-1.1 3-1.1.6 1.4.2 2.4.1 2.7.7.7 1.1 1.6 1.1 2.7 0 3.9-2.3 4.7-4.5 5 .4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5C19.1 20.2 22 16.4 22 12c0-5.5-4.5-10-10-10z"/>
      </svg>
    );
  }

  if (n.includes('vercel')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path fill="#F8FAFC" d="M12 2l10 17.3H2L12 2z"/>
      </svg>
    );
  }

  if (n.includes('postman')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path fill="#FF6C37" d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8zm1-13h-2v4H7v2h4v4h2v-4h4v-2h-4z"/>
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
    </svg>
  );
}
