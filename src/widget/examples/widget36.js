import { getColorIterator } from "../utils/colors/color.js"

/**
 * Avatar Emoji Estilo 2 - Emojis com Acessórios
 * Óculos, chapéus, e outros acessórios divertidos
 */
export default function (key, draw, opts = {}) {
    const centerX = 500
    const centerY = 500
    const radius = 150

    const nextColor = getColorIterator(key)
    const faceColor = nextColor()
    const glassColor = nextColor()
    const accentColor = nextColor()

    // Rosto circular
    draw.circle(radius * 2).center(centerX, centerY).attr({ fill: faceColor, stroke: "#333", "stroke-width": 3 })

    // Tipo de acessório
    const accessory = key.next16() % 4

    if (accessory === 0) {
        // Óculos de sol 😎
        // Lente esquerda
        draw.ellipse(radius * 0.35, radius * 0.3).center(centerX - radius * 0.4, centerY - radius * 0.15).attr({ fill: glassColor, stroke: "#333", "stroke-width": 2 })
        draw.ellipse(radius * 0.2, radius * 0.15).center(centerX - radius * 0.4, centerY - radius * 0.15).attr({ fill: "#000", opacity: 0.7 })

        // Lente direita
        draw.ellipse(radius * 0.35, radius * 0.3).center(centerX + radius * 0.4, centerY - radius * 0.15).attr({ fill: glassColor, stroke: "#333", "stroke-width": 2 })
        draw.ellipse(radius * 0.2, radius * 0.15).center(centerX + radius * 0.4, centerY - radius * 0.15).attr({ fill: "#000", opacity: 0.7 })

        // Ponte
        draw.line(centerX - radius * 0.08, centerY - radius * 0.15, centerX + radius * 0.08, centerY - radius * 0.15).attr({ stroke: "#333", "stroke-width": 2 })

        // Boca legal
        draw.path(`M ${centerX - radius * 0.3} ${centerY + radius * 0.15} Q ${centerX} ${centerY + radius * 0.35}, ${centerX + radius * 0.3} ${centerY + radius * 0.15}`).attr({ stroke: "#333", "stroke-width": 3, fill: "none", "stroke-linecap": "round" })

    } else if (accessory === 1) {
        // Chapéu de festa 🎉
        // Chapéu cônico
        draw.polygon([
            [centerX, centerY - radius * 0.6],
            [centerX - radius * 0.4, centerY - radius * 0.1],
            [centerX + radius * 0.4, centerY - radius * 0.1]
        ]).attr({ fill: accentColor, stroke: "#333", "stroke-width": 2 })

        // Pompom no topo
        draw.circle(radius * 0.15).center(centerX, centerY - radius * 0.6).attr({ fill: accentColor, stroke: "#333", "stroke-width": 1 })

        // Fita
        draw.line(centerX - radius * 0.35, centerY - radius * 0.1, centerX + radius * 0.35, centerY - radius * 0.1).attr({ stroke: "#FFD700", "stroke-width": 3 })

        // Olhos felizes
        draw.circle(radius * 0.2).center(centerX - radius * 0.3, centerY - radius * 0.1).attr({ fill: "#000" })
        draw.circle(radius * 0.2).center(centerX + radius * 0.3, centerY - radius * 0.1).attr({ fill: "#000" })

        // Sorriso grande
        draw.path(`M ${centerX - radius * 0.25} ${centerY + radius * 0.15} Q ${centerX} ${centerY + radius * 0.4}, ${centerX + radius * 0.25} ${centerY + radius * 0.15}`).attr({ stroke: "#333", "stroke-width": 3, fill: "none", "stroke-linecap": "round" })

    } else if (accessory === 2) {
        // Coroa/Rei/Rainha 👑
        // Pontas da coroa
        for (let i = 0; i < 5; i++) {
            const x = centerX - radius * 0.35 + (i * radius * 0.175)
            draw.polygon([
                [x, centerY - radius * 0.4],
                [x - radius * 0.08, centerY - radius * 0.15],
                [x + radius * 0.08, centerY - radius * 0.15]
            ]).attr({ fill: "#FFD700", stroke: "#333", "stroke-width": 1.5 })

            // Joias
            if (i !== 2) {
                draw.circle(radius * 0.08).center(x, centerY - radius * 0.15).attr({ fill: "#FF0000", stroke: "#333", "stroke-width": 1 })
            }
        }

        // Base da coroa
        draw.ellipse(radius * 0.6, radius * 0.15).center(centerX, centerY - radius * 0.1).attr({ fill: "#FFD700", stroke: "#333", "stroke-width": 2 })

        // Olhos de realeza
        draw.circle(radius * 0.2).center(centerX - radius * 0.3, centerY).attr({ fill: "#000" })
        draw.circle(radius * 0.2).center(centerX + radius * 0.3, centerY).attr({ fill: "#000" })

        // Boca séria real
        draw.line(centerX - radius * 0.25, centerY + radius * 0.25, centerX + radius * 0.25, centerY + radius * 0.25).attr({ stroke: "#333", "stroke-width": 2 })

    } else {
        // Pirata com tapa-olho 🏴‍☠️
        // Tapa-olho
        draw.ellipse(radius * 0.5, radius * 0.35).center(centerX, centerY - radius * 0.15).attr({ fill: "#000", stroke: "#333", "stroke-width": 2 })

        // Olho visível
        draw.circle(radius * 0.2).center(centerX + radius * 0.35, centerY - radius * 0.15).attr({ fill: "#FFD700", stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.1).center(centerX + radius * 0.35, centerY - radius * 0.15).attr({ fill: "#000" })

        // Chapéu pirata
        draw.ellipse(radius * 0.8, radius * 0.2).center(centerX, centerY - radius * 0.4).attr({ fill: "#8B4513", stroke: "#333", "stroke-width": 2 })
        draw.polygon([
            [centerX - radius * 0.4, centerY - radius * 0.4],
            [centerX, centerY - radius * 0.6],
            [centerX + radius * 0.4, centerY - radius * 0.4]
        ]).attr({ fill: "#8B4513", stroke: "#333", "stroke-width": 2 })

        // Caveira
        draw.circle(radius * 0.1).center(centerX, centerY - radius * 0.5).attr({ fill: "#FFF" })
        draw.circle(radius * 0.05).center(centerX - radius * 0.08, centerY - radius * 0.52).attr({ fill: "#000" })
        draw.circle(radius * 0.05).center(centerX + radius * 0.08, centerY - radius * 0.52).attr({ fill: "#000" })

        // Boca de pirata (maligna)
        draw.path(`M ${centerX - radius * 0.25} ${centerY + radius * 0.25} Q ${centerX} ${centerY + radius * 0.15}, ${centerX + radius * 0.25} ${centerY + radius * 0.25}`).attr({ stroke: "#333", "stroke-width": 2, fill: "none", "stroke-linecap": "round" })
    }

    // Blush
    draw.ellipse(radius * 0.25, radius * 0.15).center(centerX - radius * 0.55, centerY + radius * 0.05).attr({ fill: "#FF69B4", opacity: 0.3, stroke: "none" })
    draw.ellipse(radius * 0.25, radius * 0.15).center(centerX + radius * 0.55, centerY + radius * 0.05).attr({ fill: "#FF69B4", opacity: 0.3, stroke: "none" })
}
