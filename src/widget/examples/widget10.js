import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    let nextColor = getColorIterator(key)

    // Concentric circles com padrão radial
    const centerX = 500
    const centerY = 500
    const maxRadius = 400

    for (let i = 0; i < 8; i++) {
        const radius = maxRadius - (i * 45)
        const color = nextColor()
        const opacity = 0.3 + (i * 0.08)
        
        draw.circle().size(radius * 2).move(centerX - radius, centerY - radius)
            .fill(color).opacity(opacity)
    }

    // Adiciona detalhes com pontos
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2
        const radius = 200 + (key.next16() % 100)
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        const size = 40 + (key.next16() % 60)
        
        draw.circle().size(size).move(x - size/2, y - size/2)
            .fill(nextColor()).opacity(0.6)
    }
}
