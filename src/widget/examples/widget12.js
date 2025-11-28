import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    let nextColor = getColorIterator(key)

    // Padrão geométrico com rotação
    const centerX = 500
    const centerY = 500
    const sides = 6 + (key.next16() % 4) // 6-9 lados

    // Desenha polígonos concêntricos
    for (let poly = 0; poly < 4; poly++) {
        const radius = 350 - (poly * 80)
        const rotation = (key.next16() / 16) * Math.PI
        const points = []

        for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2 + rotation
            const x = centerX + Math.cos(angle) * radius
            const y = centerY + Math.sin(angle) * radius
            points.push(x)
            points.push(y)
        }

        draw.polyline(points)
            .fill(nextColor()).opacity(0.4 + poly * 0.15)
    }

    // Adiciona círculos nos vértices
    for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2
        const x = centerX + Math.cos(angle) * 300
        const y = centerY + Math.sin(angle) * 300
        const size = 40 + (key.next16() % 50)
        
        draw.circle().size(size).move(x - size/2, y - size/2)
            .fill(nextColor()).opacity(0.7)
    }
}
