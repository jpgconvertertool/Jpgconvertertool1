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
    title: 'Privacy',
    question: 'Do my files get uploaded or stored anywhere?',
    answer:
      'No. There is no upload step. When you drop a file in, your own browser opens it, converts it and hands the JPG back to you. The file never travels to a server, so there is no copy of it for us to store, lose or delete later. That is why people use it for passport scans, certificates and tax forms.',
    highlights: [
      'Works in your browser, on your device',
      'No server copy is ever made',
      'Fine for ID, tax and medical documents',
    ],
  },
  {
    id: 'supported-formats',
    badge: 'Supported Formats',
    badgeColor: 'bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800',
    icon: Layers,
    title: 'Formats',
    question: 'Which formats can I convert?',
    answer:
      'Most things a phone, camera or scanner produces: PNG, HEIC and HEIF from iPhones, WebP, TIFF scans, PSD files, camera RAW (CR2, NEF, ARW), BMP, JFIF, AVIF, SVG, Word documents (DOCX), multi-page PDFs, and still frames from MP4 or WebM video. One thing worth knowing: JPG has no transparency, so a transparent PNG gets a solid background colour instead. You can pick that colour before you convert.',
    highlights: [
      'Photos: PNG, HEIC, WebP, AVIF, BMP, GIF, JFIF',
      'Documents: PDF, Word (DOCX), TIFF',
      'Camera & design files: HEIC, RAW, PSD',
    ],
  },
  {
    id: 'file-size-limits',
    badge: 'File Size Limits',
    badgeColor: 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    icon: SlidersHorizontal,
    title: 'File size',
    question: 'How do I get a photo under 50KB or 100KB for a form?',
    answer:
      'Pick one of the size buttons (under 30KB, 50KB, 100KB or 150KB) or type your own limit. The converter then saves the JPG again at slightly lower quality, checks the size, and repeats until the file fits. Portals like SSC and UPSC reject anything over 50KB outright, so this saves a round of trial and error. One honest trade-off: the smaller the target, the softer the photo looks, so do not go lower than the form actually asks for.',
    highlights: [
      'Presets for under 50KB and under 100KB',
      'Passport size: 600×600 px',
      'Removing EXIF data also shrinks the file',
    ],
  },
  {
    id: 'ocr-accuracy',
    badge: 'OCR Accuracy',
    badgeColor: 'bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    icon: FileText,
    title: 'Text extraction (OCR)',
    question: 'How does JPG to Word / JPG to Text work?',
    answer:
      'The JPG to Word and JPG to Text tools read the printed text in your image (OCR), rebuild it as paragraphs, and let you copy the text or download an editable Word file. It works best on clear, straight, well-lit scans of printed pages. Blurry phone photos and handwriting will produce mistakes, so give the result a quick read before you rely on it.',
    highlights: [
      'Copy the text, or download a Word (.docx) file',
      'Best on clear scans of printed text',
      'Supports Latin and Cyrillic alphabets',
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
            <span>Common questions</span>
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
