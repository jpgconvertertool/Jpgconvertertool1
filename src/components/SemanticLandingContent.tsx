import React from 'react';
import {
  CheckCircle2,
  SlidersHorizontal,
  Download,
  FileCheck2,
  Table,
  ShieldCheck,
  Zap,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';
import {
  FORMAT_COMPARISON_MATRIX,
  PORTAL_GUIDELINES
} from '../data/formatComparisonData.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface SemanticLandingContentProps {
  onSelectFormat: (formatId: string) => void;
  currentLang?: string;
}

export const SemanticLandingContent: React.FC<SemanticLandingContentProps> = ({
  onSelectFormat,
  currentLang = 'en',
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Convert Any Image or Document to JPG Online',
    description:
      'Step-by-step instructions for converting images, documents, and iPhone photos into high-quality JPG files locally on your device.',
    totalTime: 'PT10S',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Upload Your Files',
        text: 'Drag and drop your images or documents into the upload zone, or click Select Files to Convert from your computer or phone.',
        url: 'https://jpgconvertertool.com/#upload',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Choose Compression and Size Settings',
        text: 'Adjust the image quality slider, pick a target file size cap like under 50KB or 100KB, or select 600x600 px for passport requirements.',
        url: 'https://jpgconvertertool.com/#settings',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Download Your Converted JPGs',
        text: 'Click Download JPG to save individual images or Download All as ZIP to export the complete batch at once.',
        url: 'https://jpgconvertertool.com/#download',
      },
    ],
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* HowTo Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* 1. HOW IT WORKS: 3 SIMPLE STEPS */}
      <section aria-labelledby="how-it-works-heading" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast &amp; Simple Workflow</span>
          </div>
          <h2
            id="how-it-works-heading"
            className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white"
          >
            How to Convert Any File to JPG in 3 Simple Steps
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Processed 100% on your device with zero file uploads or account requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Step 1 */}
          <div className="p-5 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0c] shadow-xs space-y-3 relative overflow-hidden group hover:border-red-500/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center font-mono font-black text-base shadow-xs">
              1
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              1. Add Your Images or Docs
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
              Drag and drop PNG, WebP, HEIC, TIFF, PDF, or RAW files into the converter workspace above, or tap browse to pick files from your device.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-5 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0c] shadow-xs space-y-3 relative overflow-hidden group hover:border-red-500/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-mono font-black text-base shadow-xs">
              2
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              2. Set Size Limits &amp; Quality
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
              Choose your compression quality (default 85%), apply a target file size cap like <span className="font-semibold text-neutral-900 dark:text-white">&lt; 50KB</span> for exam forms, or set passport dimensions.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-5 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0c] shadow-xs space-y-3 relative overflow-hidden group hover:border-red-500/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-mono font-black text-base shadow-xs">
              3
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              3. Download Converted JPGs
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
              Grab individual converted files instantly or click &quot;Download All as ZIP&quot; to export your entire batch with zero waiting in line.
            </p>
          </div>
        </div>
      </section>

      {/* 4 CORE VALUE PILLARS (LOCALIZED) */}
      <section aria-label="Key Benefits" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0c] space-y-1.5 shadow-2xs hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <h4>{t.features.f1Title}</h4>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">{t.features.f1Sub}</p>
        </div>
        <div className="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0c] space-y-1.5 shadow-2xs hover:border-red-500/40 transition-colors">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-sm">
            <Zap className="w-4 h-4 shrink-0" />
            <h4>{t.features.f2Title}</h4>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">{t.features.f2Sub}</p>
        </div>
        <div className="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0c] space-y-1.5 shadow-2xs hover:border-blue-500/40 transition-colors">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
            <Layers className="w-4 h-4 shrink-0" />
            <h4>{t.features.f3Title}</h4>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">{t.features.f3Sub}</p>
        </div>
        <div className="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0c] space-y-1.5 shadow-2xs hover:border-purple-500/40 transition-colors">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm">
            <Sparkles className="w-4 h-4 shrink-0" />
            <h4>{t.features.f4Title}</h4>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">{t.features.f4Sub}</p>
        </div>
      </section>

      {/* 2. TECHNICAL FORMAT COMPARISON MATRIX */}
      <section aria-labelledby="comparison-matrix-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
                <Table className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-500">
                Specifications Comparison
              </span>
            </div>
            <h2
              id="comparison-matrix-heading"
              className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white"
            >
              Image Format Comparison: JPG vs PNG vs WebP vs HEIC
            </h2>
          </div>
          <span className="text-xs text-neutral-500 font-mono">
            Click any format to launch dedicated converter
          </span>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0c] shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/60 font-mono text-[11px] uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                <th className="py-3.5 px-4 font-bold">Format</th>
                <th className="py-3.5 px-4 font-bold">Compression</th>
                <th className="py-3.5 px-4 font-bold">Transparency</th>
                <th className="py-3.5 px-4 font-bold">Best Use Case</th>
                <th className="py-3.5 px-4 font-bold">Browser Compatibility</th>
                <th className="py-3.5 px-4 font-bold">Typical Size</th>
                <th className="py-3.5 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800/80">
              {FORMAT_COMPARISON_MATRIX.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold text-neutral-900 dark:text-white whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span>{row.format}</span>
                      <span className="text-[10px] font-mono text-neutral-400">({row.extension})</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        row.compressionType === 'Lossy'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                          : row.compressionType === 'Lossless'
                          ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                          : 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                      }`}
                    >
                      {row.compressionType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                    {row.transparency ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Yes (Alpha)</span>
                      </span>
                    ) : (
                      <span className="text-neutral-400 font-mono">No (Solid fill)</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400 min-w-[200px]">
                    {row.idealFor}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400 min-w-[200px]">
                    {row.compatibility}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                    {row.typicalSize}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectFormat(row.spokeId);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white text-neutral-800 dark:text-neutral-200 font-semibold transition-colors text-xs cursor-pointer"
                    >
                      <span>Convert</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. TARGET FILE SIZE & PORTAL COMPLIANCE GUIDE */}
      <section aria-labelledby="portal-guide-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <FileCheck2 className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-500">
                Government &amp; Exam Portal Standards
              </span>
            </div>
            <h2
              id="portal-guide-heading"
              className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white"
            >
              Target File Size &amp; Portal Upload Compliance
            </h2>
          </div>
          <p className="text-xs text-neutral-500 font-normal max-w-sm">
            Automated iterative quantization ensures your file strictly respects maximum KB limits without upload rejection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {PORTAL_GUIDELINES.map((guide) => (
            <div
              key={guide.id}
              className="p-5 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0c] shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                      {guide.portalName}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-bold">
                        Limit: {guide.sizeLimit}
                      </span>
                      {guide.dimensions && (
                        <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
                          {guide.dimensions}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {guide.notes}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-2 text-xs">
                <span className="font-mono text-neutral-500 truncate">
                  Preset: {guide.recommendedSetting}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onSelectFormat(guide.spokeId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors shrink-0 shadow-2xs cursor-pointer"
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRIVACY & ARCHITECTURE CREDENTIALS */}
      <section aria-labelledby="privacy-architecture-heading" className="p-6 sm:p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/40 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="privacy-architecture-heading"
            className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white"
          >
            Zero-Upload Architecture: 100% Client-Side Privacy Guarantee
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Unlike traditional online converters that upload your confidential paperwork, personal photos, and sensitive receipts to remote cloud servers, <strong className="text-neutral-900 dark:text-white">JPGConverterTool</strong> executes all image decoding, resizing, color quantization, and JPEG encoding locally inside your device&apos;s web browser. Files never leave your local hardware, guaranteeing zero data exposure, compliance with privacy regulations, and lightning-fast conversion speeds.
        </p>
      </section>
    </div>
  );
};
