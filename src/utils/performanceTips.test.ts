import test from 'node:test';
import assert from 'node:assert/strict';
import { getPerformanceAdviceForFormat } from './performanceTips.ts';

test('getPerformanceAdviceForFormat returns universal Core Web Vitals advice by default', () => {
  const advice = getPerformanceAdviceForFormat('universal');
  assert.equal(advice.formatId, 'universal');
  assert.ok(advice.headline.includes('Core Web Vitals'));
  assert.equal(advice.recommendedQuality, 82);
  assert.equal(advice.recommendedTargetKb, 75);
  assert.equal(advice.recommendedStripExif, true);
  assert.ok(advice.tips.length >= 3);
  assert.ok(advice.codeSnippet.includes('<img'));
});

test('getPerformanceAdviceForFormat returns tailored advice for PNG to JPG', () => {
  const advice = getPerformanceAdviceForFormat('png-to-jpg');
  assert.equal(advice.formatId, 'png-to-jpg');
  assert.ok(advice.headline.includes('PNG'));
  assert.equal(advice.recommendedQuality, 82);
  assert.equal(advice.recommendedTargetKb, 60);
  assert.ok(advice.savingsEstimate.includes('reduction vs PNG'));
  const lcpTip = advice.tips.find((t) => t.vital === 'LCP');
  assert.ok(lcpTip);
  assert.ok(lcpTip.advice.includes('24-bit PNGs'));
});

test('getPerformanceAdviceForFormat returns tailored advice for passport-photo-to-jpg with exact 600x600 px dimensions', () => {
  const advice = getPerformanceAdviceForFormat('passport-photo-to-jpg');
  assert.equal(advice.formatId, 'passport-photo-to-jpg');
  assert.equal(advice.recommendedWidth, 600);
  assert.equal(advice.recommendedHeight, 600);
  assert.equal(advice.recommendedQuality, 90);
  const clsTip = advice.tips.find((t) => t.vital === 'CLS');
  assert.ok(clsTip);
  assert.equal(clsTip.metricTarget, 'CLS = 0.0');
});

test('getPerformanceAdviceForFormat returns tailored advice for video-to-jpg with poster frame guidance', () => {
  const advice = getPerformanceAdviceForFormat('video-to-jpg');
  assert.equal(advice.formatId, 'video-to-jpg');
  assert.ok(advice.codeSnippet.includes('<video controls poster='));
  const clsTip = advice.tips.find((t) => t.vital === 'CLS');
  assert.ok(clsTip);
  assert.ok(clsTip.advice.includes('poster'));
});

test('getPerformanceAdviceForFormat handles unknown format gracefully without throwing', () => {
  const advice = getPerformanceAdviceForFormat('custom-unknown-format');
  assert.equal(advice.formatId, 'custom-unknown-format');
  assert.ok(advice.tips.length > 0);
  assert.equal(typeof advice.recommendedQuality, 'number');
});
