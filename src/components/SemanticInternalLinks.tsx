import React from 'react';
import { ArrowRight, ChevronRight, Layers, FileText, Image, SlidersHorizontal, Sparkles } from 'lucide-react';

interface SemanticInternalLinksProps {
  activeFormat: string;
  onSelectFormat: (formatId: string) => void;
}

interface ToolLink {
  id: string;
  title: string;
  anchorText: string;
  description: string;
  category: 'images' | 'documents' | 'optimization';
  intent: string;
}

export const ALL_TOOL_PAGES: ToolLink[] = [
  // Image Converters
  {
    id: 'universal',
    title: 'Universal Image to JPG',
    anchorText: 'Convert any image to JPG online',
    description: 'Accepts PNG, WebP, HEIC, TIFF, PDF, AVIF, RAW, and video files with zero quality loss.',
    category: 'images',
    intent: 'General conversion tool',
  },
  {
    id: 'png-to-jpg',
    title: 'PNG to JPG Converter',
    anchorText: 'Convert PNG to JPG with solid background color',
    description: 'Converts transparent PNGs into clean JPEG files with custom background colors.',
    category: 'images',
    intent: 'Solid background fill',
  },
  {
    id: 'webp-to-jpg',
    title: 'WebP to JPG Converter',
    anchorText: 'Convert modern WebP to standard JPG',
    description: 'Turns web-optimized Google WebP files into universally compatible JPEG images.',
    category: 'images',
    intent: 'Modern web image conversion',
  },
  {
    id: 'heic-to-jpg',
    title: 'Apple HEIC to JPG Converter',
    anchorText: 'Convert iPhone HEIC photos to JPG',
    description: 'Converts Apple iOS HEIC & HEIF live photos into standard JPEGs compatible everywhere.',
    category: 'images',
    intent: 'iPhone photo conversion',
  },
  {
    id: 'avif-to-jpg',
    title: 'AVIF to JPG Converter',
    anchorText: 'Convert next-gen AVIF to standard JPG',
    description: 'Converts next-generation AVIF images into standard JPGs with true colors and zero distortion.',
    category: 'images',
    intent: 'Modern photo conversion',
  },
  {
    id: 'raw-to-jpg',
    title: 'Camera RAW to JPG',
    anchorText: 'Convert DSLR RAW photos (CR2, NEF) to JPG',
    description: 'Transforms uncompressed Canon, Nikon, and Sony camera RAW files to high-resolution JPEGs.',
    category: 'images',
    intent: 'Camera photo conversion',
  },
  {
    id: 'psd-to-jpg',
    title: 'Photoshop PSD to JPG',
    anchorText: 'Export Photoshop PSD layers to JPG',
    description: 'Converts Adobe Photoshop project files into flattened, shareable JPEG pictures.',
    category: 'images',
    intent: 'Design file export',
  },
  {
    id: 'svg-to-jpg',
    title: 'Vector SVG to JPG',
    anchorText: 'Convert SVG vector graphics to sharp JPG',
    description: 'Converts vector graphics and logos into crisp, high-resolution JPG images at any size.',
    category: 'images',
    intent: 'Graphics & logos',
  },
  {
    id: 'jfif-to-jpg',
    title: 'JFIF to Standard JPG',
    anchorText: 'Fix JFIF files by saving as true JPG',
    description: 'Corrects Windows JFIF files into universally accepted JPEG files with valid headers.',
    category: 'images',
    intent: 'Standard format fix',
  },
  {
    id: 'jpf-to-jpg',
    title: 'JPF & JPEG 2000 to JPG',
    anchorText: 'Convert JPEG 2000 (JPF) to standard JPG',
    description: 'Converts specialized JPEG 2000 images into standard, shareable JPG photos.',
    category: 'images',
    intent: 'Specialized image conversion',
  },

  // Document & Video Converters
  {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG Converter',
    anchorText: 'Extract PDF pages into high-res JPG images',
    description: 'Converts multi-page PDF documents into sharp, clear individual JPG images.',
    category: 'documents',
    intent: 'Document extraction',
  },
  {
    id: 'tiff-to-pdf',
    title: 'TIFF to PDF Converter',
    anchorText: 'Merge scanned multi-page TIFF into PDF',
    description: 'Combines scanned office documents and multi-page TIFF files into a single PDF file.',
    category: 'documents',
    intent: 'Office document archiving',
  },
  {
    id: 'tiff-to-jpg',
    title: 'TIFF to JPG Converter',
    anchorText: 'Convert high-resolution TIFF scans to JPG',
    description: 'Converts heavy uncompressed TIFF files into compact, shareable JPEG images.',
    category: 'documents',
    intent: 'Document scan conversion',
  },
  {
    id: 'word-to-jpg',
    title: 'Word DOCX to JPG Pages',
    anchorText: 'Convert Microsoft Word DOCX to JPG images',
    description: 'Renders Word documents into high-resolution JPG pages without needing Office software.',
    category: 'documents',
    intent: 'Word document rendering',
  },
  {
    id: 'jpg-to-word',
    title: 'JPG to Word Converter',
    anchorText: 'Convert JPG images to editable Word DOCX',
    description: 'Extracts printed text from photos into editable Microsoft Word documents.',
    category: 'documents',
    intent: 'Extract text to Word document',
  },
  {
    id: 'video-to-jpg',
    title: 'Video Frame to JPG Extractor',
    anchorText: 'Extract HD video frames to JPG photos',
    description: 'Captures full-resolution still pictures from MP4, WebM, and MOV videos at any timestamp.',
    category: 'documents',
    intent: 'Video frame capture',
  },

  // Optimization & Sizing
  {
    id: 'jpeg-to-jpg',
    title: 'JPEG to JPG Size Compressor',
    anchorText: 'Compress JPEG to exact file sizes',
    description: 'Calculates optimal compression to hit strict portal limits like under 50KB or 100KB.',
    category: 'optimization',
    intent: 'File size limit',
  },
  {
    id: 'compress-jpg',
    title: 'Compress JPG Images',
    anchorText: 'Compress JPG images under 50KB or 100KB',
    description: 'Reduces image file size by up to 80% while keeping visual clarity for fast web loading.',
    category: 'optimization',
    intent: 'File size reduction',
  },
  {
    id: 'passport-photo-to-jpg',
    title: 'Passport & Visa Photo Resizer',
    anchorText: 'Resize photos for passport & visa portals',
    description: 'Enforces exact 600×600 px dimensions and strict file size caps for official portals.',
    category: 'optimization',
    intent: 'Passport & visa standards',
  },
  {
    id: 'batch-jpg-converter',
    title: 'Batch JPG Converter',
    anchorText: 'Batch convert multiple images to JPG',
    description: 'Convert 50+ photos at once smoothly without slowing down your phone, and download all as a ZIP file.',
    category: 'optimization',
    intent: 'Multi-file batch conversion',
  },
  {
    id: 'whatsapp-image-to-jpg',
    title: 'WhatsApp Media to JPG',
    anchorText: 'Convert WhatsApp photos & stickers to JPG',
    description: 'Converts downloaded WhatsApp WebP stickers and compressed media into standard JPGs.',
    category: 'optimization',
    intent: 'Messaging photos to JPG',
  },
  {
    id: 'heic-to-pdf',
    title: 'HEIC to PDF Converter',
    anchorText: 'Convert iPhone HEIC photos directly to PDF',
    description: 'Packages iPhone camera photos and receipts into an organized, single PDF document.',
    category: 'documents',
    intent: 'iPhone photo to PDF document',
  },
  {
    id: 'png-to-pdf',
    title: 'PNG to PDF Converter',
    anchorText: 'Merge PNG images into a clean PDF document',
    description: 'Combines multiple transparent or solid PNG pictures into an organized, high-resolution PDF file.',
    category: 'documents',
    intent: 'Graphics to multi-page PDF',
  },
  {
    id: 'merge-jpg',
    title: 'Merge Multiple JPGs',
    anchorText: 'Merge multiple JPG photos into a single image',
    description: 'Combines multiple photos into a single continuous vertical or grid image canvas.',
    category: 'optimization',
    intent: 'Stitch photos together',
  },
  {
    id: 'html-to-jpg',
    title: 'HTML to JPG Web Snapshot',
    anchorText: 'Convert HTML code snippets to high-res JPG',
    description: 'Renders HTML code, web markup, and styled components into crisp JPG screenshots.',
    category: 'documents',
    intent: 'Web code to image snapshot',
  },
  {
    id: 'compress-webp',
    title: 'Compress WebP Images',
    anchorText: 'Compress modern WebP images without quality loss',
    description: 'Shrinks modern Google WebP files by up to 80% for fast website loading and email sharing.',
    category: 'optimization',
    intent: 'Web image compression',
  },
];

// Mapping of format IDs to their most relevant semantic siblings
const SIBLING_MAP: Record<string, string[]> = {
  universal: ['png-to-jpg', 'heic-to-jpg', 'pdf-to-jpg', 'compress-jpg'],
  'png-to-jpg': ['webp-to-jpg', 'heic-to-jpg', 'compress-jpg', 'universal'],
  'webp-to-jpg': ['avif-to-jpg', 'png-to-jpg', 'compress-jpg', 'universal'],
  'heic-to-jpg': ['avif-to-jpg', 'batch-jpg-converter', 'png-to-jpg', 'passport-photo-to-jpg'],
  'avif-to-jpg': ['webp-to-jpg', 'heic-to-jpg', 'png-to-jpg', 'universal'],
  'pdf-to-jpg': ['word-to-jpg', 'tiff-to-pdf', 'tiff-to-jpg', 'jpg-to-word'],
  'tiff-to-pdf': ['tiff-to-jpg', 'pdf-to-jpg', 'word-to-jpg', 'jpg-to-word'],
  'tiff-to-jpg': ['tiff-to-pdf', 'raw-to-jpg', 'pdf-to-jpg', 'psd-to-jpg'],
  'word-to-jpg': ['jpg-to-word', 'pdf-to-jpg', 'tiff-to-pdf', 'universal'],
  'jpg-to-word': ['word-to-jpg', 'pdf-to-jpg', 'tiff-to-jpg', 'universal'],
  'video-to-jpg': ['png-to-jpg', 'batch-jpg-converter', 'compress-jpg', 'universal'],
  'jpeg-to-jpg': ['compress-jpg', 'passport-photo-to-jpg', 'batch-jpg-converter', 'png-to-jpg'],
  'compress-jpg': ['passport-photo-to-jpg', 'jpeg-to-jpg', 'batch-jpg-converter', 'png-to-jpg'],
  'passport-photo-to-jpg': ['compress-jpg', 'jpeg-to-jpg', 'png-to-jpg', 'batch-jpg-converter'],
  'batch-jpg-converter': ['heic-to-jpg', 'compress-jpg', 'png-to-jpg', 'universal'],
  'raw-to-jpg': ['tiff-to-jpg', 'psd-to-jpg', 'heic-to-jpg', 'compress-jpg'],
  'psd-to-jpg': ['raw-to-jpg', 'svg-to-jpg', 'png-to-jpg', 'universal'],
  'svg-to-jpg': ['psd-to-jpg', 'png-to-jpg', 'webp-to-jpg', 'universal'],
  'jfif-to-jpg': ['png-to-jpg', 'compress-jpg', 'webp-to-jpg', 'universal'],
  'jpf-to-jpg': ['jfif-to-jpg', 'tiff-to-jpg', 'png-to-jpg', 'universal'],
  'whatsapp-image-to-jpg': ['webp-to-jpg', 'heic-to-jpg', 'compress-jpg', 'png-to-jpg'],
  'heic-to-pdf': ['heic-to-jpg', 'pdf-to-jpg', 'png-to-pdf', 'tiff-to-pdf'],
  'png-to-pdf': ['png-to-jpg', 'heic-to-pdf', 'tiff-to-pdf', 'pdf-to-jpg'],
  'merge-jpg': ['batch-jpg-converter', 'compress-jpg', 'passport-photo-to-jpg', 'universal'],
  'html-to-jpg': ['word-to-jpg', 'pdf-to-jpg', 'svg-to-jpg', 'universal'],
  'compress-webp': ['webp-to-jpg', 'compress-jpg', 'png-to-jpg', 'universal'],
};

export const SemanticInternalLinks: React.FC<SemanticInternalLinksProps> = ({
  activeFormat,
  onSelectFormat,
}) => {
  const currentTool = ALL_TOOL_PAGES.find((t) => t.id === activeFormat) || ALL_TOOL_PAGES[0];
  const siblingIds = SIBLING_MAP[activeFormat] || SIBLING_MAP.universal;
  const siblingTools = siblingIds
    .map((id) => ALL_TOOL_PAGES.find((t) => t.id === id))
    .filter(Boolean) as ToolLink[];

  return (
    <section aria-label="Related Conversion Tools" className="mt-12 space-y-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
      {/* Semantic Breadcrumbs for Navigation & Crawlers */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
        <button
          onClick={() => onSelectFormat('universal')}
          className="hover:text-red-600 dark:hover:text-white transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-neutral-400">Converters</span>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-neutral-900 dark:text-white font-medium">
          {currentTool.title}
        </span>
      </nav>

      {/* Contextual Sibling Recommendations */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-500" />
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
              Related Conversion Tools
            </h3>
          </div>
          <span className="text-xs text-neutral-500 font-mono">
            {siblingTools.length} quick options
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {siblingTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => {
                onSelectFormat(tool.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#09090b] hover:border-red-500 dark:hover:border-red-500/70 transition-all group flex flex-col justify-between shadow-xs"
            >
              <div>
                <span className="text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors flex items-center justify-between">
                  <span>{tool.title}</span>
                  <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-red-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </span>
                <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                  {tool.anchorText}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-900 text-[10px] font-mono text-neutral-400 flex items-center justify-between">
                <span>{tool.intent}</span>
                <span className="text-red-500 font-semibold">Open →</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Comprehensive Categorized Directory (Fixes all orphan pages) */}
      <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/40 p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-900 dark:text-white font-bold">
              All Supported Formats &amp; Tools ({ALL_TOOL_PAGES.length})
            </h4>
            <p className="text-xs text-neutral-500 mt-0.5">
              All tools run privately in your browser with zero file uploads or account requirements.
            </p>
          </div>
          <button
            onClick={() => {
              onSelectFormat('universal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs text-red-600 dark:text-red-400 hover:underline font-medium inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Convert Images Now</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Image Formats */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider font-mono">
              <Image className="w-3.5 h-3.5 text-red-500" />
              <span>Image Formats ({ALL_TOOL_PAGES.filter((t) => t.category === 'images').length})</span>
            </div>
            <ul className="space-y-1.5 text-xs">
              {ALL_TOOL_PAGES.filter((t) => t.category === 'images').map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => {
                      onSelectFormat(t.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-2 py-1 rounded transition-colors text-xs flex items-center justify-between group ${
                      activeFormat === t.id
                        ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-semibold'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-900'
                    }`}
                  >
                    <span className="truncate">{t.title}</span>
                    <span className="text-[10px] text-neutral-400 group-hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Documents & Media */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider font-mono">
              <FileText className="w-3.5 h-3.5 text-red-500" />
              <span>Documents &amp; Media ({ALL_TOOL_PAGES.filter((t) => t.category === 'documents').length})</span>
            </div>
            <ul className="space-y-1.5 text-xs">
              {ALL_TOOL_PAGES.filter((t) => t.category === 'documents').map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => {
                      onSelectFormat(t.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-2 py-1 rounded transition-colors text-xs flex items-center justify-between group ${
                      activeFormat === t.id
                        ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-semibold'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-900'
                    }`}
                  >
                    <span className="truncate">{t.title}</span>
                    <span className="text-[10px] text-neutral-400 group-hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Sizing & Portals */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider font-mono">
              <SlidersHorizontal className="w-3.5 h-3.5 text-red-500" />
              <span>Optimization &amp; Portals ({ALL_TOOL_PAGES.filter((t) => t.category === 'optimization').length})</span>
            </div>
            <ul className="space-y-1.5 text-xs">
              {ALL_TOOL_PAGES.filter((t) => t.category === 'optimization').map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => {
                      onSelectFormat(t.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-2 py-1 rounded transition-colors text-xs flex items-center justify-between group ${
                      activeFormat === t.id
                        ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-semibold'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-900'
                    }`}
                  >
                    <span className="truncate">{t.title}</span>
                    <span className="text-[10px] text-neutral-400 group-hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
