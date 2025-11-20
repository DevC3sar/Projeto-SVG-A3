// Generate deterministic hash from identifier
export async function generateHash(identifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(identifier);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Key class for deterministic number generation
export class Key {
  private hash: string;
  private index: number = 0;

  constructor(hash: string) {
    this.hash = hash;
  }

  private getBytes(count: number): number[] {
    const bytes: number[] = [];
    for (let i = 0; i < count; i++) {
      const idx = (this.index + i) % this.hash.length;
      bytes.push(parseInt(this.hash.substr(idx * 2, 2), 16));
    }
    this.index = (this.index + count) % (this.hash.length / 2);
    return bytes;
  }

  next(): number {
    const bytes = this.getBytes(2);
    return (bytes[0] * 256 + bytes[1]) % 1000 + 1;
  }

  next256(): number {
    return this.getBytes(1)[0];
  }

  next16(): number {
    return this.getBytes(1)[0] % 16;
  }

  reset(): void {
    this.index = 0;
  }
}
