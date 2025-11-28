import { getColorIterator } from "../utils/colors/color.js"

/**
 * Avatar Emoji Estilo 4 - Emojis com Emoções Intensas
 * Raiva, tristeza, felicidade exagerada, surpresa
 */
export default function (key, draw, opts = {}) {
    const centerX = 500
    const centerY = 500
    const radius = 150

    const nextColor = getColorIterator(key)
    const faceColor = nextColor()
    const emotion = nextColor()
    const eyeColor = nextColor()

    const mood = key.next16() % 4

    if (mood === 0) {
        // Raiva 😠
        draw.circle(radius * 2).center(centerX, centerY).attr({ fill: faceColor, stroke: "#333", "stroke-width": 3 })

        // Sobrancelhas em V (raiva)
        draw.line(centerX - radius * 0.45, centerY - radius * 0.35, centerX - radius * 0.2, centerY - radius * 0.15).attr({ stroke: "#333", "stroke-width": 4, "stroke-linecap": "round" })
        draw.line(centerX + radius * 0.45, centerY - radius * 0.35, centerX + radius * 0.2, centerY - radius * 0.15).attr({ stroke: "#333", "stroke-width": 4, "stroke-linecap": "round" })

        // Olhos em fenda
        draw.rect(radius * 0.3, radius * 0.15).center(centerX - radius * 0.3, centerY - radius * 0.15).attr({ fill: eyeColor, stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.1).center(centerX - radius * 0.3, centerY - radius * 0.15).attr({ fill: "#000" })

        draw.rect(radius * 0.3, radius * 0.15).center(centerX + radius * 0.3, centerY - radius * 0.15).attr({ fill: eyeColor, stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.1).center(centerX + radius * 0.3, centerY - radius * 0.15).attr({ fill: "#000" })

        // Boca em linha reta (séria)
        draw.line(centerX - radius * 0.3, centerY + radius * 0.2, centerX + radius * 0.3, centerY + radius * 0.2).attr({ stroke: emotion, "stroke-width": 4, "stroke-linecap": "round" })

        // Chamas (raiva)
        for (let i = 0; i < 2; i++) {
            const x = centerX - radius * 0.5 + (i * radius)
            draw.polygon([
                [x, centerY + radius * 0.5],
                [x - radius * 0.08, centerY + radius * 0.3],
                [x + radius * 0.08, centerY + radius * 0.3]
            ]).attr({ fill: "#FF4500", stroke: "#FF8C00", "stroke-width": 1 })
        }

    } else if (mood === 1) {
        // Tristeza 😢
        draw.circle(radius * 2).center(centerX, centerY).attr({ fill: faceColor, stroke: "#333", "stroke-width": 3 })

        // Olhos com lágrimas
        // Olho esquerdo
        draw.circle(radius * 0.25).center(centerX - radius * 0.3, centerY - radius * 0.15).attr({ fill: eyeColor, stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.12).center(centerX - radius * 0.3, centerY - radius * 0.15).attr({ fill: "#000" })

        // Lágrima esquerda
        draw.ellipse(radius * 0.08, radius * 0.15).center(centerX - radius * 0.3, centerY + radius * 0.1).attr({ fill: "#87CEEB", stroke: "#4DA6FF", "stroke-width": 1 })

        // Olho direito
        draw.circle(radius * 0.25).center(centerX + radius * 0.3, centerY - radius * 0.15).attr({ fill: eyeColor, stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.12).center(centerX + radius * 0.3, centerY - radius * 0.15).attr({ fill: "#000" })

        // Lágrima direita
        draw.ellipse(radius * 0.08, radius * 0.15).center(centerX + radius * 0.3, centerY + radius * 0.1).attr({ fill: "#87CEEB", stroke: "#4DA6FF", "stroke-width": 1 })

        // Sobrancelhas levantadas (tristeza)
        draw.path(`M ${centerX - radius * 0.45} ${centerY - radius * 0.35} Q ${centerX - radius * 0.3} ${centerY - radius * 0.45}, ${centerX - radius * 0.15} ${centerY - radius * 0.3}`).attr({ stroke: "#333", "stroke-width": 3, fill: "none", "stroke-linecap": "round" })
        draw.path(`M ${centerX + radius * 0.45} ${centerY - radius * 0.35} Q ${centerX + radius * 0.3} ${centerY - radius * 0.45}, ${centerX + radius * 0.15} ${centerY - radius * 0.3}`).attr({ stroke: "#333", "stroke-width": 3, fill: "none", "stroke-linecap": "round" })

        // Boca triste (invertida)
        draw.path(`M ${centerX - radius * 0.3} ${centerY + radius * 0.2} Q ${centerX} ${centerY + radius * 0.05}, ${centerX + radius * 0.3} ${centerY + radius * 0.2}`).attr({ stroke: emotion, "stroke-width": 3, fill: "none", "stroke-linecap": "round" })

    } else if (mood === 2) {
        // Surpresa/Espanto 😮
        draw.circle(radius * 2).center(centerX, centerY).attr({ fill: faceColor, stroke: "#333", "stroke-width": 3 })

        // Olhos bem abertos
        draw.circle(radius * 0.35).center(centerX - radius * 0.3, centerY - radius * 0.2).attr({ fill: "#fff", stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.18).center(centerX - radius * 0.3, centerY - radius * 0.2).attr({ fill: eyeColor })
        draw.circle(radius * 0.09).center(centerX - radius * 0.3, centerY - radius * 0.2).attr({ fill: "#000" })

        draw.circle(radius * 0.35).center(centerX + radius * 0.3, centerY - radius * 0.2).attr({ fill: "#fff", stroke: "#333", "stroke-width": 2 })
        draw.circle(radius * 0.18).center(centerX + radius * 0.3, centerY - radius * 0.2).attr({ fill: eyeColor })
        draw.circle(radius * 0.09).center(centerX + radius * 0.3, centerY - radius * 0.2).attr({ fill: "#000" })

        // Boca aberta em O
        draw.circle(radius * 0.2).center(centerX, centerY + radius * 0.25).attr({ fill: emotion, stroke: "#333", "stroke-width": 2 })

    } else {
        // Vomitando 🤮
        draw.circle(radius * 2).center(centerX, centerY).attr({ fill: faceColor, stroke: "#333", "stroke-width": 3 })

        // Olhos X (vomitando)
        // Olho esquerdo
        draw.line(centerX - radius * 0.4, centerY - radius * 0.3, centerX - radius * 0.2, centerY - radius * 0.1).attr({ stroke: "#333", "stroke-width": 3, "stroke-linecap": "round" })
        draw.line(centerX - radius * 0.2, centerY - radius * 0.3, centerX - radius * 0.4, centerY - radius * 0.1).attr({ stroke: "#333", "stroke-width": 3, "stroke-linecap": "round" })

        // Olho direito
        draw.line(centerX + radius * 0.2, centerY - radius * 0.3, centerX + radius * 0.4, centerY - radius * 0.1).attr({ stroke: "#333", "stroke-width": 3, "stroke-linecap": "round" })
        draw.line(centerX + radius * 0.4, centerY - radius * 0.3, centerX + radius * 0.2, centerY - radius * 0.1).attr({ stroke: "#333", "stroke-width": 3, "stroke-linecap": "round" })

        // Boca aberta
        draw.ellipse(radius * 0.25, radius * 0.3).center(centerX, centerY + radius * 0.15).attr({ fill: "#8B0000", stroke: "#333", "stroke-width": 2 })

        // Vômito (3 linhas de puke)
        draw.path(`M ${centerX} ${centerY + radius * 0.45} Q ${centerX - radius * 0.15} ${centerY + radius * 0.7}, ${centerX - radius * 0.25} ${centerY + radius * 0.9}`).attr({ stroke: "#90EE90", "stroke-width": 3, fill: "none", "stroke-linecap": "round" })
        draw.path(`M ${centerX} ${centerY + radius * 0.45} L ${centerX} ${centerY + radius * 0.9}`).attr({ stroke: "#90EE90", "stroke-width": 3, fill: "none", "stroke-linecap": "round" })
        draw.path(`M ${centerX} ${centerY + radius * 0.45} Q ${centerX + radius * 0.15} ${centerY + radius * 0.7}, ${centerX + radius * 0.25} ${centerY + radius * 0.9}`).attr({ stroke: "#90EE90", "stroke-width": 3, fill: "none", "stroke-linecap": "round" })
    }
}
