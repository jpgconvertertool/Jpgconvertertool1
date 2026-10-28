import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateAspectRatioFit,
  calculateScaleDimensions,
  formatBytes,
  getOutputJpgFilename,
  isSupportedImageFormat,
  estimateInitialQualityForTargetKB,
  detectRealFileTypeFromBytes
} from './imageConverter.ts';

test('calculateAspectRatioFit preserves aspect ratio within bounds', () => {
  const result = calculateAspectRatioFit(1920, 1080, 800, 600);
  assert.equal(result.width, 800);
  assert.equal(result.height, 450);
});

test('calculateAspectRatioFit does not upscale smaller images', () => {
  const result = calculateAspectRatioFit(400, 300, 1000, 1000);
  assert.equal(result.width, 400);
  assert.equal(result.height, 300);
});

test('calculateScaleDimensions scales down accurately', () => {
  const result = calculateScaleDimensions(1000, 500, 0.5);
  assert.equal(result.width, 500);
  assert.equal(result.height, 250);
});

test('formatBytes formats bytes, KB, and MB accurately', () => {
  assert.equal(formatBytes(0), '0 B');
  assert.equal(formatBytes(512), '512 B');
  assert.equal(formatBytes(1024), '1 KB');
  assert.equal(formatBytes(1024 * 1024 * 2.5), '2.5 MB');
});

test('getOutputJpgFilename strips original extension and appends .jpg', () => {
  assert.equal(getOutputJpgFilename('photo.png'), 'photo.jpg');
  assert.equal(getOutputJpgFilename('document.pdf'), 'document.jpg');
  assert.equal(getOutputJpgFilename('test.image.webp'), 'testimage.jpg');
  assert.equal(getOutputJpgFilename('sample.heic', '_compressed'), 'sample_compressed.jpg');
});

test('isSupportedImageFormat recognizes supported image and document extensions', () => {
  assert.equal(isSupportedImageFormat('test.png'), true);
  assert.equal(isSupportedImageFormat('test.heic'), true);
  assert.equal(isSupportedImageFormat('document.pdf'), true);
  assert.equal(isSupportedImageFormat('camera.cr2'), true);
  assert.equal(isSupportedImageFormat('clip.mp4'), true);
  assert.equal(isSupportedImageFormat('archive.zip'), false);
});

test('estimateInitialQualityForTargetKB produces reasonable compression factors', () => {
  // If target KB is much smaller than current, quality drops
  const highQuality = estimateInitialQualityForTargetKB(100 * 1024, 200); // 100KB file into 200KB target
  assert.equal(highQuality, 0.92);

  const compressedQuality = estimateInitialQualityForTargetKB(1000 * 1024, 50); // 1MB file into 50KB target
  assert.equal(compressedQuality, 0.38);
});

test('detectRealFileTypeFromBytes accurately identifies real file types and distinguishes AVIF from HEIC', () => {
  // JPEG magic bytes: FF D8 FF
  const jpegBytes = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);
  assert.equal(detectRealFileTypeFromBytes(jpegBytes).format, 'jpg');

  // PNG magic bytes
  const pngBytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  assert.equal(detectRealFileTypeFromBytes(pngBytes).format, 'png');

  // WebP magic bytes: RIFF .... WEBP
  const webpBytes = new Uint8Array([0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50]);
  assert.equal(detectRealFileTypeFromBytes(webpBytes).format, 'webp');

  // AVIF ISO BMFF: ....ftypavif
  const avifBytes = new Uint8Array([0, 0, 0, 24, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66]);
  assert.equal(detectRealFileTypeFromBytes(avifBytes).format, 'avif');
  assert.equal(detectRealFileTypeFromBytes(avifBytes).mime, 'image/avif');

  // HEIC ISO BMFF: ....ftypheic
  const heicBytes = new Uint8Array([0, 0, 0, 24, 0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69, 0x63]);
  assert.equal(detectRealFileTypeFromBytes(heicBytes).format, 'heic');
  assert.equal(detectRealFileTypeFromBytes(heicBytes).mime, 'image/heic');
});
