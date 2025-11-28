import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    // PIXELART: Avatar estilo pixel art / retro
    let nextColor = getColorIterator(key)
    const bgColor = nextColor()
    
    draw.rect().size(1000, 1000).move(0, 0).fill(bgColor).opacity(0.1)

    const pixelSize = 100
    const cols = 10
    const rows = 10

    // Gera pattern pixel art com simetria
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const mirrorCol = cols - 1 - col
            
            // Determina se preenche baseado na key e simetria
            if (col <= Math.floor(cols / 2)) {
                const isFilled = key.next16() % 2 === 0
                const color = isFilled ? nextColor() : bgColor
                const opacity = isFilled ? 0.8 : 0.2

                // Desenha pixel à esquerda
                draw.rect().size(pixelSize - 4, pixelSize - 4)
                    .move(col * pixelSize + 2, row * pixelSize + 2)
                    .fill(color).opacity(opacity)

                // Espelha à direita (simetria)
                if (mirrorCol !== col) {
                    draw.rect().size(pixelSize - 4, pixelSize - 4)
                        .move(mirrorCol * pixelSize + 2, row * pixelSize + 2)
                        .fill(color).opacity(opacity)
                }
            }
        }
    }

    // Adiciona detalhes pixelados
    const detailColor = nextColor()
    for (let i = 0; i < 8; i++) {
        const x = (key.next256() / 255) * 900 + 50
        const y = (key.next256() / 255) * 900 + 50
        
        // Arredonda para grid de pixels
        const gridX = Math.round(x / 100) * 100
        const gridY = Math.round(y / 100) * 100

        if (key.next16() % 2 === 0) {
            draw.rect().size(96, 96).move(gridX + 2, gridY + 2)
                .fill(detailColor).opacity(0.6)
        }
    }
}
