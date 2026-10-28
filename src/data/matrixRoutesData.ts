/**
 * Matrix Selector Engine & Dynamic Microcopy Dataset
 * Ingests routes from Pages.csv and keyword clusters from Queries.csv (385 queries)
 */

export interface MatrixRoute {
  id: string;
  label: string;
  category: 'Documents & OCR' | 'Image Converters' | 'Optimization & Size' | 'Specialized Converters';
  targetQuery: string;
  microLabel: string;
  badge?: string;
  accentColor: string;
  acceptTypes: string;
  isOcrRoute?: boolean;
}

export const MATRIX_ROUTES: MatrixRoute[] = [
  // 1. Documents & OCR Text Extraction
  {
    id: 'jpg-to-word',
    label: 'JPG to Word',
    category: 'Documents & OCR',
    targetQuery: 'convert jpg to word',
    microLabel: 'Convert JPG to Editable Microsoft Word Document (.docx)',
    badge: 'OCR',
    accentColor: 'text-blue-500',
    acceptTypes: 'image/*',
    isOcrRoute: true,
  },
  {
    id: 'jpg-to-text',
    label: 'JPG to Text OCR',
    category: 'Documents & OCR',
    targetQuery: 'jpg to text converter',
    microLabel: 'Extract Text from JPG via In-Browser OCR',
    badge: 'Text',
    accentColor: 'text-purple-500',
    acceptTypes: 'image/*',
    isOcrRoute: true,
  },
  {
    id: 'image-to-text',
    label: 'Image to Text',
    category: 'Documents & OCR',
    targetQuery: 'convert image to text',
    microLabel: 'Image to Text OCR Converter with Instant Clipboard Copy',
    badge: 'OCR',
    accentColor: 'text-purple-500',
    acceptTypes: 'image/*',
    isOcrRoute: true,
  },
  {
    id: 'tiff-to-pdf',
    label: 'TIFF to PDF',
    category: 'Documents & OCR',
    targetQuery: 'convert scanned tiff to pdf',
    microLabel: 'Merge Scanned Multi-Page TIFF into Searchable PDF',
    badge: 'Popular',
    accentColor: 'text-blue-600',
    acceptTypes: '.tiff,.tif,image/tiff',
  },
  {
    id: 'pdf-to-jpg',
    label: 'PDF to JPG',
    category: 'Documents & OCR',
    targetQuery: 'pdf to jpg converter',
    microLabel: 'Extract Multi-Page PDF into High-Res JPG Images (150/300 DPI)',
    badge: 'Popular',
    accentColor: 'text-red-500',
    acceptTypes: 'application/pdf,.pdf',
  },
  {
    id: 'heic-to-pdf',
    label: 'HEIC to PDF',
    category: 'Documents & OCR',
    targetQuery: 'converter de heic para pdf',
    microLabel: 'Convert Apple iPhone HEIC Photos directly to PDF Document',
    badge: 'Mobile',
    accentColor: 'text-blue-500',
    acceptTypes: '.heic,.heif',
  },

  // 2. Primary Image Converters
  {
    id: 'png-to-jpg',
    label: 'PNG to JPG',
    category: 'Image Converters',
    targetQuery: 'convert png to jpg',
    microLabel: 'Convert Transparent PNG to Clean JPG with Solid Color Fill',
    badge: 'Popular',
    accentColor: 'text-emerald-500',
    acceptTypes: 'image/png,.png',
  },
  {
    id: 'heic-to-jpg',
    label: 'HEIC to JPG',
    category: 'Image Converters',
    targetQuery: 'heic to jpg',
    microLabel: 'Apple iPhone Live Photos to Standard Compatible JPG',
    badge: 'iPhone',
    accentColor: 'text-cyan-500',
    acceptTypes: '.heic,.heif',
  },
  {
    id: 'webp-to-png',
    label: 'WebP to PNG',
    category: 'Image Converters',
    targetQuery: 'webp to png converter',
    microLabel: 'Convert WebP to Transparent PNG with Full Alpha Channel',
    badge: 'Alpha',
    accentColor: 'text-emerald-500',
    acceptTypes: 'image/webp,.webp',
  },
  {
    id: 'bmp-to-jpg',
    label: 'BMP to JPG',
    category: 'Image Converters',
    targetQuery: 'bitmap to jpeg',
    microLabel: 'Uncompressed Windows Bitmap (.bmp) to Lightweight JPG',
    accentColor: 'text-amber-500',
    acceptTypes: 'image/bmp,.bmp',
  },
  {
    id: 'universal',
    label: 'Universal (Any to JPG)',
    category: 'Image Converters',
    targetQuery: 'jpg converter free',
    microLabel: 'Universal In-Browser Image & Document to JPG Converter',
    badge: 'Hub',
    accentColor: 'text-red-500',
    acceptTypes: 'image/*,application/pdf,video/*,.heic,.heif,.cr2,.nef,.raw,.psd,.tiff,.tif,.docx,.doc',
  },

  // 3. Optimization & File Size Control
  {
    id: 'jpeg-to-jpg',
    label: 'JPEG to JPG (< 50KB)',
    category: 'Optimization & Size',
    targetQuery: 'jpeg to jpg under 50kb',
    microLabel: 'Strict Size Limit Compressor: Target Under 50KB for Portals',
    badge: 'Under 50KB',
    accentColor: 'text-amber-500',
    acceptTypes: 'image/jpeg,image/jpg,.jpg,.jpeg',
  },
  {
    id: 'compress-webp',
    label: 'Compress WebP',
    category: 'Optimization & Size',
    targetQuery: 'compress webp to 50kb',
    microLabel: 'Compress Google WebP Files with Zero Perceptual Loss',
    badge: 'Web Vitals',
    accentColor: 'text-emerald-500',
    acceptTypes: 'image/webp,.webp',
  },
  {
    id: 'merge-jpg',
    label: 'Merge JPG',
    category: 'Optimization & Size',
    targetQuery: 'jpg merger online (5 jpg to 1 jpg)',
    microLabel: 'JPG Merger Online: Stitch Multiple JPG Images into One',
    badge: 'Merge',
    accentColor: 'text-indigo-500',
    acceptTypes: 'image/jpeg,image/jpg,image/png',
  },

  // 4. Specialized Converters
  {
    id: 'psd-to-jpg',
    label: 'PSD to JPG',
    category: 'Specialized Converters',
    targetQuery: 'photoshop psd to jpg',
    microLabel: 'Adobe Photoshop PSD Layers Flattened to High-Quality JPG',
    badge: 'Adobe',
    accentColor: 'text-blue-500',
    acceptTypes: '.psd,image/vnd.adobe.photoshop',
  },
  {
    id: 'jfif-to-jpg',
    label: 'JFIF to JPG',
    category: 'Specialized Converters',
    targetQuery: 'jfif to jpg',
    microLabel: 'Fix Windows JFIF Headers into Universally Valid JPG',
    badge: 'Fix',
    accentColor: 'text-teal-500',
    acceptTypes: 'image/jpeg,image/jfif,.jfif',
  },
  {
    id: 'avif-to-jpg',
    label: 'AVIF to JPG',
    category: 'Specialized Converters',
    targetQuery: 'avif to jpg',
    microLabel: 'Next-Gen AVIF Compressed Image to Universal Standard JPG',
    badge: 'Next-Gen',
    accentColor: 'text-pink-500',
    acceptTypes: 'image/avif,.avif',
  },
];

export function getMatrixRoute(routeId: string): MatrixRoute {
  return MATRIX_ROUTES.find((r) => r.id === routeId) || MATRIX_ROUTES[10]; // fallback to universal
}
