import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  ChevronDown,
  Check,
  Sun,
  Moon,
  Menu,
  X,
  ShieldCheck,
  Mail,
  Info,
  Image as ImageIcon,
  FileText,
  SlidersHorizontal,
  Layers,
  Sparkles,
  Lock,
  ArrowRight,
  Camera,
  FileCode,
  FileCheck,
  Scissors
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations.ts';
import { useTheme } from '../context/ThemeContext.tsx';
import { PolicyPageType } from './PolicyPages.tsx';

interface HeaderProps {
  activeFormat: string;
  setActiveFormat: (format: string) => void;
  onNavigatePolicy?: (page: PolicyPageType) => void;
  currentLang: string;
  setCurrentLang: (lang: string) => void;
}

interface ToolItem {
  id: string;
  label: string;
  badge?: string;
  desc: string;
}

interface ToolCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  tools: ToolItem[];
}

export const Header: React.FC<HeaderProps> = ({
  activeFormat,
  setActiveFormat,
  onNavigatePolicy,
  currentLang,
  setCurrentLang,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState<'images' | 'documents' | 'utilities'>('images');

  const toolsMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Close popovers on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(target)) {
        setToolsMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(target)) {
        setLangMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setToolsMenuOpen(false);
        setLangMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const languages = [
    { code: 'en', name: 'English (US)', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'da', name: 'Dansk', flag: '🇩🇰' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'nb', name: 'Norsk (Bokmål)', flag: '🇳🇴' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh-tw', name: '繁體中文', flag: '🇹🇼' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  const currentLangObj = languages.find((l) => l.code === currentLang) || languages[0];

  const toolCategories: ToolCategory[] = [
    {
      title: 'Image to JPG',
      icon: ImageIcon,
      tools: [
        { id: 'universal', label: 'Universal (Any to JPG)', desc: 'Convert PNG, WebP, BMP, GIF, AVIF' },
        { id: 'png-to-jpg', label: 'PNG to JPG', badge: 'Popular', desc: 'Transparent photo to clean JPG' },
        { id: 'jpeg-to-jpg', label: 'JPEG to JPG', badge: 'Target KB', desc: 'Under 30KB, 50KB or 100KB' },
        { id: 'heic-to-jpg', label: 'HEIC to JPG', desc: 'Apple iPhone live photos to JPG' },
        { id: 'webp-to-jpg', label: 'WebP to JPG', desc: 'Modern Google WebP images to JPG' },
        { id: 'tiff-to-jpg', label: 'TIFF to JPG', desc: 'High-res scans and photography' },
        { id: 'psd-to-jpg', label: 'PSD to JPG', desc: 'Adobe Photoshop layers to JPG' },
      ],
    },
    {
      title: 'Documents & PDF',
      icon: FileText,
      tools: [
        { id: 'pdf-to-jpg', label: 'PDF to JPG', badge: 'Popular', desc: 'Extract high-res document pages' },
        { id: 'tiff-to-pdf', label: 'TIFF to PDF', desc: 'Multi-page scanner TIFF to PDF' },
        { id: 'png-to-pdf', label: 'PNG to PDF', desc: 'Combine PNG images into a PDF' },
        { id: 'heic-to-pdf', label: 'HEIC to PDF', desc: 'Turn iPhone photos into documents' },
        { id: 'word-to-jpg', label: 'Word to JPG', desc: 'Convert DOCX documents to JPG' },
        { id: 'jpg-to-word', label: 'JPG to Word OCR', desc: 'Extract printed text to editable Word' },
        { id: 'html-to-jpg', label: 'HTML to JPG', desc: 'Render web HTML into crisp JPG' },
      ],
    },
    {
      title: 'Compress & Tools',
      icon: SlidersHorizontal,
      tools: [
        { id: 'compress-jpg', label: 'Compress JPG', badge: 'Fast', desc: 'Reduce file size with zero quality loss' },
        { id: 'compress-webp', label: 'Compress WebP', desc: 'Optimize WebP file sizes' },
        { id: 'passport-photo-to-jpg', label: 'Passport Resizer', badge: 'Official', desc: 'Exact 2x2 inch & official portal size' },
        { id: 'merge-jpg', label: 'Merge Multiple JPGs', desc: 'Combine multiple images side-by-side' },
        { id: 'video-to-jpg', label: 'Video to JPG', desc: 'Extract frame captures from video' },
      ],
    },
  ];

  // Quick navigation shortcuts shown directly on desktop navbar
  const quickLinks = [
    { id: 'png-to-jpg', label: 'PNG to JPG' },
    { id: 'pdf-to-jpg', label: 'PDF to JPG' },
    { id: 'compress-jpg', label: 'Compress' },
    { id: 'passport-photo-to-jpg', label: 'Passport Photo' },
  ];

  const handleSelectTool = (id: string) => {
    setActiveFormat(id);
    setToolsMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0a0a0c]/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 text-neutral-900 dark:text-neutral-100 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          {/* Left Zone: Brand Logo & Wordmark */}
          <div className="flex items-center gap-6 shrink-0">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleSelectTool('universal');
                window.location.hash = `${currentLang}/universal`;
              }}
              className="group flex items-center gap-2.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500 rounded-md"
              aria-label="JPGConverterTool Home"
            >
              <div className="w-8 h-8 rounded-lg bg-red-600 group-hover:bg-red-700 transition-colors flex items-center justify-center text-white font-bold text-sm shadow-xs ring-1 ring-red-500/20">
                <span>J</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-base sm:text-lg leading-tight text-neutral-900 dark:text-white">
                  JPGConverter<span className="text-red-600 dark:text-red-500">Tool</span>
                </span>
                <span className="text-[10px] text-neutral-600 dark:text-neutral-300 font-medium leading-none hidden sm:block">
                  {t.tool.inBrowser || 'Free & 100% In-Browser'}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
              {/* "All Tools" Mega Dropdown Toggle */}
              <div className="relative" ref={toolsMenuRef}>
                <button
                  type="button"
                  onClick={() => setToolsMenuOpen(!toolsMenuOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500 ${
                    toolsMenuOpen
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
                  }`}
                  aria-expanded={toolsMenuOpen}
                  aria-haspopup="true"
                >
                  <Layers className="w-4 h-4 text-red-600 dark:text-red-500" />
                  <span>{t.nav.converter || 'All Converters'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 text-neutral-500 ${
                      toolsMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Mega Menu Dropdown */}
                {toolsMenuOpen && (
                  <div
                    className="absolute left-0 mt-2 w-[720px] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c0c0e] shadow-2xl p-5 z-50 text-neutral-900 dark:text-neutral-100 animate-fadeIn"
                    role="menu"
                  >
                    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-100 dark:border-neutral-800">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-neutral-900 dark:text-white">
                          Select Conversion Tool
                        </span>
                        <span className="text-xs text-neutral-600 dark:text-neutral-300">
                          (100% In-browser · Zero file uploads)
                        </span>
                      </div>
                      <span className="text-xs font-mono text-neutral-500">
                        19 client-side tools
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-5">
                      {toolCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <div key={category.title} className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 px-2 py-1">
                              <Icon className="w-3.5 h-3.5 text-red-600 dark:text-red-500" />
                              <span>{category.title}</span>
                            </div>
                            <div className="space-y-0.5">
                              {category.tools.map((tool) => {
                                const isSelected = activeFormat === tool.id;
                                return (
                                  <button
                                    key={tool.id}
                                    onClick={() => handleSelectTool(tool.id)}
                                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors group flex items-start justify-between gap-1.5 ${
                                      isSelected
                                        ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-semibold'
                                        : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                                    }`}
                                  >
                                    <div className="min-w-0">
                                      <div className="text-xs font-medium flex items-center gap-1.5 truncate">
                                        <span>{tool.label}</span>
                                        {tool.badge && (
                                          <span className="px-1 py-0.2 rounded text-[9px] font-mono uppercase bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                                            {tool.badge}
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-[11px] text-neutral-600 dark:text-neutral-300 truncate font-normal">
                                        {tool.desc}
                                      </div>
                                    </div>
                                    {isSelected && (
                                      <Check className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Top Quick Links directly accessible */}
              {quickLinks.map((link) => {
                const isSelected = activeFormat === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleSelectTool(link.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      isSelected
                        ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold shadow-2xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-850'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Center/Right Trust Tag (Large screens) */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium shrink-0 whitespace-nowrap">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{t.nav.privacyBadge || '100% In-Browser Privacy'}</span>
          </div>

          {/* Right Zone: Informational links & Utility Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick About & Contact Links on Desktop */}
            <div className="hidden md:flex items-center gap-1 border-r border-neutral-200 dark:border-neutral-800 pr-2 mr-1 text-xs font-medium text-neutral-600 dark:text-neutral-400">
              <button
                onClick={() => onNavigatePolicy && onNavigatePolicy('about')}
                className="px-2 py-1.5 rounded hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-850 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => onNavigatePolicy && onNavigatePolicy('privacy')}
                className="px-2 py-1.5 rounded hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-850 transition-colors"
              >
                Privacy
              </button>
              <button
                onClick={() => onNavigatePolicy && onNavigatePolicy('contact')}
                className="px-2 py-1.5 rounded text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center gap-1"
              >
                <Mail className="w-3 h-3" />
                <span>Contact</span>
              </button>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 transition-colors min-h-[36px]"
                aria-label="Select display language"
                aria-expanded={langMenuOpen}
              >
                <Globe className="w-3.5 h-3.5 text-neutral-500" />
                <span className="uppercase font-semibold tracking-wider text-[11px]">
                  {currentLangObj.code}
                </span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {langMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c0c0e] shadow-xl py-1.5 z-50 text-xs max-h-80 overflow-y-auto animate-fadeIn"
                  role="menu"
                >
                  <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-300 border-b border-neutral-100 dark:border-neutral-800 mb-1">
                    Select Language ({languages.length})
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        const currentFmt = activeFormat || 'universal';
                        setLangMenuOpen(false);
                        window.location.hash = `${l.code}/${currentFmt}`;
                        setCurrentLang(l.code);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                        currentLang === l.code
                          ? 'text-red-600 dark:text-red-400 font-semibold bg-red-50/50 dark:bg-red-950/20'
                          : 'text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.name}</span>
                      </span>
                      {currentLang === l.code && (
                        <Check className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Mode Switcher */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700" />
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 min-h-[36px] min-w-[36px] flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-200 dark:border-neutral-800 space-y-4 animate-fadeIn">
            {/* Mobile Tool Categories Tabs - Each tool presented exactly once */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  All Tools Catalog
                </span>
                <div className="flex rounded-md p-0.5 bg-neutral-100 dark:bg-neutral-900 text-xs">
                  <button
                    onClick={() => setMobileActiveCategory('images')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      mobileActiveCategory === 'images'
                        ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-2xs'
                        : 'text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    Images
                  </button>
                  <button
                    onClick={() => setMobileActiveCategory('documents')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      mobileActiveCategory === 'documents'
                        ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-2xs'
                        : 'text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    Documents
                  </button>
                  <button
                    onClick={() => setMobileActiveCategory('utilities')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      mobileActiveCategory === 'utilities'
                        ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-2xs'
                        : 'text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    Utilities
                  </button>
                </div>
              </div>

              {/* Categorized List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-60 overflow-y-auto pr-1">
                {(mobileActiveCategory === 'images'
                  ? toolCategories[0].tools
                  : mobileActiveCategory === 'documents'
                  ? toolCategories[1].tools
                  : toolCategories[2].tools
                ).map((tool) => {
                  const isSelected = activeFormat === tool.id;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => handleSelectTool(tool.id)}
                      className={`w-full text-left p-2 rounded-lg border transition-colors flex items-center justify-between min-h-[40px] ${
                        isSelected
                          ? 'border-red-500 bg-red-50/70 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-semibold'
                          : 'border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50 dark:bg-neutral-900/40 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-850'
                      }`}
                    >
                      <div className="truncate">
                        <div className="text-xs font-medium truncate">{tool.label}</div>
                        <div className="text-[10px] text-neutral-600 dark:text-neutral-300 truncate">{tool.desc}</div>
                      </div>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Language Selector */}
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2 px-1">
                <Globe className="w-3.5 h-3.5 text-neutral-400" />
                <span>Language ({languages.length})</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1 max-h-44 overflow-y-auto p-1 bg-neutral-100/60 dark:bg-neutral-900/60 rounded-lg">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      const currentFmt = activeFormat || 'universal';
                      setMobileMenuOpen(false);
                      window.location.hash = `${l.code}/${currentFmt}`;
                      setCurrentLang(l.code);
                    }}
                    className={`py-1.5 px-2 rounded text-xs font-medium flex items-center justify-between gap-1 transition-colors ${
                      currentLang === l.code
                        ? 'bg-red-600 text-white font-bold shadow-xs'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-750'
                    }`}
                  >
                    <span className="truncate">{l.flag} {l.name.split(' ')[0]}</span>
                    {currentLang === l.code && <Check className="w-3 h-3 text-white shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Footer Links */}
            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-medium px-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero File Uploads: Processed 100% on your device</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 text-xs text-center font-medium">
                <button
                  onClick={() => {
                    onNavigatePolicy && onNavigatePolicy('about');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 px-1 rounded-md bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                >
                  About
                </button>
                <button
                  onClick={() => {
                    onNavigatePolicy && onNavigatePolicy('privacy');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 px-1 rounded-md bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                >
                  Privacy
                </button>
                <button
                  onClick={() => {
                    onNavigatePolicy && onNavigatePolicy('terms');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 px-1 rounded-md bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                >
                  Terms
                </button>
                <button
                  onClick={() => {
                    onNavigatePolicy && onNavigatePolicy('contact');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 px-1 rounded-md bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
