import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    // ABSTRACT PATTERN: Padrões abstratos com simetria radial
    let nextColor = getColorIterator(key)
    const bgColor = nextColor()
    
    draw.rect().size(1000, 1000).move(0, 0).fill(bgColor).opacity(0.15)

    const cx = 500
    const cy = 500
    const rotations = 6 + (key.next16() % 6) // 6-12 rotações

    // Desenha padrão radial
    for (let rot = 0; rot < rotations; rot++) {
        const angle = (rot / rotations) * Math.PI * 2
        const color = nextColor()

        // Elemento 1: Triângulo
        const tri1 = 100
        const triX1 = cx + Math.cos(angle) * 200
        const triY1 = cy + Math.sin(angle) * 200

        draw.polyline([
            triX1 + tri1 * Math.cos(angle),
            triY1 + tri1 * Math.sin(angle),
            triX1 + tri1 * Math.cos(angle + 2.1),
            triY1 + tri1 * Math.sin(angle + 2.1),
            triX1 + tri1 * Math.cos(angle + 4.2),
            triY1 + tri1 * Math.sin(angle + 4.2)
        ]).fill(color).opacity(0.6)

        // Elemento 2: Círculo
        const circleRadius = 50
        const circX = cx + Math.cos(angle + Math.PI) * 250
        const circY = cy + Math.sin(angle + Math.PI) * 250

        draw.circle().size(circleRadius * 2)
            .move(circX - circleRadius, circY - circleRadius)
            .fill(nextColor()).opacity(0.5)
    }

    // Centro
    const centerSize = 120 + (key.next16() % 80)
    draw.circle().size(centerSize).move(cx - centerSize/2, cy - centerSize/2)
        .fill(nextColor()).opacity(0.8)

    // Detalhes no centro
    const detailCount = 3 + (key.next16() % 4)
    for (let i = 0; i < detailCount; i++) {
        const angle = (i / detailCount) * Math.PI * 2
        const dotRadius = 15
        const dotX = cx + Math.cos(angle) * 50
        const dotY = cy + Math.sin(angle) * 50

        draw.circle().size(dotRadius * 2)
            .move(dotX - dotRadius, dotY - dotRadius)
            .fill(nextColor()).opacity(0.7)
    }
}
