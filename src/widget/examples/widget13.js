import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    let nextColor = getColorIterator(key)

    // Padrão de tessellação hexagonal
    const hexWidth = 100
    const hexHeight = 86.6

    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 10; col++) {
            const x = col * hexWidth + (row % 2 ? hexWidth / 2 : 0)
            const y = row * hexHeight

            const points = []
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2
                points.push(x + 40 * Math.cos(angle))
                points.push(y + 40 * Math.sin(angle))
            }

            const useRect = key.next16() % 3 === 0
            if (useRect) {
                draw.rect().size(60, 60).move(x - 30, y - 30)
                    .fill(nextColor()).opacity(0.6)
            } else {
                draw.polyline(points).fill(nextColor()).opacity(0.5)
            }
        }
    }
}
