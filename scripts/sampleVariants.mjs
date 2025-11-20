import path from 'path';
const root = path.resolve('.');
const gen = await import('../src/lib/avatarGenerators');

const identifier = 'test-user@example.com';
const style = 'face';

for (let v = 0; v < 12; v++) {
  // eslint-disable-next-line no-await-in-loop
  const svg = await gen.generateAvatar(identifier, style, v);
  console.log('--- variant', v, 'len=', svg.length);
  console.log(svg.slice(0, 200));
}
