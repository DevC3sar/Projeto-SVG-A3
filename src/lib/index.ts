/**
 * SVGuid - Deterministic SVG Avatar Generator Library
 * 
 * A simple library for generating unique, deterministic SVG avatars
 * from any identifier (email, username, ID, etc.)
 * 
 * @module svguid
 * @example
 * ```typescript
 * import { generateAvatar, generateUniqueAvatar } from 'svguid';
 * 
 * // Generate a deterministic SVG avatar
 * const svg = await generateAvatar('user@example.com', 'geometric');
 * console.log(svg); // <svg viewBox="0 0 500 500"...
 * 
 * // Generate a unique avatar (avoids visual duplicates)
 * const { svg, variant } = await generateUniqueAvatar('user@example.com', 'face');
 * ```
 */

/**
 * Generates a deterministic SVG avatar from an identifier.
 * The same identifier and style will always produce the same avatar.
 * 
 * @param identifier - Any string identifier (email, username, UUID, etc.)
 * @param style - Avatar style: 'geometric' | 'blob' | 'pixel' | 'face' | 'abstract'
 * @param variant - Optional variant number for generating different versions (default: 0)
 * @returns Promise resolving to an SVG string
 * 
 * @example
 * ```typescript
 * const svg = await generateAvatar('john@example.com', 'geometric');
 * document.getElementById('avatar').innerHTML = svg;
 * ```
 */
export { generateAvatar } from './avatarGenerators';

/**
 * Generates a unique SVG avatar by trying different variants until finding one
 * that hasn't been seen before (based on visual fingerprinting).
 * 
 * @param identifier - Any string identifier (email, username, UUID, etc.)
 * @param style - Avatar style: 'geometric' | 'blob' | 'pixel' | 'face' | 'abstract'
 * @param maxAttempts - Maximum number of variants to try (default: 100)
 * @returns Promise resolving to an object with the SVG string and variant number used
 * 
 * @example
 * ```typescript
 * const { svg, variant } = await generateUniqueAvatar('john@example.com', 'face');
 * console.log(`Generated avatar using variant ${variant}`);
 * ```
 */
export { generateUniqueAvatar } from './avatarGenerators';

/**
 * Available avatar styles.
 * - 'geometric': Colorful geometric shapes and patterns
 * - 'blob': Organic blob-like shapes
 * - 'pixel': Retro pixel art style
 * - 'face': Various face styles (emoji, fruit, animals, etc.)
 * - 'abstract': Abstract artistic patterns
 */
export type { AvatarStyle, SVGGenerator } from './avatarGenerators';

/**
 * Generates a deterministic SHA-256 hash from an identifier string.
 * Used internally for deterministic random number generation.
 * 
 * @param identifier - String to hash
 * @returns Promise resolving to a hex string representation of the hash
 * 
 * @example
 * ```typescript
 * const hash = await generateHash('user@example.com');
 * console.log(hash); // "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"
 * ```
 */
export { generateHash } from './hash';

/**
 * Key class for deterministic pseudo-random number generation.
 * Creates a sequence of numbers based on a hash that will always be the same
 * for the same input.
 * 
 * @example
 * ```typescript
 * const hash = await generateHash('identifier');
 * const key = new Key(hash);
 * const num1 = key.next(); // Always the same for this identifier
 * const num2 = key.next256(); // Next number in sequence
 * ```
 */
export { Key } from './hash';

/**
 * Creates a color iterator that cycles through predefined color palettes
 * based on the deterministic key.
 * 
 * @param key - Key instance for deterministic color selection
 * @returns Function that returns the next color in the palette
 * 
 * @example
 * ```typescript
 * const hash = await generateHash('user@example.com');
 * const key = new Key(hash);
 * const getColor = getColorIterator(key);
 * const color1 = getColor(); // "#FF6B6B"
 * const color2 = getColor(); // "#4ECDC4"
 * ```
 */
export { getColorIterator } from './colors';

/**
 * Generates a random HSL color based on the deterministic key.
 * 
 * @param key - Key instance for deterministic color generation
 * @returns HSL color string (e.g., "hsl(234, 75%, 60%)")
 * 
 * @example
 * ```typescript
 * const hash = await generateHash('user@example.com');
 * const key = new Key(hash);
 * const color = getRandomColor(key); // "hsl(234, 75%, 60%)"
 * ```
 */
export { getRandomColor } from './colors';

/**
 * Generates a visual fingerprint from an SVG string by analyzing its colors,
 * shapes, and structure. Used to detect visually similar avatars.
 * 
 * @param svg - SVG string to fingerprint
 * @returns Promise resolving to a hash representing the visual characteristics
 * 
 * @example
 * ```typescript
 * const svg = await generateAvatar('user@example.com', 'geometric');
 * const fingerprint = await getFingerprint(svg);
 * ```
 */
export { getFingerprint } from './avatarFingerprint';

/**
 * Checks if a fingerprint has been seen before for a given identifier.
 * Used to avoid generating duplicate-looking avatars.
 * 
 * @param identifier - Identifier to check against
 * @param fingerprint - Visual fingerprint to look for
 * @returns True if this fingerprint has been seen before for this identifier
 * 
 * @example
 * ```typescript
 * const seen = hasSeen('user@example.com', fingerprint);
 * if (seen) console.log('This avatar looks like one we generated before');
 * ```
 */
export { hasSeen } from './avatarFingerprint';

/**
 * Records that a fingerprint has been seen for an identifier.
 * Stores up to 500 fingerprints per identifier in localStorage.
 * 
 * @param identifier - Identifier to associate with the fingerprint
 * @param fingerprint - Visual fingerprint to record
 * 
 * @example
 * ```typescript
 * const fingerprint = await getFingerprint(svg);
 * addSeen('user@example.com', fingerprint);
 * ```
 */
export { addSeen } from './avatarFingerprint';

/**
 * Clears all recorded fingerprints for a specific identifier.
 * 
 * @param identifier - Identifier whose fingerprints should be cleared
 * 
 * @example
 * ```typescript
 * resetSeen('user@example.com'); // Clear all fingerprints for this user
 * ```
 */
export { resetSeen } from './avatarFingerprint';

/**
 * Clears all recorded fingerprints for all identifiers from localStorage.
 * 
 * @example
 * ```typescript
 * clearAllSeen(); // Reset the entire fingerprint database
 * ```
 */
export { clearAllSeen } from './avatarFingerprint';

/**
 * Converts an SVG string to a Data URL for use in img src attributes or CSS.
 * 
 * @param svg - SVG string to convert
 * @returns Base64-encoded Data URL string
 * 
 * @example
 * ```typescript
 * const svg = await generateAvatar('user@example.com', 'geometric');
 * const dataUrl = svgToDataUrl(svg);
 * document.getElementById('avatar').src = dataUrl;
 * ```
 */
export function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Converts an SVG string to a PNG Data URL using canvas rendering.
 * Useful for downloading or using in contexts that don't support SVG.
 * 
 * @param svg - SVG string to convert
 * @param size - Width and height of the PNG image in pixels (default: 500)
 * @returns Promise resolving to a PNG Data URL
 * 
 * @throws Error if canvas context cannot be created or SVG fails to load
 * 
 * @example
 * ```typescript
 * const svg = await generateAvatar('user@example.com', 'geometric');
 * const pngDataUrl = await svgToPng(svg, 800); // 800x800 PNG
 * document.getElementById('avatar').src = pngDataUrl;
 * ```
 */
export function svgToPng(svg: string, size: number = 500): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }
    
    canvas.width = size;
    canvas.height = size;
    
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load SVG image'));
    };
    
    img.src = svgToDataUrl(svg);
  });
}

/**
 * Triggers a browser download of an SVG string as a .svg file.
 * Creates a temporary download link and removes it after triggering.
 * 
 * @param svg - SVG string to download
 * @param filename - Name of the file without extension (default: 'avatar')
 * 
 * @example
 * ```typescript
 * const svg = await generateAvatar('user@example.com', 'geometric');
 * downloadSvg(svg, 'my-avatar'); // Downloads as "my-avatar.svg"
 * ```
 */
export function downloadSvg(svg: string, filename: string = 'avatar'): void {
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Triggers a browser download of a PNG Data URL as a .png file.
 * Creates a temporary download link and removes it after triggering.
 * 
 * @param dataUrl - PNG Data URL (from svgToPng or other source)
 * @param filename - Name of the file without extension (default: 'avatar')
 * 
 * @example
 * ```typescript
 * const svg = await generateAvatar('user@example.com', 'geometric');
 * const pngDataUrl = await svgToPng(svg);
 * downloadPng(pngDataUrl, 'my-avatar'); // Downloads as "my-avatar.png"
 * ```
 */
export function downloadPng(dataUrl: string, filename: string = 'avatar'): void {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `${filename}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
