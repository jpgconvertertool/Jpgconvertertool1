import React, { useState, useRef, useEffect } from 'react';
import { Globe, ShieldCheck, Mail, Lock, ChevronUp, ChevronDown, Check } from 'lucide-react';
import { PolicyPageType } from './PolicyPages.tsx';

interface FooterProps {
  onSelectFormat: (formatId: string) => void;
  onNavigatePolicy?: (page: PolicyPageType) => void;
  currentLang?: string;
  activeFormat?: string;
  onSelectLang?: (lang: string) => void;
}

const languages = [
  { code: 'en', name: 'English (US)', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'nb', name: 'Norsk', flag: '🇳🇴' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh-tw', name: '繁體中文', flag: '🇹🇼' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export const Footer: React.FC<FooterProps> = ({
  onSelectFormat,
  onNavigatePolicy,
  currentLang = 'en',
  activeFormat = 'universal',
  onSelectLang
}) => {
  const supportEmail = 'support.jpgconverter@gmail.com';
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const currentLangObj = languages.find((l) => l.code === currentLang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <footer className="bg-neutral-100 dark:bg-black text-neutral-600 dark:text-neutral-400 text-xs border-t border-neutral-200 dark:border-neutral-800 pt-12 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand, Mission & Official Support Contact */}
          <div className="space-y-3 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold text-sm tracking-tight">
              <span className="w-5 h-5 rounded-sm bg-red-600 flex items-center justify-center text-white font-mono font-black text-xs">J</span>
              <span>JPGConverter<span className="text-red-500">Tool</span></span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed font-normal">
              Fast, completely private image and document conversion directly on your device. Free, unlimited batch processing with zero file uploads or account requirements.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Private · Zero File Uploads</span>
            </div>
            {/* Official Support Contact Email */}
            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-neutral-400 block tracking-wider">Official Support</span>
              <a
                href={`mailto:${supportEmail}`}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-900 dark:text-neutral-200 hover:text-red-600 dark:hover:text-red-400 font-mono font-medium transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-red-500" />
                <span>{supportEmail}</span>
              </a>
            </div>
          </div>

          {/* Column 1: Popular Image Converters */}
          <div>
            <h4 className="text-neutral-900 dark:text-neutral-200 font-mono text-[11px] uppercase tracking-wider mb-3 font-semibold">
              Image Converters
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'png-to-jpg', label: 'PNG to JPG' },
                { id: 'webp-to-jpg', label: 'WebP to JPG' },
                { id: 'heic-to-jpg', label: 'Apple HEIC to JPG' },
                { id: 'avif-to-jpg', label: 'AVIF to JPG' },
                { id: 'raw-to-jpg', label: 'Camera RAW to JPG' },
                { id: 'psd-to-jpg', label: 'Photoshop PSD to JPG' },
                { id: 'svg-to-jpg', label: 'Vector SVG to JPG' },
                { id: 'jfif-to-jpg', label: 'JFIF to JPG' },
                { id: 'jpf-to-jpg', label: 'JPF to JPG' },
              ].map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => {
                      onSelectFormat(s.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-red-600 dark:hover:text-white transition-colors text-left"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Documents & Media Converters */}
          <div>
            <h4 className="text-neutral-900 dark:text-neutral-200 font-mono text-[11px] uppercase tracking-wider mb-3 font-semibold">
              Documents &amp; Media
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'pdf-to-jpg', label: 'PDF to JPG Pages' },
                { id: 'tiff-to-pdf', label: 'TIFF to PDF Document' },
                { id: 'heic-to-pdf', label: 'HEIC to PDF Document' },
                { id: 'png-to-pdf', label: 'PNG to PDF Document' },
                { id: 'html-to-jpg', label: 'HTML to JPG Snapshot' },
                { id: 'tiff-to-jpg', label: 'TIFF to JPG Image' },
                { id: 'word-to-jpg', label: 'Word DOCX to JPG' },
                { id: 'jpg-to-word', label: 'JPG to Word OCR' },
                { id: 'video-to-jpg', label: 'Video Frame to JPG' },
              ].map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => {
                      onSelectFormat(s.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-red-600 dark:hover:text-white transition-colors text-left"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Optimization & Trust Pages */}
          <div>
            <h4 className="text-neutral-900 dark:text-neutral-200 font-mono text-[11px] uppercase tracking-wider mb-3 font-semibold">
              File Size &amp; Photo Tools
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'jpeg-to-jpg', label: 'Compress JPG to Under 50KB' },
                { id: 'compress-jpg', label: 'Compress JPG' },
                { id: 'compress-webp', label: 'Compress WebP' },
                { id: 'merge-jpg', label: 'Merge Multiple JPGs' },
                { id: 'passport-photo-to-jpg', label: 'Passport & Visa Photo Resizer' },
                { id: 'batch-jpg-converter', label: 'Batch JPG Converter' },
                { id: 'whatsapp-image-to-jpg', label: 'WhatsApp Media to JPG' },
              ].map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => {
                      onSelectFormat(s.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-red-600 dark:hover:text-white transition-colors text-left"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Language Dropdown Switcher */}
            <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 relative" ref={langMenuRef}>
              <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] mb-2">
                <Globe className="w-3.5 h-3.5 text-neutral-500" />
                <span>Language</span>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={langMenuOpen}
                  aria-label="Select display language"
                  className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer"
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className="text-sm">{currentLangObj.flag}</span>
                    <span className="font-medium truncate">{currentLangObj.name}</span>
                  </span>
                  {langMenuOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  )}
                </button>

                {langMenuOpen && (
                  <div
                    role="listbox"
                    aria-label="Available languages"
                    className="absolute bottom-full mb-1.5 left-0 w-full sm:w-64 max-h-64 overflow-y-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c0c0e] shadow-2xl py-1.5 z-50 text-xs animate-fadeIn"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-500 border-b border-neutral-100 dark:border-neutral-800 mb-1 flex items-center justify-between">
                      <span>Select Language</span>
                      <span className="text-neutral-400 font-normal">({languages.length})</span>
                    </div>
                    {languages.map((l) => {
                      const isSelected = currentLang === l.code;
                      return (
                        <button
                          key={l.code}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            const currentFmt = activeFormat || 'universal';
                            setLangMenuOpen(false);
                            window.location.hash = `${l.code}/${currentFmt}`;
                            onSelectLang && onSelectLang(l.code);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-left transition-colors cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800/80 ${
                            isSelected
                              ? 'text-red-600 dark:text-red-400 font-semibold bg-red-50/70 dark:bg-red-950/30'
                              : 'text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          <span className="flex items-center gap-2.5 truncate">
                            <span className="text-sm">{l.flag}</span>
                            <span className="truncate">{l.name}</span>
                          </span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0 ml-1.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* User-Friendly Bottom Bar with Mandatory AdSense Compliance Links */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1 sm:gap-2 text-neutral-500">
            <span>© 2026 JPGConverterTool. All rights reserved.</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>
              Developed by the{' '}
              <a
                href="https://www.linkedin.com/in/wordpress-seo-specialist-abhi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400 underline underline-offset-2 transition-colors font-medium"
              >
                developer
              </a>
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs text-neutral-600 dark:text-neutral-400">
            <button
              onClick={() => onNavigatePolicy && onNavigatePolicy('about')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              About
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigatePolicy && onNavigatePolicy('privacy')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Privacy
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigatePolicy && onNavigatePolicy('terms')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Terms
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigatePolicy && onNavigatePolicy('cookies')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Cookies
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigatePolicy && onNavigatePolicy('contact')}
              className="hover:text-red-600 dark:text-red-400 font-medium transition-colors flex items-center gap-1"
            >
              <Mail className="w-3 h-3" />
              <span>Contact</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
