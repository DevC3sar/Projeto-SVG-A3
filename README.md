# Avatar Widget - Gerador de Avatares SVG Determinísticos

Uma biblioteca JavaScript moderna para gerar avatares SVG únicos, determinísticos e coloridos baseados em hashes. Perfeita para aplicações que precisam de avatares aleatórios mas consistentes para usuários, posts, ou qualquer identificador único.

## 🎨 Características Principais

- **40 Estilos de Avatar Distintos** - Desde geometria abstrata até emojis estilo faces
- **Determinístico** - Mesmo hash sempre gera o mesmo avatar
- **Colorido** - Cores variadas e harmônicas baseadas no hash do usuário
- **Leve e Rápido** - Sem dependências externas (apenas svg.js)
- **Geração em Tempo Real** - SVG puro gerado no cliente
- **Componente Vue 3** - Integração perfeita com Vue.js
- **Publicado no NPM** - `@guilherme4774/avatar-widget`

## 📦 Instalação

### Via NPM (Recomendado)

```bash
npm install @guilherme4774/avatar-widget
```

### Via Yarn

```bash
yarn add @guilherme4774/avatar-widget
```

### Via PNPM

```bash
pnpm add @guilherme4774/avatar-widget
```

## 🚀 Uso Rápido

### Em um Projeto Vue 3

```vue
<template>
  <div class="avatar-container">
    <svg 
      width="200" 
      height="200"
      viewBox="0 0 1000 1000" 
      version="1.1"
      xmlns="http://www.w3.org/2000/svg">
      <g v-html="avatarSVG"></g>
    </svg>
  </div>
</template>

<script>
import { SVG } from '@svgdotjs/svg.js'
import widget from '@guilherme4774/avatar-widget/src/widget/widget.js'
import keygen from '@guilherme4774/avatar-widget/src/keygen.js'

export default {
  data() {
    return {
      avatarSVG: ''
    }
  },
  mounted() {
    this.generateAvatar('usuario@example.com')
  },
  methods: {
    generateAvatar(identifier) {
      const key = keygen.getKeyParams(identifier)
      const draw = SVG().viewbox(0, 0, 1000, 1000)
      widget(key, draw)
      this.avatarSVG = draw.svg()
    }
  }
}
</script>
```

### Em JavaScript Vanilla

```javascript
import { SVG } from '@svgdotjs/svg.js'
import widget from '@guilherme4774/avatar-widget/src/widget/widget.js'
import keygen from '@guilherme4774/avatar-widget/src/keygen.js'

function generateAvatar(userId, elementId) {
  const key = keygen.getKeyParams(userId)
  const draw = SVG().viewbox(0, 0, 1000, 1000)
  widget(key, draw)
  
  const element = document.getElementById(elementId)
  element.innerHTML = draw.svg()
}

// Uso
generateAvatar('user123', 'avatar-container')
```

## 📋 Estrutura da Biblioteca

```
src/
├── widget/
│   ├── widget.js                    # Seletor de avatar (40 estilos)
│   ├── examples/
│   │   ├── widget00.js - widget39.js  # 40 estilos diferentes
│   └── utils/
│       ├── colors/
│       │   ├── color.js             # Gerador de cores determinístico
│       │   └── color-palette.js     # Paleta de 18 cores
│       ├── blob/
│       │   └── blob.js              # Gerador de blobs SVG
│       ├── grids/
│       │   ├── grid01.js
│       │   └── grid02.js
│       ├── iconify/
│       │   └── icon.js              # Ícones Iconify
│       └── shape/
│           └── shape.js             # Shapes SVG customizadas
├── keygen.js                        # Gerador de hash SHA256
├── main.js                          # Ponto de entrada
└── App.vue                          # Aplicação de demonstração
```

## 🎯 Os 40 Estilos de Avatar

### widget00-widget09: Padrões Geométricos Clássicos
- **widget00**: Retângulos e círculos em grid
- **widget01**: Padrão em V
- **widget02**: Quadrados rotacionados
- **widget03**: Linhas e pontos
- **widget04**: Círculos sobrepostos
- **widget05**: Triângulos em espiral
- **widget06**: Padrão em xadrez
- **widget07**: Ondas horizontais
- **widget08**: Hexágonos em grid
- **widget09**: Padrão radial

### widget10-widget19: Geometria Avançada
- **widget10**: Círculos concêntricos
- **widget11**: Padrão de ondas
- **widget12**: Polígonos dinâmicos
- **widget13**: Hexágonos com gradiente
- **widget14**: Espiral matemática
- **widget15**: Padrão fractal
- **widget16**: Diagrama de Voronoi
- **widget17**: Gradiente radial
- **widget18**: Diamantes sobrepostos
- **widget19**: Tabuleiro de xadrez dinâmico

### widget20-widget29: Inspirados em Geradores Populares
- **widget20**: Identicon (simetria em grid)
- **widget21**: Jdenticon (símbolos abstratos)
- **widget22**: Robohash (robôs)
- **widget23**: Boring Avatars (geometria moderna)
- **widget24**: MinIdenticons (minimalista)
- **widget25**: MonsterID (criaturas)
- **widget26**: Pixel Art (retro 8-bit)
- **widget27**: Geometric Faces (faces abstratas)
- **widget28**: Abstract Pattern (padrão abstrato)
- **widget29**: Circular Mandala (mandala circular)

### widget30-widget34: Avatares com Rosto Realista
- **widget30**: Realista Minimalist (cabeça, olhos, nariz, boca, sobrancelhas)
- **widget31**: Cartoon (olhos grandes, blush, expressões)
- **widget32**: Profissional Corporativo (formal, cabelo penteado, gola de camisa)
- **widget33**: Anime/Mangá (olhos gigantes, sobrancelhas ângulares)
- **widget34**: Low-Poly Moderno (triângulos geométricos)

### widget35-widget39: Emojis Estilo Avatar
- **widget35**: Faces Felizes (sorriso, piscada, riso, apaixonado)
- **widget36**: Acessórios (óculos de sol, chapéu, coroa, pirata)
- **widget37**: Animais (gato, cachorro, urso, coelho)
- **widget38**: Emoções Intensas (raiva, tristeza, surpresa, vômito)
- **widget39**: Monstros e Alienígenas (monstro, alienígena, fantasma, ameba)

## 🔧 API Técnica

### keygen.getKeyParams(identifier)

Gera um objeto de chave baseado em SHA256 do identificador.

```javascript
const key = keygen.getKeyParams('usuario@example.com')

// Métodos disponíveis:
key.next()      // Próximo número aleatório [0-1)
key.next16()    // Próximo número [0-65535]
key.next256()   // Próximo número [0-255]
```

**Exemplo:**
```javascript
const key = keygen.getKeyParams('user123')
const randomColor = key.next256()  // Retorna número determinístico
const randomIndex = key.next256() % 40  // Seleciona widget (0-39)
```

### widget(key, draw, opts)

Renderiza um avatar selecionado aleatoriamente (mas deterministicamente).

**Parâmetros:**
- `key` (Object): Objeto retornado por `keygen.getKeyParams()`
- `draw` (SVG): Objeto SVG.js inicializado
- `opts` (Object, opcional): Opções de renderização

**Exemplo:**
```javascript
import { SVG } from '@svgdotjs/svg.js'
import widget from '@guilherme4774/avatar-widget/src/widget/widget.js'
import keygen from '@guilherme4774/avatar-widget/src/keygen.js'

const key = keygen.getKeyParams('usuario')
const draw = SVG().viewbox(0, 0, 1000, 1000)
widget(key, draw, { size: 200 })
```

### getColorIterator(key)

Cria um iterador de cores determinísticas baseado no hash.

```javascript
import { getColorIterator } from '@guilherme4774/avatar-widget/src/widget/utils/colors/color.js'

const nextColor = getColorIterator(key)
const color1 = nextColor()  // "#FF5733" (por exemplo)
const color2 = nextColor()  // "#33B8FF" (próxima cor)
```

**Paleta de Cores:**
A biblioteca usa 18 cores harmônicas com múltiplas variações de tons:
- Reds, Oranges, Yellows
- Greens, Teals, Blues
- Purples, Pinks, Grays

## 📊 Versões e Mudanças

### v0.4.0 (Atual)
- ✅ 40 estilos de avatar completos
- ✅ 5 widgets emoji (widget35-widget39)
- ✅ Todos os avatares centralizados corretamente
- ✅ Publicado no NPM como `@guilherme4774/avatar-widget@0.4.0`

### v0.3.0
- ✅ 5 widgets com rosto realista (widget30-widget34)
- ✅ Avatares com características faciais (cabeça, olhos, nariz, boca)

### v0.2.0
- ✅ 30 widgets de avatar
- ✅ Sistema de seleção aleatória (mas determinística)

### v0.1.0
- ✅ Primeira versão com 10 widgets básicos

## 🛠️ Tecnologias Utilizadas

- **Vue.js 3** - Framework frontend
- **Vite** - Build tool moderno
- **@svgdotjs/svg.js** - Biblioteca SVG
- **Quasar** - UI Framework (componentes)
- **WindiCSS** - Utility CSS
- **Sass** - Pré-processador CSS
- **@iconify/vue** - Ícones

## 📦 Dependências Principais

```json
{
  "dependencies": {
    "@svgdotjs/svg.js": "^3.2.0"
  },
  "peerDependencies": {
    "vue": "^3.0.0"
  },
  "devDependencies": {
    "vite": "^5.2.0",
    "quasar": "^2.15.4",
    "sass": "^1.76.0",
    "windicss": "^3.5.6"
  }
}
```

## 🎮 Desenvolvimento Local

### Instalação

```bash
# Clone o repositório
git clone https://github.com/DevC3sar/Projeto-SVG-A3.git
cd Projeto-SVG-A3

# Instale as dependências
npm install
```

### Executar Localmente

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:5173
```

### Build para Produção

```bash
npm run build
```

### Testar a Biblioteca

```bash
npm run test
```

## 📝 Exemplo Completo

```vue
<template>
  <div class="avatar-grid">
    <div v-for="user in users" :key="user.id" class="avatar-card">
      <svg 
        :id="'avatar-' + user.id"
        width="200" 
        height="200"
        viewBox="0 0 1000 1000" 
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <g :v-html="avatars[user.id]"></g>
      </svg>
      <p>{{ user.name }}</p>
    </div>
  </div>
</template>

<script>
import { SVG } from '@svgdotjs/svg.js'
import widget from '@guilherme4774/avatar-widget/src/widget/widget.js'
import keygen from '@guilherme4774/avatar-widget/src/keygen.js'

export default {
  data() {
    return {
      avatars: {},
      users: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
      ]
    }
  },
  mounted() {
    this.users.forEach(user => {
      this.generateAvatar(user.id, user.name)
    })
  },
  methods: {
    generateAvatar(id, name) {
      const key = keygen.getKeyParams(name)
      const draw = SVG().viewbox(0, 0, 1000, 1000)
      widget(key, draw)
      this.$set(this.avatars, id, draw.svg())
    }
  }
}
</script>

<style scoped>
.avatar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.avatar-card {
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  background: #f5f5f5;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

svg {
  max-width: 100%;
  height: auto;
}
</style>
```

## 🚀 Deploy e Distribuição

A biblioteca está disponível no NPM Registry:

```bash
npm install @guilherme4774/avatar-widget
```

**Links:**
- [NPM Package](https://www.npmjs.com/package/@guilherme4774/avatar-widget)
- [GitHub Repository](https://github.com/DevC3sar/Projeto-SVG-A3)

## 🎓 Como Funciona a Geração

1. **Hash SHA256**: O identificador (email, ID, nome) é convertido em um hash SHA256
2. **Pseudo-random**: O hash é usado como seed para gerar números "aleatórios" mas determinísticos
3. **Seleção de Widget**: Usa `hash % 40` para selecionar um dos 40 estilos
4. **Cores**: Utiliza iterações do hash para gerar cores harmônicas
5. **SVG Puro**: Renderiza o resultado como SVG puro usando svg.js

**Propriedade Importante:** Mesmo hash sempre gera o mesmo avatar!

## 📄 Licença

MIT - Veja LICENSE para detalhes

## 👤 Autor

**Guilherme4774** - Desenvolvedor Full Stack

- GitHub: [@DevC3sar](https://github.com/DevC3sar)
- NPM: [@guilherme4774](https://www.npmjs.com/~guilherme4774)

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você encontrar bugs ou tiver sugestões, abra uma issue no repositório.

```bash
# Para contribuir:
1. Fork o projeto
2. Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)
3. Commit suas mudanças (git commit -m 'Add some AmazingFeature')
4. Push para a branch (git push origin feature/AmazingFeature)
5. Abra um Pull Request
```

## 📞 Suporte

Para dúvidas, sugestões ou reportar bugs:
- Abra uma [Issue no GitHub](https://github.com/DevC3sar/Projeto-SVG-A3/issues)
- Consulte a [Documentação Técnica](./docs)

---

**Última atualização:** Novembro de 2025
**Versão:** 0.4.0

