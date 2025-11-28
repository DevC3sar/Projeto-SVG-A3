import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    // IDENTICON: Grid simétrica 5x5 com simetria espelhada
    let nextColor = getColorIterator(key)
    const bgColor = nextColor()
    
    // Fundo
    draw.rect().size(1000, 1000).move(0, 0).fill(bgColor).opacity(0.1)

    const gridSize = 5
    const cellSize = 1000 / gridSize
    const centerCol = Math.floor(gridSize / 2)
    
    // Gera cor base para o padrão
    const patternColor = nextColor()

    // Grid com simetria horizontal
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col <= centerCol; col++) {
            const isFilled = key.next16() % 2 === 0
            
            if (isFilled) {
                const x = col * cellSize
                const y = row * cellSize

                // Desenha célula à esquerda
                draw.rect().size(cellSize - 2, cellSize - 2).move(x + 1, y + 1)
                    .fill(patternColor).opacity(0.8)

                // Espelha à direita (simetria)
                const mirrorCol = gridSize - 1 - col
                const mirrorX = mirrorCol * cellSize
                if (mirrorCol !== col) {
                    draw.rect().size(cellSize - 2, cellSize - 2).move(mirrorX + 1, y + 1)
                        .fill(patternColor).opacity(0.8)
                }
            }
        }
    }

    // Adiciona borda
    draw.rect().size(1000, 1000).move(0, 0).fill('none')
        .stroke({ color: patternColor, width: 8 }).opacity(0.4)
}
