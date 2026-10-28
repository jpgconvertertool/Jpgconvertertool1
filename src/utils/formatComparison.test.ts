import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FORMAT_COMPARISON_MATRIX,
  PORTAL_GUIDELINES
} from '../data/formatComparisonData.ts';

test('FORMAT_COMPARISON_MATRIX contains standard web formats with required attributes', () => {
  assert.ok(FORMAT_COMPARISON_MATRIX.length >= 6);
  const jpgRow = FORMAT_COMPARISON_MATRIX.find((r) => r.id === 'jpg');
  assert.ok(jpgRow);
  assert.equal(jpgRow.compressionType, 'Lossy');
  assert.equal(jpgRow.transparency, false);
  assert.ok(jpgRow.compatibility.includes('100% Universal'));

  const pngRow = FORMAT_COMPARISON_MATRIX.find((r) => r.id === 'png');
  assert.ok(pngRow);
  assert.equal(pngRow.transparency, true);
  assert.equal(pngRow.compressionType, 'Lossless');
});

test('PORTAL_GUIDELINES includes UPSC/SSC 50KB and Passport 600x600 px specs', () => {
  assert.ok(PORTAL_GUIDELINES.length >= 4);
  const sscGuideline = PORTAL_GUIDELINES.find((p) => p.id === 'ssc-upsc');
  assert.ok(sscGuideline);
  assert.ok(sscGuideline.sizeLimit.includes('50 KB'));
  assert.equal(sscGuideline.spokeId, 'jpeg-to-jpg');

  const visaGuideline = PORTAL_GUIDELINES.find((p) => p.id === 'us-visa');
  assert.ok(visaGuideline);
  assert.ok(visaGuideline.dimensions?.includes('600 × 600'));
  assert.equal(visaGuideline.spokeId, 'passport-photo-to-jpg');
});
