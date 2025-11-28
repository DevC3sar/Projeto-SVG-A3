import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    let nextColor = getColorIterator(key)

    // Padrão de xadrez dinâmico com transformações
    const squareSize = 100
    const cols = 10
    const rows = 10

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * squareSize
            const y = row * squareSize
            const color = nextColor()
            
            // Determina forma baseada em hash
            const shapeType = key.next16() % 5
            
            switch(shapeType) {
                case 0:
                    // Quadrado simples
                    draw.rect().size(squareSize - 5, squareSize - 5)
                        .move(x + 2.5, y + 2.5).fill(color).opacity(0.7)
                    break
                case 1:
                    // Círculo
                    draw.circle().size(squareSize - 20)
                        .move(x + 10, y + 10).fill(color).opacity(0.6)
                    break
                case 2:
                    // Triângulo
                    draw.polyline([
                        x + 50, y + 10,
                        x + 90, y + 80,
                        x + 10, y + 80
                    ]).fill(color).opacity(0.5)
                    break
                case 3:
                    // X (cruza)
                    draw.line(x + 20, y + 20, x + 80, y + 80)
                        .stroke({ color, width: 4 }).opacity(0.6)
                    draw.line(x + 80, y + 20, x + 20, y + 80)
                        .stroke({ color, width: 4 }).opacity(0.6)
                    break
                case 4:
                    // Estrela com 4 pontas
                    const cx = x + 50
                    const cy = y + 50
                    const r = 30
                    draw.polyline([
                        cx, cy - r,
                        cx + r*0.4, cy - r*0.4,
                        cx + r, cy,
                        cx + r*0.4, cy + r*0.4,
                        cx, cy + r,
                        cx - r*0.4, cy + r*0.4,
                        cx - r, cy,
                        cx - r*0.4, cy - r*0.4
                    ]).fill(color).opacity(0.7)
                    break
            }
        }
    }
}
