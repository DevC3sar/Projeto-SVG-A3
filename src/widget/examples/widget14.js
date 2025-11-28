import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    let nextColor = getColorIterator(key)

    // Padrão de espiral
    const centerX = 500
    const centerY = 500
    const turns = 8
    const points = 200

    for (let spiral = 0; spiral < 3; spiral++) {
        const spiralPoints = []
        const offset = (spiral * 120) * Math.PI / 180
        
        for (let i = 0; i < points; i++) {
            const t = i / points * turns * Math.PI * 2 + offset
            const radius = (i / points) * 400 + 50
            const x = centerX + Math.cos(t) * radius
            const y = centerY + Math.sin(t) * radius
            spiralPoints.push(x)
            spiralPoints.push(y)
        }
        
        draw.polyline(spiralPoints)
            .fill('none').stroke({
                color: nextColor(),
                width: 15 - spiral * 3,
                linecap: 'round',
                linejoin: 'round'
            }).opacity(0.7)
    }

    // Centro com detalhes
    const centerSize = 100 + (key.next16() % 150)
    draw.circle().size(centerSize).move(centerX - centerSize/2, centerY - centerSize/2)
        .fill(nextColor()).opacity(0.8)
}
