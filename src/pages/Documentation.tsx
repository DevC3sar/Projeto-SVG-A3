import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Documentation = () => {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMD = () => {
    fetch('/docs/DOCUMENTACAO_TECNICA.md')
      .then(response => response.text())
      .then(text => {
        const blob = new Blob([text], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'DOCUMENTACAO_TECNICA_SVGUID.md';
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - hidden in print */}
      <div className="no-print sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownloadMD}>
              <Download className="mr-2 h-4 w-4" />
              Download MD
            </Button>
            <Button onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Gerar PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <article className="prose prose-slate dark:prose-invert max-w-none">
          {/* Cover Page */}
          <div className="cover-page text-center mb-16 pb-16 border-b-2 page-break">
            <div className="mb-8">
              <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                SVGUID
              </h1>
              <p className="text-3xl text-muted-foreground">
                Gerador de Avatares SVG Determinísticos
              </p>
            </div>
            
            <div className="mt-16 space-y-2 text-lg">
              <p className="font-semibold">Documentação Técnica Completa</p>
              <p className="text-muted-foreground">Versão 1.0</p>
              <p className="text-muted-foreground">{new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="toc mb-16 pb-16 border-b page-break">
            <h2 className="text-3xl font-bold mb-8">Índice</h2>
            <nav className="space-y-2">
              <a href="#visao-geral" className="block hover:text-primary">1. Visão Geral do Projeto</a>
              <a href="#conceitos" className="block hover:text-primary">2. Conceitos Fundamentais</a>
              <a href="#arquitetura" className="block hover:text-primary">3. Arquitetura do Sistema</a>
              <a href="#computacao-grafica" className="block hover:text-primary">4. Computação Gráfica e SVG</a>
              <a href="#algoritmos" className="block hover:text-primary">5. Algoritmos e Técnicas</a>
              <a href="#implementacao" className="block hover:text-primary">6. Implementação Técnica</a>
              <a href="#fluxo-dados" className="block hover:text-primary">7. Fluxo de Dados</a>
              <a href="#design-system" className="block hover:text-primary">8. Design System</a>
            </nav>
          </div>

          {/* 1. Visão Geral */}
          <section id="visao-geral" className="mb-16">
            <h2 className="text-4xl font-bold mb-6">1. Visão Geral do Projeto</h2>
            
            <h3 className="text-2xl font-semibold mb-4">Propósito</h3>
            <p className="text-lg mb-6">
              Sistema web para geração de avatares SVG únicos e determinísticos baseados em identificadores 
              (email, username, texto). Cada identificador sempre gera o mesmo avatar, garantindo consistência e unicidade.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Características Principais</h3>
            <ul className="list-disc pl-6 space-y-2 text-lg mb-6">
              <li><strong>Determinismo</strong>: Mesmo identificador = mesmo avatar (sempre)</li>
              <li><strong>Unicidade</strong>: Identificadores diferentes = avatares visualmente distintos</li>
              <li><strong>Zero Dependências Externas</strong>: Não requer APIs ou serviços externos</li>
              <li><strong>5 Estilos Visuais</strong>: Geométrico, Blob, Pixel, Face, Abstract</li>
              <li><strong>Exportação Múltipla</strong>: SVG, PNG, Data URL</li>
              <li><strong>Persistência Local</strong>: Histórico de avatares gerados</li>
            </ul>

            <div className="diagram-container bg-muted/30 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">Fluxo Principal do Sistema</h4>
              <pre className="text-sm overflow-x-auto">
{`Identificador → SHA-256 Hash → Key Object → Gerador de Estilo → SVG Avatar
                                                                      ├─→ Display
                                                                      ├─→ Export PNG
                                                                      └─→ Copy URL`}
              </pre>
            </div>
          </section>

          {/* 2. Conceitos Fundamentais */}
          <section id="conceitos" className="mb-16 page-break">
            <h2 className="text-4xl font-bold mb-6">2. Conceitos Fundamentais</h2>

            <h3 className="text-2xl font-semibold mb-4">2.1 SVG (Scalable Vector Graphics)</h3>
            <p className="text-lg mb-4">
              SVG é um formato de imagem baseado em XML que descreve gráficos vetoriais 2D. 
              Diferente de imagens raster (PNG, JPG), SVG usa descrições matemáticas de formas geométricas.
            </p>

            <div className="bg-muted/30 p-6 rounded-lg mb-6">
              <h4 className="text-xl font-semibold mb-3">Vantagens do SVG</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Escalabilidade Infinita</strong>: Não perde qualidade em qualquer resolução</li>
                <li><strong>Tamanho de Arquivo Pequeno</strong>: Descrições matemáticas são compactas</li>
                <li><strong>Manipulável</strong>: Pode ser editado com código, animado, estilizado</li>
                <li><strong>Performance</strong>: Renderização rápida via GPU</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mb-4">2.2 Hashing Criptográfico (SHA-256)</h3>
            <p className="text-lg mb-4">
              Função matemática unidirecional que transforma entrada de tamanho variável em saída de tamanho fixo.
            </p>

            <div className="diagram-container bg-muted/30 p-6 rounded-lg mb-6">
              <h4 className="text-xl font-semibold mb-4">Processo de Hashing</h4>
              <pre className="text-sm">
{`user@example.com
       ↓
  TextEncoder
       ↓
  Bytes Array
       ↓
SHA-256 Algorithm
       ↓
Hash: b4c2a6e9f1d8...
       ↓
Hex String (64 chars)`}
              </pre>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded mb-6">
              <h4 className="text-xl font-semibold mb-3">Propriedades Críticas do SHA-256</h4>
              <ul className="space-y-2">
                <li><strong>Determinístico</strong>: Mesma entrada → mesmo hash</li>
                <li><strong>Irreversível</strong>: Impossível recuperar entrada do hash</li>
                <li><strong>Sensível</strong>: Pequena mudança → hash completamente diferente</li>
                <li><strong>Uniforme</strong>: Distribuição estatística equilibrada</li>
                <li><strong>256 bits</strong>: 2^256 combinações possíveis</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mb-4">2.3 Geração Pseudoaleatória Determinística</h3>
            <p className="text-lg mb-4">
              A classe <code>Key</code> é o coração do sistema, transformando o hash em números determinísticos.
            </p>

            <div className="bg-muted/30 p-6 rounded-lg">
              <pre className="bg-background p-4 rounded overflow-x-auto text-sm">
{`class Key {
  private hash: string;
  private index: number = 0;

  next(): number {
    // Retorna número entre 1-1000
    const bytes = this.getBytes(2);
    return (bytes[0] * 256 + bytes[1]) % 1000 + 1;
  }

  next256(): number {
    // Retorna número entre 0-255
    return this.getBytes(1)[0];
  }

  nextInt(max: number): number {
    // Retorna número entre 0-(max-1)
    const bytes = this.getBytes(3);
    const value = (bytes[0] << 16) | (bytes[1] << 8) | bytes[2];
    return value % max;
  }
}`}</pre>
            </div>
          </section>

          {/* 3. Arquitetura */}
          <section id="arquitetura" className="mb-16 page-break">
            <h2 className="text-4xl font-bold mb-6">3. Arquitetura do Sistema</h2>

            <div className="diagram-container bg-muted/30 p-6 rounded-lg mb-8">
              <h3 className="text-2xl font-semibold mb-4">Diagrama de Componentes</h3>
              <pre className="text-sm overflow-x-auto">
{`┌─────────────────────────────────────────┐
│      Interface do Usuário (UI)         │
├─────────────────────────────────────────┤
│  ┌──────────┐  ┌───────────────────┐  │
│  │  Index   │  │  Documentation    │  │
│  │  Page    │  │  Page             │  │
│  └────┬─────┘  └───────────────────┘  │
│       │                                 │
│  ┌────┴──────────┬────────────────┐   │
│  │ Style         │ Avatar         │   │
│  │ Selector      │ Preview        │   │
│  └───────────────┴────────────────┘   │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│         Camada de Lógica (lib/)        │
├─────────────────────────────────────────┤
│  avatarGenerators.ts                    │
│  ├─ Geometric Generator                 │
│  ├─ Blob Generator                      │
│  ├─ Pixel Generator                     │
│  ├─ Face Generator                      │
│  └─ Abstract Generator                  │
│                                          │
│  hash.ts (SHA-256 + Key class)         │
│  colors.ts (Paletas + Iterador)        │
│  avatarFingerprint.ts                   │
└─────────────────────────────────────────┘`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold mb-4">Stack Tecnológico</h3>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3">Frontend</h4>
                <ul className="space-y-2">
                  <li>• React 18</li>
                  <li>• TypeScript</li>
                  <li>• Vite</li>
                  <li>• TailwindCSS</li>
                  <li>• Shadcn/ui</li>
                </ul>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3">APIs Nativas</h4>
                <ul className="space-y-2">
                  <li>• Web Crypto API</li>
                  <li>• Canvas API</li>
                  <li>• LocalStorage API</li>
                  <li>• Clipboard API</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Computação Gráfica */}
          <section id="computacao-grafica" className="mb-16 page-break">
            <h2 className="text-4xl font-bold mb-6">4. Computação Gráfica e SVG</h2>

            <h3 className="text-2xl font-semibold mb-4">4.1 Primitivas Geométricas</h3>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3">Círculos</h4>
                <pre className="bg-background p-3 rounded text-sm overflow-x-auto">
{`<circle 
  cx="250" 
  cy="250" 
  r="100" 
  fill="#3b82f6"
/>`}</pre>
                <p className="mt-3 text-sm">Usados em avatares blob, face e geométricos</p>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3">Retângulos</h4>
                <pre className="bg-background p-3 rounded text-sm overflow-x-auto">
{`<rect 
  x="150" 
  y="150" 
  width="200" 
  height="200" 
  fill="#8b5cf6"
/>`}</pre>
                <p className="mt-3 text-sm">Base dos avatares pixel e geométricos</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4">4.2 Sistema de Coordenadas</h3>
            <div className="bg-muted/30 p-6 rounded-lg mb-6">
              <ul className="space-y-2">
                <li><strong>Origem</strong>: Canto superior esquerdo (0, 0)</li>
                <li><strong>Eixo X</strong>: Aumenta para direita</li>
                <li><strong>Eixo Y</strong>: Aumenta para baixo</li>
                <li><strong>Canvas</strong>: 500x500 pixels</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mb-4">4.3 Teoria das Cores - Modelo HSL</h3>
            <div className="bg-muted/30 p-6 rounded-lg">
              <pre className="bg-background p-4 rounded overflow-x-auto text-sm">
{`function getRandomColor(key: Key): string {
  const hue = key.nextInt(360);        // 0-359° (roda de cores)
  const saturation = 60 + key.nextInt(40); // 60-99% (vibrante)
  const lightness = 45 + key.nextInt(15);  // 45-59% (balanceado)
  return \`hsl(\${hue}, \${saturation}%, \${lightness}%)\`;
}`}</pre>
            </div>
          </section>

          {/* 5. Algoritmos */}
          <section id="algoritmos" className="mb-16 page-break">
            <h2 className="text-4xl font-bold mb-6">5. Algoritmos de Geração</h2>

            <h3 className="text-2xl font-semibold mb-4">5.1 Geométrico: Formas Sobrepostas</h3>
            <div className="bg-muted/30 p-6 rounded-lg mb-6">
              <p className="mb-4">Cria composições abstratas com múltiplas formas geométricas sobrepostas.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>3-7 formas (círculos, retângulos, polígonos)</li>
                <li>Posições e tamanhos determinísticos</li>
                <li>Transparência (opacity) para profundidade</li>
                <li>Cores da paleta harmônica</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mb-4">5.2 Blob: Formas Orgânicas</h3>
            <div className="bg-muted/30 p-6 rounded-lg mb-6">
              <p className="mb-4">Gera formas fluidas e orgânicas usando curvas Bézier.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>6-11 pontos de controle em círculo</li>
                <li>Perturbação radial para organicidade</li>
                <li>Interpolação suave (spline)</li>
                <li>Múltiplas camadas com transparência</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mb-4">5.3 Pixel: Arte Retrô 8-bit</h3>
            <div className="bg-muted/30 p-6 rounded-lg mb-6">
              <p className="mb-4">Cria avatares estilo pixel art com simetria bilateral.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Grid 10x10 de pixels</li>
                <li>Simetria vertical (espelhamento)</li>
                <li>Densidade controlada (45% preenchimento)</li>
                <li>Cores vibrantes em blocos</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mb-4">5.4 Face: Rostinhos Simples</h3>
            <div className="bg-muted/30 p-6 rounded-lg mb-6">
              <p className="mb-4">Gera faces minimalistas com features básicas.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Círculo base (rosto)</li>
                <li>Olhos (círculos ou formas variadas)</li>
                <li>Boca (curva Bézier)</li>
                <li>Elementos adicionais (nariz, sobrancelhas)</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mb-4">5.5 Abstract: Arte Generativa</h3>
            <div className="bg-muted/30 p-6 rounded-lg">
              <p className="mb-4">Composições abstratas com múltiplas técnicas.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Linhas curvas e retas</li>
                <li>Gradientes e padrões</li>
                <li>Rotações e transformações</li>
                <li>Efeitos de profundidade</li>
              </ul>
            </div>
          </section>

          {/* 6. Implementação */}
          <section id="implementacao" className="mb-16 page-break">
            <h2 className="text-4xl font-bold mb-6">6. Implementação Técnica</h2>

            <h3 className="text-2xl font-semibold mb-4">6.1 Estrutura de Arquivos</h3>
            <div className="bg-muted/30 p-6 rounded-lg mb-6">
              <pre className="bg-background p-4 rounded text-sm overflow-x-auto">
{`src/
├── components/
│   ├── ui/              # Componentes Shadcn
│   ├── AvatarPreview.tsx
│   ├── StyleSelector.tsx
│   └── AvatarGallery.tsx
├── lib/
│   ├── hash.ts          # SHA-256 e Key class
│   ├── colors.ts        # Paletas e iterador
│   ├── avatarGenerators.ts  # Geradores principais
│   └── avatarFingerprint.ts # Sistema de fingerprint
├── pages/
│   ├── Index.tsx        # Página principal
│   └── Documentation.tsx # Esta documentação
└── index.css            # Design system`}</pre>
            </div>

            <h3 className="text-2xl font-semibold mb-4">6.2 Performance</h3>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3">Otimizações</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Memoização com useMemo</li>
                  <li>• Lazy loading de componentes</li>
                  <li>• Debouncing (300ms)</li>
                  <li>• Virtual DOM (React)</li>
                  <li>• Code splitting por rota</li>
                </ul>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3">Métricas</h4>
                <ul className="space-y-2 text-sm">
                  <li>• First Paint: &lt; 500ms</li>
                  <li>• Time to Interactive: &lt; 1s</li>
                  <li>• Geração Avatar: &lt; 50ms</li>
                  <li>• Bundle: &lt; 200KB gzip</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4">6.3 Sistema de Fingerprinting</h3>
            <p className="text-lg mb-4">
              Evita repetição de avatares criando "impressões digitais" baseadas em cores e elementos.
            </p>
            <div className="bg-muted/30 p-6 rounded-lg">
              <pre className="bg-background p-4 rounded text-sm overflow-x-auto">
{`function createFingerprint(svg: string): string {
  const colors = extractColors(svg).sort().join(',');
  const counts = {
    circle: (svg.match(/<circle/g) || []).length,
    rect: (svg.match(/<rect/g) || []).length,
    polygon: (svg.match(/<polygon/g) || []).length
  };
  return \`\${colors}-\${counts.circle}-\${counts.rect}-\${counts.polygon}\`;
}`}</pre>
            </div>
          </section>

          {/* 7. Fluxo de Dados */}
          <section id="fluxo-dados" className="mb-16 page-break">
            <h2 className="text-4xl font-bold mb-6">7. Fluxo de Dados Completo</h2>

            <div className="diagram-container bg-muted/30 p-6 rounded-lg mb-8">
              <pre className="text-sm overflow-x-auto">
{`User → Input → Hash → Key → Generator → SVG → Display

Detalhado:

1. Usuário digita identificador
           ↓
2. SHA-256 processa entrada
           ↓
3. Key object divide hash em bytes
           ↓
4. Generator solicita números aleatórios
           ↓
5. Key fornece valores determinísticos
           ↓
6. Generator cria elementos SVG
           ↓
7. SVG renderizado no navegador
           ↓
8. Opções de export (PNG, Data URL, Copy)`}
              </pre>
            </div>

            <h3 className="text-2xl font-semibold mb-4">Pipeline de Transformação</h3>
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <strong>1. Input → Hash</strong>
                <p className="text-sm mt-2">"user@example.com" → "b4c2a6e9f1d8c3a7..." (64 hex chars)</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <strong>2. Hash → Key Object</strong>
                <p className="text-sm mt-2">Hash dividido em bytes, index mantém posição</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <strong>3. Key → Parâmetros</strong>
                <p className="text-sm mt-2">next() gera: cores, posições, tamanhos, formas</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <strong>4. Parâmetros → SVG</strong>
                <p className="text-sm mt-2">Template string interpolado com valores determinísticos</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <strong>5. SVG → Export</strong>
                <p className="text-sm mt-2">Display direto, PNG via Canvas, Data URL via Base64</p>
              </div>
            </div>
          </section>

          {/* 8. Design System */}
          <section id="design-system" className="mb-16">
            <h2 className="text-4xl font-bold mb-6">8. Design System</h2>

            <h3 className="text-2xl font-semibold mb-4">8.1 Paleta de Cores</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-primary p-6 rounded-lg text-primary-foreground">
                <div className="font-semibold">Primary</div>
                <div className="text-sm">#3b82f6</div>
              </div>
              <div className="bg-secondary p-6 rounded-lg text-secondary-foreground">
                <div className="font-semibold">Secondary</div>
                <div className="text-sm">#8b5cf6</div>
              </div>
              <div className="bg-accent p-6 rounded-lg text-accent-foreground">
                <div className="font-semibold">Accent</div>
                <div className="text-sm">#ec4899</div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4">8.2 Typography</h3>
            <div className="bg-muted/30 p-6 rounded-lg mb-6">
              <div className="space-y-3">
                <div className="text-4xl font-bold">Heading 1 - 48px</div>
                <div className="text-3xl font-bold">Heading 2 - 36px</div>
                <div className="text-2xl font-semibold">Heading 3 - 24px</div>
                <div className="text-base">Body - 16px</div>
                <div className="text-sm">Small - 14px</div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4">8.3 Componentes</h3>
            <div className="bg-muted/30 p-6 rounded-lg">
              <ul className="space-y-2">
                <li><strong>Button</strong>: Variantes (default, outline, ghost), tamanhos (sm, md, lg)</li>
                <li><strong>Card</strong>: Container com padding, border, shadow</li>
                <li><strong>Input</strong>: Validação inline, estados (focus, error, disabled)</li>
                <li><strong>Badge</strong>: Labels coloridos para categorização</li>
              </ul>
            </div>
          </section>

          {/* Conclusão */}
          <section className="mb-16 page-break">
            <h2 className="text-4xl font-bold mb-6">Conclusão</h2>
            <div className="bg-gradient-primary/10 border-l-4 border-primary p-8 rounded-lg">
              <p className="text-lg mb-4">
                O <strong>SVGUID</strong> representa uma solução completa e elegante para geração de avatares determinísticos,
                combinando conceitos avançados de criptografia, computação gráfica e design system moderno.
              </p>
              <p className="text-lg mb-4">
                O sistema é robusto, eficiente e visualmente atraente, podendo ser integrado em qualquer aplicação web moderna
                que necessite de representações visuais únicas e consistentes para seus usuários.
              </p>
              <p className="text-lg font-semibold">
                Tecnologias: SHA-256 • SVG • React • TypeScript • Computação Gráfica 2D • Design System
              </p>
            </div>
          </section>

          {/* Referências */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">Referências Técnicas</h2>
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">SVG</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• W3C SVG Specification</li>
                  <li>• MDN SVG Tutorial</li>
                </ul>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Criptografia</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• SHA-256 Specification (FIPS 180-4)</li>
                  <li>• Web Crypto API</li>
                </ul>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Computação Gráfica</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Computer Graphics: Principles and Practice</li>
                  <li>• Bézier Curves Mathematical Foundation</li>
                </ul>
              </div>
            </div>
          </section>

        </article>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            background: white;
            color: black;
          }
          
          .page-break {
            page-break-after: always;
            break-after: page;
          }
          
          .cover-page {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          
          .diagram-container {
            break-inside: avoid;
          }
          
          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            page-break-inside: avoid;
          }
          
          @page {
            margin: 2cm;
            size: A4;
          }
        }
      `}</style>
    </div>
  );
};

export default Documentation;