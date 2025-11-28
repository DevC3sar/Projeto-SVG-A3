import { getColorIterator } from "../utils/colors/color.js"

/**
 * Avatar Emoji Estilo 1 - Faces Felizes Coloridas
 * Emojis com várias expressões: sorriso, piscada, riso
 */
export default function (key, draw, opts = {}) {
    const centerX = 500
    const centerY = 500
    const radius = 150

    const nextColor = getColorIterator(key)
    const faceColor = nextColor()
    const eyeColor = nextColor()
    const mouthColor = nextColor()

    // Rosto circular (cabeça)
    draw.circle(radius * 2).center(centerX, centerY).attr({ fill: faceColor, stroke: "#333", "stroke-width": 3 })

    // Variação de expressão
    const expression = key.next16() % 5

    if (expression === 0) {
        // Sorriso feliz 😊
        // Olho esquerdo
        draw.circle(radius * 0.25).center(centerX - radius * 0.4, centerY - radius * 0.2).attr({ fill: eyeColor, stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.12).center(centerX - radius * 0.4, centerY - radius * 0.2).attr({ fill: "#000", stroke: "none" })

        // Olho direito
        draw.circle(radius * 0.25).center(centerX + radius * 0.4, centerY - radius * 0.2).attr({ fill: eyeColor, stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.12).center(centerX + radius * 0.4, centerY - radius * 0.2).attr({ fill: "#000", stroke: "none" })

        // Boca (sorriso)
        draw.path(`M ${centerX - radius * 0.3} ${centerY + radius * 0.1} Q ${centerX} ${centerY + radius * 0.4}, ${centerX + radius * 0.3} ${centerY + radius * 0.1}`).attr({ stroke: mouthColor, "stroke-width": 4, fill: "none", "stroke-linecap": "round" })

    } else if (expression === 1) {
        // Piscada ;)
        // Olho esquerdo (fechado)
        draw.path(`M ${centerX - radius * 0.4 - radius * 0.2} ${centerY - radius * 0.2} Q ${centerX - radius * 0.4} ${centerY - radius * 0.1}, ${centerX - radius * 0.4 + radius * 0.2} ${centerY - radius * 0.2}`).attr({ stroke: "#333", "stroke-width": 3, fill: "none", "stroke-linecap": "round" })

        // Olho direito (aberto)
        draw.circle(radius * 0.25).center(centerX + radius * 0.4, centerY - radius * 0.2).attr({ fill: eyeColor, stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.12).center(centerX + radius * 0.4, centerY - radius * 0.2).attr({ fill: "#000", stroke: "none" })

        // Boca (pequeno sorriso)
        draw.path(`M ${centerX - radius * 0.25} ${centerY + radius * 0.15} Q ${centerX} ${centerY + radius * 0.3}, ${centerX + radius * 0.25} ${centerY + radius * 0.15}`).attr({ stroke: mouthColor, "stroke-width": 3, fill: "none", "stroke-linecap": "round" })

    } else if (expression === 2) {
        // Rosto neutro |_|
        // Olho esquerdo
        draw.rect(radius * 0.4, radius * 0.25).center(centerX - radius * 0.35, centerY - radius * 0.2).attr({ fill: eyeColor, stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.1).center(centerX - radius * 0.35, centerY - radius * 0.2).attr({ fill: "#000" })

        // Olho direito
        draw.rect(radius * 0.4, radius * 0.25).center(centerX + radius * 0.35, centerY - radius * 0.2).attr({ fill: eyeColor, stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.1).center(centerX + radius * 0.35, centerY - radius * 0.2).attr({ fill: "#000" })

        // Boca séria
        draw.line(centerX - radius * 0.3, centerY + radius * 0.2, centerX + radius * 0.3, centerY + radius * 0.2).attr({ stroke: "#333", "stroke-width": 3, "stroke-linecap": "round" })

    } else if (expression === 3) {
        // Riso loco XDDD
        // Olho esquerdo (X)
        draw.line(centerX - radius * 0.45, centerY - radius * 0.25, centerX - radius * 0.25, centerY - radius * 0.05).attr({ stroke: "#333", "stroke-width": 3, "stroke-linecap": "round" })
        draw.line(centerX - radius * 0.25, centerY - radius * 0.25, centerX - radius * 0.45, centerY - radius * 0.05).attr({ stroke: "#333", "stroke-width": 3, "stroke-linecap": "round" })

        // Olho direito (X)
        draw.line(centerX + radius * 0.25, centerY - radius * 0.25, centerX + radius * 0.45, centerY - radius * 0.05).attr({ stroke: "#333", "stroke-width": 3, "stroke-linecap": "round" })
        draw.line(centerX + radius * 0.45, centerY - radius * 0.25, centerX + radius * 0.25, centerY - radius * 0.05).attr({ stroke: "#333", "stroke-width": 3, "stroke-linecap": "round" })

        // Boca grande aberta
        draw.ellipse(radius * 0.6, radius * 0.4).center(centerX, centerY + radius * 0.25).attr({ fill: mouthColor, stroke: "#333", "stroke-width": 2 })

    } else {
        // Apaixonado com corações ❤️
        // Olho esquerdo (coração)
        draw.path(`M ${centerX - radius * 0.35 - radius * 0.1} ${centerY - radius * 0.25} Q ${centerX - radius * 0.35 - radius * 0.15} ${centerY - radius * 0.35}, ${centerX - radius * 0.35} ${centerY - radius * 0.25} Q ${centerX - radius * 0.35 + radius * 0.15} ${centerY - radius * 0.35}, ${centerX - radius * 0.35 + radius * 0.1} ${centerY - radius * 0.25} L ${centerX - radius * 0.35} ${centerY - radius * 0.1}`).attr({ fill: "#FF0000", stroke: "#333", "stroke-width": 2 })

        // Olho direito (coração)
        draw.path(`M ${centerX + radius * 0.35 - radius * 0.1} ${centerY - radius * 0.25} Q ${centerX + radius * 0.35 - radius * 0.15} ${centerY - radius * 0.35}, ${centerX + radius * 0.35} ${centerY - radius * 0.25} Q ${centerX + radius * 0.35 + radius * 0.15} ${centerY - radius * 0.35}, ${centerX + radius * 0.35 + radius * 0.1} ${centerY - radius * 0.25} L ${centerX + radius * 0.35} ${centerY - radius * 0.1}`).attr({ fill: "#FF0000", stroke: "#333", "stroke-width": 2 })

        // Boca (pequeno sorriso)
        draw.path(`M ${centerX - radius * 0.25} ${centerY + radius * 0.15} Q ${centerX} ${centerY + radius * 0.3}, ${centerX + radius * 0.25} ${centerY + radius * 0.15}`).attr({ stroke: mouthColor, "stroke-width": 3, fill: "none", "stroke-linecap": "round" })
    }

    // Blush nas bochechas
    const blushColor = mouthColor
    draw.ellipse(radius * 0.3, radius * 0.2).center(centerX - radius * 0.6, centerY + radius * 0.1).attr({ fill: blushColor, opacity: 0.4, stroke: "none" })
    draw.ellipse(radius * 0.3, radius * 0.2).center(centerX + radius * 0.6, centerY + radius * 0.1).attr({ fill: blushColor, opacity: 0.4, stroke: "none" })
}
