/**
 * Complete SEO Site Architecture, Keyword Clustering, and GSC Dataset for JPGConverterTool.com
 */

export interface KeywordCluster {
  id: string;
  name: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  searchIntent: 'Transactional / Tool' | 'Transactional / Constraint' | 'Transactional / Utility' | 'Informational' | 'Informational / Commercial' | 'Navigational';
  recommendedPageType: string;
  proposedUrl: string;
  volumeTier: string;
  kd: string;
  priority: 'P1' | 'P2' | 'P3';
  description: string;
  features: string[];
}

export interface GscCountryStat {
  country: string;
  clicks: number;
  impressions: number;
  ctr: string;
  position: number;
}

export interface GscQueryStat {
  query: string;
  impressions: number;
  position: number;
  category: string;
  recommendedUrl: string;
}

export const KEYWORD_CLUSTERS: KeywordCluster[] = [
  {
    id: 'CL-01',
    name: 'Universal Image to JPG Hub',
    primaryKeyword: 'jpg converter',
    supportingKeywords: [
      'photo to jpg converter', 'image to jpg converter', 'jpg converter free', '.jpg converter',
      'photo converter jpg', 'jpg converter unlimited', 'photo converter to jpeg', 'image to jpg converter online',
      'change photo to jpg', 'free image converter to jpg', 'picture to jpg converter', 'img convert into jpg',
      'convert images to jpg', '. jpg', 'convert pic to jpg', 'converter image', 'file to jpg converter',
      'free jpg converter', 'picture to jpg', 'free convert to jpg', 'jpg maker', 'converter jpeg',
      'image convert', 'pic to jpg converter', 'image jpeg', 'jpg file converter', 'change to jpg',
      'jpg image converter', 'convert photo to jpeg', 'image jpg converter', 'jpg photo', 'pic to jpg',
      'convert to jpeg free', 'image.jpg', 'online image converter', 'convert image to jpg free',
      'convert picture to jpg', 'converter to jpg', 'images jpg', 'to jpg converter', 'photo convert to jpg',
      'jpg format', 'photo jpg', 'photo jpg converter', 'convert to jpg image', '.jpg files', 'picture converter',
      'image format converter', '.jpg photo', 'convert image', 'img to jpg', 'jpeg image', 'jpg convert',
      'converter jpg', 'convert file to jpg', 'convert to jpg free', 'jpg file', 'convert image to jpeg',
      'file to jpg', 'imagen jpg', 'file converter to jpg', 'jpg image', '.jpeg', 'to jpg', 'image jpg',
      'convert into jpg', 'image to jpeg', 'image convert to jpg', 'photo converter to jpg', 'convert photo to jpg',
      'photo converter', 'convert jpg', 'image converter to jpg', 'photo to jpg', 'convert image to jpg',
      '.jpg', 'image to jpg', 'image converter', 'convert to jpg', 'jpeg', 'jpg'
    ],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Homepage Hub (Universal Dropzone)',
    proposedUrl: 'https://jpgconvertertool.com/',
    volumeTier: '>10,000 / mo',
    kd: 'Medium (42)',
    priority: 'P1',
    description: 'Central hub that accepts any image or document file format and converts it directly to JPG with custom quality controls and batch ZIP download.',
    features: ['Universal drag & drop', 'Client-side Canvas rendering', 'Quality slider 1-100%', 'Batch ZIP download', 'Zero server storage']
  },
  {
    id: 'CL-02',
    name: 'PNG to JPG Converter',
    primaryKeyword: 'png to jpg converter',
    supportingKeywords: [
      'png to jpg', 'top png to jpg converter online', 'most reliable png to jpg converter',
      'best png to jpg converter no watermark', 'fastest png to jpg converter', 'best free png to jpg converter',
      'png jpg converter', 'png to jpg converter free', 'png to jpg converter online', 'convertir png a jpg', 'png a jpg'
    ],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/png-to-jpg',
    volumeTier: '>1,000 / mo',
    kd: 'Easy (18)',
    priority: 'P1',
    description: 'Specialized PNG converter with transparency handling options (white background, black background, or custom color picker) to avoid black-box transparency artifacts.',
    features: ['Matte color picker for transparency', 'Lossless to high-efficiency conversion', 'Batch processing', 'Exif strip option']
  },
  {
    id: 'CL-03',
    name: 'PDF to JPG Converter',
    primaryKeyword: 'pdf to jpg converter',
    supportingKeywords: [
      'pdf to jpg converter free', 'pdf to jpg converter free online', 'pdf jpg converter',
      'free pdf to jpg converter', 'adobe pdf to jpg converter', 'jpg converter pdf',
      'ilovepdf pdf to jpg converter', 'pdf to jpg converter online free', 'online pdf to jpg converter',
      'i love pdf to jpg converter', 'pdf to jpg converter ilovepdf', 'pdf to jpg converter online'
    ],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/pdf-to-jpg',
    volumeTier: '>1,000 / mo',
    kd: 'Hard (58)',
    priority: 'P1',
    description: 'High-volume document tool to render multi-page PDF files into separate high-resolution JPG image pages with 150 DPI and 300 DPI print quality presets.',
    features: ['Select page ranges or all pages', '150 DPI web / 300 DPI print quality', 'Multi-page ZIP archive export', 'Secure in-browser extraction']
  },
  {
    id: 'CL-04',
    name: 'HEIC / HEIF to JPG Converter',
    primaryKeyword: 'heic to jpg converter',
    supportingKeywords: [
      'heic to jpg', 'heic to jpg converter free', 'free heic to jpg converter',
      'heic jpg converter', 'heic to jpg converter online'
    ],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/heic-to-jpg',
    volumeTier: '>1,000 / mo',
    kd: 'Easy (22)',
    priority: 'P1',
    description: 'Fast Apple iPhone HEIC and HEIF photo batch converter. Solves compatibility issues on Windows and Android PCs without expensive codec installations.',
    features: ['Direct iOS photo batch conversion', 'Retains orientation EXIF data', 'Custom compression factor', 'No file count limits']
  },
  {
    id: 'CL-05',
    name: 'Video to JPG (Frame Extractor)',
    primaryKeyword: 'free video to jpg converter',
    supportingKeywords: [
      'video to jpg', 'extract frames from video to jpg', 'video frame grabber jpg'
    ],
    searchIntent: 'Transactional / Utility',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/video-to-jpg',
    volumeTier: '<100 / mo (High Intent)',
    kd: 'Easy (14)',
    priority: 'P1',
    description: 'HTML5 client-side video frame capture tool. Scrub through MP4, WebM, and MOV video files and capture single or continuous high-resolution JPG snapshots.',
    features: ['HTML5 video scrubbing timeline', 'Timestamp snapshot button', 'Burst frame extractor', 'Exact pixel resolution preservation']
  },
  {
    id: 'CL-06',
    name: 'JPEG to JPG Normalization',
    primaryKeyword: 'jpeg to jpg converter',
    supportingKeywords: [
      'jpeg to jpg', 'jpeg to jpg converter free', 'free jpeg to jpg converter', 'jpeg to jpg converter online',
      'jpeg to jpg converter free online', 'online jpeg to jpg converter', 'jpeg to jpg converter online free',
      'free online jpeg to jpg converter', 'jpeg to jpg converter free download', 'jpeg to jpg converter free unlimited',
      'jpeg to jpg converter iphone', 'multiple jpeg to jpg converter', 'online free jpeg to jpg converter',
      'jpeg to jpg converter software download', 'jpeg to jpg converter free download windows 10',
      'img to jpeg convert free', 'jpeg convert', 'photo to jpeg converter', 'img to jpeg convert online',
      'to jpeg converter', 'jpeg converter free', 'jpg to jpg', 'jpeg converter'
    ],
    searchIntent: 'Transactional / Constraint',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/jpeg-to-jpg',
    volumeTier: '>100 / mo',
    kd: 'Easy (15)',
    priority: 'P1',
    description: 'Strict format normalization for government, job, and university portals that reject `.jpeg` filenames and mandate exact `.jpg` extensions.',
    features: ['Strict .jpg file extension enforcement', 'Exif metadata stripper', 'Direct batch conversion', 'Instant zero-download desktop tool']
  },
  {
    id: 'CL-07',
    name: 'Target Size Optimizer (KB Caps)',
    primaryKeyword: 'jpeg to jpg converter under 50 kb',
    supportingKeywords: [
      'jpeg to jpg converter 30kb', 'jpeg to jpg converter 50 kb', 'jpeg to jpg converter 100 kb',
      'jpeg to jpg converter 150 kb', 'img to jpg compressor', 'jpg size calculator'
    ],
    searchIntent: 'Transactional / Constraint',
    recommendedPageType: 'Dedicated Tool Spoke & Calculator',
    proposedUrl: 'https://jpgconvertertool.com/compress-jpg',
    volumeTier: '>100 / mo',
    kd: 'Easy (12)',
    priority: 'P1',
    description: 'Iterative binary search canvas compression engine targeting exact byte constraints (Under 30KB, 50KB, 100KB, 150KB) for passport and visa photos.',
    features: ['Target KB input field', 'Quick presets: 30KB, 50KB, 100KB, 150KB', 'Real-time before/after byte counter', 'Live visual quality comparison']
  },
  {
    id: 'CL-08',
    name: 'TIFF to PDF Converter (Preserved Asset)',
    primaryKeyword: 'tiff to pdf',
    supportingKeywords: [
      'tif to pdf', 'convert tiff to pdf', 'convert tif to pdf', 'tiff to pdf converter',
      'tiff file to pdf', 'tiff image to pdf', 'tif zu pdf', 'convert tiff in pdf',
      'tiff to pdf converter free', 'new convert tiff image to pdf', 'tiff to pdf free online',
      'large tiff to pdf', 'tiff to pdf high quality', 'tiff 2 pdf'
    ],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Preserved Core Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/tiff-to-pdf',
    volumeTier: '>500 / mo',
    kd: 'Medium (38)',
    priority: 'P1',
    description: 'Preserved high-traffic URL (379 GSC impressions). Converts single and multi-page desktop scanner TIFF images into clean, searchable PDF documents.',
    features: ['Multi-page TIFF handling', 'Preserves DPI metadata', 'Combines multi-file batches into 1 PDF', 'High-res document fidelity']
  },
  {
    id: 'CL-09',
    name: 'Word to JPG Converter',
    primaryKeyword: 'word to jpg converter',
    supportingKeywords: [
      'word to jpg converter online', 'doc to jpg converter', 'word to jpg', 'convert word doc to jpg',
      'word to jpeg', 'convertir word a jpg', 'word to image', 'doc zu jpg'
    ],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/word-to-jpg',
    volumeTier: '>100 / mo',
    kd: 'Medium (35)',
    priority: 'P1',
    description: 'Converts Microsoft Word (.docx, .doc) files into individual high-resolution JPG images page-by-page with accurate typography and layout rendering.',
    features: ['DOCX page renderer', 'Visual page selector', 'Batch export as ZIP', 'Private in-browser conversion']
  },
  {
    id: 'CL-10',
    name: 'WebP to JPG Converter',
    primaryKeyword: 'webp to jpg converter',
    supportingKeywords: ['webp to jpg', 'convert webp to jpg', 'google webp to jpg'],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/webp-to-jpg',
    volumeTier: '>100 / mo',
    kd: 'Easy (16)',
    priority: 'P2',
    description: 'Converts modern web-compressed WebP images into universal JPG format for offline viewing and editing in software that lacks WebP support.',
    features: ['Bulk WebP conversion', 'Retains original pixel aspect ratio', 'Quality slider', 'Instant download']
  },
  {
    id: 'CL-11',
    name: 'Camera RAW to JPG (CR2 / NEF)',
    primaryKeyword: 'raw to jpg converter',
    supportingKeywords: ['cr2 to jpg converter', 'nef to jpg converter', 'canon cr2 to jpg', 'nikon nef to jpg'],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/raw-to-jpg',
    volumeTier: '>100 / mo',
    kd: 'Easy (19)',
    priority: 'P2',
    description: 'Converts professional DSLR camera RAW image formats from Canon (.CR2), Nikon (.NEF), and Sony (.ARW) into web-ready JPGs.',
    features: ['Embedded JPEG preview extraction', 'Bayer pattern debayering', 'Full resolution export', 'Batch photography workflow']
  },
  {
    id: 'CL-12',
    name: 'PSD to JPG Converter',
    primaryKeyword: 'psd to jpg converter',
    supportingKeywords: ['psd to jpg', 'psd files to jpg', 'photoshop to jpg'],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/psd-to-jpg',
    volumeTier: '<100 / mo',
    kd: 'Easy (12)',
    priority: 'P2',
    description: 'Renders Adobe Photoshop (.psd) files into flattened, compact JPG images without needing Adobe Photoshop installed.',
    features: ['PSD composite image parser', 'High-res layer flattening', 'Quality adjustment', 'Zero software download required']
  },
  {
    id: 'CL-13',
    name: 'SVG to JPG Converter',
    primaryKeyword: 'svg to jpg converter',
    supportingKeywords: ['svg to jpg', 'vector to jpg', 'convert vector svg to jpg'],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/svg-to-jpg',
    volumeTier: '<100 / mo',
    kd: 'Easy (11)',
    priority: 'P2',
    description: 'Rasterizes Scalable Vector Graphics (SVG) into crisp raster JPG images with customizable output resolution and solid background fill.',
    features: ['Custom resolution multiplier (1x, 2x, 4x)', 'Solid background color fill', 'Clean antialiased rasterization', 'Batch SVG handling']
  },
  {
    id: 'CL-14',
    name: 'WhatsApp Image to JPG',
    primaryKeyword: 'whatsapp image to jpg',
    supportingKeywords: ['whatsapp photo to jpg', 'convert whatsapp image to jpg'],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/whatsapp-to-jpg',
    volumeTier: '<100 / mo',
    kd: 'Easy (8)',
    priority: 'P2',
    description: 'Restores and converts WhatsApp media, encrypted images, and WebP stickers back into clean standard JPG format with proper file extensions.',
    features: ['Repairs missing image headers', 'Converts WhatsApp webp to jpg', 'Restores file extensions', 'Safe photo recovery']
  },
  {
    id: 'CL-15',
    name: 'JFIF to JPG Converter',
    primaryKeyword: 'jfif to jpg converter',
    supportingKeywords: ['jfif to jpg', 'convert jfif to jpg', 'jfif format to jpg'],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/jfif-to-jpg',
    volumeTier: '>100 / mo',
    kd: 'Easy (10)',
    priority: 'P2',
    description: 'Fixes the common Windows registry issue where browser-saved images default to `.jfif` instead of `.jpg`.',
    features: ['One-click header repair', 'Batch JFIF renaming & re-encoding', 'Preserves original quality', 'Instant download']
  },
  {
    id: 'CL-16',
    name: 'JPF / JPEG 2000 to JPG',
    primaryKeyword: 'jpf to jpg converter',
    supportingKeywords: ['jpf to jpg', 'jpeg 2000 to jpg', 'jp2 to jpg'],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/jpf-to-jpg',
    volumeTier: '<100 / mo',
    kd: 'Easy (7)',
    priority: 'P2',
    description: 'Converts specialized JPEG 2000 Part 2 (.jpf) and medical/archival imaging files to standard JPG.',
    features: ['Wavelet decompression', 'Standard sRGB re-encoding', 'Wide browser compatibility', 'Zero data leaks']
  },
  {
    id: 'CL-17',
    name: 'OIP / Bing Image to JPG',
    primaryKeyword: 'oip to jpg',
    supportingKeywords: ['oip to jpg converter', 'oip to jpeg'],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/oip-to-jpg',
    volumeTier: '<100 / mo',
    kd: 'Easy (5)',
    priority: 'P2',
    description: 'Extracts and restores Bing Image Search cached thumbnail files (`OIP.*`) to standard full-compatibility JPGs.',
    features: ['Direct drag & drop for OIP files', 'Restores full image headers', 'Fast batch conversion', 'Instant JPG output']
  },
  {
    id: 'CL-18',
    name: 'Office Suite (Excel & PPT to JPG)',
    primaryKeyword: 'excel to jpg converter',
    supportingKeywords: ['ppt to jpg converter', 'excel to jpg', 'ppt to jpg', 'powerpoint slides to jpg'],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/excel-to-jpg',
    volumeTier: '<100 / mo',
    kd: 'Easy (12)',
    priority: 'P2',
    description: 'Renders spreadsheet tables (.xlsx) and presentation slide decks (.pptx) into individual high-definition JPG slides.',
    features: ['Slide-by-slide extraction', 'High DPI resolution', 'Batch ZIP download', 'Preserves presentation formatting']
  },
  {
    id: 'CL-19',
    name: 'TIFF to JPG Converter',
    primaryKeyword: 'tif to jpg converter',
    supportingKeywords: ['tiff to jpg converter', 'tiff to jpg', 'tif to jpg', 'tiff zu jpg'],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/tiff-to-jpg',
    volumeTier: '<100 / mo',
    kd: 'Easy (14)',
    priority: 'P2',
    description: 'Converts heavy, uncompressed desktop scanner TIFF images into lightweight, compressed JPG files for email and web sharing.',
    features: ['Compresses 50MB TIFFs to 1MB JPGs', 'LZW/PackBits decompression', 'Preserves color fidelity', 'Fast batch mode']
  },
  {
    id: 'CL-20',
    name: 'Multilingual Direct Intent Hubs',
    primaryKeyword: 'convertir imagen a jpg',
    supportingKeywords: [
      'convertir a jpg', 'convertir jpg', 'imagen a jpg', 'converti in jpg',
      'foto to jpg', 'foto jpg'
    ],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Localized Language Hubs',
    proposedUrl: 'https://jpgconvertertool.com/es/',
    volumeTier: '>500 / mo (Combined)',
    kd: 'Easy (15)',
    priority: 'P3',
    description: 'Native Spanish, Portuguese, and Italian localization for European and Latin American image conversion demand.',
    features: ['Native localized UI', 'Reciprocal hreflang tags', 'Translated FAQs', 'Self-referencing canonicals']
  },
  {
    id: 'CL-21',
    name: 'Competitor Brand Comparison',
    primaryKeyword: 'online-convert',
    supportingKeywords: ['online-convert alternative', 'freeconvert vs online-convert'],
    searchIntent: 'Informational / Commercial',
    recommendedPageType: 'Comparison Guide',
    proposedUrl: 'https://jpgconvertertool.com/about#comparison',
    volumeTier: '>1,000 / mo (Brand)',
    kd: 'N/A',
    priority: 'P3',
    description: 'Comparison showing how JPGConverterTool provides 100% private in-browser conversions with zero server uploads, no file queues, and zero intrusive ads.',
    features: ['Speed benchmark comparison', 'Privacy audit table', 'Feature-by-feature matrix', 'Direct try-it-now CTA']
  },
  {
    id: 'CL-22',
    name: 'HEIC to PDF Document Spoke',
    primaryKeyword: 'heic to pdf',
    supportingKeywords: ['.heic to pdf', 'converter de heic para pdf', 'converter heic para pdf'],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/heic-to-pdf',
    volumeTier: '>1,000 / mo',
    kd: 'Easy (10)',
    priority: 'P1',
    description: 'Packages Apple iPhone HEIC and HEIF photos into an organized, single PDF document directly in the browser.',
    features: ['Multi-photo HEIC batching', 'Custom PDF page layout', 'Zero upload privacy', 'Direct PDF download']
  },
  {
    id: 'CL-23',
    name: 'PNG to PDF Document Spoke',
    primaryKeyword: 'png to pdf',
    supportingKeywords: ['png para pdf', 'convert png to pdf', 'merge png to pdf'],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/png-to-pdf',
    volumeTier: '>1,000 / mo',
    kd: 'Medium (24)',
    priority: 'P1',
    description: 'Combines multiple transparent or solid PNG pictures into an organized, high-resolution PDF file.',
    features: ['Preserves transparency matte', 'Multi-page document collation', 'High-res vector preservation', 'Fast batch export']
  },
  {
    id: 'CL-24',
    name: 'Merge Multiple JPGs Spoke',
    primaryKeyword: 'multiple jpg to single jpg converter',
    supportingKeywords: ['merge jpg', 'multiple jpg to single jpg', 'joint jpeg file', 'combine jpg'],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/merge-jpg',
    volumeTier: '>500 / mo',
    kd: 'Easy (12)',
    priority: 'P1',
    description: 'Combines multiple JPG photos into a single continuous vertical or grid image canvas without uploads.',
    features: ['Vertical & horizontal stitching', 'Custom grid layouts', 'Maintains original sharpness', 'Zero server uploads']
  },
  {
    id: 'CL-25',
    name: 'HTML to JPG Web Snapshot Spoke',
    primaryKeyword: 'convert html page to jpg',
    supportingKeywords: ['html to jpg', 'convert html to jpg', 'web to jpg tool', 'html code to jpg'],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/html-to-jpg',
    volumeTier: '>100 / mo',
    kd: 'Easy (9)',
    priority: 'P2',
    description: 'Renders HTML code, web markup, and styled components into crisp JPG screenshots directly in the browser.',
    features: ['Client-side DOM rasterization', 'Custom viewport resolution', 'Preserves CSS styling', 'Instant JPG output']
  },
  {
    id: 'CL-26',
    name: 'Compress WebP Images Spoke',
    primaryKeyword: 'compress webp',
    supportingKeywords: ['png to webp', 'compress-webp', 'webp size reducer', 'webp compressor'],
    searchIntent: 'Transactional / Tool',
    recommendedPageType: 'Dedicated Tool Spoke',
    proposedUrl: 'https://jpgconvertertool.com/compress-webp',
    volumeTier: '>1,000 / mo',
    kd: 'Easy (14)',
    priority: 'P1',
    description: 'Shrinks modern Google WebP files by up to 80% for fast website loading and email sharing.',
    features: ['Up to 80% compression ratio', 'Lossy and lossless WebP tuning', 'Batch ZIP download', 'Zero data storage']
  }
];

export const GSC_TOP_COUNTRIES: GscCountryStat[] = [
  { country: 'United States', clicks: 0, impressions: 383, ctr: '0%', position: 83.11 },
  { country: 'India', clicks: 0, impressions: 181, ctr: '0%', position: 86.83 },
  { country: 'Brazil', clicks: 0, impressions: 103, ctr: '0%', position: 73.42 },
  { country: 'Philippines', clicks: 0, impressions: 72, ctr: '0%', position: 81.86 },
  { country: 'Canada', clicks: 0, impressions: 63, ctr: '0%', position: 77.35 },
  { country: 'United Kingdom', clicks: 0, impressions: 53, ctr: '0%', position: 80.49 },
  { country: 'Indonesia', clicks: 0, impressions: 52, ctr: '0%', position: 73.12 },
  { country: 'Vietnam', clicks: 0, impressions: 45, ctr: '0%', position: 71.44 },
  { country: 'Germany', clicks: 0, impressions: 44, ctr: '0%', position: 77.07 },
  { country: 'Australia', clicks: 0, impressions: 40, ctr: '0%', position: 81.03 },
  { country: 'Bangladesh', clicks: 0, impressions: 32, ctr: '0%', position: 76.03 },
  { country: 'France', clicks: 0, impressions: 29, ctr: '0%', position: 89.93 },
  { country: 'Pakistan', clicks: 0, impressions: 26, ctr: '0%', position: 76.08 },
  { country: 'Turkey', clicks: 0, impressions: 19, ctr: '0%', position: 76.11 },
  { country: 'Malaysia', clicks: 0, impressions: 18, ctr: '0%', position: 80.17 }
];

export const GSC_TOP_QUERIES: GscQueryStat[] = [
  { query: 'jpg converter', impressions: 225, position: 75.38, category: 'Hub', recommendedUrl: 'https://jpgconvertertool.com/' },
  { query: 'tiff to pdf', impressions: 56, position: 79.25, category: 'Preserved Spoke', recommendedUrl: 'https://jpgconvertertool.com/tiff-to-pdf' },
  { query: 'convert jpg', impressions: 45, position: 88.71, category: 'Hub', recommendedUrl: 'https://jpgconvertertool.com/' },
  { query: 'jpg convert', impressions: 26, position: 80.19, category: 'Hub', recommendedUrl: 'https://jpgconvertertool.com/' },
  { query: 'tif to pdf', impressions: 21, position: 82.67, category: 'Preserved Spoke', recommendedUrl: 'https://jpgconvertertool.com/tiff-to-pdf' },
  { query: 'convert tiff to pdf', impressions: 20, position: 79.80, category: 'Preserved Spoke', recommendedUrl: 'https://jpgconvertertool.com/tiff-to-pdf' },
  { query: 'convert to jpg', impressions: 20, position: 86.85, category: 'Hub', recommendedUrl: 'https://jpgconvertertool.com/' },
  { query: 'jpg image converter', impressions: 16, position: 83.75, category: 'Hub', recommendedUrl: 'https://jpgconvertertool.com/' },
  { query: 'png to jpg', impressions: 11, position: 67.09, category: 'Format Spoke', recommendedUrl: 'https://jpgconvertertool.com/png-to-jpg' },
  { query: 'jpg to word', impressions: 8, position: 79.75, category: 'Reverse Spoke', recommendedUrl: 'https://jpgconvertertool.com/jpg-to-word' },
  { query: 'word to jpg', impressions: 7, position: 86.14, category: 'Format Spoke', recommendedUrl: 'https://jpgconvertertool.com/word-to-jpg' },
  { query: 'psd to jpg', impressions: 3, position: 59.00, category: 'Format Spoke', recommendedUrl: 'https://jpgconvertertool.com/psd-to-jpg' },
  { query: 'most visited online tools 2026', impressions: 4, position: 2.00, category: 'Authority', recommendedUrl: 'https://jpgconvertertool.com/about' },
  { query: 'jpeg to word converter 中文', impressions: 2, position: 4.00, category: 'Multilingual Spoke', recommendedUrl: 'https://jpgconvertertool.com/zh-tw/jpg-to-word' },
  { query: 'jpg size calculator', impressions: 2, position: 10.00, category: 'Calculator', recommendedUrl: 'https://jpgconvertertool.com/compress-jpg' }
];

export const TECHNICAL_SEO_AUDIT_ITEMS = [
  { item: 'Canonical Domain Normalization', status: 'Implemented', detail: 'Consolidated non-www (https://jpgconvertertool.com) to stop the 646 vs 83 impression split.' },
  { item: 'Trailing Slash 301 Normalization', status: 'Implemented', detail: 'Eliminated trailing-slash duplicate indexing identified in GSC Pages report.' },
  { item: 'Robots.txt Configuration', status: 'Verified', detail: 'Standardized directive allowing full crawling and referencing canonical sitemap.xml.' },
  { item: 'JSON-LD Schema Suite', status: 'Live', detail: 'WebApplication, BreadcrumbList, and FAQPage schemas properly deployed.' },
  { item: 'Core Web Vitals Engineering', status: 'Optimized', detail: 'Zero layout shift (CLS 0.0), sub-second First Contentful Paint, 100% client-side Web Workers.' },
  { item: 'Zero Data Retention / Privacy', status: 'Guaranteed', detail: 'All files converted in memory via HTML5 Canvas and WebAssembly. No remote cloud uploads.' }
];
