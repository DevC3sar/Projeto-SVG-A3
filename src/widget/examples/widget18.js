import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    let nextColor = getColorIterator(key)

    // Padrão de diamantes e mosaico
    const diamondSize = 80
    const cols = Math.ceil(1000 / diamondSize)
    const rows = Math.ceil(1000 / diamondSize)

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * diamondSize + diamondSize / 2
            const y = row * diamondSize + diamondSize / 2
            
            // Desenha diamante (quadrado rotacionado)
            const size = 30 + (key.next16() % 40)
            const points = [
                x, y - size,           // topo
                x + size, y,           // direita
                x, y + size,           // baixo
                x - size, y            // esquerda
            ]

            const pattern = key.next16() % 3
            if (pattern === 0) {
                // Diamante preenchido
                draw.polyline(points).fill(nextColor()).opacity(0.6)
            } else if (pattern === 1) {
                // Círculo
                draw.circle().size(size * 1.5).move(x - size * 0.75, y - size * 0.75)
                    .fill(nextColor()).opacity(0.5)
            } else {
                // Quadrado
                draw.rect().size(size, size).move(x - size/2, y - size/2)
                    .fill(nextColor()).opacity(0.7)
            }
        }
    }
}
