/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FileProgressItem {
  id?: string;
  name?: string;
  status: 'pending' | 'processing' | 'done' | 'error';
  originalSize?: number;
  convertedSize?: number;
}

export interface BatchProgressMetrics {
  total: number;
  completed: number;
  processing: number;
  pending: number;
  errors: number;
  percent: number;
  isProcessing: boolean;
  isComplete: boolean;
  totalOriginalBytes: number;
  totalConvertedBytes: number;
  savedBytes: number;
  savedPercent: number;
}

/**
 * Calculates aggregate progress metrics across a list of file conversion items.
 */
export function calculateBatchProgress(files: FileProgressItem[]): BatchProgressMetrics {
  const total = files.length;
  if (total === 0) {
    return {
      total: 0,
      completed: 0,
      processing: 0,
      pending: 0,
      errors: 0,
      percent: 0,
      isProcessing: false,
      isComplete: false,
      totalOriginalBytes: 0,
      totalConvertedBytes: 0,
      savedBytes: 0,
      savedPercent: 0,
    };
  }

  let completed = 0;
  let processing = 0;
  let pending = 0;
  let errors = 0;
  let totalOriginalBytes = 0;
  let totalConvertedBytes = 0;

  for (const f of files) {
    if (f.status === 'done') completed++;
    else if (f.status === 'processing') processing++;
    else if (f.status === 'error') errors++;
    else pending++;

    if (f.originalSize && f.originalSize > 0) {
      totalOriginalBytes += f.originalSize;
    }
    if (f.convertedSize && f.convertedSize > 0) {
      totalConvertedBytes += f.convertedSize;
    }
  }

  // Done or error are considered finished items towards progress
  const finishedCount = completed + errors;
  // If an item is processing, give it fractional credit (half item)
  const fractionalCredit = processing > 0 ? 0.5 : 0;
  const rawPercent = Math.min(100, Math.round(((finishedCount + fractionalCredit) / total) * 100));
  
  // If not all items are finished, do not show 100%
  const percent = finishedCount === total ? 100 : Math.min(99, rawPercent);
  const isProcessing = processing > 0 || (pending > 0 && finishedCount > 0);
  const isComplete = total > 0 && finishedCount === total;

  const savedBytes = Math.max(0, totalOriginalBytes - totalConvertedBytes);
  const savedPercent =
    totalOriginalBytes > 0 && completed > 0
      ? Math.round((savedBytes / totalOriginalBytes) * 100)
      : 0;

  return {
    total,
    completed,
    processing,
    pending,
    errors,
    percent,
    isProcessing,
    isComplete,
    totalOriginalBytes,
    totalConvertedBytes,
    savedBytes,
    savedPercent,
  };
}

/**
 * Generates user-friendly status text for progress bar UI.
 */
export function getProgressStatusText(
  metrics: BatchProgressMetrics,
  activeFileName?: string
): string {
  if (metrics.total === 0) return 'No files queued';

  if (metrics.isComplete) {
    if (metrics.errors === 0) {
      return metrics.total === 1
        ? 'File converted successfully (100%)'
        : `All ${metrics.total} files converted successfully (100%)`;
    }
    return `${metrics.completed} of ${metrics.total} converted (${metrics.errors} error${metrics.errors > 1 ? 's' : ''})`;
  }

  if (metrics.isProcessing) {
    const currentNumber = metrics.completed + metrics.errors + 1;
    if (activeFileName) {
      return `Converting ${currentNumber} of ${metrics.total}: ${activeFileName} (${metrics.percent}%)`;
    }
    return `Converting ${currentNumber} of ${metrics.total} files (${metrics.percent}%)`;
  }

  return `Ready to convert ${metrics.total} file${metrics.total > 1 ? 's' : ''}`;
}

/**
 * Estimates remaining time in milliseconds given items finished and elapsed time.
 */
export function estimateTimeRemainingMs(
  finishedCount: number,
  totalCount: number,
  elapsedMs: number
): number | null {
  if (finishedCount <= 0 || elapsedMs <= 0 || finishedCount >= totalCount) {
    return null;
  }
  const avgTimePerItem = elapsedMs / finishedCount;
  const remainingItems = totalCount - finishedCount;
  return Math.max(0, Math.round(avgTimePerItem * remainingItems));
}

/**
 * Formats milliseconds remaining into human friendly string (e.g. "~3s remaining").
 */
export function formatTimeRemaining(ms: number | null): string | null {
  if (ms === null || ms < 500) return null;
  const seconds = Math.ceil(ms / 1000);
  if (seconds < 60) {
    return `~${seconds}s remaining`;
  }
  const minutes = Math.floor(seconds / 60);
  const remSec = seconds % 60;
  return `~${minutes}m ${remSec}s remaining`;
}
