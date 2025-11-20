import { Key } from './hash';
import { getColorIterator, getRandomColor } from './colors';

export type AvatarStyle = 'geometric' | 'blob' | 'pixel' | 'face' | 'abstract';

// SVG Generator base interface
export interface SVGGenerator {
  generate(key: Key): string;
}

// Professional Geometric Avatar Generator
class GeometricGenerator implements SVGGenerator {
  generate(key: Key): string {
    const nextColor = getColorIterator(key);
    const elements: string[] = [];
    
    const color1 = nextColor();
    const color2 = nextColor();
    const color3 = nextColor();
    
    // Gradient background
    elements.push(`
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    `);
    
    elements.push(`<rect width="500" height="500" fill="url(#grad1)"/>`);
    
    // Professional geometric patterns
    const pattern = key.next16() % 4;
    
    if (pattern === 0) {
      // Overlapping circles - modern design
      const sizes = [180, 140, 100];
      const positions = [
        { x: 250, y: 200 },
        { x: 300, y: 300 },
        { x: 200, y: 300 }
      ];
      
      positions.forEach((pos, i) => {
        elements.push(`<circle cx="${pos.x}" cy="${pos.y}" r="${sizes[i]}" fill="${nextColor()}" opacity="0.6" filter="url(#glow)"/>`);
      });
    } else if (pattern === 1) {
      // Rounded rectangles - professional layout
      const rects = [
        { x: 100, y: 100, w: 150, h: 150, r: 30 },
        { x: 270, y: 100, w: 130, h: 200, r: 25 },
        { x: 150, y: 270, w: 200, h: 130, r: 35 }
      ];
      
      rects.forEach(rect => {
        elements.push(`<rect x="${rect.x}" y="${rect.y}" width="${rect.w}" height="${rect.h}" rx="${rect.r}" fill="${nextColor()}" opacity="0.7" filter="url(#glow)"/>`);
      });
    } else if (pattern === 2) {
      // Triangular composition
      elements.push(`<polygon points="250,80 450,400 50,400" fill="${color3}" opacity="0.6"/>`);
      elements.push(`<polygon points="250,200 380,350 120,350" fill="${nextColor()}" opacity="0.7" filter="url(#glow)"/>`);
      elements.push(`<circle cx="250" cy="280" r="80" fill="${nextColor()}" opacity="0.8"/>`);
    } else {
      // Concentric rounded shapes
      elements.push(`<rect x="50" y="50" width="400" height="400" rx="80" fill="${color3}" opacity="0.5"/>`);
      elements.push(`<rect x="100" y="100" width="300" height="300" rx="60" fill="${nextColor()}" opacity="0.6" filter="url(#glow)"/>`);
      elements.push(`<rect x="150" y="150" width="200" height="200" rx="40" fill="${nextColor()}" opacity="0.7"/>`);
      elements.push(`<circle cx="250" cy="250" r="60" fill="${nextColor()}" opacity="0.8"/>`);
    }
    
    return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">${elements.join('')}</svg>`;
  }
}

// Professional Blob Avatar Generator
class BlobGenerator implements SVGGenerator {
  generate(key: Key): string {
    const nextColor = getColorIterator(key);
    const color1 = nextColor();
    const color2 = nextColor();
    const color3 = nextColor();
    
    const blob1 = this.generateBlobPoints(key);
    const blob2 = this.generateBlobPoints(key);
    const blob3 = this.generateBlobPoints(key);
    
    return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blobGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:0.8" />
        </linearGradient>
        <filter id="blobShadow">
          <feDropShadow dx="0" dy="8" stdDeviation="12" flood-opacity="0.2"/>
        </filter>
      </defs>
      <rect width="500" height="500" fill="url(#blobGrad1)"/>
      <path d="${this.pointsToPath(blob1)}" fill="${color2}" opacity="0.8" filter="url(#blobShadow)"/>
      <path d="${this.pointsToPath(blob2)}" fill="${color3}" opacity="0.7" transform="translate(80, 80) scale(0.7)" filter="url(#blobShadow)"/>
      <path d="${this.pointsToPath(blob3)}" fill="${nextColor()}" opacity="0.6" transform="translate(120, 120) scale(0.5)"/>
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

// Professional Cartoon Face Generator
class FaceGenerator implements SVGGenerator {
  generate(key: Key): string {
    const { getSkinTone, getHairColor, getColorIterator } = require('./colors');
    const nextColor = getColorIterator(key);
    
    const bgColor = nextColor();
    const skinColor = getSkinTone(key);
    const hairColor = getHairColor(key);
    const shirtColor = nextColor();
    
    const hairStyle = key.next16() % 8;
    const eyeStyle = key.next16() % 5;
    const noseStyle = key.next16() % 3;
    const mouthStyle = key.next16() % 5;
    const accessory = key.next16() % 4; // glasses, earrings, etc.
    
    const elements: string[] = [];
    
    // Gradient background
    elements.push(`
      <defs>
        <linearGradient id="bg${key.next()}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${nextColor()};stop-opacity:1" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.15"/>
        </filter>
      </defs>
    `);
    
    elements.push(`<rect width="500" height="500" fill="url(#bg${key.next()})"/>`);
    
    // Shoulders/Shirt
    elements.push(`<ellipse cx="250" cy="500" rx="200" ry="100" fill="${shirtColor}"/>`);
    elements.push(`<rect x="50" y="450" width="400" height="100" fill="${shirtColor}"/>`);
    
    // Neck
    elements.push(`<rect x="210" y="360" width="80" height="90" rx="10" fill="${skinColor}" opacity="0.95"/>`);
    
    // Head - more rounded professional shape
    elements.push(`<ellipse cx="250" cy="250" rx="120" ry="140" fill="${skinColor}" filter="url(#shadow)"/>`);
    
    // Ears
    elements.push(`<ellipse cx="130" cy="250" rx="25" ry="35" fill="${skinColor}" opacity="0.9"/>`);
    elements.push(`<ellipse cx="370" cy="250" rx="25" ry="35" fill="${skinColor}" opacity="0.9"/>`);
    
    // Hair - professional cartoon styles
    if (hairStyle === 0) {
      // Short professional cut
      elements.push(`<ellipse cx="250" cy="150" rx="130" ry="80" fill="${hairColor}"/>`);
      elements.push(`<rect x="120" y="140" width="260" height="60" rx="30" fill="${hairColor}"/>`);
    } else if (hairStyle === 1) {
      // Side swept
      elements.push(`<path d="M 120 180 Q 180 120 250 140 Q 320 130 380 190 L 370 210 Q 320 160 250 170 Q 180 165 130 200 Z" fill="${hairColor}"/>`);
      elements.push(`<ellipse cx="250" cy="160" rx="125" ry="60" fill="${hairColor}"/>`);
    } else if (hairStyle === 2) {
      // Wavy/Curly
      elements.push(`<ellipse cx="250" cy="150" rx="140" ry="85" fill="${hairColor}"/>`);
      elements.push(`<circle cx="180" cy="170" r="35" fill="${hairColor}"/>`);
      elements.push(`<circle cx="320" cy="170" r="35" fill="${hairColor}"/>`);
    } else if (hairStyle === 3) {
      // Slicked back
      elements.push(`<ellipse cx="250" cy="165" rx="120" ry="70" fill="${hairColor}"/>`);
      elements.push(`<path d="M 130 180 Q 250 150 370 180" fill="${hairColor}"/>`);
    } else if (hairStyle === 4) {
      // Bob cut
      elements.push(`<ellipse cx="250" cy="170" rx="135" ry="90" fill="${hairColor}"/>`);
      elements.push(`<rect x="115" y="200" width="270" height="80" rx="40" fill="${hairColor}"/>`);
    } else if (hairStyle === 5) {
      // Messy/Textured
      elements.push(`<ellipse cx="250" cy="155" rx="135" ry="75" fill="${hairColor}"/>`);
      elements.push(`<circle cx="200" cy="145" r="25" fill="${hairColor}"/>`);
      elements.push(`<circle cx="300" cy="145" r="25" fill="${hairColor}"/>`);
      elements.push(`<circle cx="250" cy="135" r="30" fill="${hairColor}"/>`);
    } else if (hairStyle === 6) {
      // Bald/Very short
      elements.push(`<ellipse cx="250" cy="170" rx="120" ry="50" fill="${hairColor}" opacity="0.3"/>`);
    } else {
      // Long straight
      elements.push(`<ellipse cx="250" cy="160" rx="140" ry="80" fill="${hairColor}"/>`);
      elements.push(`<rect x="110" y="180" width="280" height="120" rx="50" fill="${hairColor}"/>`);
    }
    
    // Eyebrows
    const browY = 220;
    elements.push(`<path d="M 190 ${browY} Q 210 ${browY - 5} 230 ${browY}" stroke="#2C1B18" stroke-width="6" stroke-linecap="round" fill="none"/>`);
    elements.push(`<path d="M 270 ${browY} Q 290 ${browY - 5} 310 ${browY}" stroke="#2C1B18" stroke-width="6" stroke-linecap="round" fill="none"/>`);
    
    // Eyes - professional cartoon style
    const leftEyeX = 210;
    const rightEyeX = 290;
    const eyeY = 250;
    
    if (eyeStyle === 0) {
      // Round friendly eyes
      elements.push(`<circle cx="${leftEyeX}" cy="${eyeY}" r="18" fill="white"/>`);
      elements.push(`<circle cx="${rightEyeX}" cy="${eyeY}" r="18" fill="white"/>`);
      elements.push(`<circle cx="${leftEyeX}" cy="${eyeY}" r="12" fill="#2C1B18"/>`);
      elements.push(`<circle cx="${rightEyeX}" cy="${eyeY}" r="12" fill="#2C1B18"/>`);
      elements.push(`<circle cx="${leftEyeX + 4}" cy="${eyeY - 4}" r="4" fill="white"/>`);
      elements.push(`<circle cx="${rightEyeX + 4}" cy="${eyeY - 4}" r="4" fill="white"/>`);
    } else if (eyeStyle === 1) {
      // Almond shaped
      elements.push(`<ellipse cx="${leftEyeX}" cy="${eyeY}" rx="20" ry="14" fill="white"/>`);
      elements.push(`<ellipse cx="${rightEyeX}" cy="${eyeY}" rx="20" ry="14" fill="white"/>`);
      elements.push(`<circle cx="${leftEyeX}" cy="${eyeY}" r="10" fill="#2C1B18"/>`);
      elements.push(`<circle cx="${rightEyeX}" cy="${eyeY}" r="10" fill="#2C1B18"/>`);
      elements.push(`<circle cx="${leftEyeX + 3}" cy="${eyeY - 3}" r="3" fill="white"/>`);
      elements.push(`<circle cx="${rightEyeX + 3}" cy="${eyeY - 3}" r="3" fill="white"/>`);
    } else if (eyeStyle === 2) {
      // Cheerful closed eyes
      elements.push(`<path d="M ${leftEyeX - 15} ${eyeY} Q ${leftEyeX} ${eyeY + 8} ${leftEyeX + 15} ${eyeY}" stroke="#2C1B18" stroke-width="5" fill="none" stroke-linecap="round"/>`);
      elements.push(`<path d="M ${rightEyeX - 15} ${eyeY} Q ${rightEyeX} ${eyeY + 8} ${rightEyeX + 15} ${eyeY}" stroke="#2C1B18" stroke-width="5" fill="none" stroke-linecap="round"/>`);
    } else if (eyeStyle === 3) {
      // Wide expressive
      elements.push(`<ellipse cx="${leftEyeX}" cy="${eyeY}" rx="22" ry="16" fill="white"/>`);
      elements.push(`<ellipse cx="${rightEyeX}" cy="${eyeY}" rx="22" ry="16" fill="white"/>`);
      elements.push(`<circle cx="${leftEyeX}" cy="${eyeY + 2}" r="11" fill="#2C1B18"/>`);
      elements.push(`<circle cx="${rightEyeX}" cy="${eyeY + 2}" r="11" fill="#2C1B18"/>`);
      elements.push(`<circle cx="${leftEyeX + 4}" cy="${eyeY - 2}" r="4" fill="white"/>`);
      elements.push(`<circle cx="${rightEyeX + 4}" cy="${eyeY - 2}" r="4" fill="white"/>`);
    } else {
      // Squinted happy
      elements.push(`<ellipse cx="${leftEyeX}" cy="${eyeY}" rx="18" ry="10" fill="white"/>`);
      elements.push(`<ellipse cx="${rightEyeX}" cy="${eyeY}" rx="18" ry="10" fill="white"/>`);
      elements.push(`<ellipse cx="${leftEyeX}" cy="${eyeY}" rx="10" ry="7" fill="#2C1B18"/>`);
      elements.push(`<ellipse cx="${rightEyeX}" cy="${eyeY}" rx="10" ry="7" fill="#2C1B18"/>`);
    }
    
    // Nose - subtle and professional
    const noseY = 280;
    if (noseStyle === 0) {
      elements.push(`<ellipse cx="250" cy="${noseY}" rx="8" ry="12" fill="#000" opacity="0.1"/>`);
    } else if (noseStyle === 1) {
      elements.push(`<path d="M 245 ${noseY - 10} L 248 ${noseY + 5} L 245 ${noseY + 3}" stroke="#000" stroke-width="2" fill="none" opacity="0.3"/>`);
    } else {
      elements.push(`<circle cx="247" cy="${noseY}" r="6" fill="#000" opacity="0.08"/>`);
      elements.push(`<circle cx="253" cy="${noseY}" r="6" fill="#000" opacity="0.08"/>`);
    }
    
    // Mouth - expressive cartoon styles
    const mouthY = 310;
    if (mouthStyle === 0) {
      // Happy smile
      elements.push(`<path d="M 210 ${mouthY} Q 250 ${mouthY + 25} 290 ${mouthY}" stroke="#E74C3C" stroke-width="5" fill="none" stroke-linecap="round"/>`);
      elements.push(`<path d="M 220 ${mouthY + 5} Q 250 ${mouthY + 20} 280 ${mouthY + 5}" fill="#fff" opacity="0.8"/>`);
    } else if (mouthStyle === 1) {
      // Friendly smile
      elements.push(`<path d="M 215 ${mouthY} Q 250 ${mouthY + 20} 285 ${mouthY}" stroke="#2C1B18" stroke-width="4" fill="none" stroke-linecap="round"/>`);
    } else if (mouthStyle === 2) {
      // Big grin
      elements.push(`<ellipse cx="250" cy="${mouthY + 5}" rx="35" ry="20" fill="#E74C3C"/>`);
      elements.push(`<rect x="215" y="${mouthY}" width="70" height="12" rx="6" fill="white"/>`);
    } else if (mouthStyle === 3) {
      // Slight smile
      elements.push(`<path d="M 225 ${mouthY} Q 250 ${mouthY + 10} 275 ${mouthY}" stroke="#2C1B18" stroke-width="3" fill="none" stroke-linecap="round"/>`);
    } else {
      // Open smile
      elements.push(`<ellipse cx="250" cy="${mouthY + 8}" rx="30" ry="18" fill="#2C1B18"/>`);
      elements.push(`<ellipse cx="250" cy="${mouthY + 5}" rx="28" ry="15" fill="#E74C3C"/>`);
      elements.push(`<path d="M 230 ${mouthY + 5} Q 250 ${mouthY + 2} 270 ${mouthY + 5}" stroke="white" stroke-width="3" fill="none"/>`);
    }
    
    // Accessories
    if (accessory === 1) {
      // Glasses
      elements.push(`<circle cx="${leftEyeX}" cy="${eyeY}" r="24" fill="none" stroke="#2C1B18" stroke-width="3"/>`);
      elements.push(`<circle cx="${rightEyeX}" cy="${eyeY}" r="24" fill="none" stroke="#2C1B18" stroke-width="3"/>`);
      elements.push(`<line x1="${leftEyeX + 24}" y1="${eyeY}" x2="${rightEyeX - 24}" y2="${eyeY}" stroke="#2C1B18" stroke-width="3"/>`);
    } else if (accessory === 2) {
      // Earrings
      elements.push(`<circle cx="130" cy="270" r="8" fill="#FFD700" stroke="#DAA520" stroke-width="2"/>`);
      elements.push(`<circle cx="370" cy="270" r="8" fill="#FFD700" stroke="#DAA520" stroke-width="2"/>`);
    } else if (accessory === 3) {
      // Rosy cheeks
      elements.push(`<ellipse cx="175" cy="280" rx="20" ry="15" fill="#FF6B6B" opacity="0.3"/>`);
      elements.push(`<ellipse cx="325" cy="280" rx="20" ry="15" fill="#FF6B6B" opacity="0.3"/>`);
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
