import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    // CIRCULAR MANDALA: Mandala com padrões circulares
    let nextColor = getColorIterator(key)
    const bgColor = nextColor()
    
    draw.rect().size(1000, 1000).move(0, 0).fill(bgColor).opacity(0.12)

    const cx = 500
    const cy = 500
    const layers = 5 + (key.next16() % 4) // 5-8 camadas

    // Camadas concêntricas
    for (let layer = 0; layer < layers; layer++) {
        const radius = 400 - (layer * 70)
        const segmentCount = 8 + (layer * 2) // mais segmentos nas camadas externas
        const color = nextColor()
        const opacity = 0.3 + (layer * 0.12)

        // Desenha segmentos em volta do círculo
        for (let seg = 0; seg < segmentCount; seg++) {
            const angle = (seg / segmentCount) * Math.PI * 2
            const nextAngle = ((seg + 1) / segmentCount) * Math.PI * 2

            // Determina tipo de forma
            const shapeType = key.next16() % 3

            const x1 = cx + Math.cos(angle) * radius
            const y1 = cy + Math.sin(angle) * radius
            const x2 = cx + Math.cos(nextAngle) * radius
            const y2 = cy + Math.sin(nextAngle) * radius

            if (shapeType === 0) {
                // Triângulo do centro até o segmento
                draw.polyline([cx, cy, x1, y1, x2, y2])
                    .fill(color).opacity(opacity)
            } else if (shapeType === 1) {
                // Arco/fatia
                draw.polyline([x1, y1, x2, y2])
                    .fill('none').stroke({ color, width: 40 }).opacity(opacity)
            } else {
                // Pequeno círculo no segmento
                const midX = cx + Math.cos(angle + (nextAngle - angle) / 2) * radius
                const midY = cy + Math.sin(angle + (nextAngle - angle) / 2) * radius
                const dotSize = 30 + (key.next16() % 40)

                draw.circle().size(dotSize)
                    .move(midX - dotSize/2, midY - dotSize/2)
                    .fill(color).opacity(opacity)
            }
        }
    }

    // Centro com destaque
    const centerRadius = 80 + (key.next16() % 60)
    draw.circle().size(centerRadius * 2)
        .move(cx - centerRadius, cy - centerRadius)
        .fill(nextColor()).opacity(0.9)

    // Pequenos detalhes no centro
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2
        const dotR = 8
        const dotX = cx + Math.cos(angle) * 30
        const dotY = cy + Math.sin(angle) * 30

        draw.circle().size(dotR * 2).move(dotX - dotR, dotY - dotR)
            .fill(nextColor()).opacity(0.8)
    }
}
