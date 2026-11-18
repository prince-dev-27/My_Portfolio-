import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Select option...',
  label,
  required = false,
  disabled = false,
  searchable = false,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);

  // Normalize options to { value, label }
  const normalizedOptions = options.map(opt =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const filteredOptions = searchable
    ? normalizedOptions.filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : normalizedOptions;

  const selectedOption = normalizedOptions.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev + 1) % filteredOptions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev - 1 + filteredOptions.length) % filteredOptions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions[highlightedIndex]) {
        onChange(filteredOptions[highlightedIndex].value);
        setIsOpen(false);
      }
    }
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-xs uppercase text-[#94A3B8] mb-1 font-semibold">
          {label} {required && <span className="text-[#2563EB]">*</span>}
        </label>
      )}

      <div
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#26364D] text-[#F8FAFC] flex items-center justify-between cursor-pointer focus:outline-none focus:border-[#60A5FA] transition-colors ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#60A5FA]'
        }`}
      >
        <span className={`text-sm truncate ${!selectedOption ? 'text-[#94A3B8]' : 'text-[#F8FAFC]'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-[#94A3B8] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-[#111C2F] border border-[#26364D] rounded-xl shadow-2xl overflow-hidden py-1">
          {searchable && (
            <div className="p-2 border-b border-[#26364D] flex items-center gap-2 bg-[#0B1220]">
              <Search className="w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-xs text-[#F8FAFC] focus:outline-none"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} className="text-[#94A3B8] hover:text-[#F8FAFC]">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isHighlighted = idx === highlightedIndex;
                return (
                  <div
                    key={opt.value}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={`px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#2563EB]/20 text-[#60A5FA] font-medium'
                        : isHighlighted
                        ? 'bg-[#1B2A41] text-[#F8FAFC]'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-3 text-xs text-[#94A3B8] text-center">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
