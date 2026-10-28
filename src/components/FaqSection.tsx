import React, { useState } from 'react';
import {
  ChevronDown,
  ShieldCheck,
  Layers,
  SlidersHorizontal,
  FileText,
  CheckCircle2,
  Lock,
  Zap,
  Sparkles
} from 'lucide-react';

interface FaqCard {
  id: string;
  badge: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  question: string;
  answer: string;
  highlights: string[];
}

const FAQ_CARDS: FaqCard[] = [
  {
    id: 'security-privacy',
    badge: 'Security & Privacy',
    badgeColor: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    icon: ShieldCheck,
    title: 'Zero-Upload Privacy Architecture',
    question: 'Are my uploaded files, private photos, or documents stored on any server?',
    answer:
      'No. JPGConverterTool operates on a 100% client-side architecture using HTML5 Canvas and WebAssembly. When you drag and drop files into the converter, all decoding, rasterization, color quantization, and compression happen entirely within your local web browser memory. Your confidential documents, personal photos, and sensitive receipts never leave your device and are never uploaded to remote servers or cloud storage.',
    highlights: [
      '100% In-Browser processing',
      'Zero remote file uploads',
      'No cloud storage or logging',
      'Safe for tax & medical documents',
    ],
  },
  {
    id: 'supported-formats',
    badge: 'Supported Formats',
    badgeColor: 'bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800',
    icon: Layers,
    title: 'Universal Format Interoperability',
    question: 'Which file formats and document types are supported for conversion?',
    answer:
      'Our engine supports bidirectional conversion across all primary raster, camera raw, and document formats: PNG (with solid background fill), Apple HEIC/HEIF Live Photos, modern Google WebP, uncompressed TIFF scans, Adobe Photoshop PSD layers, DSLR camera RAW (CR2, NEF, ARW), BMP, JFIF, AVIF, SVG vectors, Microsoft Word (DOCX), multi-page PDF documents, and timestamped video still frames (MP4, WebM).',
    highlights: [
      'Raster: PNG, WebP, AVIF, BMP, GIF, JFIF',
      'Documents: PDF, Word DOCX, TIFF',
      'Camera & Design: Apple HEIC, DSLR RAW, PSD',
      'Multi-Format batch conversion supported',
    ],
  },
  {
    id: 'file-size-limits',
    badge: 'File Size Limits',
    badgeColor: 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    icon: SlidersHorizontal,
    title: 'Strict Target KB Optimization',
    question: 'How do I compress images to under 50KB or 100KB for official portals?',
    answer:
      'Select our Target Size buttons (< 30KB, < 50KB, < 100KB, < 150KB) or type a custom maximum KB limit. Our iterative quantization engine automatically tests progressive JPEG compression factors in real time directly on your device, ensuring your image strictly respects government, exam (UPSC, SSC), and visa portal size limits without unnecessary visual pixelation.',
    highlights: [
      'Iterative 6-pass quantization check',
      'Strict < 50KB & < 100KB presets',
      'Official 600×600 px passport dimensions',
      'Automatic EXIF stripping for byte reduction',
    ],
  },
  {
    id: 'ocr-accuracy',
    badge: 'OCR Accuracy',
    badgeColor: 'bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    icon: FileText,
    title: 'Client-Side OCR & Text Extraction',
    question: 'How does the in-browser OCR text extraction work for JPG to Word/Text?',
    answer:
      'When converting scanned paperwork, invoices, or book photos via JPG to Word or JPG to Text, our client-side OCR engine analyzes high-contrast printed text characters directly in the browser canvas. It reconstructs paragraphs, headings, and character blocks, allowing you to copy raw text to clipboard or export clean, editable Microsoft Word DOCX files with zero server latency.',
    highlights: [
      'High-contrast font character recognition',
      'Instant copy text to clipboard',
      'Export directly to editable Word (.docx)',
      'Multi-language Latin & Cyrillic character support',
    ],
  },
];

export const FaqSection: React.FC = () => {
  const [openCardId, setOpenCardId] = useState<string | null>('security-privacy');

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_CARDS.map((card) => ({
      '@type': 'Question',
      name: card.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: card.answer,
      },
    })),
  };

  return (
    <section aria-labelledby="faq-section-heading" className="space-y-6 sm:space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>Entity-Badged Knowledge Base</span>
          </div>
          <h2
            id="faq-section-heading"
            className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white"
          >
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500 font-mono">
          4 Core Technical Knowledge Domains
        </p>
      </div>

      {/* 4 Entity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {FAQ_CARDS.map((card) => {
          const Icon = card.icon;
          const isOpen = openCardId === card.id;

          return (
            <div
              key={card.id}
              className={`rounded-xl border transition-all duration-200 p-5 sm:p-6 flex flex-col justify-between bg-white dark:bg-[#0a0a0c] shadow-xs ${
                isOpen
                  ? 'border-red-500/60 dark:border-red-500/50 ring-1 ring-red-500/20'
                  : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${card.badgeColor}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>[{card.badge}]</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenCardId(isOpen ? null : card.id)}
                    className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                    aria-label={`Toggle ${card.title}`}
                    aria-expanded={isOpen}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-red-600 dark:text-red-400' : ''
                      }`}
                    />
                  </button>
                </div>

                <h3
                  onClick={() => setOpenCardId(isOpen ? null : card.id)}
                  className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white cursor-pointer hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  {card.question}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {card.answer}
                </p>
              </div>

              {/* Entity Highlights list */}
              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-850">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                  {card.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
