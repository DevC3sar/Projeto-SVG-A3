import { Key } from './hash';

// Professional color palettes - more harmonious and stylish
const colorPalettes = [
  // Vibrant Professional
  ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8B94'],
  // Purple Dreams
  ['#6C5CE7', '#A29BFE', '#FD79A8', '#FDCB6E', '#74B9FF'],
  // Ocean Breeze
  ['#00B894', '#00CEC9', '#0984E3', '#74B9FF', '#A29BFE'],
  // Sunset Warm
  ['#FF7675', '#FD79A8', '#FDCB6E', '#FFE66D', '#FFB088'],
  // Earth Tones
  ['#E17055', '#FDCB6E', '#00B894', '#A8E6CF', '#DDA15E'],
  // Candy Pop
  ['#F39C12', '#E74C3C', '#9B59B6', '#3498DB', '#1ABC9C'],
  // Pastel Professional
  ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA', '#FFD9BA'],
  // Bold & Modern
  ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'],
];

// Skin tone palettes for professional avatars
export const skinTones = [
  '#FFDFC4', '#F0C8A0', '#D9A066', '#C68642', '#8D5524', '#6B4423'
];

// Hair color palettes
export const hairColors = [
  '#2C1B18', '#4A312C', '#6A4E42', '#8B5A3C', '#B8860B', 
  '#DAA520', '#FFD700', '#E9967A', '#F4A460', '#FF6B6B'
];

export function getColorIterator(key: Key) {
  const paletteIndex = key.next() % colorPalettes.length;
  const palette = colorPalettes[paletteIndex];
  let colorIndex = 0;

  return () => {
    const color = palette[colorIndex % palette.length];
    colorIndex++;
    return color;
  };
}

export function getSkinTone(key: Key): string {
  return skinTones[key.next() % skinTones.length];
}

export function getHairColor(key: Key): string {
  return hairColors[key.next() % hairColors.length];
}

export function getRandomColor(key: Key): string {
  const h = key.next256() / 255 * 360;
  const s = 60 + (key.next256() / 255 * 30);
  const l = 45 + (key.next256() / 255 * 20);
  return `hsl(${h}, ${s}%, ${l}%)`;
}
