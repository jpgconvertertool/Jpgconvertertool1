import { KEYWORD_CLUSTERS, KeywordCluster } from '../data/seoArchitectureData.ts';

export interface HierarchyExportNode {
  tier: string;
  clusterId: string;
  name: string;
  url: string;
  priority: string;
  primaryKeyword: string;
  keywordsCount: number;
  searchIntent: string;
  pageType: string;
  volumeTier: string;
  kd: string;
  supportingKeywords: string[];
  features: string[];
  notes?: string;
}

export interface HierarchyExportData {
  site: string;
  title: string;
  exportedAt: string;
  summary: {
    totalClusters: number;
    totalSpokes: number;
    totalTargetKeywords: number;
    preservedGscImpressions: number;
    rootHubUrl: string;
  };
  hierarchy: HierarchyExportNode[];
}

export const TRUST_EEAT_PAGES: HierarchyExportNode[] = [
  {
    tier: 'Trust & Methodology (E-E-A-T)',
    clusterId: 'E-01',
    name: 'About JPGConverterTool & Engineering Team',
    url: 'https://jpgconvertertool.com/about',
    priority: 'P2',
    primaryKeyword: 'most visited online tools 2026',
    keywordsCount: 1,
    searchIntent: 'Informational',
    pageType: 'Authority & Methodology',
    volumeTier: '>10k / mo',
    kd: 'Low',
    supportingKeywords: ['about jpgconvertertool', 'online image converter team'],
    features: ['Team profiles', 'Architecture breakdown', 'Browser privacy audit', 'Tech stack specs'],
    notes: 'Preserves top authority ranking (Pos 2.0)'
  },
  {
    tier: 'Trust & Methodology (E-E-A-T)',
    clusterId: 'E-02',
    name: 'Technical Conversion Methodology',
    url: 'https://jpgconvertertool.com/methodology',
    priority: 'P3',
    primaryKeyword: 'client side image conversion methodology',
    keywordsCount: 1,
    searchIntent: 'Informational',
    pageType: 'Technical Whitepaper',
    volumeTier: 'Niche',
    kd: 'Low',
    supportingKeywords: ['in-browser canvas processing', 'client side privacy'],
    features: ['HTML5 Canvas rendering engine', 'WebAssembly decompression', 'Zero data transmission guarantee'],
    notes: 'Evidence for E-E-A-T algorithmic trust'
  },
  {
    tier: 'Trust & Methodology (E-E-A-T)',
    clusterId: 'E-03',
    name: 'Zero-Retention Privacy Policy',
    url: 'https://jpgconvertertool.com/privacy',
    priority: 'P1',
    primaryKeyword: 'private image converter no upload',
    keywordsCount: 1,
    searchIntent: 'Informational',
    pageType: 'Legal / Trust',
    volumeTier: 'Compliance',
    kd: 'N/A',
    supportingKeywords: ['private image converter', 'zero storage image converter'],
    features: ['Explicit no-upload policy', 'GDPR/CCPA client-only compliance', 'Zero telemetry'],
    notes: 'Mandatory trust factor for high CTR in search'
  },
  {
    tier: 'Trust & Methodology (E-E-A-T)',
    clusterId: 'E-04',
    name: 'Terms of Service',
    url: 'https://jpgconvertertool.com/terms',
    priority: 'P3',
    primaryKeyword: 'jpg converter terms',
    keywordsCount: 1,
    searchIntent: 'Navigational',
    pageType: 'Legal',
    volumeTier: 'Compliance',
    kd: 'N/A',
    supportingKeywords: [],
    features: ['Fair use guidelines', 'Client-side processing terms', 'Open license disclosures'],
    notes: 'Standard legal compliance footer link'
  },
  {
    tier: 'Trust & Methodology (E-E-A-T)',
    clusterId: 'E-05',
    name: 'Contact & Bug Report Portal',
    url: 'https://jpgconvertertool.com/contact',
    priority: 'P2',
    primaryKeyword: 'jpg converter support',
    keywordsCount: 1,
    searchIntent: 'Navigational',
    pageType: 'Support Portal',
    volumeTier: 'Niche',
    kd: 'N/A',
    supportingKeywords: ['jpgconvertertool contact', 'report converter bug'],
    features: ['Direct feedback mechanism', 'GitHub issue tracker link', 'Format request form'],
    notes: 'Direct communication signal for search quality evaluators'
  }
];

export function getTierForCluster(cluster: KeywordCluster): string {
  if (cluster.id === 'CL-01') return 'Root Hub';
  if (['CL-02', 'CL-03', 'CL-04', 'CL-05', 'CL-06', 'CL-07', 'CL-08'].includes(cluster.id)) {
    return 'Tier 1 Core Spokes (P1)';
  }
  if (['CL-09', 'CL-10', 'CL-11', 'CL-12', 'CL-13', 'CL-14', 'CL-15', 'CL-16', 'CL-17', 'CL-18', 'CL-19'].includes(cluster.id)) {
    return 'Tier 2 Secondary Spokes (P2)';
  }
  return 'Tier 3 International & Comparison (P3)';
}

export function buildHierarchyExportNodes(clusters: KeywordCluster[] = KEYWORD_CLUSTERS): HierarchyExportNode[] {
  const clusterNodes: HierarchyExportNode[] = clusters.map((c) => ({
    tier: getTierForCluster(c),
    clusterId: c.id,
    name: c.name,
    url: c.proposedUrl,
    priority: c.priority,
    primaryKeyword: c.primaryKeyword,
    keywordsCount: 1 + c.supportingKeywords.length,
    searchIntent: c.searchIntent,
    pageType: c.recommendedPageType,
    volumeTier: c.volumeTier,
    kd: c.kd,
    supportingKeywords: c.supportingKeywords,
    features: c.features,
    notes: c.id === 'CL-08' ? 'Specialized document converter: /tiff-to-pdf (379 GSC Impressions)' : undefined
  }));

  return [...clusterNodes, ...TRUST_EEAT_PAGES];
}

export function generateHierarchyExportData(clusters: KeywordCluster[] = KEYWORD_CLUSTERS): HierarchyExportData {
  const nodes = buildHierarchyExportNodes(clusters);
  const totalKeywords = clusters.reduce((acc, c) => acc + 1 + c.supportingKeywords.length, 0);

  return {
    site: 'https://jpgconvertertool.com',
    title: 'JPGConverterTool - Supported Formats & Conversion Directory',
    exportedAt: new Date().toISOString(),
    summary: {
      totalClusters: clusters.length,
      totalSpokes: clusters.filter((c) => c.id !== 'CL-01').length,
      totalTargetKeywords: totalKeywords,
      preservedGscImpressions: 379,
      rootHubUrl: 'https://jpgconvertertool.com/'
    },
    hierarchy: nodes
  };
}

export function generateHierarchyJson(clusters: KeywordCluster[] = KEYWORD_CLUSTERS): string {
  const data = generateHierarchyExportData(clusters);
  return JSON.stringify(data, null, 2);
}

/**
 * Escapes a field for standard RFC-4180 CSV compliance
 */
function escapeCsvField(val: string | number | undefined | null): string {
  if (val === undefined || val === null) return '""';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

export function generateHierarchyCsv(clusters: KeywordCluster[] = KEYWORD_CLUSTERS): string {
  const nodes = buildHierarchyExportNodes(clusters);

  const headers = [
    'Tier',
    'Cluster ID',
    'Page / Node Name',
    'Canonical URL',
    'Priority',
    'Primary Keyword',
    'Total Keywords',
    'Search Intent',
    'Page Type',
    'Volume Tier',
    'KD',
    'Supporting Keywords',
    'Key Features',
    'Notes'
  ];

  const rows = nodes.map((node) => [
    escapeCsvField(node.tier),
    escapeCsvField(node.clusterId),
    escapeCsvField(node.name),
    escapeCsvField(node.url),
    escapeCsvField(node.priority),
    escapeCsvField(node.primaryKeyword),
    escapeCsvField(node.keywordsCount),
    escapeCsvField(node.searchIntent),
    escapeCsvField(node.pageType),
    escapeCsvField(node.volumeTier),
    escapeCsvField(node.kd),
    escapeCsvField(node.supportingKeywords.join('; ')),
    escapeCsvField(node.features.join(' | ')),
    escapeCsvField(node.notes || '')
  ]);

  return [headers.map(escapeCsvField).join(','), ...rows.map((r) => r.join(','))].join('\r\n');
}

/**
 * Trigger client-side file download without opening new windows or violating iframe sandbox
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.setAttribute('download', filename);
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  setTimeout(() => {
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, 200);
}
