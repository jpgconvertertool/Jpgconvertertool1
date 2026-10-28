/**
 * Comprehensive SEO and GSC Search Console Optimization Map for all 21 Format Spokes + Hub
 * Directly maps every Google Search Console query receiving impressions to optimized titles,
 * meta descriptions, OpenGraph tags, user-friendly H1 headlines, and structured data.
 */

export interface FormatSeoMetadata {
  id: string;
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  primaryKeyword: string;
  gscQueries: string[];
  canonicalUrl: string;
  category: 'images' | 'documents' | 'optimization';
  defaultPresetKb?: number;
}

export const FORMAT_SEO_MAP: Record<string, FormatSeoMetadata> = {
  universal: {
    id: 'universal',
    title: 'Free Online JPG Converter - Fast, Private & Easy to Use',
    description:
      'Convert photos, documents, and camera files to high-quality JPG on your device. 100% private with zero file uploads, fast batching, and custom size limits.',
    h1: 'Online JPG Converter: Convert Any File to JPG',
    subtitle:
      'Fast, private image and document conversion directly on your device with zero file uploads and custom size limits.',
    primaryKeyword: 'jpg converter',
    gscQueries: [
      'jpg converter',
      'convert jpg',
      'jpg convert',
      'convert to jpg',
      'jpg image converter',
      'image to jpg',
      'image converter to jpg',
      'convert image to jpg',
      'photo to jpg converter',
      'img to jpg',
      'jpg file converter',
      'free jpg converter'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/',
    category: 'images'
  },
  'tiff-to-pdf': {
    id: 'tiff-to-pdf',
    title: 'TIFF to PDF Converter - Convert Scanned TIFF to PDF Free',
    description:
      'Convert multi-page TIFF and .TIF scanner files into a compact, shareable PDF document directly in your browser. 100% private, free, and instant.',
    h1: 'Convert Scanned TIFF to PDF Document',
    subtitle:
      'Merge scanned multi-page TIFF images into a single compact PDF document with zero file uploads.',
    primaryKeyword: 'tiff to pdf',
    gscQueries: [
      'tiff to pdf',
      'tif to pdf',
      'convert tiff to pdf',
      'convert tif to pdf',
      'tiff to pdf converter',
      'tiff file to pdf',
      'tif zu pdf'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/tiff-to-pdf',
    category: 'documents'
  },
  'png-to-jpg': {
    id: 'png-to-jpg',
    title: 'PNG to JPG Converter - Convert PNG to JPG Online Free',
    description:
      'Convert transparent PNG images to high-quality JPG with custom background colors. 100% private with no file uploads, instant download, and batch support.',
    h1: 'Convert PNG to JPG Online Free',
    subtitle:
      'Convert transparent PNG photos into clean, universally accepted JPG images with custom background colors.',
    primaryKeyword: 'png to jpg',
    gscQueries: [
      'png to jpg',
      'png to jpg converter',
      'convertir png a jpg',
      'png a jpg'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/png-to-jpg',
    category: 'images'
  },
  'jpg-to-word': {
    id: 'jpg-to-word',
    title: 'JPG to Word Converter - Extract Text to Editable DOCX',
    description:
      'Convert JPG images and scanned paperwork into editable Word documents. Free, fast, and 100% private directly in your browser.',
    h1: 'Convert JPG to Editable Word Document',
    subtitle:
      'Extract printed text from photos into editable Microsoft Word documents without software installation.',
    primaryKeyword: 'jpg to word',
    gscQueries: [
      'jpg to word',
      'jpeg to word converter 中文',
      'convert jpg to word'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/jpg-to-word',
    category: 'documents'
  },
  'word-to-jpg': {
    id: 'word-to-jpg',
    title: 'Word to JPG Converter - Convert DOCX to High-Res JPG Pages',
    description:
      'Convert Microsoft Word (.docx, .doc) documents to clean, high-resolution JPG images. Fast, free, and runs entirely in your browser.',
    h1: 'Convert Word DOCX to High-Res JPG Pages',
    subtitle:
      'Renders Word documents into high-resolution JPG pages without needing Microsoft Office software.',
    primaryKeyword: 'word to jpg',
    gscQueries: [
      'word to jpg',
      'word to jpg converter',
      'convertir word a jpg',
      'تحويل من وورد الى jpg'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/word-to-jpg',
    category: 'documents'
  },
  'heic-to-jpg': {
    id: 'heic-to-jpg',
    title: 'HEIC to JPG Converter - Convert iPhone Photos to JPG Free',
    description:
      'Easily convert Apple iPhone HEIC and HEIF photos to universally compatible JPG images. 100% private on-device processing.',
    h1: 'Convert Apple HEIC to JPG Photos',
    subtitle:
      'Turn iPhone HEIC & HEIF live photos into standard JPEGs compatible on Windows, Android, and web portals.',
    primaryKeyword: 'heic to jpg',
    gscQueries: [
      'heic to jpg',
      'heic to jpg converter',
      'heic to pdf',
      'convert heic to jpg'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/heic-to-jpg',
    category: 'images'
  },
  'jpeg-to-jpg': {
    id: 'jpeg-to-jpg',
    title: 'JPEG to JPG Converter Under 50KB & 100KB - File Size Compressor',
    description:
      'Compress JPEG files to exact target sizes under 30KB, 50KB, or 100KB for passport, visa, and government portals. 100% private on your device.',
    h1: 'JPEG to JPG File Size Compressor (Under 50KB)',
    subtitle:
      'Automatically calculates optimal compression to meet strict portal limits under 30KB, 50KB, or 100KB.',
    primaryKeyword: 'jpeg to jpg converter under 50 kb',
    gscQueries: [
      'jpeg to jpg converter under 50 kb',
      'jpeg to jpg converter 30kb',
      'jpeg to jpg converter 100 kb',
      'jpg size calculator'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/jpeg-to-jpg',
    category: 'optimization',
    defaultPresetKb: 50
  },
  'compress-jpg': {
    id: 'compress-jpg',
    title: 'Compress JPG Images Online - Reduce File Size Fast & Free',
    description:
      'Reduce JPG image file sizes by up to 80% while preserving sharp photo clarity. Fast batch compression directly in your browser.',
    h1: 'Compress & Optimize JPG Images Online',
    subtitle:
      'Shrink large image files for faster websites, emails, and job applications without losing visual quality.',
    primaryKeyword: 'compress jpg',
    gscQueries: [
      'compress jpg',
      'reduce jpg file size',
      'jpg size calculator',
      'jpg compressor'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/compress-jpg',
    category: 'optimization'
  },
  'pdf-to-jpg': {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG Converter - Extract PDF Pages to High-Res JPG',
    description:
      'Extract PDF document pages into sharp, clear individual JPG images online for free. 100% private with no file uploads.',
    h1: 'Extract PDF Pages to High-Res JPG',
    subtitle:
      'Converts multi-page PDF documents into sharp, clear individual JPG images at 150 or 300 DPI.',
    primaryKeyword: 'pdf to jpg converter',
    gscQueries: [
      'pdf to jpg converter',
      'pdf to jpg free',
      'pdf jpg converter',
      'convert pdf to jpg'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/pdf-to-jpg',
    category: 'documents'
  },
  'video-to-jpg': {
    id: 'video-to-jpg',
    title: 'Video to JPG Converter - Extract High-Res Frames to JPG',
    description:
      'Extract crystal-clear still photos and video frames from MP4, MOV, and WebM videos at exact timestamps. 100% local.',
    h1: 'Extract Video Frames to High-Res JPG Photos',
    subtitle:
      'Capture full-resolution still pictures from MP4, WebM, and MOV videos at any exact second.',
    primaryKeyword: 'video to jpg',
    gscQueries: [
      'video to jpg',
      'extract frames from video to jpg',
      'video frame to jpg'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/video-to-jpg',
    category: 'documents'
  },
  'webp-to-jpg': {
    id: 'webp-to-jpg',
    title: 'WebP to JPG Converter - Convert Modern WebP to JPG Online',
    description:
      'Convert Google WebP images to universally accepted JPG format with zero quality loss. Fast, free, and completely private.',
    h1: 'Convert Modern WebP to Standard JPG',
    subtitle:
      'Turn web-optimized Google WebP files into universally compatible JPEG images with true colors.',
    primaryKeyword: 'webp to jpg',
    gscQueries: [
      'webp to jpg',
      'webp to jpg converter',
      'convert webp to jpg'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/webp-to-jpg',
    category: 'images'
  },
  'psd-to-jpg': {
    id: 'psd-to-jpg',
    title: 'PSD to JPG Converter - Convert Photoshop PSD to JPG Online',
    description:
      'Convert Adobe Photoshop (.psd) files into flattened, shareable JPEG pictures without needing Photoshop software.',
    h1: 'Convert Photoshop PSD Files to JPG',
    subtitle:
      'Export layered Adobe Photoshop project files into clean, shareable JPEG images instantly.',
    primaryKeyword: 'psd to jpg',
    gscQueries: [
      'psd to jpg',
      'psd to jpg converter',
      'convert psd to jpg'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/psd-to-jpg',
    category: 'images'
  },
  'jfif-to-jpg': {
    id: 'jfif-to-jpg',
    title: 'JFIF to JPG Converter - Fix & Convert JFIF to Standard JPG',
    description:
      'Fix browser-saved JFIF files by converting them into standard JPG images with full compatibility. Instant, local conversion.',
    h1: 'Fix & Convert JFIF to Standard JPG',
    subtitle:
      'Correct Windows JFIF files into universally accepted JPEG files with proper file headers.',
    primaryKeyword: 'jfif to jpg',
    gscQueries: [
      'jfif to jpg',
      'convert jfif to jpg',
      'jfif to jpeg'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/jfif-to-jpg',
    category: 'images'
  },
  'tiff-to-jpg': {
    id: 'tiff-to-jpg',
    title: 'TIFF to JPG Converter - Convert Scanned TIF Files to JPG',
    description:
      'Compress heavy scanner TIFF files into lightweight, shareable JPG images while preserving original document clarity.',
    h1: 'Convert Scanned TIFF Images to JPG',
    subtitle:
      'Convert heavy, uncompressed desktop scanner TIFF images into compact, lightweight JPG files.',
    primaryKeyword: 'tif to jpg',
    gscQueries: [
      'tif to jpg',
      'tiff to jpg converter',
      'tiff to jpg',
      'tiff zu jpg'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/tiff-to-jpg',
    category: 'documents'
  },
  'passport-photo-to-jpg': {
    id: 'passport-photo-to-jpg',
    title: 'Passport & Visa Photo Resizer - Resize Photo to Exact 600x600 JPG',
    description:
      'Resize and compress photos to exact passport and visa specifications (600x600 px, under 50KB or 100KB) for official government portals.',
    h1: 'Passport & Visa Photo Resizer (600x600 px)',
    subtitle:
      'Enforces strict pixel dimensions and file size caps for visa, passport, and government job portals.',
    primaryKeyword: 'passport photo to jpg',
    gscQueries: [
      'passport photo to jpg',
      'visa photo resizer',
      '600x600 photo converter',
      'passport size photo'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/passport-photo-to-jpg',
    category: 'optimization'
  },
  'batch-jpg-converter': {
    id: 'batch-jpg-converter',
    title: 'Batch JPG Converter - Convert Multiple Images to JPG & Download ZIP',
    description:
      'Convert 50+ photos to JPG simultaneously with smooth on-device processing and 1-click batch ZIP download.',
    h1: 'Batch JPG Converter - Multiple Images to JPG (ZIP)',
    subtitle:
      'Convert dozens of photos at once smoothly without slowing down your device, and download all as a ZIP file.',
    primaryKeyword: 'batch jpg converter',
    gscQueries: [
      'batch jpg converter',
      'bulk convert to jpg',
      'multiple photos to jpg'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/batch-jpg-converter',
    category: 'optimization'
  },
  'whatsapp-image-to-jpg': {
    id: 'whatsapp-image-to-jpg',
    title: 'WhatsApp Image to JPG - Convert WhatsApp Photos & Stickers to JPG',
    description:
      'Restore and convert downloaded WhatsApp media and WebP stickers back into standard, shareable JPG photos.',
    h1: 'Convert WhatsApp Media & Stickers to JPG',
    subtitle:
      'Converts downloaded WhatsApp WebP stickers and compressed media into standard, shareable JPGs.',
    primaryKeyword: 'whatsapp image to jpg',
    gscQueries: [
      'whatsapp image to jpg',
      'whatsapp photo to jpg',
      'whatsapp to jpg'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/whatsapp-image-to-jpg',
    category: 'optimization'
  },
  'raw-to-jpg': {
    id: 'raw-to-jpg',
    title: 'RAW to JPG Converter - Convert DSLR Camera Photos to JPG',
    description:
      'Convert uncompressed Canon, Nikon, and Sony camera RAW files to high-resolution JPG images directly on your device.',
    h1: 'Convert DSLR Camera RAW Photos to JPG',
    subtitle:
      'Transforms uncompressed Canon (CR2), Nikon (NEF), and Sony camera RAW files to high-resolution JPEGs.',
    primaryKeyword: 'raw to jpg',
    gscQueries: [
      'raw to jpg',
      'cr2 to jpg',
      'nef to jpg',
      'convert dslr photo to jpg'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/raw-to-jpg',
    category: 'images'
  },
  'svg-to-jpg': {
    id: 'svg-to-jpg',
    title: 'SVG to JPG Converter - Convert Vector Graphics to High-Res JPG',
    description:
      'Rasterize SVG vector illustrations and logos into sharp, crisp JPG pictures at high resolution with solid backgrounds.',
    h1: 'Convert Vector SVG to Crisp JPG Images',
    subtitle:
      'Converts vector graphics and logos into crisp, high-resolution JPG images at any size.',
    primaryKeyword: 'svg to jpg',
    gscQueries: [
      'svg to jpg',
      'vector to jpg',
      'convert vector svg to jpg'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/svg-to-jpg',
    category: 'images'
  },
  'avif-to-jpg': {
    id: 'avif-to-jpg',
    title: 'AVIF to JPG Converter - Convert Next-Gen AVIF to Standard JPG',
    description:
      'Convert next-generation AVIF images to standard, universally supported JPG format with accurate colors and zero upload lag.',
    h1: 'Convert Next-Gen AVIF Images to Standard JPG',
    subtitle:
      'Converts next-generation AVIF images into standard JPGs with true colors and zero distortion.',
    primaryKeyword: 'avif to jpg',
    gscQueries: [
      'avif to jpg',
      'avif to jpg converter',
      'convert avif to jpg'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/avif-to-jpg',
    category: 'images'
  },
  'jpf-to-jpg': {
    id: 'jpf-to-jpg',
    title: 'JPF to JPG Converter - Convert JPEG 2000 (JPF) to Standard JPG',
    description:
      'Convert specialized JPEG 2000 (.jpf, .jp2) archival images to standard JPG format directly in your browser.',
    h1: 'Convert JPEG 2000 (JPF) to Standard JPG',
    subtitle:
      'Converts specialized JPEG 2000 images into standard, shareable JPG photos with full color preservation.',
    primaryKeyword: 'jpf to jpg',
    gscQueries: [
      'jpf to jpg',
      'jpeg 2000 to jpg',
      'jp2 to jpg'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/jpf-to-jpg',
    category: 'images'
  },
  'oip-to-jpg': {
    id: 'oip-to-jpg',
    title: 'OIP to JPG Converter - Restore Bing Image Search Thumbnails to JPG',
    description:
      'Restore cached Bing Image Search thumbnail files (OIP) into standard, full-compatibility JPG images.',
    h1: 'Convert Bing Search OIP Thumbnails to JPG',
    subtitle:
      'Extracts and restores Bing Image Search cached thumbnail files (OIP) to standard full-compatibility JPGs.',
    primaryKeyword: 'oip to jpg',
    gscQueries: [
      'oip to jpg',
      'oip to jpg converter',
      'oip to jpeg'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/oip-to-jpg',
    category: 'images'
  },
  'excel-to-jpg': {
    id: 'excel-to-jpg',
    title: 'Excel & Office to JPG Converter - Convert Tables to High-Res JPG',
    description:
      'Convert spreadsheet tables and office documents into crisp, high-definition JPG images for easy presentation and sharing.',
    h1: 'Convert Office Sheets & Slides to JPG',
    subtitle:
      'Renders spreadsheet tables (.xlsx) and presentation slide decks (.pptx) into individual high-definition JPG slides.',
    primaryKeyword: 'excel to jpg converter',
    gscQueries: [
      'excel to jpg converter',
      'ppt to jpg converter',
      'excel to jpg'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/excel-to-jpg',
    category: 'documents'
  },
  'heic-to-pdf': {
    id: 'heic-to-pdf',
    title: 'HEIC to PDF Converter - Convert iPhone Photos to PDF Free',
    description:
      'Convert Apple iPhone HEIC and HEIF photos into a single, compact PDF document directly in your browser. 100% private with zero file uploads.',
    h1: 'Convert Apple HEIC to PDF Document',
    subtitle:
      'Packages Apple iPhone HEIC and HEIF live photos into a clean, standardized PDF document for receipts and applications.',
    primaryKeyword: 'heic to pdf',
    gscQueries: [
      'heic to pdf',
      '.heic to pdf',
      'converter de heic para pdf',
      'converter heic para pdf'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/heic-to-pdf',
    category: 'documents'
  },
  'png-to-pdf': {
    id: 'png-to-pdf',
    title: 'PNG to PDF Converter - Merge PNG Images to PDF Free',
    description:
      'Merge multiple PNG graphics and scanned images into a single clean PDF document online. 100% private local processing with zero server uploads.',
    h1: 'Convert PNG Images to PDF Document',
    subtitle:
      'Combines multiple transparent or solid PNG pictures into an organized, high-resolution PDF document.',
    primaryKeyword: 'png to pdf',
    gscQueries: [
      'png to pdf',
      'png para pdf',
      'convert png to pdf',
      'merge png to pdf'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/png-to-pdf',
    category: 'documents'
  },
  'merge-jpg': {
    id: 'merge-jpg',
    title: 'Merge Multiple JPG to Single JPG - Free Photo Stitcher',
    description:
      'Merge multiple JPG photos into a single continuous image or contact sheet online. 100% private, free batch stitching with zero file uploads.',
    h1: 'Merge Multiple JPG to Single JPG',
    subtitle:
      'Combines and collates multiple JPG pictures into a single continuous vertical or grid photo canvas without uploading files.',
    primaryKeyword: 'multiple jpg to single jpg converter',
    gscQueries: [
      'multiple jpg to single jpg converter',
      'merge jpg',
      'multiple jpg to single jpg',
      'joint jpeg file'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/merge-jpg',
    category: 'optimization'
  },
  'html-to-jpg': {
    id: 'html-to-jpg',
    title: 'HTML to JPG Converter - Convert Web Code to High-Res JPG',
    description:
      'Convert HTML web code, markup, and page snippets into sharp, high-resolution JPG images. 100% private client-side rendering with zero uploads.',
    h1: 'Convert HTML Web Code to JPG Snapshot',
    subtitle:
      'Renders HTML markup and web code snippets into crisp, full-page JPG screenshots directly on your device.',
    primaryKeyword: 'convert html page to jpg',
    gscQueries: [
      'convert html page to jpg',
      'html to jpg',
      'convert html to jpg',
      'web to jpg tool'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/html-to-jpg',
    category: 'documents'
  },
  'compress-webp': {
    id: 'compress-webp',
    title: 'Compress WebP Images Online - Reduce File Size Fast & Free',
    description:
      'Compress Google WebP images to reduce file sizes by up to 80% with zero quality loss. 100% private in-browser optimization with batch ZIP download.',
    h1: 'Compress & Optimize WebP Images Online',
    subtitle:
      'Shrinks modern WebP pictures to ultra-lightweight byte sizes for lightning-fast website performance and email attachments.',
    primaryKeyword: 'compress webp',
    gscQueries: [
      'compress webp',
      'png to webp',
      'compress-webp',
      'webp size reducer'
    ],
    canonicalUrl: 'https://jpgconvertertool.com/compress-webp',
    category: 'optimization'
  }
};

/**
 * Returns SEO metadata for any format, defaulting to universal hub if not explicitly matched.
 */
export function getFormatSeoMetadata(formatId: string): FormatSeoMetadata {
  return FORMAT_SEO_MAP[formatId] || FORMAT_SEO_MAP.universal;
}
