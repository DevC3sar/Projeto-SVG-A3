# Projeto A3 — Gerador de Avatares SVG

Uma ferramenta leve em React + TypeScript para gerar avatares SVG únicos e determinísticos a partir de qualquer identificador (email, username ou texto). Ideal para projetos que precisam de avatares consistentes sem imagens de usuário.

![logo](public/placeholder.svg)

## Destaques

- Geração determinística: o mesmo identificador + variante gera o mesmo SVG.
- Várias "personas" e estilos: geométrico, blob, pixel, rosto, abstrato, e mais.
- Evita repetições: o app usa uma assinatura (fingerprint) e persiste localmente as variantes já vistas.
- Projeto baseado nas ideias do `svguid` (https://github.com/mmamorim/svguid) com muitas extensões e melhorias.

## Demonstração

1. Abra o app localmente
2. Informe um identificador (ex: seu e-mail)
3. Escolha um estilo
4. Clique em "Gerar novo"

> O app tenta oferecer variantes visuais diferentes e guarda o histórico local para reduzir repetições.

## Capturas (substitua pelos seus arquivos de preview)

- /docs/screenshot-1.png — Tela principal com preview
- /docs/screenshot-2.png — Exemplo de avatar gerado

## Como rodar localmente

Pré-requisitos: Node.js (18+)

Instalar dependências:

```bash
npm install
```

Rodar em desenvolvimento:

```bash
npm run dev
```

Build de produção:

```bash
NODE_ENV=production npm run build
npm run preview
```

## Estrutura importante

- `src/lib/avatarGenerators.ts` — lógica de geração do SVG
- `src/lib/avatarFingerprint.ts` — assinatura e persistência das variantes
- `src/pages/Index.tsx` — interface principal
- `README-PT-BR.md` — documentação curta em Português BR

## Créditos

- Base do gerador: `svguid` — https://github.com/mmamorim/svguid
- Adaptações e melhorias: https://github.com/DevC3sar

## Licença

Coloque aqui a licença do projeto (ex.: MIT) ou remova esta seção se ainda não decidiu.
