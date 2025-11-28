import { getColorIterator } from "../utils/colors/color.js"

/**
 * Avatar Emoji Estilo 3 - Emojis Animais
 * Gatos, cachorros, ursos e outros animais fofos
 */
export default function (key, draw, opts = {}) {
    const centerX = 500
    const centerY = 500
    const radius = 150

    const nextColor = getColorIterator(key)
    const faceColor = nextColor()
    const noseColor = nextColor()
    const accentColor = nextColor()

    const animal = key.next16() % 4

    if (animal === 0) {
        // Gato 😺
        // Cabeça
        draw.circle(radius * 1.8).center(centerX, centerY + radius * 0.1).attr({ fill: faceColor, stroke: "#333", "stroke-width": 3 })

        // Orelhas
        draw.polygon([
            [centerX - radius * 0.4, centerY - radius * 0.4],
            [centerX - radius * 0.5, centerY - radius * 0.8],
            [centerX - radius * 0.15, centerY - radius * 0.5]
        ]).attr({ fill: faceColor, stroke: "#333", "stroke-width": 2 })

        draw.polygon([
            [centerX + radius * 0.4, centerY - radius * 0.4],
            [centerX + radius * 0.5, centerY - radius * 0.8],
            [centerX + radius * 0.15, centerY - radius * 0.5]
        ]).attr({ fill: faceColor, stroke: "#333", "stroke-width": 2 })

        // Interior das orelhas
        draw.polygon([
            [centerX - radius * 0.35, centerY - radius * 0.35],
            [centerX - radius * 0.42, centerY - radius * 0.6],
            [centerX - radius * 0.2, centerY - radius * 0.4]
        ]).attr({ fill: "#FFB6C1", stroke: "none" })

        draw.polygon([
            [centerX + radius * 0.35, centerY - radius * 0.35],
            [centerX + radius * 0.42, centerY - radius * 0.6],
            [centerX + radius * 0.2, centerY - radius * 0.4]
        ]).attr({ fill: "#FFB6C1", stroke: "none" })

        // Olhos de gato
        draw.path(`M ${centerX - radius * 0.3} ${centerY - radius * 0.05} L ${centerX - radius * 0.15} ${centerY - radius * 0.15} L ${centerX - radius * 0.35} ${centerY}`).attr({ fill: "#000" })
        draw.path(`M ${centerX + radius * 0.3} ${centerY - radius * 0.05} L ${centerX + radius * 0.15} ${centerY - radius * 0.15} L ${centerX + radius * 0.35} ${centerY}`).attr({ fill: "#000" })

        // Nariz
        draw.polygon([
            [centerX, centerY + radius * 0.05],
            [centerX - radius * 0.08, centerY + radius * 0.15],
            [centerX + radius * 0.08, centerY + radius * 0.15]
        ]).attr({ fill: noseColor, stroke: "#333", "stroke-width": 1 })

        // Boca de gato (V)
        draw.line(centerX, centerY + radius * 0.15, centerX - radius * 0.15, centerY + radius * 0.3).attr({ stroke: "#333", "stroke-width": 2, "stroke-linecap": "round" })
        draw.line(centerX, centerY + radius * 0.15, centerX + radius * 0.15, centerY + radius * 0.3).attr({ stroke: "#333", "stroke-width": 2, "stroke-linecap": "round" })

        // Bigodes
        for (let i = 0; i < 3; i++) {
            const offsetY = -radius * 0.05 + (i * radius * 0.1)
            draw.line(centerX - radius * 0.5, centerY + offsetY, centerX - radius * 0.8, centerY + offsetY).attr({ stroke: "#333", "stroke-width": 1.5, "stroke-linecap": "round" })
            draw.line(centerX + radius * 0.5, centerY + offsetY, centerX + radius * 0.8, centerY + offsetY).attr({ stroke: "#333", "stroke-width": 1.5, "stroke-linecap": "round" })
        }

    } else if (animal === 1) {
        // Cachorro 🐶
        // Cabeça
        draw.circle(radius * 1.8).center(centerX, centerY + radius * 0.1).attr({ fill: faceColor, stroke: "#333", "stroke-width": 3 })

        // Orelhas caídas
        draw.ellipse(radius * 0.35, radius * 0.7).move(centerX - radius * 0.6, centerY - radius * 0.2).attr({ fill: faceColor, stroke: "#333", "stroke-width": 2 })
        draw.ellipse(radius * 0.35, radius * 0.7).move(centerX + radius * 0.25, centerY - radius * 0.2).attr({ fill: faceColor, stroke: "#333", "stroke-width": 2 })

        // Olhos redondos
        draw.circle(radius * 0.25).center(centerX - radius * 0.25, centerY - radius * 0.15).attr({ fill: "#000" })
        draw.circle(radius * 0.25).center(centerX + radius * 0.25, centerY - radius * 0.15).attr({ fill: "#000" })

        // Nariz grande
        draw.circle(radius * 0.2).center(centerX, centerY + radius * 0.1).attr({ fill: noseColor, stroke: "#333", "stroke-width": 2 })

        // Boca de cachorro (U grande)
        draw.path(`M ${centerX - radius * 0.2} ${centerY + radius * 0.15} Q ${centerX} ${centerY + radius * 0.4}, ${centerX + radius * 0.2} ${centerY + radius * 0.15}`).attr({ stroke: "#333", "stroke-width": 3, fill: "none", "stroke-linecap": "round" })

        // Língua
        draw.ellipse(radius * 0.15, radius * 0.2).center(centerX, centerY + radius * 0.45).attr({ fill: "#FF69B4", stroke: "#333", "stroke-width": 1 })

    } else if (animal === 2) {
        // Urso 🐻
        // Cabeça grande
        draw.circle(radius * 2).center(centerX, centerY + radius * 0.15).attr({ fill: faceColor, stroke: "#333", "stroke-width": 3 })

        // Orelhas redondas
        draw.circle(radius * 0.4).center(centerX - radius * 0.5, centerY - radius * 0.4).attr({ fill: faceColor, stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.4).center(centerX + radius * 0.5, centerY - radius * 0.4).attr({ fill: faceColor, stroke: "#333", "stroke-width": 2 })

        // Interior das orelhas
        draw.circle(radius * 0.2).center(centerX - radius * 0.5, centerY - radius * 0.4).attr({ fill: accentColor, opacity: 0.6 })
        draw.circle(radius * 0.2).center(centerX + radius * 0.5, centerY - radius * 0.4).attr({ fill: accentColor, opacity: 0.6 })

        // Rosto (área facial mais escura)
        draw.ellipse(radius * 1.2, radius * 1.5).center(centerX, centerY + radius * 0.15).attr({ fill: accentColor, opacity: 0.3 })

        // Olhos
        draw.circle(radius * 0.2).center(centerX - radius * 0.35, centerY - radius * 0.1).attr({ fill: "#000" })
        draw.circle(radius * 0.2).center(centerX + radius * 0.35, centerY - radius * 0.1).attr({ fill: "#000" })

        // Nariz
        draw.circle(radius * 0.18).center(centerX, centerY + radius * 0.1).attr({ fill: noseColor, stroke: "#333", "stroke-width": 2 })

        // Boca
        draw.line(centerX, centerY + radius * 0.25, centerX - radius * 0.15, centerY + radius * 0.35).attr({ stroke: "#333", "stroke-width": 2 })
        draw.line(centerX, centerY + radius * 0.25, centerX + radius * 0.15, centerY + radius * 0.35).attr({ stroke: "#333", "stroke-width": 2 })

    } else {
        // Coelho 🐰
        // Cabeça
        draw.circle(radius * 1.5).center(centerX, centerY + radius * 0.2).attr({ fill: faceColor, stroke: "#333", "stroke-width": 3 })

        // Orelhas longas
        draw.ellipse(radius * 0.3, radius * 0.9).move(centerX - radius * 0.45, centerY - radius * 0.6).attr({ fill: faceColor, stroke: "#333", "stroke-width": 2 })
        draw.ellipse(radius * 0.3, radius * 0.9).move(centerX + radius * 0.15, centerY - radius * 0.6).attr({ fill: faceColor, stroke: "#333", "stroke-width": 2 })

        // Interior das orelhas
        draw.ellipse(radius * 0.15, radius * 0.7).move(centerX - radius * 0.42, centerY - radius * 0.5).attr({ fill: "#FFB6C1" })
        draw.ellipse(radius * 0.15, radius * 0.7).move(centerX + radius * 0.27, centerY - radius * 0.5).attr({ fill: "#FFB6C1" })

        // Olhos redondos rosa
        draw.circle(radius * 0.2).center(centerX - radius * 0.2, centerY).attr({ fill: "#FFB6C1", stroke: "#333", "stroke-width": 1 })
        draw.circle(radius * 0.2).center(centerX + radius * 0.2, centerY).attr({ fill: "#FFB6C1", stroke: "#333", "stroke-width": 1 })

        // Pupilas
        draw.circle(radius * 0.1).center(centerX - radius * 0.2, centerY).attr({ fill: "#000" })
        draw.circle(radius * 0.1).center(centerX + radius * 0.2, centerY).attr({ fill: "#000" })

        // Nariz rosa
        draw.circle(radius * 0.12).center(centerX, centerY + radius * 0.15).attr({ fill: "#FFB6C1", stroke: "#333", "stroke-width": 1 })

        // Boca de coelho (três bolas)
        draw.circle(radius * 0.08).center(centerX, centerY + radius * 0.3).attr({ fill: "#FFB6C1" })
        draw.circle(radius * 0.08).center(centerX - radius * 0.1, centerY + radius * 0.4).attr({ fill: "#FFB6C1" })
        draw.circle(radius * 0.08).center(centerX + radius * 0.1, centerY + radius * 0.4).attr({ fill: "#FFB6C1" })
    }
}
