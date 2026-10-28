import React, { useState } from 'react';
import {
  Gauge,
  Zap,
  Check,
  Copy,
  Sliders,
  ShieldCheck,
  Code2,
  TrendingDown,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { getPerformanceAdviceForFormat } from '../utils/performanceTips.ts';

interface PerformanceTipsProps {
  activeFormat: string;
  onApplyRecommended: (settings: {
    quality: number;
    targetKb: number | null;
    stripExif: boolean;
    width?: number;
    height?: number;
  }) => void;
}

export const PerformanceTips: React.FC<PerformanceTipsProps> = ({
  activeFormat,
  onApplyRecommended,
}) => {
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const advice = getPerformanceAdviceForFormat(activeFormat);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(advice.codeSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const handleApply = () => {
    onApplyRecommended({
      quality: advice.recommendedQuality,
      targetKb: advice.recommendedTargetKb,
      stripExif: advice.recommendedStripExif,
      width: advice.recommendedWidth,
      height: advice.recommendedHeight,
    });
  };

  return (
    <section
      aria-label="Core Web Vitals Performance Tips"
      className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0c] shadow-xs overflow-hidden transition-all duration-150"
    >
      {/* Performance Section Header */}
      <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 bg-gradient-to-r from-red-500/5 via-neutral-50/50 to-transparent dark:from-red-500/10 dark:via-neutral-900/40 dark:to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
              <Gauge className="w-4 h-4" />
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-500 dark:text-neutral-400">
                Core Web Vitals Optimization
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/50">
                {advice.formatName}
              </span>
            </div>
          </div>
          <h2 className="text-base sm:text-lg font-black tracking-tight text-neutral-900 dark:text-white">
            {advice.headline}
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handleApply}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer min-h-[36px]"
            title="Automatically tune conversion parameters for best Web Vitals score"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Apply {advice.recommendedPresetLabel}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
            aria-label={isExpanded ? 'Collapse performance tips' : 'Expand performance tips'}
            aria-expanded={isExpanded}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
          {/* Savings Metric Highlights */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 text-xs">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="font-semibold text-neutral-900 dark:text-white">Estimated Impact:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{advice.savingsEstimate}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-neutral-600 dark:text-neutral-400">
              <span className="px-2 py-0.5 rounded bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 font-semibold">
                Quality: {advice.recommendedQuality}%
              </span>
              <span className="px-2 py-0.5 rounded bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 font-semibold">
                Target Cap: {advice.recommendedTargetKb ? `< ${advice.recommendedTargetKb} KB` : 'Lossless'}
              </span>
              <span className="px-2 py-0.5 rounded bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 font-semibold">
                Strip EXIF: {advice.recommendedStripExif ? 'Enabled' : 'Off'}
              </span>
              {advice.recommendedWidth && advice.recommendedHeight && (
                <span className="px-2 py-0.5 rounded bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 font-semibold">
                  Size: {advice.recommendedWidth}×{advice.recommendedHeight}px
                </span>
              )}
            </div>
          </div>

          {/* Core Web Vitals Guidance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {advice.tips.map((tip, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-[#0c0c0e] hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${tip.badgeColor}`}
                    >
                      {tip.vital}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-neutral-500 dark:text-neutral-400">
                      {tip.metricTarget}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white leading-snug">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                    {tip.advice}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Web Implementation Code Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-red-500" />
                <span>Recommended HTML Implementation (Zero CLS &amp; Fast LCP):</span>
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 text-neutral-700 dark:text-neutral-300 font-mono text-[11px] transition-colors cursor-pointer"
              >
                {copiedSnippet ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy HTML</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 rounded-lg bg-neutral-900 text-neutral-100 text-xs font-mono overflow-x-auto leading-relaxed border border-neutral-800">
              <code>{advice.codeSnippet}</code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
};
