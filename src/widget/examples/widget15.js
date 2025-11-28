import { getColorIterator } from "../utils/colors/color.js"

export default function (key, draw) {
    let nextColor = getColorIterator(key)

    // Padrão de árvore/dendrito fractal
    function drawBranch(x, y, angle, depth, maxDepth, color, opacity) {
        if (depth > maxDepth) return

        const length = 80 - (depth * 10)
        const endX = x + Math.cos(angle) * length
        const endY = y + Math.sin(angle) * length

        // Desenha o ramo
        draw.line(x, y, endX, endY)
            .stroke({ color, width: 8 - depth, linecap: 'round' })
            .opacity(opacity)

        // Adiciona círculos em pontos estratégicos
        if (depth % 2 === 0) {
            const size = 20 - (depth * 3)
            draw.circle().size(size).move(endX - size/2, endY - size/2)
                .fill(nextColor()).opacity(opacity)
        }

        // Ramificações recursivas
        drawBranch(endX, endY, angle - 0.5, depth + 1, maxDepth, nextColor(), opacity - 0.1)
        drawBranch(endX, endY, angle + 0.5, depth + 1, maxDepth, nextColor(), opacity - 0.1)
    }

    const startColor = nextColor()
    drawBranch(500, 900, Math.PI / 2, 0, 5, startColor, 0.8)
}
