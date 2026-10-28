import test from 'node:test';
import assert from 'node:assert/strict';
import { MASTER_KEYWORD_MAP } from '../data/masterKeywordMap.ts';

test('MASTER_KEYWORD_MAP contains documented queries with required schema', () => {
  assert.ok(MASTER_KEYWORD_MAP.length >= 25, 'Expected at least 25 core GSC mapped queries');

  for (const entry of MASTER_KEYWORD_MAP) {
    assert.ok(entry.query.trim().length > 0, `Query cannot be empty`);
    assert.ok(entry.semanticCluster.trim().length > 0, `Cluster cannot be empty for query "${entry.query}"`);
    assert.ok(entry.targetPage.trim().length > 0, `Target page cannot be empty for query "${entry.query}"`);
    assert.ok(entry.url.startsWith('https://jpgconvertertool.com'), `URL must be canonical: ${entry.url}`);
    assert.ok(['Existing', 'New'].includes(entry.status), `Status must be Existing or New: ${entry.status}`);
    assert.ok(['P1', 'P2', 'P3'].includes(entry.priority), `Priority must be P1, P2, or P3: ${entry.priority}`);
    assert.ok(entry.intentRationale.trim().length > 10, `Intent rationale must be detailed for "${entry.query}"`);
    assert.ok(Array.isArray(entry.internalLinks) && entry.internalLinks.length > 0, `Must specify internal links for "${entry.query}"`);
    for (const link of entry.internalLinks) {
      assert.ok(link.startsWith('/'), `Internal link must be a root-relative path: ${link}`);
    }
  }
});

test('TIFF to PDF preserved queries all map to /tiff-to-pdf without cannibalization', () => {
  const tiffPdfQueries = MASTER_KEYWORD_MAP.filter((e) =>
    e.semanticCluster.includes('TIFF to PDF') && !e.targetPage.includes('Locale')
  );
  assert.ok(tiffPdfQueries.length >= 5, 'Must preserve at least 5 top English TIFF to PDF queries');
  for (const item of tiffPdfQueries) {
    assert.equal(item.url, 'https://jpgconvertertool.com/tiff-to-pdf');
    assert.equal(item.priority, 'P1');
  }
});

test('TIFF to JPG is mapped to /tiff-to-jpg separately from TIFF to PDF', () => {
  const tiffJpg = MASTER_KEYWORD_MAP.find((e) => e.query === 'tif to jpg');
  assert.ok(tiffJpg, 'Must include tif to jpg query');
  assert.equal(tiffJpg.url, 'https://jpgconvertertool.com/tiff-to-jpg');
  assert.notEqual(tiffJpg.url, 'https://jpgconvertertool.com/tiff-to-pdf');
});

test('Word to JPG vs JPG to Word OCR are mapped to distinct URLs', () => {
  const wordToJpg = MASTER_KEYWORD_MAP.find((e) => e.query === 'word to jpg');
  const jpgToWord = MASTER_KEYWORD_MAP.find((e) => e.query === 'jpg to word');
  assert.ok(wordToJpg && jpgToWord);
  assert.equal(wordToJpg.url, 'https://jpgconvertertool.com/word-to-jpg');
  assert.equal(jpgToWord.url, 'https://jpgconvertertool.com/jpg-to-word');
});
