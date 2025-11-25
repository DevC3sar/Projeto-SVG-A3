# Publishing SVGuid to NPM

## Prerequisites

1. NPM account (create at npmjs.com)
2. Login to NPM: `npm login`

## Manual Configuration Required

Since `package.json` is read-only in the development environment, you need to manually add these fields to `package.json` before publishing:

```json
{
  "name": "svguid",
  "version": "1.0.0",
  "description": "Deterministic SVG avatar generator from any identifier",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "keywords": [
    "avatar",
    "svg",
    "deterministic",
    "generator",
    "identicon",
    "profile-picture"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/svguid.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/svguid/issues"
  },
  "homepage": "https://github.com/yourusername/svguid#readme"
}
```

Add these scripts to the existing `scripts` section:

```json
"scripts": {
  "build:lib": "vite build --config vite.config.lib.ts && tsc --project tsconfig.lib.json",
  "prepublishOnly": "npm run build:lib"
}
```

## Publishing Steps

1. **Build the library:**
   ```bash
   npm run build:lib
   ```

2. **Test the build locally:**
   ```bash
   npm pack
   # This creates a .tgz file you can test in another project
   ```

3. **Publish to NPM:**
   ```bash
   npm publish
   ```

4. **For scoped packages (optional):**
   ```bash
   npm publish --access public
   ```

## Version Management

Update version before each publish:
```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

## Post-Publishing

Users can then install your library:
```bash
npm install svguid
```

And use it:
```javascript
import { generateAvatar } from 'svguid';

const svg = await generateAvatar('user@example.com', 'geometric');
```
