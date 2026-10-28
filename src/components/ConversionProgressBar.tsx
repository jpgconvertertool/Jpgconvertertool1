/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  CheckCircle2,
  RefreshCw,
  Clock,
  AlertCircle,
  FileArchive,
  Sparkles,
  Zap
} from 'lucide-react';
import {
  BatchProgressMetrics,
  getProgressStatusText,
  formatTimeRemaining
} from '../utils/conversionProgress.ts';
import { formatBytes } from '../utils/imageConverter.ts';

interface ConversionProgressBarProps {
  metrics: BatchProgressMetrics;
  activeFileName?: string;
  timeRemainingMs?: number | null;
  onDownloadZip?: () => void;
  className?: string;
}

export const ConversionProgressBar: React.FC<ConversionProgressBarProps> = ({
  metrics,
  activeFileName,
  timeRemainingMs = null,
  onDownloadZip,
  className = '',
}) => {
  if (metrics.total === 0) return null;

  const statusText = getProgressStatusText(metrics, activeFileName);
  const timeRemainingStr = formatTimeRemaining(timeRemainingMs);

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
        metrics.isComplete
          ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 shadow-xs'
          : metrics.isProcessing
          ? 'bg-neutral-50 dark:bg-neutral-900/90 border-red-500/40 dark:border-red-500/40 shadow-md ring-1 ring-red-500/10'
          : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'
      } ${className}`}
    >
      {/* Header Row: Title, Percent Badge, Time/Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2 min-w-0">
          {metrics.isComplete ? (
            <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          ) : metrics.isProcessing ? (
            <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center shrink-0 text-red-600 dark:text-red-400">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center shrink-0 text-neutral-600 dark:text-neutral-400">
              <Clock className="w-3.5 h-3.5" />
            </div>
          )}

          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2 truncate">
              <span>{metrics.isComplete ? 'Batch Conversion Complete' : 'Total Conversion Progress'}</span>
              {metrics.isComplete && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  <span>Ready to save</span>
                </span>
              )}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {metrics.isProcessing && timeRemainingStr && (
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
              {timeRemainingStr}
            </span>
          )}

          <span
            className={`font-mono text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-md tabular-nums ${
              metrics.isComplete
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-red-600 text-white shadow-2xs'
            }`}
          >
            {metrics.percent}%
          </span>
        </div>
      </div>

      {/* Progress Track and Bar */}
      <div
        role="progressbar"
        aria-valuenow={metrics.percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Total conversion progress"
        className="w-full bg-neutral-200 dark:bg-neutral-800 h-2.5 sm:h-3 rounded-full overflow-hidden relative"
      >
        <div
          className={`h-full transition-all duration-300 ease-out rounded-full ${
            metrics.isComplete
              ? 'bg-emerald-500'
              : 'bg-gradient-to-r from-red-600 via-rose-500 to-red-500'
          } ${metrics.isProcessing ? 'animate-pulse' : ''}`}
          style={{ width: `${Math.max(metrics.percent > 0 ? 3 : 0, metrics.percent)}%` }}
        />
      </div>

      {/* Detail Footer Row */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <p className="text-neutral-600 dark:text-neutral-400 truncate max-w-sm sm:max-w-md font-medium text-[11px] sm:text-xs">
          {statusText}
        </p>

        {/* Counter Badges */}
        <div className="flex items-center gap-1.5 flex-wrap font-mono text-[11px]">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100/70 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3 h-3" />
            <span>{metrics.completed} Done</span>
          </span>

          {metrics.processing > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100/70 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-semibold">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>{metrics.processing} Active</span>
            </span>
          )}

          {metrics.pending > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-200/70 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium">
              <Clock className="w-3 h-3" />
              <span>{metrics.pending} Queued</span>
            </span>
          )}

          {metrics.errors > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100/70 dark:bg-red-950/40 text-red-700 dark:text-red-400 font-semibold">
              <AlertCircle className="w-3 h-3" />
              <span>{metrics.errors} Failed</span>
            </span>
          )}
        </div>
      </div>

      {/* Completion Bonus Action & Space Saved Callout */}
      {metrics.isComplete && metrics.completed > 1 && (
        <div className="mt-3.5 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/40 flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
            <Zap className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              Total Saved:{' '}
              <strong className="text-neutral-900 dark:text-white font-bold">
                {formatBytes(metrics.savedBytes)}
              </strong>{' '}
              {metrics.savedPercent > 0 && (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  ({metrics.savedPercent}% reduction)
                </span>
              )}
            </span>
          </div>

          {onDownloadZip && (
            <button
              type="button"
              onClick={onDownloadZip}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <FileArchive className="w-3.5 h-3.5" />
              <span>Download All as ZIP</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
