/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { Header } from './components/Header.tsx';
import { ConverterTool } from './components/ConverterTool.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { Footer } from './components/Footer.tsx';
import { PolicyPages, PolicyPageType } from './components/PolicyPages.tsx';
import { SemanticLandingContent } from './components/SemanticLandingContent.tsx';
import { TRANSLATIONS } from './data/translations.ts';
import { getFormatSeoMetadata, FORMAT_SEO_MAP } from './data/formatSeoDetails.ts';

function AppContent() {
  const [activeFormat, setActiveFormat] = useState<string>('universal');
  const [currentLang, setCurrentLang] = useState<string>('en');
  const [activePolicyPage, setActivePolicyPage] = useState<PolicyPageType | null>(null);

  const currentLangRef = React.useRef(currentLang);
  currentLangRef.current = currentLang;

  const activeFormatRef = React.useRef(activeFormat);
  activeFormatRef.current = activeFormat;

  const activePolicyPageRef = React.useRef(activePolicyPage);
  activePolicyPageRef.current = activePolicyPage;

  // Handle RTL direction when switching to Arabic
  useEffect(() => {
    const isRtl = TRANSLATIONS[currentLang]?.isRtl || false;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Supported multilingual subpaths
  const KNOWN_LANGUAGES = [
    'en', 'fr', 'de', 'es', 'it', 'nl', 'pt', 'ru', 'da', 'sv', 'nb', 'tr', 'vi', 'th', 'ko', 'zh-tw', 'uk', 'id', 'ja', 'ar'
  ];

  // Synchronize hash / URL parameters and dynamic per-page metadata
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
      const pathParts = window.location.pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean);

      let langCandidate = '';
      let remaining = rawHash;

      // Check pathname prefix first (/fr/, /de/, etc.)
      if (pathParts.length > 0 && KNOWN_LANGUAGES.includes(pathParts[0].toLowerCase())) {
        langCandidate = pathParts[0].toLowerCase();
        remaining = pathParts.slice(1).join('/') || rawHash;
      } else if (rawHash) {
        // Check hash prefix (#fr, #fr/png-to-jpg, etc.)
        const hashParts = rawHash.split('/');
        if (KNOWN_LANGUAGES.includes(hashParts[0].toLowerCase())) {
          langCandidate = hashParts[0].toLowerCase();
          remaining = hashParts.slice(1).join('/');
        }
      }

      const resolvedLang = langCandidate || currentLangRef.current || 'en';
      if (resolvedLang !== currentLangRef.current) {
        setCurrentLang(resolvedLang);
      }

      let pageTitle = 'Free Online JPG Converter - Fast, Private & Easy to Use';
      let pageDesc =
        'Convert photos, documents, and camera files to high-quality JPG directly on your device. 100% private with zero file uploads, fast batch conversion, and custom file size controls.';
      let canonicalUrl = 'https://jpgconvertertool.com/';

      if (['about', 'privacy', 'terms', 'contact', 'cookies'].includes(remaining)) {
        setActivePolicyPage(remaining as PolicyPageType);
        canonicalUrl = `https://jpgconvertertool.com/#${resolvedLang}/${remaining}`;
        // Normalize URL hash consistently to #{lang}/{policy} pattern
        const expectedHash = `${resolvedLang}/${remaining}`;
        if (rawHash !== expectedHash && rawHash !== '') {
          window.history.replaceState(null, '', `#${expectedHash}`);
        }
        if (remaining === 'privacy') {
          pageTitle = 'Privacy Policy | JPGConverterTool';
          pageDesc = 'Learn about our 100% local, zero-upload privacy architecture and our Google AdSense cookie compliance disclosures.';
        } else if (remaining === 'terms') {
          pageTitle = 'Terms of Service | JPGConverterTool';
          pageDesc = 'Terms of service and fair use guidelines for using the free, in-browser JPGConverterTool utility.';
        } else if (remaining === 'about') {
          pageTitle = 'About Us & Our Mission | JPGConverterTool';
          pageDesc = 'Learn about our mission, privacy-first conversion, and how JPGConverterTool works.';
        } else if (remaining === 'contact') {
          pageTitle = 'Contact Us & Customer Support | JPGConverterTool';
          pageDesc = 'Contact our team directly at support.jpgconverter@gmail.com for assistance, feedback, and inquiries.';
        } else if (remaining === 'cookies') {
          pageTitle = 'Cookie Policy & Advertising Choices | JPGConverterTool';
          pageDesc = 'Read our cookie policy and learn how to manage Google AdSense advertising cookies and personalized ad settings.';
        }
      } else {
        setActivePolicyPage(null);
        // Preserve activeFormat if not specified, default to universal
        const targetFormat = remaining && remaining !== 'seo' && remaining !== 'formats'
          ? remaining
          : (activeFormatRef.current || 'universal');
        setActiveFormat(targetFormat);

        // Normalize URL hash consistently to #{lang}/{format} pattern
        const expectedHash = `${resolvedLang}/${targetFormat}`;
        if (rawHash !== expectedHash && rawHash !== '') {
          window.history.replaceState(null, '', `#${expectedHash}`);
        }

        const seo = getFormatSeoMetadata(targetFormat);
        const activeLangData = TRANSLATIONS[resolvedLang] || TRANSLATIONS.en;

        if (resolvedLang !== 'en' && targetFormat === 'universal') {
          pageTitle = `${activeLangData.hero.title} | JPGConverterTool`;
          pageDesc = activeLangData.hero.subtitle;
        } else {
          pageTitle = seo.title;
          pageDesc = seo.description;
        }

        canonicalUrl = `https://jpgconvertertool.com/#${resolvedLang}/${targetFormat}`;
      }

      document.title = pageTitle;

      // Meta Description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', pageDesc);

      // OpenGraph Tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', pageTitle);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', pageDesc);
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

      // Twitter Cards
      const twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) twTitle.setAttribute('content', pageTitle);
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute('content', pageDesc);

      // Canonical link tag
      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', canonicalUrl);
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Primary WebApplication JSON-LD (dynamically reflects the active tool spoke)
  const currentSeo = getFormatSeoMetadata(activeFormat);
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'JPGConverterTool',
    alternateName: 'Free Online JPG Converter & Image Converter Tool',
    url: currentSeo.canonicalUrl,
    description: currentSeo.description,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with HTML5 Canvas / WASM support',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      currentSeo.h1,
      `Specialized tool for ${currentSeo.primaryKeyword}`,
      'Client-side JPG to Word & Text OCR extraction',
      'Target file size limits (under 30KB, 50KB, 100KB, 150KB)',
      '100% in-browser processing with zero file uploads',
      'Batch ZIP download for multiple images',
      'Convert multi-page scanner TIFF into PDF',
      'Apple iPhone HEIC to JPG and PDF document conversion',
      'Photoshop PSD and Camera RAW flattening',
      'WebP to transparent PNG and BMP/JFIF repair',
      '17-language localization with Triple-to-Triple parity',
    ],
  };

  const handleSelectFormat = (formatId: string) => {
    setActivePolicyPage(null);
    setActiveFormat(formatId);
    window.location.hash = `${currentLangRef.current}/${formatId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLanguageChange = (newLang: string) => {
    const currentSpoke = activePolicyPageRef.current || activeFormatRef.current || 'universal';
    setCurrentLang(newLang);
    window.location.hash = `${newLang}/${currentSpoke}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigatePolicy = (p: PolicyPageType) => {
    setActivePolicyPage(p);
    window.location.hash = `${currentLangRef.current}/${p}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setActivePolicyPage(null);
    setActiveFormat('universal');
    window.location.hash = `${currentLangRef.current}/universal`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 selection:bg-red-600 selection:text-white vercel-grid-bg transition-colors duration-150">
      {/* WebApplication Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* Header */}
      <Header
        activeFormat={activePolicyPage || activeFormat}
        setActiveFormat={handleSelectFormat}
        onNavigatePolicy={handleNavigatePolicy}
        currentLang={currentLang}
        setCurrentLang={handleLanguageChange}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-12">
        {activePolicyPage ? (
          <PolicyPages
            page={activePolicyPage}
            onNavigateHome={handleNavigateHome}
            onNavigatePage={handleNavigatePolicy}
          />
        ) : (
          <>
            <ConverterTool
              activeFormat={activeFormat}
              setActiveFormat={handleSelectFormat}
              currentLang={currentLang}
            />
            <SemanticLandingContent
              currentLang={currentLang}
              onSelectFormat={handleSelectFormat}
            />
            <FaqSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        activeFormat={activePolicyPage || activeFormat}
        onSelectLang={handleLanguageChange}
        onSelectFormat={handleSelectFormat}
        onNavigatePolicy={handleNavigatePolicy}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
