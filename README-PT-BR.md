# Projeto A3 — Gerador de Avatares SVG (Português BR)

Este projeto gera avatares SVG únicos e determinísticos a partir de qualquer identificador (ex.: e-mail, username ou texto).

Principais pontos — versão curta

- Abra o site, informe um identificador, escolha um estilo e clique em "Gerar novo".
- Cada clique tenta produzir uma variante visualmente nova (o app persiste um histórico local para evitar repetições entre reloads).
- Gerações são determinísticas por combinação (identifier, style, variant).

## Rápido: como rodar localmente

Pré-requisitos:

- Node.js (recomendo 18+)

Instalação e execução:

```bash
npm install
npm run dev
```

Build de produção:

```bash
NODE_ENV=production npm run build
npm run preview
```

## Como usar

- Campo "identificador": informe um e-mail, nome ou texto.
- Estilo: selecione entre os estilos disponíveis (geométrico, blob, pixel, rosto, abstrato).
- Clique em "Gerar novo" para obter uma variante única. O app tentará evitar repetir avatares já vistos para o mesmo identificador (armazenamento local).
- Para limpar o histórico local e permitir repetições, abra o console do navegador e rode:

```js
localStorage.removeItem('avatar-seen-v1')
```

## Onde está o código relevante

- Geração SVG: `src/lib/avatarGenerators.ts`
- Fingerprint / persistência: `src/lib/avatarFingerprint.ts`
- UI principal: `src/pages/Index.tsx`

## Notas rápidas

- O gerador agora possui várias "personas" e variações: frutas, animais, inspirações de personagens, torcedor (face paint), palhaço, cyberpunk, entre outros.
- A técnica usa um hash determinístico (SHA-256) do identificador + variante para gerar números pseudo-aleatórios reproduzíveis.
- O sistema de fingerprint tenta evitar repetições visuais usando uma assinatura simples do SVG (cores + contagem de elementos) e persistência no `localStorage`.

## Próximos passos sugeridos (opcionais)

- Gerar 3 miniaturas únicas por clique para oferecer alternativa rápida ao usuário. (recomendado)
- Exportar N variantes para revisão (zip).
- Persistência server-side para compartilhar histórico entre dispositivos.

Se quiser, eu atualizo agora para gerar 3 miniaturas únicas por clique — confirma?
