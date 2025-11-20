# Projeto A3 — Gerador de Avatares SVG

<!-- Badges -->
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://github.com/DevC3sar/Projeto-SVG-A3)

Uma aplicação simples que gera avatares SVG a partir de qualquer texto (nome, e‑mail, usuário). Foi feita como projeto de estudo e experimentação visual.

## Visão rápida

- Digite um identificador.
- Escolha um estilo (geométrico, blob, pixel, rosto, abstrato).
- Clique em "Gerar novo" para ver outra variação.

## Demo rápido (animação)

<p align="center">
  <img src="public/demo.svg" alt="Demo animated" width="480"/>
</p>

## Imagens (exemplos reais do app)

<p align="center">
  <img src="public/Screenshot 2025-11-20 at 15.46.54.svg" alt="Tela principal" width="720"/>
</p>

<p align="center">
  <img src="public/Screenshot 2025-11-20 at 15.47.04.svg" alt="Galeria de exemplos" width="920"/>
</p>

## Como rodar (rápido, do jeito do estudante)

1. Clone:

```bash
git clone https://github.com/DevC3sar/Projeto-SVG-A3.git
cd Projeto-SVG-A3
```

2. Instale dependências:

```bash
npm install
```

3. Rode em dev:

```bash
npm run dev
```

Abra o endereço mostrado pelo Vite no terminal.

Se quiser gerar build:

```bash
npm run build
npm run preview
```

## Onde olhar no código (pontos importantes)

- `src/lib/avatarGenerators.ts` — o coração do gerador, onde as formas e cores são escolhidas.
- `src/lib/avatarFingerprint.ts` — lógica simples que evita repetir visuais no mesmo navegador.
- `src/pages/Index.tsx` — a interface: campo, seletor de estilo e preview.

## Créditos

- feito por: Guilherme Cesar de Brito

Se quiser que eu deixe o README mais curto, mais longo, ou com um GIF mostrando o fluxo (ou badges), eu posso fazer — diga como prefere.
