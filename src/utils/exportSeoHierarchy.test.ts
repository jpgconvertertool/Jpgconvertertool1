import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateHierarchyJson,
  generateHierarchyCsv,
  buildHierarchyExportNodes,
  generateHierarchyExportData,
  getTierForCluster
} from './exportSeoHierarchy.ts';
import { KEYWORD_CLUSTERS } from '../data/seoArchitectureData.ts';

test('buildHierarchyExportNodes includes all 26 clusters plus 5 E-E-A-T pages', () => {
  const nodes = buildHierarchyExportNodes(KEYWORD_CLUSTERS);
  assert.equal(nodes.length, KEYWORD_CLUSTERS.length + 5);

  const rootHub = nodes.find((n) => n.clusterId === 'CL-01');
  assert.ok(rootHub);
  assert.equal(rootHub.tier, 'Root Hub');
  assert.equal(rootHub.url, 'https://jpgconvertertool.com/');
  assert.equal(rootHub.primaryKeyword, 'jpg converter');

  const tiffNode = nodes.find((n) => n.clusterId === 'CL-08');
  assert.ok(tiffNode);
  assert.equal(tiffNode.priority, 'P1');
  assert.ok(tiffNode.notes?.includes('379 GSC Impressions'));
});

test('generateHierarchyExportData calculates correct summary metrics', () => {
  const data = generateHierarchyExportData(KEYWORD_CLUSTERS);
  assert.equal(data.summary.totalClusters, KEYWORD_CLUSTERS.length);
  assert.equal(data.summary.totalSpokes, KEYWORD_CLUSTERS.length - 1);
  assert.equal(data.summary.totalTargetKeywords, 246);
  assert.equal(data.summary.preservedGscImpressions, 379);
  assert.equal(data.summary.rootHubUrl, 'https://jpgconvertertool.com/');
});

test('generateHierarchyJson returns valid parseable JSON with expected schema', () => {
  const jsonStr = generateHierarchyJson(KEYWORD_CLUSTERS);
  const parsed = JSON.parse(jsonStr);

  assert.equal(parsed.site, 'https://jpgconvertertool.com');
  assert.equal(parsed.summary.totalClusters, KEYWORD_CLUSTERS.length);
  assert.equal(parsed.summary.totalTargetKeywords, 246);
  assert.ok(Array.isArray(parsed.hierarchy));
  assert.equal(parsed.hierarchy.length, KEYWORD_CLUSTERS.length + 5);
  assert.equal(parsed.hierarchy[0].clusterId, 'CL-01');
});

test('generateHierarchyCsv generates valid RFC-4180 CSV with headers and escaped rows', () => {
  const csvStr = generateHierarchyCsv(KEYWORD_CLUSTERS);
  const lines = csvStr.split('\r\n');

  assert.ok(lines.length >= 27); // header + 26 rows
  assert.ok(lines[0].includes('"Tier"'));
  assert.ok(lines[0].includes('"Canonical URL"'));
  assert.ok(lines[0].includes('"Primary Keyword"'));

  // First row after header should be Root Hub
  const row1 = lines[1];
  assert.ok(row1.includes('"Root Hub"'));
  assert.ok(row1.includes('"CL-01"'));
  assert.ok(row1.includes('"jpg converter"'));
  assert.ok(row1.includes('https://jpgconvertertool.com/'));
});

test('getTierForCluster correctly assigns tiers', () => {
  assert.equal(getTierForCluster(KEYWORD_CLUSTERS[0]), 'Root Hub');
  assert.equal(getTierForCluster(KEYWORD_CLUSTERS[1]), 'Tier 1 Core Spokes (P1)');
  const p2Cluster = KEYWORD_CLUSTERS.find((c) => c.id === 'CL-09');
  assert.ok(p2Cluster);
  assert.equal(getTierForCluster(p2Cluster), 'Tier 2 Secondary Spokes (P2)');
});
