/**
 * Technical Format Comparison Matrix and Portal Compliance Dataset
 * Direct entity-attribute-value (EAV) mapping for JPG vs other raster/document formats
 */

export interface FormatComparisonRow {
  id: string;
  format: string;
  extension: string;
  compressionType: 'Lossy' | 'Lossless' | 'Mixed';
  transparency: boolean;
  idealFor: string;
  compatibility: string;
  typicalSize: string;
  spokeId: string;
}

export interface PortalGuideline {
  id: string;
  portalName: string;
  sizeLimit: string;
  recommendedSetting: string;
  dimensions?: string;
  spokeId: string;
  notes: string;
}

export const FORMAT_COMPARISON_MATRIX: FormatComparisonRow[] = [
  {
    id: 'jpg',
    format: 'JPG / JPEG',
    extension: '.jpg, .jpeg',
    compressionType: 'Lossy',
    transparency: false,
    idealFor: 'General photography, web visuals, exam forms',
    compatibility: '100% Universal (All browsers, OS & apps)',
    typicalSize: '30 KB – 250 KB',
    spokeId: 'universal',
  },
  {
    id: 'png',
    format: 'PNG',
    extension: '.png',
    compressionType: 'Lossless',
    transparency: true,
    idealFor: 'Transparent logos, icons, screenshots',
    compatibility: '100% Universal (All modern platforms)',
    typicalSize: '500 KB – 4 MB',
    spokeId: 'png-to-jpg',
  },
  {
    id: 'webp',
    format: 'WebP',
    extension: '.webp',
    compressionType: 'Lossy',
    transparency: true,
    idealFor: 'Modern web performance & Core Web Vitals',
    compatibility: 'Chrome, Edge, Firefox, Safari 14+',
    typicalSize: '20 KB – 150 KB',
    spokeId: 'webp-to-jpg',
  },
  {
    id: 'heic',
    format: 'Apple HEIC',
    extension: '.heic, .heif',
    compressionType: 'Lossy',
    transparency: true,
    idealFor: 'iPhone Live Photos & mobile camera rolls',
    compatibility: 'Apple native; requires conversion for Windows/Web',
    typicalSize: '1 MB – 3 MB',
    spokeId: 'heic-to-jpg',
  },
  {
    id: 'pdf',
    format: 'PDF Document',
    extension: '.pdf',
    compressionType: 'Mixed',
    transparency: false,
    idealFor: 'Contracts, multi-page forms, invoices',
    compatibility: 'Requires PDF viewer or browser extension',
    typicalSize: '100 KB – 20 MB+',
    spokeId: 'pdf-to-jpg',
  },
  {
    id: 'tiff',
    format: 'TIFF',
    extension: '.tiff, .tif',
    compressionType: 'Lossless',
    transparency: true,
    idealFor: 'High-res scanner archiving & master print',
    compatibility: 'Professional desktop software only',
    typicalSize: '10 MB – 100 MB+',
    spokeId: 'tiff-to-pdf',
  },
];

export const PORTAL_GUIDELINES: PortalGuideline[] = [
  {
    id: 'ssc-upsc',
    portalName: 'SSC, UPSC & State Exam Portals',
    sizeLimit: 'Strictly between 20 KB and 50 KB',
    recommendedSetting: '< 50KB Target Cap (Quality ~78%)',
    dimensions: '200 × 230 px or aspect ratio 1:1.15',
    spokeId: 'jpeg-to-jpg',
    notes: 'Upload servers reject files larger than 50.0 KB immediately with HTTP 400 errors.',
  },
  {
    id: 'us-visa',
    portalName: 'US Visa (DS-160) & Passport Online',
    sizeLimit: 'Under 240 KB (Minimum 20 KB)',
    recommendedSetting: '< 100KB Target Cap, 600×600 px',
    dimensions: '600 × 600 px (2×2 inches @ 300 DPI)',
    spokeId: 'passport-photo-to-jpg',
    notes: 'Biometric software requires exact 1:1 square ratio with head height between 50% and 69%.',
  },
  {
    id: 'schengen-visa',
    portalName: 'Schengen & UK Visa Applications',
    sizeLimit: 'Under 100 KB or 150 KB',
    recommendedSetting: '< 100KB Target Cap',
    dimensions: '35 × 45 mm (approx. 413 × 531 px @ 300 DPI)',
    spokeId: 'passport-photo-to-jpg',
    notes: 'Plain light background with zero shadows; JPEG format mandatory.',
  },
  {
    id: 'academic-job',
    portalName: 'University & Job Application Portals',
    sizeLimit: 'Under 100 KB for photo, Under 500 KB for documents',
    recommendedSetting: '< 100KB Target Cap, 150 DPI for docs',
    dimensions: 'Original aspect ratio preserved',
    spokeId: 'pdf-to-jpg',
    notes: 'Multi-page certificates and transcripts extracted at 150 DPI maintain sharp text readability.',
  },
];
