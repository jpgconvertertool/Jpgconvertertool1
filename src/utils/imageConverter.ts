/**
 * Core image processing and conversion utility calculations.
 */

export interface ResizeDimensions {
  width: number;
  height: number;
}

/**
 * Calculates aspect-ratio preserved dimensions for target scaling or max bounds.
 */
export function calculateAspectRatioFit(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
): ResizeDimensions {
  if (srcWidth <= 0 || srcHeight <= 0) {
    return { width: Math.max(1, maxWidth), height: Math.max(1, maxHeight) };
  }

  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight, 1);
  return {
    width: Math.round(srcWidth * ratio),
    height: Math.round(srcHeight * ratio),
  };
}

/**
 * Calculates scaled dimensions based on percentage (e.g., 50% = 0.5)
 */
export function calculateScaleDimensions(
  srcWidth: number,
  srcHeight: number,
  scaleFraction: number
): ResizeDimensions {
  const scale = Math.max(0.01, Math.min(scaleFraction, 4));
  return {
    width: Math.max(1, Math.round(srcWidth * scale)),
    height: Math.max(1, Math.round(srcHeight * scale)),
  };
}

/**
 * Formats file size in bytes to human-readable string (KB or MB).
 */
export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Normalizes input filename to output standard .jpg filename
 */
export function getOutputJpgFilename(originalName: string, suffix: string = ''): string {
  const dotIndex = originalName.lastIndexOf('.');
  const baseName = dotIndex !== -1 ? originalName.slice(0, dotIndex) : originalName;
  const cleanBase = baseName.replace(/[^a-zA-Z0-9_\-\s]/g, '').trim() || 'converted_image';
  return `${cleanBase}${suffix}.jpg`;
}

/**
 * Detects true image format from header bytes (distinguishes ISO BMFF AVIF vs. HEIC, JPEG, PNG, WebP).
 */
export function detectRealFileTypeFromBytes(bytes: Uint8Array): { format: string; mime: string } {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { format: 'jpg', mime: 'image/jpeg' };
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a
  ) {
    return { format: 'png', mime: 'image/png' };
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) {
    return { format: 'webp', mime: 'image/webp' };
  }
  if (
    bytes.length >= 6 &&
    bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 &&
    bytes[3] === 0x38 && (bytes[4] === 0x37 || bytes[4] === 0x39) && bytes[5] === 0x61
  ) {
    return { format: 'gif', mime: 'image/gif' };
  }
  if (bytes.length >= 2 && bytes[0] === 0x42 && bytes[1] === 0x4d) {
    return { format: 'bmp', mime: 'image/bmp' };
  }
  if (
    bytes.length >= 4 &&
    bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46
  ) {
    return { format: 'pdf', mime: 'application/pdf' };
  }
  if (
    bytes.length >= 4 &&
    ((bytes[0] === 0x49 && bytes[1] === 0x49 && bytes[2] === 0x2a && bytes[3] === 0x00) ||
     (bytes[0] === 0x4d && bytes[1] === 0x4d && bytes[2] === 0x00 && bytes[3] === 0x2a))
  ) {
    return { format: 'tiff', mime: 'image/tiff' };
  }

  // ISO Base Media File Format box inspection: bytes 4..7 == 'ftyp'
  if (
    bytes.length >= 12 &&
    bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70
  ) {
    const brand = String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11]).toLowerCase();
    if (['avif', 'avis'].includes(brand)) {
      return { format: 'avif', mime: 'image/avif' };
    }
    if (['heic', 'heix', 'hevc', 'heim', 'heis', 'mif1', 'msf1'].includes(brand)) {
      return { format: 'heic', mime: 'image/heic' };
    }
    // Check compatible brands if primary brand is generic
    const fullHeaderStr = String.fromCharCode(...bytes.slice(8, Math.min(bytes.length, 32))).toLowerCase();
    if (fullHeaderStr.includes('avif') || fullHeaderStr.includes('avis')) {
      return { format: 'avif', mime: 'image/avif' };
    }
    if (fullHeaderStr.includes('heic') || fullHeaderStr.includes('mif1')) {
      return { format: 'heic', mime: 'image/heic' };
    }
  }

  return { format: 'unknown', mime: 'application/octet-stream' };
}

/**
 * Reads initial file slice to detect real file format by bytes.
 */
export async function detectRealFileType(file: Blob): Promise<{ format: string; mime: string }> {
  try {
    const slice = file.slice(0, 32);
    const buffer = await slice.arrayBuffer();
    return detectRealFileTypeFromBytes(new Uint8Array(buffer));
  } catch {
    return { format: 'unknown', mime: file.type || 'application/octet-stream' };
  }
}

/**
 * Checks if a MIME type or file extension is supported by the universal converter
 */
export function isSupportedImageFormat(filename: string, mimeType?: string): boolean {
  const supportedExtensions = [
    'png', 'jpeg', 'jpg', 'webp', 'gif', 'bmp', 'avif', 'svg', 
    'tiff', 'tif', 'jfif', 'jpf', 'heic', 'heif', 'cr2', 'nef', 'psd', 'pdf', 'mp4', 'webm'
  ];
  
  if (mimeType && mimeType.startsWith('image/')) return true;
  if (mimeType && (mimeType === 'application/pdf' || mimeType.startsWith('video/'))) return true;

  const dot = filename.lastIndexOf('.');
  if (dot === -1) return false;
  const ext = filename.slice(dot + 1).toLowerCase();
  return supportedExtensions.includes(ext);
}

/**
 * Evaluates initial quality guess for target KB constraint.
 */
export function estimateInitialQualityForTargetKB(currentBytes: number, targetKB: number): number {
  if (targetKB <= 0) return 0.85;
  const targetBytes = targetKB * 1024;
  if (currentBytes <= targetBytes) return 0.92;

  const ratio = targetBytes / currentBytes;
  if (ratio > 0.8) return 0.85;
  if (ratio > 0.5) return 0.72;
  if (ratio > 0.25) return 0.55;
  return 0.38;
}
