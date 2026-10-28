import test from 'node:test';
import assert from 'node:assert/strict';
import { FORMAT_SEO_MAP, getFormatSeoMetadata } from '../data/formatSeoDetails.ts';
import { KEYWORD_CLUSTERS, GSC_TOP_QUERIES } from '../data/seoArchitectureData.ts';

test('FORMAT_SEO_MAP covers all 26 tool format spokes with optimized metadata', () => {
  const formatKeys = Object.keys(FORMAT_SEO_MAP);
  assert.ok(formatKeys.length >= 26, `Expected at least 26 formats, got ${formatKeys.length}`);

  for (const [key, seo] of Object.entries(FORMAT_SEO_MAP)) {
    assert.equal(key, seo.id);
    assert.ok(seo.title.length > 20, `Title too short for ${key}`);
    assert.ok(seo.title.length <= 80, `Title too long for ${key}: ${seo.title.length}`);
    assert.ok(seo.description.length >= 80, `Description too short for ${key}`);
    assert.ok(seo.description.length <= 175, `Description too long for ${key}`);
    assert.ok(seo.h1.length > 10, `H1 missing for ${key}`);
    assert.ok(seo.subtitle.length > 20, `Subtitle missing for ${key}`);
    assert.ok(seo.primaryKeyword.length > 2, `Primary keyword missing for ${key}`);
    assert.ok(seo.canonicalUrl.startsWith('https://jpgconvertertool.com'), `Invalid canonical URL for ${key}`);
    assert.ok(Array.isArray(seo.gscQueries) && seo.gscQueries.length > 0, `GSC queries missing for ${key}`);
  }
});

test('High-impression GSC queries are properly mapped to dedicated format spokes', () => {
  // Test top queries from GSC
  const tiffPdf = getFormatSeoMetadata('tiff-to-pdf');
  assert.ok(tiffPdf.gscQueries.includes('tiff to pdf'));
  assert.ok(tiffPdf.title.includes('TIFF to PDF'));

  const jpeg50 = getFormatSeoMetadata('jpeg-to-jpg');
  assert.ok(jpeg50.gscQueries.includes('jpeg to jpg converter under 50 kb'));
  assert.equal(jpeg50.defaultPresetKb, 50);

  const jpgWord = getFormatSeoMetadata('jpg-to-word');
  assert.ok(jpgWord.gscQueries.includes('jpg to word'));
  assert.ok(jpgWord.title.includes('JPG to Word'));

  const wordJpg = getFormatSeoMetadata('word-to-jpg');
  assert.ok(wordJpg.gscQueries.includes('word to jpg'));

  const pngJpg = getFormatSeoMetadata('png-to-jpg');
  assert.ok(pngJpg.gscQueries.includes('png to jpg'));

  // Test new high-priority spokes
  const heicPdf = getFormatSeoMetadata('heic-to-pdf');
  assert.ok(heicPdf.gscQueries.includes('heic to pdf'));

  const pngPdf = getFormatSeoMetadata('png-to-pdf');
  assert.ok(pngPdf.gscQueries.includes('png to pdf'));

  const mergeJpg = getFormatSeoMetadata('merge-jpg');
  assert.ok(mergeJpg.gscQueries.includes('multiple jpg to single jpg converter'));

  const htmlJpg = getFormatSeoMetadata('html-to-jpg');
  assert.ok(htmlJpg.gscQueries.includes('convert html page to jpg'));

  const compressWebp = getFormatSeoMetadata('compress-webp');
  assert.ok(compressWebp.gscQueries.includes('compress webp'));
});

test('getFormatSeoMetadata falls back cleanly to universal for unknown format', () => {
  const fallback = getFormatSeoMetadata('unknown-format-xyz');
  assert.equal(fallback.id, 'universal');
});
