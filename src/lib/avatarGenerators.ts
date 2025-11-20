import { Key } from './hash';
import { getColorIterator, getRandomColor } from './colors';

export type AvatarStyle = 'geometric' | 'blob' | 'pixel' | 'face' | 'abstract';

// SVG Generator base interface
export interface SVGGenerator {
  generate(key: Key): string;
}

// Geometric Avatar Generator
class GeometricGenerator implements SVGGenerator {
  generate(key: Key): string {
    const nextColor = getColorIterator(key);
    const elements: string[] = [];
    
    // Background
    elements.push(`<rect width="500" height="500" fill="${nextColor()}"/>`);
    
    // Circles
    const circleCount = 3 + (key.next16() % 3);
    for (let i = 0; i < circleCount; i++) {
      const x = key.next() % 400 + 50;
      const y = key.next() % 400 + 50;
      const r = key.next() % 100 + 50;
      const opacity = 0.3 + (key.next256() / 255) * 0.5;
      elements.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${nextColor()}" opacity="${opacity}"/>`);
    }
    
    // Rectangles
    const rectCount = 2 + (key.next16() % 2);
    for (let i = 0; i < rectCount; i++) {
      const x = key.next() % 300;
      const y = key.next() % 300;
      const w = key.next() % 150 + 50;
      const h = key.next() % 150 + 50;
      const opacity = 0.4 + (key.next256() / 255) * 0.4;
      elements.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${nextColor()}" opacity="${opacity}"/>`);
    }
    
    return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">${elements.join('')}</svg>`;
  }
}

// Blob Avatar Generator
class BlobGenerator implements SVGGenerator {
  generate(key: Key): string {
    const nextColor = getColorIterator(key);
    const bg = nextColor();
    
    const blobPoints = this.generateBlobPoints(key);
    const pathData = this.pointsToPath(blobPoints);
    
    return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="500" fill="${bg}"/>
      <path d="${pathData}" fill="${nextColor()}" opacity="0.9"/>
      <path d="${this.pointsToPath(this.generateBlobPoints(key))}" fill="${nextColor()}" opacity="0.6" transform="translate(100, 100) scale(0.6)"/>
    </svg>`;
  }
  
  private generateBlobPoints(key: Key): [number, number][] {
    const points: [number, number][] = [];
    const numPoints = 6 + (key.next16() % 4);
    const centerX = 250;
    const centerY = 250;
    const baseRadius = 150;
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const radius = baseRadius + (key.next() % 80) - 40;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      points.push([x, y]);
    }
    
    return points;
  }
  
  private pointsToPath(points: [number, number][]): string {
    if (points.length === 0) return '';
    
    let path = `M ${points[0][0]} ${points[0][1]}`;
    
    for (let i = 0; i < points.length; i++) {
      const current = points[i];
      const next = points[(i + 1) % points.length];
      const nextNext = points[(i + 2) % points.length];
      
      const cx = (next[0] + nextNext[0]) / 2;
      const cy = (next[1] + nextNext[1]) / 2;
      
      path += ` Q ${next[0]} ${next[1]} ${cx} ${cy}`;
    }
    
    path += ' Z';
    return path;
  }
}

// Pixel Avatar Generator
class PixelGenerator implements SVGGenerator {
  generate(key: Key): string {
    const nextColor = getColorIterator(key);
    const gridSize = 8;
    const pixelSize = 500 / gridSize;
    const elements: string[] = [];
    
    // Background
    elements.push(`<rect width="500" height="500" fill="${nextColor()}"/>`);
    
    // Generate symmetric pixel pattern
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize / 2; x++) {
        if (key.next() % 3 !== 0) {
          const color = nextColor();
          elements.push(`<rect x="${x * pixelSize}" y="${y * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${color}"/>`);
          elements.push(`<rect x="${(gridSize - 1 - x) * pixelSize}" y="${y * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${color}"/>`);
        }
      }
    }
    
    return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">${elements.join('')}</svg>`;
  }
}

// Face Avatar Generator
class FaceGenerator implements SVGGenerator {
  generate(key: Key): string {
    const nextColor = getColorIterator(key);
    const skinColor = nextColor();
    const hairColor = nextColor();
    const eyeColor = nextColor();
    
    const faceShape = key.next16() % 3;
    const hairStyle = key.next16() % 4;
    const eyeStyle = key.next16() % 3;
    
    const elements: string[] = [];
    
    // Background
    elements.push(`<rect width="500" height="500" fill="${nextColor()}"/>`);
    
    // Face
    if (faceShape === 0) {
      elements.push(`<circle cx="250" cy="280" r="150" fill="${skinColor}"/>`);
    } else if (faceShape === 1) {
      elements.push(`<ellipse cx="250" cy="280" rx="140" ry="160" fill="${skinColor}"/>`);
    } else {
      elements.push(`<rect x="110" y="130" width="280" height="300" rx="40" fill="${skinColor}"/>`);
    }
    
    // Hair
    if (hairStyle === 0) {
      elements.push(`<ellipse cx="250" cy="180" rx="160" ry="80" fill="${hairColor}"/>`);
    } else if (hairStyle === 1) {
      elements.push(`<path d="M 90 200 Q 250 100 410 200" fill="${hairColor}"/>`);
    } else if (hairStyle === 2) {
      elements.push(`<rect x="100" y="120" width="300" height="100" rx="20" fill="${hairColor}"/>`);
    }
    
    // Eyes
    const leftEyeX = 200;
    const rightEyeX = 300;
    const eyeY = 260;
    
    if (eyeStyle === 0) {
      elements.push(`<circle cx="${leftEyeX}" cy="${eyeY}" r="20" fill="${eyeColor}"/>`);
      elements.push(`<circle cx="${rightEyeX}" cy="${eyeY}" r="20" fill="${eyeColor}"/>`);
      elements.push(`<circle cx="${leftEyeX}" cy="${eyeY}" r="10" fill="#000"/>`);
      elements.push(`<circle cx="${rightEyeX}" cy="${eyeY}" r="10" fill="#000"/>`);
    } else if (eyeStyle === 1) {
      elements.push(`<rect x="${leftEyeX - 15}" y="${eyeY - 5}" width="30" height="10" rx="5" fill="#000"/>`);
      elements.push(`<rect x="${rightEyeX - 15}" y="${eyeY - 5}" width="30" height="10" rx="5" fill="#000"/>`);
    } else {
      elements.push(`<ellipse cx="${leftEyeX}" cy="${eyeY}" rx="25" ry="15" fill="${eyeColor}"/>`);
      elements.push(`<ellipse cx="${rightEyeX}" cy="${eyeY}" rx="25" ry="15" fill="${eyeColor}"/>`);
    }
    
    // Mouth
    const mouthY = 340;
    const mouthStyle = key.next16() % 3;
    
    if (mouthStyle === 0) {
      elements.push(`<path d="M 200 ${mouthY} Q 250 ${mouthY + 20} 300 ${mouthY}" stroke="#000" stroke-width="4" fill="none"/>`);
    } else if (mouthStyle === 1) {
      elements.push(`<line x1="200" y1="${mouthY}" x2="300" y2="${mouthY}" stroke="#000" stroke-width="4"/>`);
    } else {
      elements.push(`<ellipse cx="250" cy="${mouthY}" rx="40" ry="20" fill="#ff6b6b"/>`);
    }
    
    return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">${elements.join('')}</svg>`;
  }
}

// Abstract Avatar Generator
class AbstractGenerator implements SVGGenerator {
  generate(key: Key): string {
    const elements: string[] = [];
    
    // Gradient background
    const color1 = getRandomColor(key);
    const color2 = getRandomColor(key);
    
    elements.push(`
      <defs>
        <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
    `);
    
    elements.push(`<rect width="500" height="500" fill="url(#bg-grad)"/>`);
    
    // Random abstract shapes
    const shapeCount = 10 + (key.next16() % 10);
    
    for (let i = 0; i < shapeCount; i++) {
      const shapeType = key.next16() % 4;
      const x = key.next() % 500;
      const y = key.next() % 500;
      const size = key.next() % 100 + 20;
      const color = getRandomColor(key);
      const opacity = 0.2 + (key.next256() / 255) * 0.6;
      const rotation = key.next() % 360;
      
      if (shapeType === 0) {
        elements.push(`<circle cx="${x}" cy="${y}" r="${size}" fill="${color}" opacity="${opacity}"/>`);
      } else if (shapeType === 1) {
        elements.push(`<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}" opacity="${opacity}" transform="rotate(${rotation} ${x} ${y})"/>`);
      } else if (shapeType === 2) {
        const points = `${x},${y} ${x + size},${y + size / 2} ${x},${y + size}`;
        elements.push(`<polygon points="${points}" fill="${color}" opacity="${opacity}" transform="rotate(${rotation} ${x} ${y})"/>`);
      } else {
        elements.push(`<ellipse cx="${x}" cy="${y}" rx="${size}" ry="${size / 2}" fill="${color}" opacity="${opacity}" transform="rotate(${rotation} ${x} ${y})"/>`);
      }
    }
    
    return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">${elements.join('')}</svg>`;
  }
}

// Avatar generator factory
export function getAvatarGenerator(style: AvatarStyle): SVGGenerator {
  switch (style) {
    case 'geometric':
      return new GeometricGenerator();
    case 'blob':
      return new BlobGenerator();
    case 'pixel':
      return new PixelGenerator();
    case 'face':
      return new FaceGenerator();
    case 'abstract':
      return new AbstractGenerator();
    default:
      return new GeometricGenerator();
  }
}

export async function generateAvatar(identifier: string, style: AvatarStyle): Promise<string> {
  const { generateHash, Key } = await import('./hash');
  const hash = await generateHash(identifier);
  const key = new Key(hash);
  const generator = getAvatarGenerator(style);
  return generator.generate(key);
}
