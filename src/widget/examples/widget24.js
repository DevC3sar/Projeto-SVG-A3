import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    // MINIDENTICONS: Padrão minimalista com simetria
    let nextColor = getColorIterator(key)
    const bgColor = nextColor()
    const fgColor = nextColor()
    
    draw.rect().size(1000, 1000).move(0, 0).fill(bgColor).opacity(0.1)

    // Grid 3x5 com simetria horizontal
    const cellWidth = 200
    const cellHeight = 200
    const centerCol = 2 // coluna do meio (0, 1, 2, 3, 4)

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col <= centerCol; col++) {
            const isFilled = key.next16() % 2 === 0

            if (isFilled) {
                // Célula esquerda
                const x = col * cellWidth
                const y = row * cellHeight
                
                const shapeType = key.next16() % 3

                if (shapeType === 0) {
                    // Quadrado
                    draw.rect().size(cellWidth - 10, cellHeight - 10)
                        .move(x + 5, y + 5).fill(fgColor).opacity(0.8)
                } else if (shapeType === 1) {
                    // Círculo
                    draw.circle().size(cellWidth - 10)
                        .move(x + 5, y + 5).fill(fgColor).opacity(0.7)
                } else {
                    // Triângulo
                    draw.polyline([
                        x + cellWidth/2, y + 10,
                        x + cellWidth - 10, y + cellHeight - 10,
                        x + 10, y + cellHeight - 10
                    ]).fill(fgColor).opacity(0.7)
                }

                // Espelha à direita
                const mirrorCol = 4 - col
                const mirrorX = mirrorCol * cellWidth

                if (shapeType === 0) {
                    draw.rect().size(cellWidth - 10, cellHeight - 10)
                        .move(mirrorX + 5, y + 5).fill(fgColor).opacity(0.8)
                } else if (shapeType === 1) {
                    draw.circle().size(cellWidth - 10)
                        .move(mirrorX + 5, y + 5).fill(fgColor).opacity(0.7)
                } else {
                    draw.polyline([
                        mirrorX + cellWidth/2, y + 10,
                        mirrorX + cellWidth - 10, y + cellHeight - 10,
                        mirrorX + 10, y + cellHeight - 10
                    ]).fill(fgColor).opacity(0.7)
                }
            }
        }
    }
}
