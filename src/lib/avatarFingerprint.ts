import { generateHash } from './hash';

// Simple fingerprinting: extract colors, count basic element types, and hash a short signature
export async function getFingerprint(svg: string): Promise<string> {
  const normalized = normalizeSvg(svg);
  const colors = extractColors(normalized).join(',');
  const counts = countElements(normalized);
  const short = `${colors}|c:${counts.circle}|r:${counts.rect}|p:${counts.path}|e:${counts.ellipse}|l:${Math.min(200, normalized.length)}`;
  const h = await generateHash(short);
  return h;
}

function normalizeSvg(s: string): string {
  return s.replace(/\s+/g, ' ').replace(/> </g, '><').trim();
}

function extractColors(s: string): string[] {
  const re = /#([0-9a-fA-F]{3,6})|hsl\([^)]*\)/g;
  const set = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    set.add(m[0].toLowerCase());
  }
  return Array.from(set).sort();
}

function countElements(s: string) {
  return {
    circle: (s.match(/<circle\b/g) || []).length,
    rect: (s.match(/<rect\b/g) || []).length,
    path: (s.match(/<path\b/g) || []).length,
    ellipse: (s.match(/<ellipse\b/g) || []).length,
  };
}

// persist seen fingerprints in localStorage under key 'avatar-seen'
const STORAGE_KEY = 'avatar-seen-v1';

function loadAll(): Record<string, string[]> {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function saveAll(data: Record<string, string[]>) {
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // ignore
  }
}

export function hasSeen(identifier: string, fingerprint: string): boolean {
  const all = loadAll();
  const arr = all[identifier] || [];
  return arr.includes(fingerprint);
}

export function addSeen(identifier: string, fingerprint: string): void {
  const all = loadAll();
  const arr = all[identifier] || [];
  if (!arr.includes(fingerprint)) {
    arr.push(fingerprint);
    // keep last 500
    if (arr.length > 500) arr.splice(0, arr.length - 500);
    all[identifier] = arr;
    saveAll(all);
  }
}

export function resetSeen(identifier: string): void {
  const all = loadAll();
  delete all[identifier];
  saveAll(all);
}

export function clearAllSeen(): void {
  saveAll({});
}
