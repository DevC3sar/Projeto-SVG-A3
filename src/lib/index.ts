/**
 * SVGuid - Deterministic SVG Avatar Generator Library
 * 
 * Uma biblioteca simples para gerar avatares SVG únicos e determinísticos
 * a partir de qualquer identificador (email, username, ID, etc.)
 * 
 * @example
 * ```typescript
 * import { generateAvatar } from './lib';
 * 
 * // Gera um avatar SVG
 * const svg = await generateAvatar('user@example.com', 'geometric');
 * console.log(svg); // <svg viewBox="0 0 500 500"...
 * 
 * // Gera um avatar único (evita duplicatas visuais)
 * const { svg, variant } = await generateUniqueAvatar('user@example.com', 'face');
 * ```
 */

// Re-export core functions
export { generateAvatar, generateUniqueAvatar } from './avatarGenerators';
export type { AvatarStyle, SVGGenerator } from './avatarGenerators';

// Re-export hash utilities
export { generateHash, Key } from './hash';

// Re-export color utilities
export { getColorIterator, getRandomColor } from './colors';

// Re-export fingerprinting utilities
export {
  getFingerprint,
  hasSeen,
  addSeen,
  resetSeen,
  clearAllSeen,
} from './avatarFingerprint';

/**
 * Converte SVG string para Data URL
 * 
 * @param svg - String SVG
 * @returns Data URL do SVG
 */
export function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Converte SVG string para PNG usando Canvas
 * 
 * @param svg - String SVG
 * @param size - Tamanho da imagem PNG (largura e altura)
 * @returns Promise com Data URL do PNG
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
 * Baixa SVG como arquivo
 * 
 * @param svg - String SVG
 * @param filename - Nome do arquivo (sem extensão)
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
 * Baixa PNG como arquivo
 * 
 * @param dataUrl - Data URL do PNG
 * @param filename - Nome do arquivo (sem extensão)
 */
export function downloadPng(dataUrl: string, filename: string = 'avatar'): void {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `${filename}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
