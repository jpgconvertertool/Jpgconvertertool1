import test from 'node:test';
import assert from 'node:assert/strict';
import { MATRIX_ROUTES, getMatrixRoute } from '../data/matrixRoutesData.ts';

test('MATRIX_ROUTES contains all 15 key routes from Pages.csv and Queries.csv', () => {
  const expectedRoutes = [
    'jpg-to-word',
    'png-to-jpg',
    'jpg-to-text',
    'psd-to-jpg',
    'tiff-to-pdf',
    'compress-webp',
    'heic-to-pdf',
    'merge-jpg',
    'webp-to-png',
    'bmp-to-jpg',
    'jfif-to-jpg',
    'image-to-text',
    'pdf-to-jpg',
    'avif-to-jpg',
    'jpeg-to-jpg',
  ];

  for (const route of expectedRoutes) {
    const found = MATRIX_ROUTES.find((r) => r.id === route);
    assert.ok(found, `Expected route ${route} to be present in MATRIX_ROUTES`);
    assert.ok(found.microLabel.length > 10);
  }
});

test('getMatrixRoute returns correct route and falls back cleanly for unknown route', () => {
  const wordRoute = getMatrixRoute('jpg-to-word');
  assert.equal(wordRoute.id, 'jpg-to-word');
  assert.equal(wordRoute.isOcrRoute, true);

  const fallback = getMatrixRoute('non-existent-route');
  assert.equal(fallback.id, 'universal');
});
