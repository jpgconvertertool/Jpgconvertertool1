/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBatchProgress,
  getProgressStatusText,
  estimateTimeRemainingMs,
  formatTimeRemaining,
  FileProgressItem,
} from './conversionProgress.ts';

test('calculateBatchProgress returns zero metrics for empty queue', () => {
  const result = calculateBatchProgress([]);
  assert.equal(result.total, 0);
  assert.equal(result.percent, 0);
  assert.equal(result.isProcessing, false);
  assert.equal(result.isComplete, false);
});

test('calculateBatchProgress handles multi-file states accurately', () => {
  const items: FileProgressItem[] = [
    { status: 'done', originalSize: 1000, convertedSize: 500 },
    { status: 'done', originalSize: 1000, convertedSize: 400 },
    { status: 'processing', originalSize: 1000 },
    { status: 'pending', originalSize: 1000 },
    { status: 'pending', originalSize: 1000 },
  ];

  const result = calculateBatchProgress(items);
  assert.equal(result.total, 5);
  assert.equal(result.completed, 2);
  assert.equal(result.processing, 1);
  assert.equal(result.pending, 2);
  assert.equal(result.errors, 0);
  // (2 finished + 0.5 processing) / 5 = 2.5/5 = 50%
  assert.equal(result.percent, 50);
  assert.equal(result.isProcessing, true);
  assert.equal(result.isComplete, false);
  assert.equal(result.totalOriginalBytes, 5000);
  assert.equal(result.totalConvertedBytes, 900);
  assert.equal(result.savedBytes, 4100);
});

test('calculateBatchProgress handles 100% completion with savings', () => {
  const items: FileProgressItem[] = [
    { status: 'done', originalSize: 2000, convertedSize: 1000 },
    { status: 'done', originalSize: 2000, convertedSize: 1000 },
  ];

  const result = calculateBatchProgress(items);
  assert.equal(result.total, 2);
  assert.equal(result.completed, 2);
  assert.equal(result.percent, 100);
  assert.equal(result.isComplete, true);
  assert.equal(result.isProcessing, false);
  assert.equal(result.savedPercent, 50);
});

test('calculateBatchProgress accounts for error items', () => {
  const items: FileProgressItem[] = [
    { status: 'done', originalSize: 1000, convertedSize: 500 },
    { status: 'error', originalSize: 1000 },
  ];

  const result = calculateBatchProgress(items);
  assert.equal(result.total, 2);
  assert.equal(result.completed, 1);
  assert.equal(result.errors, 1);
  assert.equal(result.percent, 100);
  assert.equal(result.isComplete, true);
});

test('getProgressStatusText provides descriptive messages for all states', () => {
  const empty = calculateBatchProgress([]);
  assert.equal(getProgressStatusText(empty), 'No files queued');

  const inProgress = calculateBatchProgress([
    { status: 'done' },
    { status: 'processing' },
    { status: 'pending' },
  ]);
  const textWithActive = getProgressStatusText(inProgress, 'photo.png');
  assert.ok(textWithActive.includes('photo.png'));
  assert.ok(textWithActive.includes('2 of 3'));

  const complete = calculateBatchProgress([
    { status: 'done' },
    { status: 'done' },
    { status: 'done' },
  ]);
  assert.equal(getProgressStatusText(complete), 'All 3 files converted successfully (100%)');

  const withErrors = calculateBatchProgress([
    { status: 'done' },
    { status: 'error' },
  ]);
  assert.equal(getProgressStatusText(withErrors), '1 of 2 converted (1 error)');
});

test('estimateTimeRemainingMs and formatTimeRemaining calculate remaining duration', () => {
  // 2 items finished in 2000ms -> 1000ms each, 3 remaining items -> 3000ms
  const ms = estimateTimeRemainingMs(2, 5, 2000);
  assert.equal(ms, 3000);
  assert.equal(formatTimeRemaining(ms), '~3s remaining');

  // Edge cases
  assert.equal(estimateTimeRemainingMs(0, 5, 1000), null);
  assert.equal(estimateTimeRemainingMs(5, 5, 5000), null);
  assert.equal(formatTimeRemaining(null), null);
  assert.equal(formatTimeRemaining(200), null);
  assert.equal(formatTimeRemaining(65000), '~1m 5s remaining');
});
