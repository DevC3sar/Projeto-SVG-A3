import { getColorIterator } from "../utils/colors/color.js"

/**
 * Avatar Emoji Estilo 5 - Emojis Monstros e Alienígenas
 * Criaturas divertidas e coloridas
 */
export default function (key, draw, opts = {}) {
    const centerX = 500
    const centerY = 500
    const radius = 150

    const nextColor = getColorIterator(key)
    const bodyColor = nextColor()
    const eyeColor = nextColor()
    const mouthColor = nextColor()

    const creature = key.next16() % 4

    if (creature === 0) {
        // Monstro com múltiplos olhos 👹
        // Corpo oval
        draw.ellipse(radius * 1.8, radius * 2.2).center(centerX, centerY).attr({ fill: bodyColor, stroke: "#333", "stroke-width": 3 })

        // 3 Olhos
        // Olho superior
        draw.circle(radius * 0.3).center(centerX, centerY - radius * 0.3).attr({ fill: eyeColor, stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.15).center(centerX, centerY - radius * 0.3).attr({ fill: "#000" })

        // Olho esquerdo
        draw.circle(radius * 0.3).center(centerX - radius * 0.4, centerY + radius * 0.1).attr({ fill: eyeColor, stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.15).center(centerX - radius * 0.4, centerY + radius * 0.1).attr({ fill: "#000" })

        // Olho direito
        draw.circle(radius * 0.3).center(centerX + radius * 0.4, centerY + radius * 0.1).attr({ fill: eyeColor, stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.15).center(centerX + radius * 0.4, centerY + radius * 0.1).attr({ fill: "#000" })

        // Boca grande e maligna
        draw.path(`M ${centerX - radius * 0.4} ${centerY + radius * 0.4} Q ${centerX} ${centerY + radius * 0.7}, ${centerX + radius * 0.4} ${centerY + radius * 0.4}`).attr({ stroke: mouthColor, "stroke-width": 4, fill: "none", "stroke-linecap": "round" })

        // Dentes
        for (let i = 0; i < 5; i++) {
            const x = centerX - radius * 0.35 + (i * radius * 0.175)
            draw.line(x, centerY + radius * 0.4, x, centerY + radius * 0.55).attr({ stroke: "#333", "stroke-width": 2 })
        }

        // Chifres
        draw.polygon([
            [centerX - radius * 0.35, centerY - radius * 0.8],
            [centerX - radius * 0.5, centerY - radius * 1.1],
            [centerX - radius * 0.25, centerY - radius * 0.9]
        ]).attr({ fill: bodyColor, stroke: "#333", "stroke-width": 2 })

        draw.polygon([
            [centerX + radius * 0.35, centerY - radius * 0.8],
            [centerX + radius * 0.5, centerY - radius * 1.1],
            [centerX + radius * 0.25, centerY - radius * 0.9]
        ]).attr({ fill: bodyColor, stroke: "#333", "stroke-width": 2 })

    } else if (creature === 1) {
        // Alienígena com olhos grandes 👽
        // Cabeça triangular
        draw.polygon([
            [centerX, centerY - radius * 0.6],
            [centerX - radius * 0.6, centerY + radius * 0.4],
            [centerX + radius * 0.6, centerY + radius * 0.4]
        ]).attr({ fill: bodyColor, stroke: "#333", "stroke-width": 3 })

        // Olhos gigantes (estilo alienígena)
        draw.ellipse(radius * 0.45, radius * 0.6).move(centerX - radius * 0.5, centerY - radius * 0.3).attr({ fill: eyeColor, stroke: "#333", "stroke-width": 2 })
        draw.ellipse(radius * 0.25, radius * 0.35).move(centerX - radius * 0.4, centerY - radius * 0.15).attr({ fill: "#000" })

        draw.ellipse(radius * 0.45, radius * 0.6).move(centerX + radius * 0.05, centerY - radius * 0.3).attr({ fill: eyeColor, stroke: "#333", "stroke-width": 2 })
        draw.ellipse(radius * 0.25, radius * 0.35).move(centerX + radius * 0.15, centerY - radius * 0.15).attr({ fill: "#000" })

        // Nariz (fenda)
        draw.line(centerX, centerY + radius * 0.05, centerX, centerY + radius * 0.15).attr({ stroke: "#333", "stroke-width": 2 })

        // Boca (linha reta)
        draw.line(centerX - radius * 0.25, centerY + radius * 0.25, centerX + radius * 0.25, centerY + radius * 0.25).attr({ stroke: mouthColor, "stroke-width": 3, "stroke-linecap": "round" })

        // Antenas
        draw.line(centerX - radius * 0.2, centerY - radius * 0.6, centerX - radius * 0.35, centerY - radius * 0.95).attr({ stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.12).center(centerX - radius * 0.35, centerY - radius * 0.95).attr({ fill: mouthColor, stroke: "#333", "stroke-width": 1 })

        draw.line(centerX + radius * 0.2, centerY - radius * 0.6, centerX + radius * 0.35, centerY - radius * 0.95).attr({ stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.12).center(centerX + radius * 0.35, centerY - radius * 0.95).attr({ fill: mouthColor, stroke: "#333", "stroke-width": 1 })

    } else if (creature === 2) {
        // Fantasma 👻
        // Corpo ondulado
        draw.path(`M ${centerX - radius * 0.5} ${centerY - radius * 0.6} Q ${centerX} ${centerY - radius * 0.8}, ${centerX + radius * 0.5} ${centerY - radius * 0.6} L ${centerX + radius * 0.6} ${centerY + radius * 0.6} Q ${centerX + radius * 0.3} ${centerY + radius * 0.8}, ${centerX} ${centerY + radius * 0.7} Q ${centerX - radius * 0.3} ${centerY + radius * 0.8}, ${centerX - radius * 0.6} ${centerY + radius * 0.6} Z`).attr({ fill: bodyColor, stroke: "#333", "stroke-width": 3 })

        // Olho esquerdo
        draw.circle(radius * 0.25).center(centerX - radius * 0.3, centerY - radius * 0.2).attr({ fill: "#000" })

        // Olho direito
        draw.circle(radius * 0.25).center(centerX + radius * 0.3, centerY - radius * 0.2).attr({ fill: "#000" })

        // Boca (assustada)
        draw.ellipse(radius * 0.2, radius * 0.25).center(centerX, centerY + radius * 0.2).attr({ fill: "#000" })

        // Ondulações do corpo
        for (let i = 0; i < 3; i++) {
            draw.path(`M ${centerX - radius * (0.5 - i * 0.3)} ${centerY + radius * (0.4 + i * 0.2)} Q ${centerX - radius * (0.4 - i * 0.2)} ${centerY + radius * (0.6 + i * 0.1)}, ${centerX - radius * (0.3 - i * 0.15)} ${centerY + radius * (0.4 + i * 0.2)}`).attr({ stroke: "#333", "stroke-width": 2, fill: "none" })
        }

    } else {
        // Criatura amebóide 🦠
        // Corpo irregular (várias bolhas)
        const baseX = centerX
        const baseY = centerY

        // Corpo principal
        draw.circle(radius * 1.6).center(baseX, baseY + radius * 0.1).attr({ fill: bodyColor, stroke: "#333", "stroke-width": 2 })

        // Apêndices (protusões)
        const protrusions = [
            { x: baseX - radius * 0.8, y: baseY - radius * 0.3 },
            { x: baseX + radius * 0.8, y: baseY - radius * 0.3 },
            { x: baseX - radius * 0.5, y: baseY + radius * 0.7 },
            { x: baseX + radius * 0.5, y: baseY + radius * 0.7 }
        ]

        protrusions.forEach(p => {
            draw.circle(radius * 0.4).center(p.x, p.y).attr({ fill: bodyColor, stroke: "#333", "stroke-width": 2 })
        })

        // Olhos espalhados
        const eyePositions = [
            { x: baseX - radius * 0.4, y: baseY - radius * 0.2 },
            { x: baseX + radius * 0.4, y: baseY - radius * 0.2 },
            { x: baseX, y: baseY + radius * 0.4 }
        ]

        eyePositions.forEach(e => {
            draw.circle(radius * 0.2).center(e.x, e.y).attr({ fill: eyeColor, stroke: "#333", "stroke-width": 1.5 })
            draw.circle(radius * 0.1).center(e.x, e.y).attr({ fill: "#000" })
        })

        // Boca sorridente
        draw.path(`M ${baseX - radius * 0.25} ${baseY + radius * 0.2} Q ${baseX} ${baseY + radius * 0.45}, ${baseX + radius * 0.25} ${baseY + radius * 0.2}`).attr({ stroke: mouthColor, "stroke-width": 2, fill: "none", "stroke-linecap": "round" })
    }
}
