# Projeto A3 — Gerador de Avatares SVG

Esse projeto cria avatares SVG a partir de um texto (ex: e-mail ou nome). É só um gerador simples que eu montei pra experimentar com formas e cores.

![](public/Screenshot 2025-11-20 at 15.46.54.svg)

## O que ele faz (curto)

- Gera um avatar a partir do identificador que você digitar.
- Tem vários estilos: geométrico, blob, pixel, rosto e abstrato.
- Tenta não mostrar o mesmo desenho sempre (guarda o que já apareceu no seu navegador).

![](public/Screenshot 2025-11-20 at 15.47.04.svg)

## Como usar (modo rápido)

1. Clone o repositório
2. Instale dependências

```bash
npm install
```

3. Rode em desenvolvimento

```bash
npm run dev
```

Abra o navegador no endereço que o Vite mostrar (normalmente algo como http://localhost:5173).

Se quiser gerar a versão pra publicar:

```bash
npm run build
npm run preview
```

## Onde olhar no código

- `src/lib/avatarGenerators.ts` — o gerador de SVG (a parte mais legal)
- `src/lib/avatarFingerprint.ts` — como a página lembra o que já foi mostrado
- `src/pages/Index.tsx` — a página principal

## Créditos

- Trabalho feito apenas por Guilherme Brito

---

Se quiser que eu deixe o README ainda mais simples ou acrescente um GIF curto mostrando o fluxo, eu faço isso.
