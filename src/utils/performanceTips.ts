/**
 * Performance Tips and Web Vitals Optimization Guidelines
 * Dynamically provides contextual, format-specific advice for Google Core Web Vitals (LCP, CLS, INP)
 */

export interface WebVitalTip {
  vital: 'LCP' | 'CLS' | 'INP' | 'Payload';
  badgeColor: string;
  title: string;
  advice: string;
  metricTarget: string;
}

export interface FormatPerformanceAdvice {
  formatId: string;
  formatName: string;
  headline: string;
  recommendedQuality: number;
  recommendedTargetKb: number | null;
  recommendedStripExif: boolean;
  recommendedWidth?: number;
  recommendedHeight?: number;
  recommendedPresetLabel: string;
  savingsEstimate: string;
  tips: WebVitalTip[];
  codeSnippet: string;
}

const DEFAULT_ADVICE: FormatPerformanceAdvice = {
  formatId: 'universal',
  formatName: 'Universal JPG Converter',
  headline: 'Core Web Vitals Optimization for Web Images',
  recommendedQuality: 82,
  recommendedTargetKb: 75,
  recommendedStripExif: true,
  recommendedPresetLabel: 'Web Optimized (< 75KB, Q82%)',
  savingsEstimate: '60% - 85% file size reduction',
  tips: [
    {
      vital: 'LCP',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      title: 'Hero Image Budget (< 100 KB)',
      advice: 'Target file sizes below 100 KB for above-the-fold banner images so the browser completes LCP in under 2.5 seconds on 4G networks.',
      metricTarget: 'LCP < 2.5s'
    },
    {
      vital: 'CLS',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      title: 'Prevent Layout Shifts with Dimensions',
      advice: 'Always declare explicit width and height attributes or CSS aspect-ratio on the <img> tag so the layout box is reserved before image loads.',
      metricTarget: 'CLS = 0.0'
    },
    {
      vital: 'INP',
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      title: 'Async Decoding & Responsive Sizing',
      advice: 'Use decoding="async" to prevent image rasterization from blocking user clicks, scrolls, and JavaScript event loop execution.',
      metricTarget: 'INP < 200ms'
    },
    {
      vital: 'Payload',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      title: 'Strip EXIF Metadata',
      advice: 'Camera and phone photos carry 10KB to 50KB of unneeded GPS, lens, and timestamp metadata. Stripping EXIF saves instant payload bytes.',
      metricTarget: 'Save 15KB - 50KB'
    }
  ],
  codeSnippet: '<img src="image.jpg" width="1200" height="630" decoding="async" loading="lazy" alt="Optimized visual" />'
};

const FORMAT_ADVICE_MAP: Record<string, Partial<FormatPerformanceAdvice>> = {
  'png-to-jpg': {
    formatName: 'PNG to JPG',
    headline: 'Eliminating Heavy Transparent PNG Bloat for Faster LCP',
    recommendedQuality: 82,
    recommendedTargetKb: 60,
    recommendedStripExif: true,
    recommendedPresetLabel: 'Solid BG + Fast LCP (< 60KB, Q82%)',
    savingsEstimate: '75% - 90% reduction vs PNG',
    tips: [
      {
        vital: 'LCP',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        title: 'Massive Payload Reduction',
        advice: 'Uncompressed 24-bit PNGs often exceed 2MB to 4MB. Converting to JPG with a clean solid background drops the payload to ~60KB without visual loss.',
        metricTarget: 'LCP < 2.5s'
      },
      {
        vital: 'CLS',
        badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        title: 'Aspect Ratio Preservation',
        advice: 'Maintain the exact width/height ratio when placing product photos so surrounding text does not jump when the JPG renders.',
        metricTarget: 'CLS = 0.0'
      },
      {
        vital: 'Payload',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        title: 'Quality 80-85% Sweet Spot',
        advice: 'JPG compression between 80% and 85% eliminates color banding on solid backgrounds while cutting file size in half compared to 95% quality.',
        metricTarget: 'Cut 50% vs Q95%'
      }
    ],
    codeSnippet: '<img src="product.jpg" width="800" height="600" loading="lazy" decoding="async" alt="Optimized product" />'
  },

  'jpeg-to-jpg': {
    formatName: 'JPEG Compression (Target KB)',
    headline: 'Strict KB Budgeting for Web Vitals & Form Portals',
    recommendedQuality: 78,
    recommendedTargetKb: 50,
    recommendedStripExif: true,
    recommendedPresetLabel: 'Strict 50KB Cap (Q78%)',
    savingsEstimate: 'Guaranteed under 50KB',
    tips: [
      {
        vital: 'Payload',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        title: 'Strict Sub-50KB Cap for Portal Compliance',
        advice: 'Government portals and web application forms strictly enforce 30KB or 50KB maximum file limits. Our iterative quantization hits the ceiling exactly.',
        metricTarget: '< 50 KB strict'
      },
      {
        vital: 'LCP',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        title: 'Instantaneous Mobile Load',
        advice: 'At under 50KB, mobile devices on slow 3G or constrained cellular connections render images in less than 200ms.',
        metricTarget: 'Sub-200ms transfer'
      },
      {
        vital: 'INP',
        badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        title: 'Zero Memory Overhead',
        advice: 'Compact file sizes minimize device memory allocation, preventing mobile browser jank during interactive form completion.',
        metricTarget: 'INP < 100ms'
      }
    ],
    codeSnippet: '<img src="profile-50kb.jpg" width="400" height="400" decoding="async" alt="Verified 50KB profile" />'
  },

  'heic-to-jpg': {
    formatName: 'Apple HEIC to JPG',
    headline: 'Universal Compatibility & High-Res Downscaling for LCP',
    recommendedQuality: 84,
    recommendedTargetKb: 100,
    recommendedStripExif: true,
    recommendedPresetLabel: 'Web Optimized (< 100KB, Strip EXIF)',
    savingsEstimate: '70% - 85% smaller than original camera export',
    tips: [
      {
        vital: 'LCP',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        title: 'Downscale 48MP/12MP Camera Files',
        advice: 'iPhone cameras capture 4032x3024 or 8064x6048 pixels. Scaling down to 1920px width keeps the payload under 100KB while looking flawless on Retina screens.',
        metricTarget: 'Downscale to 1920px'
      },
      {
        vital: 'Payload',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        title: 'Strip Heavy Apple Metadata',
        advice: 'HEIC images contain HDR color profiles, depth maps, and live photo data. Converting to clean JPG strips 30KB - 80KB of hidden data.',
        metricTarget: 'Save 30KB - 80KB'
      },
      {
        vital: 'INP',
        badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        title: '100% Universal Native Decoding',
        advice: 'HEIC is unsupported on Chrome for Windows and Android. Converting to standard JPG enables hardware-accelerated instant rendering everywhere.',
        metricTarget: 'Zero decode latency'
      }
    ],
    codeSnippet: '<img src="iphone-photo.jpg" width="1200" height="900" loading="lazy" decoding="async" alt="Converted iPhone photo" />'
  },

  'webp-to-jpg': {
    formatName: 'WebP to JPG',
    headline: 'Universal Fallback Optimization for Email & Legacy Clients',
    recommendedQuality: 85,
    recommendedTargetKb: 80,
    recommendedStripExif: true,
    recommendedPresetLabel: 'Universal Fallback (< 80KB, Q85%)',
    savingsEstimate: 'Universal client compatibility',
    tips: [
      {
        vital: 'LCP',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        title: 'HTML <picture> Progressive Enhancement',
        advice: 'Use WebP as the primary modern source, with the converted JPG as the standard fallback in <picture> for 100% device reach without losing Web Vitals points.',
        metricTarget: 'Perfect dual delivery'
      },
      {
        vital: 'CLS',
        badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        title: 'Identical Coordinate Bounding',
        advice: 'Ensure the fallback JPG shares identical pixel aspect ratio with the WebP source to avoid layout shifts when fallback triggers.',
        metricTarget: 'CLS = 0.0'
      }
    ],
    codeSnippet: '<picture>\n  <source srcset="image.webp" type="image/webp" />\n  <img src="image.jpg" width="800" height="450" loading="lazy" alt="Fallback visual" />\n</picture>'
  },

  'pdf-to-jpg': {
    formatName: 'PDF to JPG Document Pages',
    headline: 'Optimal DPI Selection for Crisp Text and Low Page Weight',
    recommendedQuality: 85,
    recommendedTargetKb: 150,
    recommendedStripExif: true,
    recommendedPresetLabel: '150 DPI Screen Standard (< 150KB)',
    savingsEstimate: '50% smaller than 300 DPI print renders',
    tips: [
      {
        vital: 'LCP',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        title: 'Use 150 DPI for Web & Mobile Screens',
        advice: '150 DPI provides needle-sharp document text on 4K and Retina displays while using only 25% of the memory footprint of 300 DPI print scans.',
        metricTarget: '150 DPI screen target'
      },
      {
        vital: 'LCP',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        title: 'Lazy Load Subsequent Pages',
        advice: 'For multi-page documents, load Page 1 eagerly for fast LCP, and apply loading="lazy" to Pages 2+ to prevent network congestion.',
        metricTarget: 'Eager Page 1, Lazy Rest'
      },
      {
        vital: 'CLS',
        badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        title: 'Standard US-Letter / A4 Aspect Ratios',
        advice: 'Standard A4 documents adhere to 1:1.414 aspect ratio. Reserve this ratio in CSS before page images finish loading.',
        metricTarget: 'aspect-ratio: 1 / 1.414'
      }
    ],
    codeSnippet: '<img src="page-1.jpg" width="850" height="1100" style="aspect-ratio: 850/1100;" fetchpriority="high" alt="Document Page 1" />'
  },

  'passport-photo-to-jpg': {
    formatName: 'Passport Photo Resizer',
    headline: 'Strict 1:1 Aspect Ratio & Zero Layout Shift for Biometrics',
    recommendedQuality: 90,
    recommendedTargetKb: 100,
    recommendedStripExif: true,
    recommendedWidth: 600,
    recommendedHeight: 600,
    recommendedPresetLabel: 'Official 600x600 px (2x2 inch)',
    savingsEstimate: 'Exact 600x600 px portal specifications',
    tips: [
      {
        vital: 'CLS',
        badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        title: 'Strict 1:1 Square Ratio Eliminates CLS',
        advice: 'Standard passport photos are exactly 600x600 px (2x2 inches). Pre-styling the container with width="600" height="600" ensures zero layout shift.',
        metricTarget: 'CLS = 0.0'
      },
      {
        vital: 'Payload',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        title: 'Keep Between 20KB and 100KB',
        advice: 'Most visa and passport portals (US State Dept, Indian Passport Seva, UK Home Office) reject photos over 240KB or under 20KB. Target 80KB.',
        metricTarget: '20KB < Size < 240KB'
      },
      {
        vital: 'INP',
        badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        title: 'Fast Biometric Verification',
        advice: 'Correctly dimensioned 600x600 px images allow automated facial recognition algorithms on embassy servers to validate without resizing delays.',
        metricTarget: 'Instant validation'
      }
    ],
    codeSnippet: '<img src="passport-photo.jpg" width="600" height="600" alt="Official 2x2 passport photo" />'
  },

  'compress-jpg': {
    formatName: 'Compress JPG',
    headline: 'Lossless Perceptual Tuning for Maximum Core Web Vitals Score',
    recommendedQuality: 82,
    recommendedTargetKb: 70,
    recommendedStripExif: true,
    recommendedPresetLabel: 'High Speed LCP (< 70KB, Q82%)',
    savingsEstimate: '65% - 80% file size reduction',
    tips: [
      {
        vital: 'LCP',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        title: 'Quality 82% vs 95% Threshold',
        advice: 'Human eyes cannot distinguish between 82% and 95% JPEG quality on screen, but 82% quality cuts file size by up to 60%, drastically cutting LCP time.',
        metricTarget: '60% byte cut'
      },
      {
        vital: 'LCP',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        title: 'Preload the LCP Hero Image',
        advice: 'Add <link rel="preload" as="image" href="hero.jpg" fetchpriority="high"> in the HTML <head> for your primary banner image.',
        metricTarget: 'Early discovery'
      },
      {
        vital: 'Payload',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        title: 'Batch Optimization for Galleries',
        advice: 'Reducing a 20-image gallery from 500KB to 70KB per image saves 8.6 MB of mobile data per visitor.',
        metricTarget: 'Save 8.6 MB per page'
      }
    ],
    codeSnippet: '<link rel="preload" fetchpriority="high" as="image" href="hero.jpg" type="image/jpeg" />'
  },

  'video-to-jpg': {
    formatName: 'Video Frame to JPG',
    headline: 'High-Performance Video Poster Frame Optimization',
    recommendedQuality: 84,
    recommendedTargetKb: 80,
    recommendedStripExif: true,
    recommendedPresetLabel: 'Video Poster Frame (< 80KB)',
    savingsEstimate: 'Prevents video buffer delay',
    tips: [
      {
        vital: 'CLS',
        badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        title: 'Prevent Video Layout Shifts',
        advice: 'Without a poster image, <video> elements collapse or resize abruptly when metadata loads. A JPG poster locks the video box in place before playback.',
        metricTarget: 'CLS = 0.0'
      },
      {
        vital: 'LCP',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        title: 'Immediate First Frame Display',
        advice: 'Serving an 80KB JPG poster lets visitors see the video subject immediately while the multi-megabyte video file buffers in the background.',
        metricTarget: 'Instant LCP visual'
      }
    ],
    codeSnippet: '<video controls poster="snapshot.jpg" width="1280" height="720" preload="none">\n  <source src="video.mp4" type="video/mp4" />\n</video>'
  },

  'tiff-to-jpg': {
    formatName: 'TIFF to JPG',
    headline: 'Transforming Heavy Scanner Files into Fast Web Images',
    recommendedQuality: 82,
    recommendedTargetKb: 120,
    recommendedStripExif: true,
    recommendedPresetLabel: 'Clean Web Scan (< 120KB, Q82%)',
    savingsEstimate: '95%+ reduction vs 30MB TIFF',
    tips: [
      {
        vital: 'LCP',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        title: 'Eliminate 30MB+ Scan Bottlenecks',
        advice: 'Uncompressed TIFF scans from office hardware easily weigh 20MB to 50MB. Converting to JPG cuts size to ~120KB, turning a 10s load into under 150ms.',
        metricTarget: '95%+ size cut'
      },
      {
        vital: 'INP',
        badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        title: 'Prevent Browser Tab Memory Freezes',
        advice: 'Decoding a raw 48-bit TIFF can consume 400MB of RAM on mobile phones. Standard JPG decodes efficiently on the GPU without freezing interactions.',
        metricTarget: 'Low RAM footprint'
      }
    ],
    codeSnippet: '<img src="scan.jpg" width="1200" height="1600" loading="lazy" decoding="async" alt="Scanned document" />'
  },

  'raw-to-jpg': {
    formatName: 'DSLR RAW to JPG',
    headline: 'High-Bitrate Photography to Crisp Web Asset',
    recommendedQuality: 85,
    recommendedTargetKb: 120,
    recommendedStripExif: true,
    recommendedPresetLabel: 'Retina Ready (< 120KB, Q85%)',
    savingsEstimate: '98% smaller than 40MB RAW',
    tips: [
      {
        vital: 'LCP',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        title: 'Web Delivery Compression',
        advice: 'Canon CR2, Nikon NEF, and Sony ARW files cannot be displayed natively in web browsers. Flat JPG rendering at 85% gives professional clarity under 120KB.',
        metricTarget: 'LCP < 2.5s'
      },
      {
        vital: 'Payload',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        title: 'Full EXIF Stripping',
        advice: 'Camera RAW files embed proprietary camera maker tags and high-res thumbnail previews. Stripping EXIF saves up to 100KB per file.',
        metricTarget: 'Save up to 100KB'
      }
    ],
    codeSnippet: '<img src="photo.jpg" width="1600" height="1066" loading="lazy" decoding="async" alt="Professional photography" />'
  }
};

/**
 * Returns tailored Web Vitals advice and recommended compression targets for a given format spoke.
 */
export function getPerformanceAdviceForFormat(formatId: string): FormatPerformanceAdvice {
  const custom = FORMAT_ADVICE_MAP[formatId];
  if (!custom) {
    return {
      ...DEFAULT_ADVICE,
      formatId,
      formatName: formatId.replace(/-/g, ' ').toUpperCase(),
    };
  }
  return {
    ...DEFAULT_ADVICE,
    ...custom,
    formatId,
  };
}
