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
    const circleCount = 3 + key.nextInt(6);
    for (let i = 0; i < circleCount; i++) {
      const x = key.nextInt(401) + 50;
      const y = key.nextInt(401) + 50;
      const r = key.nextInt(120) + 30;
      const opacity = 0.25 + (key.next256() / 255) * 0.6;
      const rotate = key.nextInt(30) - 15;
      elements.push(`<g transform="rotate(${rotate} ${x} ${y})"><circle cx="${x}" cy="${y}" r="${r}" fill="${nextColor()}" opacity="${opacity}"/></g>`);
    }
    
    // Rectangles
    const rectCount = 2 + key.nextInt(4);
    for (let i = 0; i < rectCount; i++) {
      const x = key.nextInt(301);
      const y = key.nextInt(301);
      const w = key.nextInt(160) + 40;
      const h = key.nextInt(160) + 40;
      const opacity = 0.2 + (key.next256() / 255) * 0.7;
      const rot = key.nextInt(360);
      const cxr = x + Math.floor(w / 2);
      const cyr = y + Math.floor(h / 2);
      elements.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${nextColor()}" opacity="${opacity}" transform="rotate(${rot} ${cxr} ${cyr})"/>`);
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
  const gridSize = 6 + key.nextInt(6); // 6..11
  const pixelSize = 500 / gridSize;
    const elements: string[] = [];
    
    // Background
    elements.push(`<rect width="500" height="500" fill="${nextColor()}"/>`);
    
    // Generate symmetric pixel pattern
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize / 2; x++) {
        if (key.nextInt(3) !== 0) {
          const color = nextColor();
          const wobble = (key.nextInt(5) - 2);
          elements.push(`<rect x="${x * pixelSize + wobble}" y="${y * pixelSize + wobble}" width="${pixelSize}" height="${pixelSize}" fill="${color}"/>`);
          elements.push(`<rect x="${(gridSize - 1 - x) * pixelSize - wobble}" y="${y * pixelSize + wobble}" width="${pixelSize}" height="${pixelSize}" fill="${color}"/>`);
        }
      }
    }
    
    return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">${elements.join('')}</svg>`;
  }
}

// Face Avatar Generator (stylized/original)
class FaceGenerator implements SVGGenerator {
  generate(key: Key): string {
    // choose persona from hash to allow many distinct personalities
    // persona pool expanded
    const persona = key.nextInt(12);
    switch (persona) {
      case 0:
        return this.generateHuman(key);
      case 1:
        return this.generateRobot(key);
      case 2:
        return this.generateCreature(key);
      case 3:
        return this.generateFruit(key);
      case 4:
        return this.generateAnimal(key);
      case 5:
        return this.generateFilmArchetype(key);
      case 6:
        return this.generateFan(key);
      case 7:
        return this.generateClown(key);
      case 8:
        return this.generateCyberpunk(key);
      case 9:
        return this.generateFruit(key);
      case 10:
        return this.generateAnimal(key);
      default:
        return this.generateFilmArchetype(key);
    }
  }

  // fruit persona: transform head into fruit-like shapes and playful accessories
  private generateFruit(key: Key): string {
    const nextColor = getColorIterator(key);
    const bg = nextColor();
    const fruitType = key.next16() % 4; // 0: apple,1:banana,2:orange,3:pineapple
    const elements: string[] = [];
    elements.push(`<rect width="500" height="500" fill="${bg}"/>`);
    if (fruitType === 0) {
      elements.push(`<ellipse cx="250" cy="260" rx="110" ry="120" fill="#d33" stroke="#6b0" stroke-width="2"/>`);
      elements.push(`<rect x="240" y="140" width="20" height="40" fill="#4b2" rx="6"/>`);
    } else if (fruitType === 1) {
      elements.push(`<path d="M160 220 q90 -140 180 0 q-20 30 -180 0z" fill="#f5d33d" stroke="#d1b200" stroke-width="2"/>`);
    } else if (fruitType === 2) {
      elements.push(`<circle cx="250" cy="250" r="110" fill="#f7931e" stroke="#d66a00" stroke-width="2"/>`);
    } else {
      elements.push(`<rect x="150" y="140" width="200" height="240" rx="60" fill="#f2c94c" stroke="#b8860b" stroke-width="2"/>`);
      // pineapple texture
      for (let i = 0; i < 6; i++) elements.push(`<path d="M ${160 + i*30} 200 q 8 10 16 0" stroke="#b8860b" stroke-width="1" fill="none"/>`);
    }
    // eyes and mouth small and joyful
    elements.push(`<circle cx="210" cy="230" r="10" fill="#fff"/>`);
    elements.push(`<circle cx="290" cy="230" r="10" fill="#fff"/>`);
    elements.push(`<path d="M 210 280 q 40 24 80 0" stroke="#9a1f1f" stroke-width="3" fill="none" stroke-linecap="round"/>`);
    return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">${elements.join('')}</svg>`;
  }

  // animal persona: ears, snout, fur patterns
  private generateAnimal(key: Key): string {
    const nextColor = getColorIterator(key);
    const bg = nextColor();
    const animal = key.next16() % 5; // 0: cat,1:dog,2:panda,3:fox,4:bear
    const face = nextColor();
    const elements: string[] = [];
    elements.push(`<rect width="500" height="500" fill="${bg}"/>`);
    if (animal === 0) {
      elements.push(`<ellipse cx="250" cy="260" rx="110" ry="120" fill="${face}" stroke="#111" stroke-width="1"/>`);
      elements.push(`<path d="M170 160 q30 -60 160 0" fill="${face}"/>`);
      elements.push(`<path d="M185 165 q10 -20 20 0" fill="#000"/>`);
    } else if (animal === 1) {
      elements.push(`<ellipse cx="250" cy="260" rx="120" ry="130" fill="${face}" stroke="#111" stroke-width="1"/>`);
      elements.push(`<path d="M200 300 q50 20 100 0" stroke="#000" stroke-width="3" fill="none"/>`);
    } else if (animal === 2) {
      elements.push(`<rect x="150" y="150" width="200" height="220" rx="90" fill="#fff"/>`);
      elements.push(`<rect x="190" y="190" width="40" height="40" rx="20" fill="#000"/>`);
      elements.push(`<rect x="270" y="190" width="40" height="40" rx="20" fill="#000"/>`);
    } else if (animal === 3) {
      elements.push(`<ellipse cx="250" cy="240" rx="120" ry="140" fill="${face}" transform="rotate(-4 250 250)"/>`);
      elements.push(`<path d="M170 160 q30 -40 160 0" fill="#fff" opacity="0.15"/>`);
    } else {
      elements.push(`<ellipse cx="250" cy="260" rx="125" ry="135" fill="${face}" stroke="#111" stroke-width="1"/>`);
      elements.push(`<path d="M210 300 q40 24 80 0" stroke="#000" stroke-width="3" fill="none"/>`);
    }
    // joyful eyes
    elements.push(`<circle cx="210" cy="230" r="10" fill="#fff"/>`);
    elements.push(`<circle cx="290" cy="230" r="10" fill="#fff"/>`);
    elements.push(`<circle cx="210" cy="230" r="4" fill="#000"/>`);
    elements.push(`<circle cx="290" cy="230" r="4" fill="#000"/>`);
    return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">${elements.join('')}</svg>`;
  }

  // film archetype persona: stylized nods to famous characters (inspired, not copied)
  private generateFilmArchetype(key: Key): string {
    const nextColor = getColorIterator(key);
    const bg = nextColor();
    const type = key.next16() % 6; // 0: ogre (shrek-like),1:masked (jason-like),2:stoic (walter-like),3:slapstick (chuck-like),4:pirate,5:detective
    const elements: string[] = [];
    elements.push(`<rect width="500" height="500" fill="${bg}"/>`);
    if (type === 0) {
      // ogre-ish: big rounded head, green tones
      elements.push(`<ellipse cx="250" cy="260" rx="140" ry="150" fill="#6ab04c" stroke="#316b1e" stroke-width="2"/>`);
      elements.push(`<rect x="175" y="160" width="40" height="18" rx="12" fill="#6ab04c" transform="rotate(-20 195 169)"/>`);
      elements.push(`<rect x="285" y="160" width="40" height="18" rx="12" fill="#6ab04c" transform="rotate(20 305 169)"/>`);
    } else if (type === 1) {
      // masked/slasher archetype: simple eerie mask
      elements.push(`<rect x="150" y="140" width="200" height="240" rx="18" fill="#fff" stroke="#111" stroke-width="2"/>`);
      elements.push(`<rect x="190" y="200" width="40" height="10" fill="#000"/>`);
      elements.push(`<rect x="270" y="200" width="40" height="10" fill="#000"/>`);
    } else if (type === 2) {
      // stoic: glasses + bald
      elements.push(`<ellipse cx="250" cy="260" rx="110" ry="120" fill="${nextColor()}" stroke="#111" stroke-width="1"/>`);
      elements.push(`<rect x="200" y="200" width="100" height="30" rx="8" fill="#000"/>`);
    } else if (type === 3) {
      // slapstick: big smile, one eyebrow raised
      elements.push(`<ellipse cx="250" cy="260" rx="115" ry="125" fill="${nextColor()}" stroke="#111" stroke-width="1"/>`);
      elements.push(`<path d="M 200 210 q 40 -30 100 0" stroke="#000" stroke-width="4" fill="none"/>`);
    } else if (type === 4) {
      // pirate bandana
      elements.push(`<ellipse cx="250" cy="260" rx="110" ry="120" fill="${nextColor()}" stroke="#111" stroke-width="1"/>`);
      elements.push(`<path d="M150 180 q100 -80 200 0" fill="#900"/>`);
    } else {
      // detective: fedora silhouette
      elements.push(`<ellipse cx="250" cy="260" rx="110" ry="120" fill="${nextColor()}" stroke="#111" stroke-width="1"/>`);
      elements.push(`<path d="M120 160 q130 -90 260 0 q-30 20 -200 0z" fill="#222" opacity="0.9"/>`);
    }
    // always smiling variant bias
    elements.push(`<path d="M 210 280 q 40 24 80 0" stroke="#9a1f1f" stroke-width="3" fill="none" stroke-linecap="round"/>`);
    return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">${elements.join('')}</svg>`;
  }

  // fan persona: sports colors, face paint, scarfs
  private generateFan(key: Key): string {
    const nextColor = getColorIterator(key);
    const bg = nextColor();
    const teamHue = (key.next16() % 360);
    const color1 = `hsl(${teamHue} 80% 50%)`;
    const color2 = `hsl(${(teamHue + 180) % 360} 80% 40%)`;
    const elements: string[] = [];
    elements.push(`<rect width="500" height="500" fill="${bg}"/>`);
    // face paint stripes
    elements.push(`<rect x="150" y="220" width="200" height="18" fill="${color1}" opacity="0.95"/>`);
    elements.push(`<rect x="150" y="245" width="200" height="18" fill="${color2}" opacity="0.95"/>`);
    elements.push(`<circle cx="210" cy="230" r="10" fill="#fff"/>`);
    elements.push(`<circle cx="290" cy="230" r="10" fill="#fff"/>`);
    elements.push(`<path d="M 210 280 q 40 24 80 0" stroke="#000" stroke-width="3" fill="none" stroke-linecap="round"/>`);
    return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">${elements.join('')}</svg>`;
  }

  // clown persona: exaggerated features and funny hat
  private generateClown(key: Key): string {
    const nextColor = getColorIterator(key);
    const bg = nextColor();
    const elements: string[] = [];
    elements.push(`<rect width="500" height="500" fill="${bg}"/>`);
    elements.push(`<ellipse cx="250" cy="260" rx="120" ry="140" fill="#fff" stroke="#111" stroke-width="1"/>`);
    elements.push(`<circle cx="250" cy="320" r="18" fill="#e11d48"/>`);
    elements.push(`<path d="M200 200 q50 -80 100 0" fill="#ff0"/>`);
    elements.push(`<path d="M 210 280 q 40 24 80 0" stroke="#e11d48" stroke-width="4" fill="none" stroke-linecap="round"/>`);
    elements.push(`<circle cx="210" cy="230" r="14" fill="#fff"/>`);
    elements.push(`<circle cx="290" cy="230" r="14" fill="#fff"/>`);
    return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">${elements.join('')}</svg>`;
  }

  // cyberpunk persona: neon palette, visor, glitch shapes
  private generateCyberpunk(key: Key): string {
    const nextColor = getColorIterator(key);
    const bg = `#0b0b0d`;
    const neon1 = `hsl(${key.next16()%360} 95% 50%)`;
    const neon2 = `hsl(${(key.next16()+120)%360} 95% 45%)`;
    const elements: string[] = [];
    elements.push(`<rect width="500" height="500" fill="${bg}"/>`);
    elements.push(`<rect x="120" y="120" width="260" height="240" rx="28" fill="${neon1}" opacity="0.08"/>`);
    elements.push(`<rect x="160" y="200" width="180" height="60" rx="8" fill="${neon2}" opacity="0.18"/>`);
    elements.push(`<rect x="180" y="200" width="120" height="36" rx="6" fill="#000" opacity="0.6"/>`);
    elements.push(`<path d="M 180 200 h 120" stroke="${neon1}" stroke-width="3"/>`);
    elements.push(`<circle cx="210" cy="230" r="8" fill="#fff"/>`);
    elements.push(`<circle cx="290" cy="230" r="8" fill="#fff"/>`);
    elements.push(`<path d="M 210 280 q 40 16 80 0" stroke="${neon1}" stroke-width="2" fill="none"/>`);
    return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">${elements.join('')}</svg>`;
  }

  private generateHuman(key: Key): string {
    const nextColor = getColorIterator(key);
    const bg = nextColor();
    const faceTone = nextColor();
    const accent = nextColor();
    const detail = getRandomColor(key);
  // background decoration variant
  const bgVariant = key.nextInt(8); // expand types
  const strokeW = 1 + (key.nextInt(4));
    const cx = 250;
    const cy = 260;
    const elements: string[] = [];
    elements.push(`<rect width="500" height="500" fill="${bg}"/>`);
    // add background decorations deterministically
  if (bgVariant === 1) {
      // confetti: many small translucent circles
      for (let i = 0; i < 28; i++) {
        const x = key.nextInt(461) + 20;
        const y = key.nextInt(461) + 20;
        const r = 3 + key.nextInt(12);
        const c = nextColor();
        const o = 0.3 + ((key.next256() % 70) / 100);
        const spin = key.nextInt(30) - 15;
    // subtle scale/rotate to add individuality
    const scale = 0.9 + (key.nextInt(24) / 100);
    elements.push(`<g transform="translate(${x} ${y}) rotate(${spin}) scale(${scale}) translate(${-x} ${-y})"><circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="${o}"/></g>`);
      }
    } else if (bgVariant === 2) {
      // sun
      elements.push(`<circle cx="420" cy="80" r="40" fill="yellow" opacity="0.9"/>`);
      elements.push(`<g stroke="yellow" stroke-width="3" opacity="0.6">`);
      elements.push(`<line x1="420" y1="20" x2="420" y2="0"/>`);
      elements.push(`</g>`);
    } else if (bgVariant === 3) {
      // stripes
      for (let i = 0; i < 6; i++) {
        const y = i * 80;
        elements.push(`<rect x="0" y="${y}" width="500" height="40" fill="${nextColor()}" opacity="0.06"/>`);
      }
    } else if (bgVariant === 4) {
      // stars
      for (let i = 0; i < 10; i++) {
        const x = key.next() % 460 + 20;
        const y = key.next() % 460 + 20;
        elements.push(`<circle cx="${x}" cy="${y}" r="${1 + (key.next16()%4)}" fill="#fff" opacity="0.9"/>`);
      }
    } else if (bgVariant === 5) {
      // soft radial gradient (simulated)
      elements.push(`<circle cx="250" cy="120" r="220" fill="${accent}" opacity="0.06"/>`);
    }
  // slight head shape variation
  const headShape = key.nextInt(4);
    if (headShape === 0) {
      const s = 0.95 + (key.nextInt(12) / 100);
      elements.push(`<g transform="translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})"><ellipse cx="${cx}" cy="${cy}" rx="110" ry="140" fill="${faceTone}" stroke="#111" stroke-width="${strokeW}"/></g>`);
    } else if (headShape === 1) {
      elements.push(`<path d="M150 200 Q250 80 350 200 Q330 360 170 360 Z" fill="${faceTone}" stroke="#111" stroke-width="${strokeW}"/>`);
    } else if (headShape === 2) {
      elements.push(`<rect x="130" y="140" width="240" height="260" rx="80" fill="${faceTone}" stroke="#111" stroke-width="${strokeW}"/>`);
    } else {
      elements.push(`<path d="M160 180 q120 -80 180 0 q-20 100 -160 60 z" fill="${faceTone}" stroke="#111" stroke-width="${strokeW}"/>`);
    }
    // eyes
    const eyeOffsetX = 36 + key.nextInt(20);
    const eyeY = cy - 30;
  // eyes with expression variants, bias toward joyful styles
  const eyeRoll = key.nextInt(10);
  const eyeStyle = eyeRoll < 7 ? key.nextInt(4) : 3; // bias toward joyful, but use 4 options
    if (eyeStyle === 0) {
      elements.push(`<ellipse cx="${cx - eyeOffsetX}" cy="${eyeY}" rx="16" ry="10" fill="#fff"/>`);
      elements.push(`<ellipse cx="${cx + eyeOffsetX}" cy="${eyeY}" rx="16" ry="10" fill="#fff"/>`);
      elements.push(`<circle cx="${cx - eyeOffsetX}" cy="${eyeY}" r="5" fill="#000"/>`);
      elements.push(`<circle cx="${cx + eyeOffsetX}" cy="${eyeY}" r="5" fill="#000"/>`);
    } else if (eyeStyle === 1) {
      elements.push(`<rect x="${cx - eyeOffsetX - 12}" y="${eyeY - 6}" width="24" height="12" rx="6" fill="#fff"/>`);
      elements.push(`<rect x="${cx + eyeOffsetX - 12}" y="${eyeY - 6}" width="24" height="12" rx="6" fill="#fff"/>`);
      elements.push(`<rect x="${cx - eyeOffsetX - 6}" y="${eyeY - 3}" width="12" height="6" rx="3" fill="#000"/>`);
      elements.push(`<rect x="${cx + eyeOffsetX - 6}" y="${eyeY - 3}" width="12" height="6" rx="3" fill="#000"/>`);
    } else if (eyeStyle === 2) {
      elements.push(`<circle cx="${cx - eyeOffsetX}" cy="${eyeY}" r="10" fill="#fff"/>`);
      elements.push(`<circle cx="${cx + eyeOffsetX}" cy="${eyeY}" r="10" fill="#fff"/>`);
      elements.push(`<circle cx="${cx - eyeOffsetX}" cy="${eyeY}" r="4" fill="#000"/>`);
      elements.push(`<circle cx="${cx + eyeOffsetX}" cy="${eyeY}" r="4" fill="#000"/>`);
    } else {
      // sleepy/line eye
      elements.push(`<path d="M ${cx - eyeOffsetX - 10} ${eyeY} q 10 -6 20 0" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/>`);
      elements.push(`<path d="M ${cx + eyeOffsetX - 10} ${eyeY} q 10 -6 20 0" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/>`);
    }
  // mouth — bias joyful: 75% smiles (curved), 20% small grin, 5% neutral
  const mouthRoll = key.nextInt(20);
    if (mouthRoll < 15) {
      // big smile
      elements.push(`<path d="M ${cx - 34} ${cy + 46} q 34 22 68 0" stroke="#e11d48" stroke-width="3" fill="none" stroke-linecap="round"/>`);
    } else if (mouthRoll < 19) {
      elements.push(`<path d="M ${cx - 28} ${cy + 54} q 28 -6 56 0" stroke="#374151" stroke-width="3" fill="none" stroke-linecap="round"/>`);
    } else {
      elements.push(`<line x1="${cx - 20}" y1="${cy + 54}" x2="${cx + 20}" y2="${cy + 54}" stroke="#111" stroke-width="2" stroke-linecap="round"/>`);
    }
  // accessories: glasses, hat, earring, scar, moustache
  const acc = key.nextInt(12);
    if (acc === 0) {
      // round glasses
      elements.push(`<g stroke="#000" stroke-width="2" fill="none"><circle cx="${cx - eyeOffsetX}" cy="${eyeY}" r="18"/><circle cx="${cx + eyeOffsetX}" cy="${eyeY}" r="18"/><path d="M ${cx - eyeOffsetX + 18} ${eyeY} h ${2*(eyeOffsetX-18)}"/></g>`);
    } else if (acc === 1) {
      // hat
      elements.push(`<path d="M ${cx - 120} ${cy - 110} q 120 -70 240 0 q -40 20 -200 0 z" fill="${accent}"/>`);
    } else if (acc === 2) {
      // earring
      elements.push(`<circle cx="${cx + 95}" cy="${cy - 10}" r="6" fill="${accent}"/>`);
    } else if (acc === 3) {
      // scar
      elements.push(`<path d="M ${cx - 10} ${cy - 10} q 12 6 22 0" stroke="#a52a2a" stroke-width="2" fill="none"/>`);
    } else if (acc === 4) {
      // moustache
      elements.push(`<path d="M ${cx - 30} ${cy + 38} q 15 -10 30 0 q 15 -10 30 0" stroke="#3b302b" stroke-width="3" fill="none" stroke-linecap="round"/>`);
    } else if (acc === 5) {
      // face paint stripe
      elements.push(`<rect x="${cx - 110}" y="${cy - 40}" width="220" height="12" fill="${accent}" opacity="0.3"/>`);
    }

  // body / pose variations (simple silhouettes) — vary arms/actions
  const pose = key.nextInt(8); // expand pose pool
    // torso
    elements.push(`<rect x="180" y="340" width="140" height="90" rx="28" fill="${accent}" opacity="0.95"/>`);
    if (pose === 0) {
      // neutral arms
      elements.push(`<rect x="140" y="340" width="40" height="12" rx="6" fill="${faceTone}"/>`);
      elements.push(`<rect x="320" y="340" width="40" height="12" rx="6" fill="${faceTone}"/>`);
    } else if (pose === 1) {
      // wave: raised left arm
      elements.push(`<path d="M140 340 q30 -40 60 0" fill="${faceTone}"/>`);
    } else if (pose === 2) {
      // thumbs up right
      elements.push(`<path d="M340 340 q20 -10 30 10 q-6 8 -22 8" fill="${faceTone}"/>`);
    } else if (pose === 3) {
      // hands on hips
      elements.push(`<path d="M130 350 q30 -10 50 0" fill="${faceTone}"/>`);
      elements.push(`<path d="M320 350 q-30 -10 -50 0" fill="${faceTone}"/>`);
    } else if (pose === 4) {
      // holding balloon (left hand)
      elements.push(`<line x1="${cx - 20}" y1="${cy + 40}" x2="${cx - 60}" y2="${cy - 40}" stroke="#555" stroke-width="2"/>`);
      elements.push(`<circle cx="${cx - 70}" cy="${cy - 70}" r="16" fill="${nextColor()}"/>`);
    } else if (pose === 5) {
      // jumping: small shadow under feet
      elements.push(`<ellipse cx="${cx}" cy="440" rx="44" ry="10" fill="#000" opacity="0.08"/>`);
      elements.push(`<rect x="180" y="320" width="140" height="90" rx="28" fill="${accent}" opacity="0.95" transform="translate(0,-10)"/>`);
    }

    return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">${elements.join('')}</svg>`;
  }

  private generateRobot(key: Key): string {
    const nextColor = getColorIterator(key);
    const bg = nextColor();
    const metal = getRandomColor(key);
    const accent = nextColor();
    const elements: string[] = [];
    elements.push(`<rect width="500" height="500" fill="${bg}"/>`);
    // robot head box
    elements.push(`<rect x="120" y="110" width="260" height="240" rx="28" fill="${metal}" stroke="#000" stroke-width="2"/>`);
    // eyes as LEDs
    elements.push(`<circle cx="190" cy="200" r="16" fill="#fff"/>`);
    elements.push(`<circle cx="310" cy="200" r="16" fill="#fff"/>`);
    elements.push(`<circle cx="190" cy="200" r="6" fill="#000"/>`);
    elements.push(`<circle cx="310" cy="200" r="6" fill="#000"/>`);
    // mouth grill
    elements.push(`<rect x="190" y="260" width="120" height="24" rx="6" fill="${accent}"/>`);
  // antenna optional and panels
  if ((key.next16() % 3) === 0) elements.push(`<rect x="245" y="86" width="10" height="40" fill="#000"/>`);
  if ((key.next16() % 4) === 0) elements.push(`<rect x="160" y="180" width="40" height="30" rx="6" fill="#000" opacity="0.12"/>`);
  if ((key.next16() % 5) === 0) elements.push(`<circle cx="${230 + (key.next16()%60)}" cy="${260 + (key.next16()%20)}" r="6" fill="#000"/>`);
    return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">${elements.join('')}</svg>`;
  }

  private generateCreature(key: Key): string {
    const nextColor = getColorIterator(key);
    const bg = nextColor();
    const skin = nextColor();
    const accent = nextColor();
    const elements: string[] = [];
    elements.push(`<rect width="500" height="500" fill="${bg}"/>`);
    // weird head
    elements.push(`<path d="M 120 220 Q 250 60 380 220 Q 330 360 170 360 Z" fill="${skin}" stroke="#111" stroke-width="1"/>`);
    // eyes asymmetric with different shapes
    const eyeVar = key.next16() % 4;
    if (eyeVar === 0) {
      elements.push(`<circle cx="200" cy="220" r="14" fill="#fff"/>`);
      elements.push(`<circle cx="300" cy="210" r="20" fill="#fff"/>`);
    } else if (eyeVar === 1) {
      elements.push(`<ellipse cx="200" cy="220" rx="18" ry="12" fill="#fff"/>`);
      elements.push(`<rect x="280" y="200" width="40" height="18" rx="8" fill="#fff"/>`);
    } else if (eyeVar === 2) {
      elements.push(`<circle cx="200" cy="220" r="10" fill="#fff"/>`);
      elements.push(`<circle cx="300" cy="210" r="10" fill="#fff"/>`);
      elements.push(`<circle cx="200" cy="220" r="4" fill="#000"/>`);
      elements.push(`<circle cx="300" cy="210" r="4" fill="#000"/>`);
    } else {
      elements.push(`<path d="M 180 210 q 20 -20 40 0" stroke="#000" stroke-width="2" fill="none"/>`);
      elements.push(`<path d="M 280 200 q 20 -20 40 0" stroke="#000" stroke-width="2" fill="none"/>`);
    }
    // mouth varied
    const mouthVar = key.next16() % 4;
    if (mouthVar === 0) elements.push(`<path d="M 210 300 q 40 24 80 0" stroke="#7b1d1d" stroke-width="3" fill="none" stroke-linecap="round"/>`);
    else if (mouthVar === 1) elements.push(`<rect x="220" y="290" width="60" height="18" rx="8" fill="#c0392b"/>`);
    else if (mouthVar === 2) elements.push(`<path d="M 220 300 q 30 10 60 0 q -30 18 -60 0" fill="#e74c3c"/>`);
    else elements.push(`<path d="M 210 300 q 40 -6 80 0" stroke="#111" stroke-width="2" fill="none"/>`);
    // horns/antennae variations
    if ((key.next16() % 2) === 0) {
      elements.push(`<path d="M 140 170 q 20 -40 40 0" stroke="#000" stroke-width="2" fill="${accent}"/>`);
      elements.push(`<path d="M 360 170 q -20 -40 -40 0" stroke="#000" stroke-width="2" fill="${accent}"/>`);
    } else {
      elements.push(`<circle cx="160" cy="150" r="10" fill="${accent}"/>`);
      elements.push(`<circle cx="340" cy="150" r="8" fill="${accent}"/>`);
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

export async function generateAvatar(identifier: string, style: AvatarStyle, variant = 0): Promise<string> {
  // variant allows creating many distinct avatars for the same identifier
  const { generateHash, Key } = await import('./hash');
  const hash = await generateHash(`${identifier}|v${variant}`);
  const key = new Key(hash);
  const generator = getAvatarGenerator(style);
  return generator.generate(key);
}

// Try to generate a visually unique avatar for an identifier using fingerprinting.
export async function generateUniqueAvatar(identifier: string, style: AvatarStyle, maxAttempts = 200): Promise<{ svg: string; variant: number }> {
  const { getFingerprint, hasSeen, addSeen } = await import('./avatarFingerprint');
  for (let v = 0; v < maxAttempts; v++) {
    const svg = await generateAvatar(identifier, style, v);
    const fp = await getFingerprint(svg);
    if (!hasSeen(identifier, fp)) {
      addSeen(identifier, fp);
      return { svg, variant: v };
    }
    // otherwise continue trying
  }
  // fallback: return last one
  const svg = await generateAvatar(identifier, style, maxAttempts - 1);
  return { svg, variant: maxAttempts - 1 };
}
