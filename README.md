# Projeto A3 — Gerador de Avatares SVG (Português BR)

Este projeto gera avatares SVG únicos e determinísticos a partir de qualquer identificador (ex.: emaail, username ou texto).

Principais pontos

- Abra o site, informe um identificador, escolha um estilo e clique em "Gerar novo".
- Cada clique tenta produzir uma variante visualmente nova (o app persiste um histórico local para evitar repetições entre reloads).
- Gerações são determinísticas por combinação (identifier, style, variant).

## Rápido: como rodar localmente

Pré requisitos:

- Node.js

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

- O gerador agora possui várias "personas" e variações
- A técnica usa um hash determinístico (SHA-256) do identificador + variante para gerar números pseudo-aleatórios reproduzíveis.
- O sistema de fingerprint tenta evitar repetições visuais usando uma assinatura simples do SVG (cores + contagem de elementos) e persistência no `localStorage`.

CREDITOS:
* feito por: Guilherme Cesar de Brito 

## Demo

Veja abaixo uma prévia animada do gerador. O SVG animado está em `public/demo.svg` e deve ser exibido diretamente no GitHub (se suportado pelo navegador).


Preview (SVG animado):

<p align="center">
  <img src="public/demo.svg" alt="Demo animado do gerador"/>
</p>

Screenshots de exemplo:

<p align="center">
  <img src="public/Screenshot 2025-11-20 at 15.46.54.svg" alt="Screenshot 1" width="480"/>
  <img src="public/Screenshot 2025-11-20 at 15.47.04.svg" alt="Screenshot 2" width="480"/>
</p>

Se você preferir um GIF (mais compatível com visualização em alguns lugares), gere localmente usando o script incluído:

```bash
chmod +x scripts/make-gif.sh
./scripts/make-gif.sh
# isso criará public/demo.gif a partir dos frames em public/demo-frames/
```

Depois de gerar o GIF localmente, adicione-o ao repositório e faça commit:

```bash
git add public/demo.gif
git commit -m "Adiciona demo.gif gerado localmente"
git push origin main
```


