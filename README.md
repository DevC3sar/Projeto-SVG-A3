## Créditos
Feito por: Guilherme Cesar de Brito 

# SVGuid - Biblioteca de Avatares SVG Determinísticos

Uma biblioteca JavaScript/TypeScript simples e poderosa para gerar avatares SVG únicos e determinísticos a partir de qualquer identificador.

## 🎯 Características

- ✅ **Determinístico**: Mesmo identificador = mesmo avatar sempre
- ✅ **Único**: Sistema de fingerprinting evita avatares visualmente idênticos
- ✅ **Zero dependências externas**: Usa apenas Web Crypto API e Canvas API
- ✅ **5 estilos diferentes**: geometric, blob, pixel, face, abstract
- ✅ **Múltiplos formatos**: SVG, PNG, Data URL
- ✅ **TypeScript**: Totalmente tipado
- ✅ **Leve**: Código minimalista e eficiente

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/svguid.git
cd svguid

# Instale as dependências
npm install
```

## 🚀 Uso da Biblioteca

### Importação

```typescript
import {
  generateAvatar,
  generateUniqueAvatar,
  svgToDataUrl,
  svgToPng,
  downloadSvg,
  downloadPng,
} from './src/lib';
```

### Gerar Avatar Simples

```typescript
// Gera um avatar SVG do estilo "geometric"
const svg = await generateAvatar('user@example.com', 'geometric');
console.log(svg); // <svg viewBox="0 0 500 500"...

// Gera com variante específica
const svgVariant = await generateAvatar('user@example.com', 'blob', 5);
```

### Gerar Avatar Único (Evita Duplicatas)

```typescript
// Tenta gerar um avatar visualmente único
const { svg, variant } = await generateUniqueAvatar('user@example.com', 'face');
console.log(`Avatar gerado com variante ${variant}`);
```

### Estilos Disponíveis

```typescript
type AvatarStyle = 'geometric' | 'blob' | 'pixel' | 'face' | 'abstract';
```

- **geometric**: Formas geométricas sobrepostas (círculos, retângulos)
- **blob**: Formas orgânicas suaves
- **pixel**: Arte pixel simétrica estilo 8-bit
- **face**: Rostos estilizados (humanos, animais, frutas, robôs, etc.)
- **abstract**: Padrões abstratos e artísticos

### Conversão de Formatos

```typescript
// SVG para Data URL
const dataUrl = svgToDataUrl(svg);
// data:image/svg+xml;base64,...

// SVG para PNG (500x500 por padrão)
const pngDataUrl = await svgToPng(svg, 500);

// PNG em tamanho customizado
const pngSmall = await svgToPng(svg, 200);
```

### Download de Arquivos

```typescript
// Baixar SVG
downloadSvg(svg, 'meu-avatar');
// Salva como: meu-avatar.svg

// Baixar PNG
const pngDataUrl = await svgToPng(svg);
downloadPng(pngDataUrl, 'meu-avatar');
// Salva como: meu-avatar.png
```

### Fingerprinting (Evitar Duplicatas)

```typescript
import {
  getFingerprint,
  hasSeen,
  addSeen,
  resetSeen,
  clearAllSeen,
} from './src/lib';

// Gera fingerprint único do SVG
const fingerprint = await getFingerprint(svg);

// Verifica se já foi visto
const isDuplicate = hasSeen('user@example.com', fingerprint);

// Marca como visto
addSeen('user@example.com', fingerprint);

// Limpa histórico de um identificador
resetSeen('user@example.com');

// Limpa todo o histórico
clearAllSeen();
```

### Utilitários de Hash

```typescript
import { generateHash, Key } from './src/lib';

// Gera hash SHA-256 de um identificador
const hash = await generateHash('user@example.com');
console.log(hash); // "a2b3c4d5e6f7..."

// Cria objeto Key para geração determinística
const key = new Key(hash);
const randomNum = key.next(); // 1-1000
const randomByte = key.next256(); // 0-255
const randomInt = key.nextInt(10); // 0-9
```

### Utilitários de Cores

```typescript
import { getColorIterator, getRandomColor } from './src/lib';

const key = new Key(await generateHash('user@example.com'));

// Iterador de paleta de cores
const nextColor = getColorIterator(key);
const color1 = nextColor(); // "#FF6B6B"
const color2 = nextColor(); // "#4ECDC4"

// Cor aleatória HSL
const randomColor = getRandomColor(key);
// "hsl(245, 75%, 55%)"
```

## 🎨 Exemplo Completo

```typescript
import {
  generateUniqueAvatar,
  svgToPng,
  downloadSvg,
  downloadPng,
} from './src/lib';

async function createAvatar(email: string) {
  // Gera avatar único
  const { svg, variant } = await generateUniqueAvatar(email, 'face');
  
  console.log(`Avatar criado para ${email} (variante ${variant})`);
  
  // Converte para PNG
  const pngDataUrl = await svgToPng(svg, 500);
  
  // Exibe na página
  const img = document.createElement('img');
  img.src = pngDataUrl;
  document.body.appendChild(img);
  
  // Baixa arquivos
  downloadSvg(svg, `avatar-${email}`);
  downloadPng(pngDataUrl, `avatar-${email}`);
}

// Uso
createAvatar('user@example.com');
```

## 🧪 Exemplo HTML Standalone

Abra o arquivo `example.html` no navegador para ver um exemplo funcional:

```bash
npm run dev
# Abra: http://localhost:5173/example.html
```

## 🏗️ Arquitetura

```
src/lib/
├── index.ts              # Ponto de entrada da biblioteca
├── avatarGenerators.ts   # Geradores de avatares por estilo
├── hash.ts               # Geração de hash SHA-256 e classe Key
├── colors.ts             # Paletas e geração de cores
└── avatarFingerprint.ts  # Sistema de fingerprinting
```

## 🔧 Desenvolvimento

```bash
# Executar ambiente de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📖 Documentação Técnica

Para uma compreensão aprofundada dos conceitos, algoritmos e arquitetura, consulte:

- [Documentação Técnica Completa](./docs/DOCUMENTACAO_TECNICA.md)
- [Pitch do Projeto](./docs/PITCH_APRESENTACAO.md)
- [Conceitos para Apresentação](./docs/CONCEITOS_APRESENTACAO.md)

## 🧮 Conceitos Técnicos

### SHA-256 e Determinismo

Cada identificador gera um hash SHA-256 de 256 bits (64 caracteres hexadecimais). Este hash é usado como "semente" para gerar números pseudo-aleatórios de forma determinística.

### Fingerprinting Visual

O sistema analisa cada SVG gerado e cria uma "impressão digital" baseada em:
- Cores utilizadas
- Número de elementos (círculos, retângulos, paths, elipses)
- Comprimento normalizado

Isso garante que avatares visualmente idênticos não sejam gerados.

### Geração de Cores

Usa o modelo HSL (Hue, Saturation, Lightness) para gerar cores vibrantes e harmoniosas:
- 6 paletas predefinidas cuidadosamente escolhidas
- Geração dinâmica HSL baseada no hash

## 📄 Licença

MIT

## 🙏 Inspiração

Inspirado em projetos como:
- [Identicon](http://identicon.net/)
- [Jdenticon](https://jdenticon.com/)
- [Boring Avatars](https://boringavatars.com/)
- [Robohash](https://robohash.org/)

## Demo

Veja abaixo uma prévia animada do gerador:

<p align="center">
  <img src="public/demo.svg" alt="Demo animado do gerador"/>
</p>

---

Feito com ❤️ usando TypeScript, React, e Web Crypto API
