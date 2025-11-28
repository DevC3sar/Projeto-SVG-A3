import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    // JDENTICON: Símbolos abstratos geométricos
    let nextColor = getColorIterator(key)
    const bgColor = nextColor()
    
    draw.rect().size(1000, 1000).move(0, 0).fill(bgColor).opacity(0.15)

    const centerX = 500
    const centerY = 500
    const mainColor = nextColor()
    
    // Desenha 4 quadrantes com padrões diferentes
    const patterns = [
        key.next256() % 4,
        key.next256() % 4,
        key.next256() % 4,
        key.next256() % 4
    ]

    const quadrants = [
        { x: 0, y: 0 },      // top-left
        { x: 500, y: 0 },    // top-right
        { x: 0, y: 500 },    // bottom-left
        { x: 500, y: 500 }   // bottom-right
    ]

    for (let q = 0; q < 4; q++) {
        const quad = quadrants[q]
        const pattern = patterns[q]
        const color = nextColor()
        const qx = quad.x + 250
        const qy = quad.y + 250

        switch(pattern) {
            case 0: // Círculos
                for (let i = 0; i < 3; i++) {
                    const radius = 60 - (i * 20)
                    draw.circle().size(radius * 2).move(qx - radius, qy - radius)
                        .fill(color).opacity(0.6)
                }
                break
            case 1: // Diamantes
                const size = 80
                draw.polyline([
                    qx, qy - size,
                    qx + size, qy,
                    qx, qy + size,
                    qx - size, qy
                ]).fill(color).opacity(0.7)
                break
            case 2: // Triângulo
                draw.polyline([
                    qx, qy - 100,
                    qx + 100, qy + 80,
                    qx - 100, qy + 80
                ]).fill(color).opacity(0.6)
                break
            case 3: // Estrela
                const r = 70
                const starPoints = []
                for (let i = 0; i < 10; i++) {
                    const angle = (i / 10) * Math.PI * 2
                    const radius = i % 2 === 0 ? r : r * 0.4
                    starPoints.push(qx + Math.cos(angle) * radius)
                    starPoints.push(qy + Math.sin(angle) * radius)
                }
                draw.polyline(starPoints).fill(color).opacity(0.7)
                break
        }
    }

    // Elemento central
    draw.circle().size(120).move(centerX - 60, centerY - 60)
        .fill(nextColor()).opacity(0.8)
}
