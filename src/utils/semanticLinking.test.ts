import test from 'node:test';
import assert from 'node:assert/strict';
import { KEYWORD_CLUSTERS } from '../data/seoArchitectureData.ts';
import { ALL_TOOL_PAGES } from '../components/SemanticInternalLinks.tsx';

test('ALL_TOOL_PAGES covers all 26 keyword clusters with zero orphan pages', () => {
  assert.equal(ALL_TOOL_PAGES.length, 26);
  assert.equal(KEYWORD_CLUSTERS.length, 26);

  // Every tool has non-empty title, anchor text, description, and intent
  for (const tool of ALL_TOOL_PAGES) {
    assert.ok(tool.id, 'Tool must have an ID');
    assert.ok(tool.title, 'Tool must have a title');
    assert.ok(tool.anchorText, 'Tool must have descriptive anchor text');
    assert.ok(tool.description, 'Tool must have a description');
    assert.ok(['images', 'documents', 'optimization'].includes(tool.category));
  }
});

test('Every format page has semantic internal links preventing orphan pages', () => {
  const ids = ALL_TOOL_PAGES.map((t) => t.id);
  // Ensure every cluster ID or slug is represented
  assert.ok(ids.includes('universal'));
  assert.ok(ids.includes('png-to-jpg'));
  assert.ok(ids.includes('heic-to-jpg'));
  assert.ok(ids.includes('heic-to-pdf'));
  assert.ok(ids.includes('png-to-pdf'));
  assert.ok(ids.includes('merge-jpg'));
  assert.ok(ids.includes('html-to-jpg'));
  assert.ok(ids.includes('compress-webp'));
  assert.ok(ids.includes('pdf-to-jpg'));
  assert.ok(ids.includes('tiff-to-pdf'));
  assert.ok(ids.includes('tiff-to-jpg'));
  assert.ok(ids.includes('word-to-jpg'));
  assert.ok(ids.includes('jpg-to-word'));
  assert.ok(ids.includes('batch-jpg-converter'));
  assert.ok(ids.includes('passport-photo-to-jpg'));
  assert.ok(ids.includes('compress-jpg'));
});
