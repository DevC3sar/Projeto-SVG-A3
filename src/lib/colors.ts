import { Key } from './hash';

// Color palettes for avatars
const colorPalettes = [
  ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'],
  ['#6C5CE7', '#A29BFE', '#FD79A8', '#FDCB6E', '#74B9FF'],
  ['#00B894', '#00CEC9', '#0984E3', '#6C5CE7', '#FDCB6E'],
  ['#FF7675', '#FD79A8', '#FDCB6E', '#55EFC4', '#74B9FF'],
  ['#E17055', '#FDCB6E', '#00B894', '#00CEC9', '#6C5CE7'],
  ['#F39C12', '#E74C3C', '#9B59B6', '#3498DB', '#1ABC9C'],
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

export function getRandomColor(key: Key): string {
  const h = key.next256() / 255 * 360;
  const s = 60 + (key.next256() / 255 * 30);
  const l = 45 + (key.next256() / 255 * 20);
  return `hsl(${h}, ${s}%, ${l}%)`;
}
