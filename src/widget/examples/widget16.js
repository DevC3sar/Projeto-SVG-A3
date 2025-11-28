import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    let nextColor = getColorIterator(key)

    // Padrão de voronoi aproximado com círculos
    const cellCount = 12 + (key.next16() % 8)
    const cells = []

    // Gera pontos de célula
    for (let i = 0; i < cellCount; i++) {
        cells.push({
            x: 100 + (key.next256() / 255) * 800,
            y: 100 + (key.next256() / 255) * 800,
            color: nextColor(),
            radius: 50 + (key.next16() % 100)
        })
    }

    // Desenha círculos com sobreposição
    for (let cell of cells) {
        draw.circle().size(cell.radius * 2).move(cell.x - cell.radius, cell.y - cell.radius)
            .fill(cell.color).opacity(0.6)
    }

    // Desenha pequenos detalhes nos centros
    for (let cell of cells) {
        const detailSize = 20 + (key.next16() % 30)
        draw.circle().size(detailSize).move(cell.x - detailSize/2, cell.y - detailSize/2)
            .fill(nextColor()).opacity(0.8)
    }
}
